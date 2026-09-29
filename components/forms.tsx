"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

type FormProps = {
  organizationId: string;
  projectId?: string;
};

function useInsert(table: string, base: Record<string, unknown>, onDone?: () => void) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function insert(extra: Record<string, unknown>) {
    setBusy(true);
    setError("");
    const supabase = createClient();
    const { error: insertError } = await supabase.from(table).insert({ ...base, ...extra });
    if (insertError) {
      setError(insertError.message);
      setBusy(false);
      return false;
    }
    onDone?.();
    router.refresh();
    setBusy(false);
    return true;
  }

  return { insert, busy, error };
}

export function CreateMeetingForm({ organizationId, projectId }: Required<FormProps>) {
  const [organisationOrPerson, setOrganisationOrPerson] = useState("");
  const [city, setCity] = useState("");
  const [venue, setVenue] = useState("");
  const [purpose, setPurpose] = useState("");
  const [startsAt, setStartsAt] = useState("");
  const [status, setStatus] = useState("pending");
  const { insert, busy, error } = useInsert("meetings", { organization_id: organizationId, project_id: projectId }, () => setOrganisationOrPerson(""));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const ok = await insert({ organisation_or_person: organisationOrPerson.trim(), city: city.trim() || null, venue: venue.trim() || null, purpose: purpose.trim() || null, starts_at: startsAt ? new Date(startsAt).toISOString() : null, status });
    if (ok) { setOrganisationOrPerson(""); setCity(""); setVenue(""); setPurpose(""); setStartsAt(""); }
  }

  return <form className="card stack" onSubmit={submit}><div><div className="eyebrow">MEETING</div><h2>Add engagement</h2></div><label>Organisation / person<input required value={organisationOrPerson} onChange={e=>setOrganisationOrPerson(e.target.value)} /></label><div className="grid-2"><label>City<input value={city} onChange={e=>setCity(e.target.value)} /></label><label>Venue<input value={venue} onChange={e=>setVenue(e.target.value)} /></label></div><label>Purpose<input value={purpose} onChange={e=>setPurpose(e.target.value)} /></label><div className="grid-2"><label>Start<input type="datetime-local" value={startsAt} onChange={e=>setStartsAt(e.target.value)} /></label><label>Status<select value={status} onChange={e=>setStatus(e.target.value)}><option value="pending">Pending</option><option value="tentative">Tentative</option><option value="confirmed">Confirmed</option><option value="blocked">Blocked</option><option value="cancelled">Cancelled</option></select></label></div>{error&&<p className="error">{error}</p>}<button className="button" disabled={busy}>{busy?"Saving…":"Add meeting"}</button></form>;
}

export function CreateDocumentForm({ organizationId, projectId }: Required<FormProps>) {
  const [title,setTitle]=useState(""); const [classification,setClassification]=useState("internal"); const [requiredBy,setRequiredBy]=useState(""); const [status,setStatus]=useState("pending");
  const {insert,busy,error}=useInsert("documents",{organization_id:organizationId,project_id:projectId});
  async function submit(e:React.FormEvent){e.preventDefault();const ok=await insert({title:title.trim(),classification,status,required_by:requiredBy||null});if(ok){setTitle("");setRequiredBy("");}}
  return <form className="card stack" onSubmit={submit}><div><div className="eyebrow">DOCUMENT</div><h2>Add compliance record</h2></div><label>Title<input required value={title} onChange={e=>setTitle(e.target.value)} /></label><div className="grid-2"><label>Classification<select value={classification} onChange={e=>setClassification(e.target.value)}><option value="public">Public</option><option value="internal">Internal</option><option value="confidential">Confidential</option><option value="restricted">Restricted</option></select></label><label>Status<select value={status} onChange={e=>setStatus(e.target.value)}><option value="pending">Pending</option><option value="in_review">In review</option><option value="approved">Approved</option><option value="rejected">Rejected</option><option value="expired">Expired</option></select></label></div><label>Required by<input type="date" value={requiredBy} onChange={e=>setRequiredBy(e.target.value)} /></label>{error&&<p className="error">{error}</p>}<button className="button" disabled={busy}>{busy?"Saving…":"Add document"}</button></form>;
}

