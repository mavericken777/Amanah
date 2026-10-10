import { useState } from 'react';
import { verifyLedger } from './stageEngine';
import type { JourneyStage, LedgerProof } from './types';
export function LedgerTerminal({stage,proofs,error,pending}:{stage:JourneyStage;proofs:LedgerProof[];error:string;pending:boolean}){
  const [integrity,setIntegrity]=useState({message:'',tailHash:''});const [checking,setChecking]=useState(false);const proof=[...proofs].reverse().find(proof=>proof.stageId===stage.id);
  async function check(){setChecking(true);try{setIntegrity({message:await verifyLedger(proofs)?`${proofs.length} linked event digests verified.`:'The ledger failed its integrity check.',tailHash:proofs.at(-1)?.hash||''});}catch{setIntegrity({message:'Unable to check evidence digests in this browser.',tailHash:proofs.at(-1)?.hash||''});}finally{setChecking(false);}}
  return <section className="platform-panel ledger-panel" aria-labelledby="ledger-title"><div className="platform-panel-head"><h3 id="ledger-title">Evidence ledger</h3><span className="platform-status">SHA-256</span></div><p>Inspect the event, accountable actor and product lineage behind each handoff.</p>
    <div className="platform-proof"><span>Current event digest</span><code>{error|| (pending?'Updating linked event digests…':proof?.hash||'Inspect a stage to append its event.')}</code><small>Actor record: {stage.operatorSignature}</small></div>
    <div className="platform-standard-list">{stage.standardsInScope.map(standard=><span key={standard}>{standard}</span>)}</div>
    <details className="platform-payload"><summary>Inspect event JSON</summary><pre tabIndex={0} aria-label="Operating event JSON">{JSON.stringify(proof||stage.rawJsonLog,null,2)}</pre></details>
    <button type="button" className="platform-integrity" disabled={pending||checking||!proofs.length||Boolean(error)} onClick={check}>{checking?'Checking…':'Check ledger integrity'}</button><p className="platform-integrity-result" role="status">{!pending&&integrity.tailHash===proofs.at(-1)?.hash?integrity.message:''}</p>
    <ol tabIndex={0} className="platform-ledger-feed" aria-label="Recorded operating events">{proofs.slice(-12).reverse().map(record=><li key={record.sequence}><span>{String(record.sequence).padStart(2,'0')}</span><div><strong>{record.event.replaceAll('_',' ')}</strong><small>{record.stageId} · {record.timestamp.slice(11,19)}</small></div><code title={record.hash}>{record.hash.slice(0,12)}</code></li>)}</ol>
  </section>;
}
