import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import ts from 'typescript';

test('literal application queries use columns in the current live schema',(t)=>{
 const root=new URL('../',import.meta.url);
 const schema=ts.createSourceFile('database.types.ts',readFileSync(new URL('lib/database.types.ts',root),'utf8'),ts.ScriptTarget.Latest,true);
 const database=schema.statements.find(x=>ts.isTypeAliasDeclaration(x)&&x.name.text==='Database').type;
 const member=(node,name)=>node.members.find(x=>x.name?.getText(schema)===name).type;
 const tables=member(member(database,'public'),'Tables');
 const columns=new Map(tables.members.map(table=>[table.name.getText(schema),new Set(member(table.type,'Row').members.map(x=>x.name.getText(schema)))]));
 const failures=[];let checked=0;
 function files(directory){return readdirSync(directory,{withFileTypes:true}).flatMap(x=>x.isDirectory()?files(join(directory,x.name)):/\.(ts|tsx)$/.test(x.name)?[join(directory,x.name)]:[]);}
 function sourceTable(call){let node=call.expression.expression;while(ts.isCallExpression(node)&&ts.isPropertyAccessExpression(node.expression)){
  if(node.expression.name.text==='from'&&ts.isStringLiteral(node.arguments[0]))return node.expression.expression.getText().endsWith('.storage')?null:node.arguments[0].text;
  node=node.expression.expression;
 }return null;}
 for(const directory of ['app','components','lib','supabase/functions'])for(const file of files(fileURLToPath(new URL(directory+'/',root)))){
  if(file.endsWith('database.types.ts')||file.endsWith('database.current.types.ts')||file.endsWith('database.target.types.ts'))continue;
  const ast=ts.createSourceFile(file,readFileSync(file,'utf8'),ts.ScriptTarget.Latest,true,file.endsWith('.tsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS);
  function visit(node){if(ts.isCallExpression(node)&&ts.isPropertyAccessExpression(node.expression)){
   const table=sourceTable(node),method=node.expression.name.text,allowed=columns.get(table);
   if(table&&!allowed)failures.push(file+': unknown table '+table);
   if(allowed&&['select','insert','update','upsert'].includes(method)){
    const arg=node.arguments[0];let fields=[];
    if(method==='select'&&arg&&ts.isStringLiteral(arg)){
     let depth=0,start=0;const parts=[];for(let i=0;i<arg.text.length;i++){if(arg.text[i]==='(')depth++;else if(arg.text[i]===')')depth--;else if(arg.text[i]===','&&depth===0){parts.push(arg.text.slice(start,i));start=i+1;}}parts.push(arg.text.slice(start));
     fields=parts.filter(x=>!x.includes('(')).map(x=>x.trim().split(':').at(-1));
    }else if(arg&&ts.isObjectLiteralExpression(arg))fields=arg.properties.filter(ts.isPropertyAssignment).map(x=>x.name.getText(ast).replace(/^['"]|['"]$/g,''));
    for(const field of fields){if(!field||field==='*')continue;checked++;if(!allowed.has(field))failures.push(file+': '+table+'.'+field+' in '+method);}
   }
  }ts.forEachChild(node,visit);}
  visit(ast);
 }
 assert.ok(checked>120,'Expected substantial query contract coverage');
 assert.deepEqual(failures,[]);
 t.diagnostic(checked+' literal column references checked against the generated live schema; dynamic expressions and nested relation selectors are outside this check');
});