export function CreateDecisionForm({ organizationId, projectId }: Required<FormProps>) {
  const [code,setCode]=useState(""); const [decision,setDecision]=useState(""); const [reason,setReason]=useState(""); const [date,setDate]=useState("");
  const {insert,busy,error}=useInsert("decisions",{organization_id:organizationId,project_id:projectId});
  async function submit(e:React.FormEvent){e.preventDefault();const ok=await insert({decision_code:code.trim(),decision:decision.trim(),reason_context:reason.trim()||null,decided_on:date||null});if(ok){setCode("");setDecision("");setReason("");setDate("");}}
  return <form className="card stack" onSubmit={submit}><div><div className="eyebrow">DECISION</div><h2>Record decision</h2></div><div className="grid-2"><label>ID<input required value={code} onChange={e=>setCode(e.target.value)} placeholder="D-002" /></label><label>Date<input type="date" value={date} onChange={e=>setDate(e.target.value)} /></label></div><label>Decision<textarea required value={decision} onChange={e=>setDecision(e.target.value)} rows={3}/></label><label>Reason / context<textarea value={reason} onChange={e=>setReason(e.target.value)} rows={3}/></label>{error&&<p className="error">{error}</p>}<button className="button" disabled={busy}>{busy?"Saving…":"Record decision"}</button></form>;
}

export function CreateRiskForm({ organizationId, projectId }: Required<FormProps>) {
  const [code,setCode]=useState(""); const [description,setDescription]=useState(""); const [impact,setImpact]=useState("medium"); const [likelihood,setLikelihood]=useState("medium"); const [mitigation,setMitigation]=useState("");
  const {insert,busy,error}=useInsert("risks",{organization_id:organizationId,project_id:projectId});
  async function submit(e:React.FormEvent){e.preventDefault();const ok=await insert({risk_code:code.trim(),description:description.trim(),impact,likelihood,mitigation:mitigation.trim()||null});if(ok){setCode("");setDescription("");setMitigation("");}}
  return <form className="card stack" onSubmit={submit}><div><div className="eyebrow">RISK</div><h2>Register risk</h2></div><label>Risk ID<input required value={code} onChange={e=>setCode(e.target.value)} placeholder="R-005" /></label><label>Risk description<textarea required value={description} onChange={e=>setDescription(e.target.value)} rows={3}/></label><div className="grid-2"><label>Impact<select value={impact} onChange={e=>setImpact(e.target.value)}><option>low</option><option>medium</option><option>high</option></select></label><label>Likelihood<select value={likelihood} onChange={e=>setLikelihood(e.target.value)}><option>low</option><option>medium</option><option>high</option></select></label></div><label>Mitigation<textarea value={mitigation} onChange={e=>setMitigation(e.target.value)} rows={3}/></label>{error&&<p className="error">{error}</p>}<button className="button" disabled={busy}>{busy?"Saving…":"Register risk"}</button></form>;
}

export function CreateExpenseForm({ organizationId, projectId }: Required<FormProps>) {
  const [category,setCategory]=useState(""); const [description,setDescription]=useState(""); const [amount,setAmount]=useState(""); const [currency,setCurrency]=useState("MYR"); const [spentOn,setSpentOn]=useState(""); const [reimbursable,setReimbursable]=useState(false);
  const {insert,busy,error}=useInsert("expenses",{organization_id:organizationId,project_id:projectId});
  async function submit(e:React.FormEvent){e.preventDefault();const ok=await insert({category:category.trim(),description:description.trim(),amount:Number(amount),currency:currency.toUpperCase().slice(0,3),spent_on:spentOn,reimbursable});if(ok){setCategory("");setDescription("");setAmount("");setSpentOn("");setReimbursable(false);}}
  return <form className="card stack" onSubmit={submit}><div><div className="eyebrow">EXPENSE</div><h2>Record expense</h2></div><div className="grid-2"><label>Category<input required value={category} onChange={e=>setCategory(e.target.value)} /></label><label>Date<input type="date" required value={spentOn} onChange={e=>setSpentOn(e.target.value)} /></label></div><label>Description<input required value={description} onChange={e=>setDescription(e.target.value)} /></label><div className="grid-2"><label>Amount<input required min="0" step="0.01" type="number" value={amount} onChange={e=>setAmount(e.target.value)} /></label><label>Currency<input required maxLength={3} value={currency} onChange={e=>setCurrency(e.target.value)} /></label></div><label className="inline-checkbox"><input type="checkbox" checked={reimbursable} onChange={e=>setReimbursable(e.target.checked)} /> Reimbursable</label>{error&&<p className="error">{error}</p>}<button className="button" disabled={busy}>{busy?"Saving…":"Record expense"}</button></form>;
}

