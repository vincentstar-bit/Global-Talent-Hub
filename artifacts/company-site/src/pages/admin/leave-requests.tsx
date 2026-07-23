import AdminLayout from "@/components/layout/AdminLayout";
import { useListLeaveRequests, useUpdateLeaveRequest, getListLeaveRequestsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  Clock, CheckCircle, XCircle, Filter, X,
  Mail, MessageSquare, Send, AlertTriangle, CheckCircle2,
} from "lucide-react";

type DecisionModal = {
  id: number;
  action: "approve" | "reject";
  workerName: string;
  leaveTypeName: string;
  notifyEmail?: string | null;
};

type Toast = { message: string; type: "success" | "warning" };

type EmailModal = { id: number; workerName: string; toEmail: string };

const BASE = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";
async function apiFetch(path: string, options?: RequestInit) {
  const token = localStorage.getItem("admin_token");
  const res = await fetch(`${BASE}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

function EmailRequestorModal({
  modal, onClose, onSent,
}: {
  modal: EmailModal;
  onClose: () => void;
  onSent: (email: string) => void;
}) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!subject.trim()) { setError("Subject is required."); return; }
    if (message.trim().length < 5) { setError("Message must be at least 5 characters."); return; }
    setLoading(true);
    try {
      await apiFetch(`/api/leave-requests/${modal.id}/email`, {
        method: "POST",
        body: JSON.stringify({ subject, message }),
      });
      onSent(modal.toEmail);
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-[#c9a227]" />
            <div>
              <h2 className="font-bold text-base text-foreground">Email Requestor</h2>
              <p className="text-xs text-muted-foreground mt-0.5">{modal.workerName} · {modal.toEmail}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-muted transition-colors">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Subject *</label>
            <input
              type="text"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              placeholder="e.g. Regarding your leave request…"
              className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-[#c9a227]/50 focus:border-[#c9a227] placeholder-muted-foreground/50"
              required
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Message *</label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={5}
              placeholder="Write your message here…"
              className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-[#c9a227]/50 focus:border-[#c9a227] resize-none placeholder-muted-foreground/50"
              required
            />
          </div>
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5 text-sm text-red-600">
              <AlertTriangle className="w-4 h-4 shrink-0" /> {error}
            </div>
          )}
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors">Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#c9a227] text-[#0a1628] font-bold rounded-lg text-sm hover:bg-[#d4af37] transition-colors disabled:opacity-60">
              {loading ? <div className="w-4 h-4 border-2 border-[#0a1628] border-t-transparent rounded-full animate-spin" /> : <><Send className="w-4 h-4" /> Send Email</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DecisionModalDialog({
  modal, onClose, onConfirm, isPending,
}: {
  modal: DecisionModal;
  onClose: () => void;
  onConfirm: (note: string) => void;
  isPending: boolean;
}) {
  const [note, setNote] = useState(
    modal.action === "approve"
      ? "Your leave request has been approved. Please make any necessary arrangements before your leave begins."
      : ""
  );
  const isApprove = modal.action === "approve";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-xl shadow-2xl w-full max-w-md">

        {/* Header */}
        <div className={`flex items-center justify-between p-5 border-b border-border rounded-t-xl ${isApprove ? "bg-green-50" : "bg-red-50"}`}>
          <div className="flex items-center gap-3">
            {isApprove
              ? <CheckCircle className="w-5 h-5 text-green-600" />
              : <XCircle className="w-5 h-5 text-red-600" />}
            <div>
              <h2 className={`font-bold text-base ${isApprove ? "text-green-800" : "text-red-800"}`}>
                {isApprove ? "Approve Leave Request" : "Reject Leave Request"}
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                {modal.workerName} — {modal.leaveTypeName}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-black/10 transition-colors">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {/* Email recipient notice */}
          {modal.notifyEmail ? (
            <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
              <Send className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-0.5">Notification will be sent to</p>
                <p className="text-sm font-medium text-blue-900">{modal.notifyEmail}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
              <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
              <p className="text-sm text-amber-800">
                No email address on file for this worker — notification cannot be sent.
              </p>
            </div>
          )}

          {/* Note field */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <MessageSquare className="w-3.5 h-3.5" />
              {isApprove ? "Approval Note (optional)" : <>Reason for Rejection <span className="text-red-500">*</span></>}
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              placeholder={isApprove ? "Add a message for the worker…" : "Explain why the request is being rejected…"}
              className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-[#c9a227]/50 focus:border-[#c9a227] resize-none placeholder-muted-foreground/50"
            />
            {modal.notifyEmail && (
              <p className="text-xs text-muted-foreground mt-1.5">
                This note will be included in the email sent to <strong>{modal.notifyEmail}</strong>.
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-5 pt-0">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(note.trim())}
            disabled={isPending || (!isApprove && !note.trim())}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              isApprove ? "bg-green-600 hover:bg-green-700 text-white" : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            {isPending ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : isApprove ? (
              <><CheckCircle className="w-4 h-4" /> Approve &amp; Notify</>
            ) : (
              <><XCircle className="w-4 h-4" /> Reject &amp; Notify</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function ToastBanner({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
  return (
    <div className={`fixed top-5 right-5 z-[60] flex items-start gap-3 px-4 py-3 rounded-xl shadow-xl border max-w-sm animate-in fade-in slide-in-from-top-2 ${
      toast.type === "success"
        ? "bg-green-50 border-green-200 text-green-800"
        : "bg-amber-50 border-amber-200 text-amber-800"
    }`}>
      {toast.type === "success"
        ? <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
        : <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />}
      <p className="text-sm flex-1">{toast.message}</p>
      <button onClick={onDismiss} className="ml-2 opacity-60 hover:opacity-100">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function AdminLeaveRequestsPage() {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState("");
  const [modal, setModal] = useState<DecisionModal | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);
  const [emailModal, setEmailModal] = useState<EmailModal | null>(null);

  const showToast = (message: string, type: Toast["type"]) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const { data: requests, isLoading } = useListLeaveRequests(
    { status: statusFilter || undefined },
    { query: { queryKey: getListLeaveRequestsQueryKey({ status: statusFilter || undefined }) } }
  );

  const update = useUpdateLeaveRequest({
    mutation: {
      onSuccess: (data: any) => {
        queryClient.invalidateQueries({ queryKey: getListLeaveRequestsQueryKey() });
        const action = data?.status === "approved" ? "approved" : "rejected";
        if (data?.emailSent && data?.emailSentTo) {
          showToast(`Request ${action}. Notification sent to ${data.emailSentTo}.`, "success");
        } else if (data?.status === "approved" || data?.status === "rejected") {
          showToast(`Request ${action}. No email address on file — notification not sent.`, "warning");
        }
        setModal(null);
      },
    },
  });

  const openModal = (r: any, action: "approve" | "reject") => {
    setModal({
      id: r.id,
      action,
      workerName: r.workerName || `Worker #${r.workerId}`,
      leaveTypeName: r.leaveTypeName || "Leave",
      notifyEmail: r.notifyEmail,
    });
  };

  const handleConfirm = (note: string) => {
    if (!modal) return;
    update.mutate({
      id: modal.id,
      data: {
        status: modal.action === "approve" ? "approved" : "rejected",
        adminNote: note || (modal.action === "approve" ? "Approved by admin." : "Rejected by admin."),
      },
    });
  };

  return (
    <AdminLayout>
      {toast && <ToastBanner toast={toast} onDismiss={() => setToast(null)} />}

      {emailModal && (
        <EmailRequestorModal
          modal={emailModal}
          onClose={() => setEmailModal(null)}
          onSent={(email) => showToast(`Email sent to ${email}.`, "success")}
        />
      )}

      {modal && (
        <DecisionModalDialog
          modal={modal}
          onClose={() => setModal(null)}
          onConfirm={handleConfirm}
          isPending={update.isPending}
        />
      )}

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Leave Requests</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {requests?.length ?? 0} request{requests?.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-border rounded px-3 py-2 text-sm bg-card focus:outline-none focus:ring-2 focus:ring-[#c9a227]"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => <div key={i} className="h-28 bg-muted rounded-lg animate-pulse" />)}
          </div>
        ) : !requests?.length ? (
          <div className="text-center py-16 bg-card border border-border rounded-lg">
            <Clock className="w-10 h-10 text-muted mx-auto mb-3" />
            <div className="font-medium text-foreground">No leave requests</div>
            <p className="text-sm text-muted-foreground mt-1">Workers submit requests through the portal.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {(requests as any[]).map((r) => (
              <div
                key={r.id}
                className={`bg-card border rounded-lg p-5 ${
                  r.status === "pending" ? "border-yellow-200"
                  : r.status === "approved" ? "border-green-200"
                  : "border-red-200"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0 space-y-2">

                    {/* Name + status badge */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-bold text-foreground">{r.workerName || `Worker #${r.workerId}`}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${
                        r.status === "approved" ? "bg-green-100 text-green-700"
                        : r.status === "pending" ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                      }`}>
                        {r.status}
                      </span>
                    </div>

                    {/* Leave type + dates */}
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{r.leaveTypeName}</span>
                      {" · "}{r.startDate} → {r.endDate}
                    </p>

                    {/* Notification recipient — prominently shown */}
                    <div className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium border ${
                      r.notifyEmail
                        ? "bg-blue-50 border-blue-200 text-blue-800"
                        : "bg-muted border-border text-muted-foreground"
                    }`}>
                      <Mail className="w-3.5 h-3.5 shrink-0" />
                      {r.notifyEmail ? (
                        <>
                          <span className="opacity-70">Notification recipient:</span>
                          <strong>{r.notifyEmail}</strong>
                          {r.workerEmail && r.workerEmail !== r.notifyEmail && (
                            <span className="opacity-60 ml-1">(profile: {r.workerEmail})</span>
                          )}
                        </>
                      ) : (
                        <span>No email on file — notifications disabled</span>
                      )}
                    </div>

                    {/* Reason */}
                    {r.reason && (
                      <p className="text-sm text-muted-foreground bg-muted/50 rounded px-3 py-2">
                        {r.reason}
                      </p>
                    )}

                    {/* Admin note (for decided requests) */}
                    {r.adminNote && (
                      <div className={`rounded-lg border px-3 py-2 text-sm ${
                        r.status === "approved"
                          ? "bg-green-50 border-green-200 text-green-800"
                          : "bg-red-50 border-red-200 text-red-800"
                      }`}>
                        <span className="font-semibold">
                          {r.status === "approved" ? "Approval note: " : "Rejection reason: "}
                        </span>
                        {r.adminNote}
                      </div>
                    )}

                    <p className="text-xs text-muted-foreground">
                      Submitted: {new Date(r.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    {r.notifyEmail && (
                      <button
                        onClick={() => setEmailModal({ id: r.id, workerName: r.workerName || `Worker #${r.workerId}`, toEmail: r.notifyEmail })}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#c9a227]/10 text-[#8a6d10] border border-[#c9a227]/30 rounded text-sm font-medium hover:bg-[#c9a227]/20 transition-colors whitespace-nowrap"
                      >
                        <Mail className="w-3.5 h-3.5" /> Email
                      </button>
                    )}
                    {r.status === "pending" && (
                      <>
                        <button
                          onClick={() => openModal(r, "approve")}
                          disabled={update.isPending}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 border border-green-200 rounded text-sm font-medium hover:bg-green-200 transition-colors disabled:opacity-60 whitespace-nowrap"
                        >
                          <CheckCircle className="w-3.5 h-3.5" /> Approve
                        </button>
                        <button
                          onClick={() => openModal(r, "reject")}
                          disabled={update.isPending}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded text-sm font-medium hover:bg-red-100 transition-colors disabled:opacity-60 whitespace-nowrap"
                        >
                          <XCircle className="w-3.5 h-3.5" /> Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
