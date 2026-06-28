import AdminLayout from "@/components/layout/AdminLayout";
import { useListLeaveRequests, useUpdateLeaveRequest, getListLeaveRequestsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Clock, CheckCircle, XCircle, Filter, X, Mail, MessageSquare } from "lucide-react";

type DecisionModal = {
  id: number;
  action: "approve" | "reject";
  workerName: string;
  leaveTypeName: string;
  contactEmail?: string | null;
};

function DecisionModalDialog({
  modal,
  onClose,
  onConfirm,
  isPending,
}: {
  modal: DecisionModal;
  onClose: () => void;
  onConfirm: (note: string) => void;
  isPending: boolean;
}) {
  const [note, setNote] = useState(
    modal.action === "approve" ? "Your leave request has been approved. Please make any necessary arrangements before your leave begins." : ""
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
          {/* Email notice */}
          {modal.contactEmail && (
            <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
              <Mail className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
              <p className="text-sm text-blue-800">
                A notification email will automatically be sent to <strong>{modal.contactEmail}</strong>.
              </p>
            </div>
          )}

          {/* Note field */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
              <MessageSquare className="w-3.5 h-3.5 inline mr-1.5" />
              {isApprove ? "Approval Note" : "Reason for Rejection"}{!isApprove && <span className="text-red-500 ml-0.5">*</span>}
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              placeholder={
                isApprove
                  ? "Add an optional message for the worker…"
                  : "Explain why the request is being rejected…"
              }
              className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-[#c9a227]/50 focus:border-[#c9a227] resize-none placeholder-muted-foreground/50"
            />
            {modal.contactEmail && (
              <p className="text-xs text-muted-foreground mt-1.5">This note will be included in the email sent to the worker.</p>
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
              isApprove
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            {isPending ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : isApprove ? (
              <><CheckCircle className="w-4 h-4" /> Approve</>
            ) : (
              <><XCircle className="w-4 h-4" /> Reject</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminLeaveRequestsPage() {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState("");
  const [modal, setModal] = useState<DecisionModal | null>(null);

  const { data: requests, isLoading } = useListLeaveRequests(
    { status: statusFilter || undefined },
    { query: { queryKey: getListLeaveRequestsQueryKey({ status: statusFilter || undefined }) } }
  );

  const update = useUpdateLeaveRequest({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListLeaveRequestsQueryKey() });
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
      contactEmail: r.contactEmail,
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
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        ) : !requests?.length ? (
          <div className="text-center py-16 bg-card border border-border rounded-lg">
            <Clock className="w-10 h-10 text-muted mx-auto mb-3" />
            <div className="font-medium text-foreground">No leave requests</div>
            <p className="text-sm text-muted-foreground mt-1">Workers submit requests through the portal.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((r) => (
              <div
                key={r.id}
                className={`bg-card border rounded-lg p-5 ${
                  r.status === "pending"
                    ? "border-yellow-200"
                    : r.status === "approved"
                    ? "border-green-200"
                    : "border-red-200"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h3 className="font-bold text-foreground">{r.workerName || `Worker #${r.workerId}`}</h3>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                          r.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : r.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {r.status}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-1">
                      <span className="font-medium text-foreground">{r.leaveTypeName}</span> · {r.startDate} to {r.endDate}
                    </p>

                    {/* Contact email */}
                    {r.contactEmail && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5 mb-1">
                        <Mail className="w-3 h-3" /> {r.contactEmail}
                      </p>
                    )}

                    {r.reason && (
                      <p className="text-sm text-muted-foreground bg-muted/50 rounded px-3 py-2 mt-2">{r.reason}</p>
                    )}

                    {r.adminNote && (
                      <p className="text-sm text-muted-foreground mt-2">
                        <span className="font-medium text-foreground">Admin note:</span> {r.adminNote}
                      </p>
                    )}

                    <p className="text-xs text-muted-foreground mt-2">
                      Submitted: {new Date(r.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {r.status === "pending" && (
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => openModal(r, "approve")}
                        disabled={update.isPending}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 border border-green-200 rounded text-sm font-medium hover:bg-green-200 transition-colors disabled:opacity-60"
                      >
                        <CheckCircle className="w-3.5 h-3.5" /> Approve
                      </button>
                      <button
                        onClick={() => openModal(r, "reject")}
                        disabled={update.isPending}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded text-sm font-medium hover:bg-red-100 transition-colors disabled:opacity-60"
                      >
                        <XCircle className="w-3.5 h-3.5" /> Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