export function CreateUpdateForm({ organizationId, projectId }: Required<FormProps>) {
  const [title,setTitle]=useState(""); const [overallStatus,setOverallStatus]=useState("Setup"); const [completed,setCompleted]=useState(""); const [inProgress,setInProgress]=useState(""); const [blocked,setBlocked]=useState(""); const [nextActions,setNextActions]=useState("");
  const {insert,busy,error}=useInsert("updates",{organization_id:organizationId,project_id:projectId});
  async function submit(e:React.FormEvent){e.preventDefault();const ok=await insert({title:title.trim(),overall_status:overallStatus,completed:completed.trim()||null,in_progress:inProgress.trim()||null,blocked:blocked.trim()||null,next_actions:nextActions.trim()||null});if(ok){setTitle("");setCompleted("");setInProgress("");setBlocked("");setNextActions("");}}
  return <form className="card stack" onSubmit={submit}><div><div className="eyebrow">UPDATE</div><h2>Publish project update</h2></div><label>Title<input required value={title} onChange={e=>setTitle(e.target.value)} placeholder="China Trip — weekly status" /></label><label>Status<input value={overallStatus} onChange={e=>setOverallStatus(e.target.value)} /></label><label>Completed<textarea value={completed} onChange={e=>setCompleted(e.target.value)} rows={2}/></label><label>In progress<textarea value={inProgress} onChange={e=>setInProgress(e.target.value)} rows={2}/></label><label>Blocked<textarea value={blocked} onChange={e=>setBlocked(e.target.value)} rows={2}/></label><label>Next actions<textarea value={nextActions} onChange={e=>setNextActions(e.target.value)} rows={2}/></label>{error&&<p className="error">{error}</p>}<button className="button" disabled={busy}>{busy?"Publishing…":"Publish update"}</button></form>;
}

export function CreateItineraryForm({ organizationId, projectId }: Required<FormProps>) {
  const [date,setDate]=useState(""); const [city,setCity]=useState(""); const [activity,setActivity]=useState(""); const [location,setLocation]=useState(""); const [transport,setTransport]=useState(""); const [time,setTime]=useState(""); const [status,setStatus]=useState("pending");
  const {insert,busy,error}=useInsert("itinerary_events",{organization_id:organizationId,project_id:projectId});
  async function submit(e:React.FormEvent){e.preventDefault();const ok=await insert({event_date:date,city:city.trim()||null,activity:activity.trim(),location:location.trim()||null,transport:transport.trim()||null,starts_at:time?new Date(time).toISOString():null,status});if(ok){setDate("");setCity("");setActivity("");setLocation("");setTransport("");setTime("");}}
  return <form className="card stack" onSubmit={submit}><div><div className="eyebrow">ITINERARY</div><h2>Add itinerary event</h2></div><div className="grid-2"><label>Date<input type="date" required value={date} onChange={e=>setDate(e.target.value)} /></label><label>Time<input type="datetime-local" value={time} onChange={e=>setTime(e.target.value)} /></label></div><div className="grid-2"><label>City<input value={city} onChange={e=>setCity(e.target.value)} /></label><label>Location<input value={location} onChange={e=>setLocation(e.target.value)} /></label></div><label>Activity<input required value={activity} onChange={e=>setActivity(e.target.value)} /></label><label>Transport<input value={transport} onChange={e=>setTransport(e.target.value)} /></label><label>Status<select value={status} onChange={e=>setStatus(e.target.value)}><option>pending</option><option>tentative</option><option>confirmed</option><option>blocked</option><option>cancelled</option></select></label>{error&&<p className="error">{error}</p>}<button className="button" disabled={busy}>{busy?"Saving…":"Add itinerary event"}</button></form>;
}

export function CreateTravellerForm({ organizationId, projectId }: Required<FormProps>) {
  const [name,setName]=useState(""); const [role,setRole]=useState(""); const [contact,setContact]=useState(""); const [backup,setBackup]=useState("");
  const {insert,busy,error}=useInsert("travellers",{organization_id:organizationId,project_id:projectId});
  async function submit(e:React.FormEvent){e.preventDefault();const ok=await insert({display_name:name.trim(),role:role.trim()||null,contact_method:contact.trim()||null,backup_contact_method:backup.trim()||null,status:"confirmed"});if(ok){setName("");setRole("");setContact("");setBackup("");}}
  return <form className="card stack" onSubmit={submit}><div><div className="eyebrow">TRAVELLER</div><h2>Add traveller</h2></div><label>Name<input required value={name} onChange={e=>setName(e.target.value)} /></label><label>Role<input value={role} onChange={e=>setRole(e.target.value)} /></label><div className="grid-2"><label>Contact<input value={contact} onChange={e=>setContact(e.target.value)} /></label><label>Backup<input value={backup} onChange={e=>setBackup(e.target.value)} /></label></div>{error&&<p className="error">{error}</p>}<button className="button" disabled={busy}>{busy?"Saving…":"Add traveller"}</button></form>;
}

