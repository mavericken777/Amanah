import type { ExceptionKind, JourneyStage, LedgerEvent, LedgerProof, PlatformState, Scenario } from './types';
export type EngineAction = {type:'TICK';milliseconds:number}|{type:'PLAY'}|{type:'PAUSE'}|{type:'SPEED';speed:1|2|4}|{type:'SELECT';index:number}|{type:'RESTART'}|{type:'INJECT';kind:ExceptionKind}|{type:'NEXT_PHASE'}|{type:'CONFIRM';confirmed:boolean}|{type:'RESOLVE'}|{type:'RECALL'};
export const canonicalJson = (value: unknown): string => {
  if(Array.isArray(value))return '['+value.map(canonicalJson).join(',')+']';
  if(value&&typeof value==='object')return '{'+Object.entries(value).filter(([,entry])=>entry!==undefined).sort(([a],[b])=>a.localeCompare(b)).map(([k,v])=>JSON.stringify(k)+':'+canonicalJson(v)).join(',')+'}';
  return JSON.stringify(value) ?? 'null';
};
export async function buildLedger(events: LedgerEvent[]): Promise<LedgerProof[]> {
  const proofs:LedgerProof[]=[];let previousHash='0'.repeat(64);
  for(const event of events){const bytes=new TextEncoder().encode(canonicalJson({...event,previousHash}));const digest=await crypto.subtle.digest('SHA-256',bytes);const hash=Array.from(new Uint8Array(digest),n=>n.toString(16).padStart(2,'0')).join('');proofs.push({...event,hash,previousHash});previousHash=hash;}
  return proofs;
}
export async function verifyLedger(proofs: LedgerProof[]): Promise<boolean> {
  const expected=await buildLedger(proofs.map(({hash:_hash,previousHash:_previousHash,...event})=>event));
  return expected.every((proof,index)=>proof.hash===proofs[index].hash&&proof.previousHash===proofs[index].previousHash);
}
function append(state:PlatformState,event:string,stages:JourneyStage[],scenario:Scenario,payload:Record<string,unknown>={}):PlatformState {
  const stage=stages[state.currentStageIndex];const sequence=state.sequence+1;
  const record:LedgerEvent={sequence,timestamp:new Date(Date.parse(scenario.startedAt)+state.virtualTime+sequence).toISOString(),stageId:stage.id,event,payload:{...stage.rawJsonLog,...payload}};
  return {...state,sequence,stageLogs:[...state.stageLogs,record]};
}
export function initialPlatformState(stages:JourneyStage[],scenario:Scenario):PlatformState {
  return append({currentStageIndex:0,playbackMode:'PAUSED',playbackSpeed:1,activeException:null,stageLogs:[],sequence:0,elapsed:0,virtualTime:0,evidenceConfirmed:false,resolution:''},'IDENTITY_BOUND',stages,scenario);
}
export function transition(state:PlatformState,action:EngineAction,stages:JourneyStage[],scenario:Scenario):PlatformState {
  const held=Boolean(state.activeException);
  if(held&&['PLAY','SELECT','RESTART','SPEED','INJECT'].includes(action.type))return state;
  switch(action.type){
    case 'PLAY':return {...state,playbackMode:'AUTONOMOUS_PLAY'};
    case 'PAUSE':return held?state:{...state,playbackMode:'PAUSED'};
    case 'SPEED':return [1,2,4].includes(action.speed)?{...state,playbackSpeed:action.speed,elapsed:0}:state;
    case 'SELECT':return Number.isInteger(action.index)&&action.index>=0&&action.index<stages.length?append({...state,currentStageIndex:action.index,playbackMode:'PAUSED',elapsed:0},'STAGE_INSPECTED',stages,scenario):state;
    case 'RESTART':return append({...state,currentStageIndex:0,elapsed:0,playbackMode:'PAUSED',resolution:''},'JOURNEY_RESTARTED',stages,scenario);
    case 'TICK':{
      if(state.playbackMode!=='AUTONOMOUS_PLAY'||held||action.milliseconds<=0)return state;
      const duration=5000/state.playbackSpeed;const next={...state,elapsed:state.elapsed+action.milliseconds,virtualTime:state.virtualTime+action.milliseconds};
      if(next.elapsed<duration)return next;
      if(state.currentStageIndex===stages.length-1)return append({...next,elapsed:0,playbackMode:'PAUSED'},'CONSUMER_LOOP_COMPLETE',stages,scenario);
      return append({...next,currentStageIndex:state.currentStageIndex+1,elapsed:0},'STAGE_ADVANCED',stages,scenario);
    }
    case 'INJECT':{
      const details={COLD_CHAIN:{title:'Cold-chain breach',breachMetric:'Cargo temperature',observedValue:'14.2 °C',thresholdValue:scenario.temperatureLimit+' °C',capaAction:'Quarantine the affected lots, inspect the cold-chain equipment, assess exposure and repeat temperature checks.'},SEAL_TAMPER:{title:'Seal integrity breach',breachMetric:'Electronic seal',observedValue:'TAMPER_ALERT_OPEN',thresholdValue:'LOCKED_INTACT',capaAction:'Quarantine the container, inspect the physical seal and reconcile each custody handoff.'},PORCINE_DNA:{title:'Laboratory non-conformance',breachMetric:'Porcine DNA result',observedValue:'DETECTED',thresholdValue:'NOT_DETECTED',capaAction:'Contain source and downstream lots, investigate material genealogy and repeat accredited testing and review.'}}[action.kind];
      const activeException={...details,id:`EXC-${state.sequence+1}`,kind:action.kind,severity:'CRITICAL' as const,triggeredAtStage:state.currentStageIndex+1,affectedBatches:scenario.allocations.map(a=>a.batch),affectedSKUs:[scenario.sku],phase:'HOLD' as const};
      return append({...state,playbackMode:'EXCEPTION_HOLD',activeException,evidenceConfirmed:false,resolution:'',elapsed:0},'D4_CONTAINMENT',stages,scenario,{exception:activeException,operationalState:'QUARANTINED',authorityActionExecuted:false});
    }
    case 'NEXT_PHASE':{
      if(!state.activeException)return state;const phases=['HOLD','INVESTIGATION','CORRECTIVE_ACTION','REVERIFICATION'] as const;const index=phases.indexOf(state.activeException.phase);if(index===3)return state;
      const activeException={...state.activeException,phase:phases[index+1]};return append({...state,activeException,evidenceConfirmed:false},activeException.phase,stages,scenario,{exceptionId:activeException.id,operationalState:'QUARANTINED'});
    }
    case 'CONFIRM':return state.activeException?.phase==='REVERIFICATION'?{...state,evidenceConfirmed:action.confirmed}:state;
    case 'RESOLVE':{
      if(state.activeException?.phase!=='REVERIFICATION'||!state.evidenceConfirmed)return state;
      return append({...state,activeException:null,evidenceConfirmed:false,playbackMode:'PAUSED',elapsed:0,resolution:'Reviewed re-verification recorded. The operating hold is closed; certification and customs records retain their independent owners.'},'OPERATING_HOLD_CLOSED',stages,scenario,{exceptionId:state.activeException.id,reviewerRecord:'SCENARIO-REVIEWER-0891',repeatChecks:'RECORDED',authorityActionExecuted:false});
    }
    case 'RECALL':return held?append(state,'RECALL_PROPAGATED',stages,scenario,{exceptionId:state.activeException?.id,sku:scenario.sku,sourceBatch:scenario.batch,shipment:scenario.shipment,affectedAllocations:scenario.allocations,unaffectedBatch:scenario.unaffectedBatch}):state;
  }
}
