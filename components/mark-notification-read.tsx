"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function MarkNotificationRead({ id }: { id: string }) {
  const router = useRouter();
  async function mark() {
    const supabase = createClient();
    await supabase.from("notifications").update({ read_at: new Date().toISOString() }).eq("id", id);
    router.refresh();
  }
  return <button type="button" className="button button-secondary" onClick={mark}>Mark read</button>;
}