export function CreateTransportForm({ organizationId, projectId }: Required<FormProps>) {
  const [type,setType]=useState("flight"); const [label,setLabel]=useState(""); const [date,setDate]=useState(""); const [origin,setOrigin]=useState(""); const [destination,setDestination]=useState(""); const [departure,setDeparture]=useState(""); const [arrival,setArrival]=useState("");
  const {insert,busy,error}=useInsert("transport_segments",{organization_id:organizationId,project_id:projectId});
  async function submit(e:React.FormEvent){e.preventDefault();const ok=await insert({segment_type:type,segment_label:label.trim()||null,travel_date:date||null,origin:origin.trim()||null,destination:destination.trim()||null,departure_at:departure?new Date(departure).toISOString():null,arrival_at:arrival?new Date(arrival).toISOString():null,booking_status:"pending"});if(ok){setLabel("");setDate("");setOrigin("");setDestination("");setDeparture("");setArrival("");}}
  return <form className="card stack" onSubmit={submit}><div><div className="eyebrow">TRANSPORT</div><h2>Add transport segment</h2></div><div className="grid-2"><label>Type<select value={type} onChange={e=>setType(e.target.value)}><option>flight</option><option>train</option><option>ground</option><option>other</option></select></label><label>Label<input value={label} onChange={e=>setLabel(e.target.value)} placeholder="KUL → PEK" /></label></div><label>Date<input type="date" value={date} onChange={e=>setDate(e.target.value)} /></label><div className="grid-2"><label>Origin<input value={origin} onChange={e=>setOrigin(e.target.value)} /></label><label>Destination<input value={destination} onChange={e=>setDestination(e.target.value)} /></label></div><div className="grid-2"><label>Departure<input type="datetime-local" value={departure} onChange={e=>setDeparture(e.target.value)} /></label><label>Arrival<input type="datetime-local" value={arrival} onChange={e=>setArrival(e.target.value)} /></label></div>{error&&<p className="error">{error}</p>}<button className="button" disabled={busy}>{busy?"Saving…":"Add transport"}</button></form>;
}

export function CreateAccommodationForm({ organizationId, projectId }: Required<FormProps>) {
  const [city,setCity]=useState(""); const [property,setProperty]=useState(""); const [checkIn,setCheckIn]=useState(""); const [checkOut,setCheckOut]=useState(""); const [room,setRoom]=useState("");
  const {insert,busy,error}=useInsert("accommodations",{organization_id:organizationId,project_id:projectId});
  async function submit(e:React.FormEvent){e.preventDefault();const ok=await insert({city:city.trim(),property_name:property.trim(),check_in:checkIn||null,check_out:checkOut||null,room_allocation:room.trim()||null,booking_status:"pending"});if(ok){setCity("");setProperty("");setCheckIn("");setCheckOut("");setRoom("");}}
  return <form className="card stack" onSubmit={submit}><div><div className="eyebrow">ACCOMMODATION</div><h2>Add stay</h2></div><label>City<input required value={city} onChange={e=>setCity(e.target.value)} /></label><label>Property<input required value={property} onChange={e=>setProperty(e.target.value)} /></label><div className="grid-2"><label>Check-in<input type="date" value={checkIn} onChange={e=>setCheckIn(e.target.value)} /></label><label>Check-out<input type="date" value={checkOut} onChange={e=>setCheckOut(e.target.value)} /></label></div><label>Room / allocation<input value={room} onChange={e=>setRoom(e.target.value)} /></label>{error&&<p className="error">{error}</p>}<button className="button" disabled={busy}>{busy?"Saving…":"Add accommodation"}</button></form>;
}


export function CreateBudgetForm({ organizationId, projectId }: Required<FormProps>) {
  const [category,setCategory]=useState(""); const [planned,setPlanned]=useState(""); const [actual,setActual]=useState("");
  const {insert,busy,error}=useInsert("budgets",{organization_id:organizationId,project_id:projectId,status:"active"});
  async function submit(e:React.FormEvent){e.preventDefault();const ok=await insert({category:category.trim(),planned:Number(planned),actual:Number(actual)});if(ok){setCategory("");setPlanned("");setActual("");}}
  return <form className="card stack" onSubmit={submit}><div><div className="eyebrow">BUDGET</div><h2>Add budget line</h2></div><label>Category<input required value={category} onChange={e=>setCategory(e.target.value)} placeholder="Flights" /></label><div className="grid-2"><label>Planned<input required min="0" step="0.01" type="number" value={planned} onChange={e=>setPlanned(e.target.value)} /></label><label>Actual<input min="0" step="0.01" type="number" value={actual} onChange={e=>setActual(e.target.value)} /></label></div>{error&&<p className="error">{error}</p>}<button className="button" disabled={busy}>{busy?"Saving…":"Add budget line"}</button></form>;
}
