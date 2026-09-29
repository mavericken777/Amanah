"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ApprovalDecisionActions({
  approvalId,
  status,
}: {
  approvalId: string;
  status: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function decide(nextStatus: "approved" | "rejected") {
    setBusy(true);
    setError("");
    const supabase = createClient();
    const { error: updateError } = await supabase
      .from("approvals")
      .update({
        status: nextStatus,
        decided_at: new Date().toISOString(),
        decision_notes: nextStatus === "approved" ? "Approved in Amanah." : "Rejected in Amanah.",
      })
      .eq("id", approvalId)
      .eq("status", "pending");

    if (updateError) {
      setError(updateError.message);
      setBusy(false);
      return;
    }

    router.refresh();
    setBusy(false);
  }

  if (status !== "pending") return <span className="muted small">Decided</span>;

  return (
    <div className="inline-actions">
      <button className="button small-button" type="button" disabled={busy} onClick={() => decide("approved")}>
        Approve
      </button>
      <button className="button secondary small-button" type="button" disabled={busy} onClick={() => decide("rejected")}>
        Reject
      </button>
      {error ? <span className="error inline-error">{error}</span> : null}
    </div>
  );
}
