import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import ts from 'typescript';

test('literal application queries use columns in the current application schema contract',(t)=>{
 const rootPath=fileURLToPath(new URL('../',import.meta.url));
 const schemaPath=join(rootPath,'lib/database.target.types.ts');
 const program=ts.createProgram([schemaPath],{
  target:ts.ScriptTarget.Latest,
  module:ts.ModuleKind.ESNext,
  moduleResolution:ts.ModuleResolutionKind.Bundler,
  baseUrl:rootPath,
  paths:{'@/*':['*']},
  skipLibCheck:true,
  strict:true,
  noEmit:true
 });
 const schema=program.getSourceFile(schemaPath);
 assert.ok(schema,'Unable to load the target database type source');
 const checker=program.getTypeChecker();
 const databaseAlias=schema.statements.find(x=>ts.isTypeAliasDeclaration(x)&&x.name.text==='Database');
 assert.ok(databaseAlias&&ts.isTypeAliasDeclaration(databaseAlias),'Target Database type alias is missing');
 const databaseType=checker.getTypeFromTypeNode(databaseAlias.type);
 const propertyType=(type,name)=>{
  const symbol=checker.getPropertyOfType(type,name);
  assert.ok(symbol,`Schema property ${name} is missing`);
  return checker.getTypeOfSymbolAtLocation(symbol,schema);
 };
 const tables=propertyType(propertyType(databaseType,'public'),'Tables');
 const tableEntries=checker.getPropertiesOfType(tables);
 const columns=new Map(tableEntries.map(table=>{
  const tableType=checker.getTypeOfSymbolAtLocation(table,schema);
  const rowType=propertyType(tableType,'Row');
  return [table.name,new Set(checker.getPropertiesOfType(rowType).map(x=>x.name))];
 }));
 const failures=[];let checked=0;
 function files(directory){return readdirSync(directory,{withFileTypes:true}).flatMap(x=>x.isDirectory()?files(join(directory,x.name)):/\.(ts|tsx)$/.test(x.name)?[join(directory,x.name)]:[]);}
 function sourceTable(call){let node=call.expression.expression;while(ts.isCallExpression(node)&&ts.isPropertyAccessExpression(node.expression)){
  if(node.expression.name.text==='from'&&ts.isStringLiteral(node.arguments[0]))return node.expression.expression.getText().endsWith('.storage')?null:node.arguments[0].text;
  node=node.expression.expression;
 }return null;}
 for(const directory of ['app','components','lib','supabase/functions'])for(const file of files(join(rootPath,directory))){
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
 t.diagnostic(checked+' literal column references checked against the generated application schema contract; dynamic expressions and nested relation selectors are outside this check');
});
