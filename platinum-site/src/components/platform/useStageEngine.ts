import { useEffect, useReducer, useState } from 'react';
import { initialStagesData, scenario } from './stagesData';
import { buildLedger, initialPlatformState, transition, type EngineAction } from './stageEngine';
import type { LedgerProof } from './types';
export function useStageEngine(){
  const [state,dispatch]=useReducer((state:ReturnType<typeof initialPlatformState>,action:EngineAction)=>transition(state,action,initialStagesData,scenario),undefined,()=>initialPlatformState(initialStagesData,scenario));
  const [proofs,setProofs]=useState<LedgerProof[]>([]);const [proofError,setProofError]=useState('');
  useEffect(()=>{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)dispatch({type:'PLAY'});},[]);
  useEffect(()=>{if(state.playbackMode!=='AUTONOMOUS_PLAY')return;const timer=window.setInterval(()=>{if(!document.hidden)dispatch({type:'TICK',milliseconds:100});},100);return()=>window.clearInterval(timer);},[state.playbackMode,state.playbackSpeed]);
  useEffect(()=>{let cancelled=false;buildLedger(state.stageLogs).then(result=>{if(!cancelled){setProofs(result);setProofError('');}}).catch(()=>{if(!cancelled)setProofError('Evidence digest is unavailable in this browser.');});return()=>{cancelled=true;};},[state.stageLogs]);
  useEffect(()=>{const preference=window.matchMedia('(prefers-reduced-motion: reduce)');const pause=()=>{if(preference.matches)dispatch({type:'PAUSE'});};preference.addEventListener('change',pause);return()=>preference.removeEventListener('change',pause);},[]);
  return {state,dispatch,proofs,proofError,currentStage:initialStagesData[state.currentStageIndex],stages:initialStagesData,scenario};
}
