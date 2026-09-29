import { MarkNotificationRead } from "@/components/mark-notification-read";
import { requireUser } from "@/lib/auth";

export default async function NotificationsPage(){
  const {supabase,user}=await requireUser();
  const {data:notifications}=await supabase.from("notifications").select("id,type,title,body,href,read_at,created_at").eq("user_id",user.id).order("created_at",{ascending:false}).limit(100);
  return <div className="page stack-xl"><header><div className="eyebrow">PLATFORM SERVICE</div><h1>Notifications</h1><p className="lead">Operational alerts for tasks, risks, meetings and other events.</p></header><section className="stack">{(notifications??[]).map(n=><article className={`card ${n.read_at?"":"notice-unread"}`} key={n.id}><div className="row-between"><div><div className="eyebrow">{n.type}</div><h2>{n.title}</h2></div>{!n.read_at&&<MarkNotificationRead id={n.id}/>}</div><p>{n.body??"No additional details."}</p><p className="muted">{new Date(n.created_at).toLocaleString()}</p></article>)}{!notifications?.length&&<div className="card empty">No notifications.</div>}</section></div>;
}
