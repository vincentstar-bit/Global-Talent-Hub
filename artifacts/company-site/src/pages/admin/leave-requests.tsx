import AdminLayout from "@/components/layout/AdminLayout";
import { useListLeaveRequests, useUpdateLeaveRequest, getListLeaveRequestsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Clock, CheckCircle, XCircle, Filter } from "lucide-react";

export default function AdminLeaveRequestsPage() {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState("");
  const { data: requests, isLoading } = useListLeaveRequests(
    { status: statusFilter || undefined },
    { query: { queryKey: getListLeaveRequestsQueryKey({ status: statusFilter || undefined }) } }
  );

  const update = useUpdateLeaveRequest({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListLeaveRequestsQueryKey() });
      },
    },
  });

  const approve = (id: number) => update.mutate({ id, data: { status: "approved", adminNote: "Approved by admin." } });
  const reject = (id: number) => {
    const note = prompt("Reason for rejection (optional):");
    update.mutate({ id, data: { status: "rejected", adminNote: note || "Rejected by admin." } });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Leave Requests</h1>
            <p className="text-muted-foreground text-sm mt-1">{requests?.length ?? 0} request{requests?.length !== 1 ? "s" : ""}</p>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border border-border rounded px-3 py-2 text-sm bg-card focus:outline-none focus:ring-2 focus:ring-[#c9a227]">
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-24 bg-muted rounded-lg animate-pulse" />)}</div>
        ) : !requests?.length ? (
          <div className="text-center py-16 bg-card border border-border rounded-lg">
            <Clock className="w-10 h-10 text-muted mx-auto mb-3" />
            <div className="font-medium text-foreground">No leave requests</div>
            <p className="text-sm text-muted-foreground mt-1">Workers submit requests through the portal.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((r) => (
              <div key={r.id} className={`bg-card border rounded-lg p-5 ${r.status === "pending" ? "border-yellow-200" : r.status === "approved" ? "border-green-200" : "border-border"}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-foreground">{r.workerName || `Worker #${r.workerId}`}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                        r.status === "approved" ? "bg-green-100 text-green-700"
                        : r.status === "pending" ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                      }`}>{r.status}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      <span className="font-medium text-foreground">{r.leaveTypeName}</span> · {r.startDate} to {r.endDate}
                    </p>
                    {r.reason && <p className="text-sm text-muted-foreground bg-muted/50 rounded px-3 py-2 mt-2">{r.reason}</p>}
                    {r.adminNote && (
                      <p className="text-sm text-muted-foreground mt-2">
                        <span className="font-medium text-foreground">Admin note:</span> {r.adminNote}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">Submitted: {new Date(r.createdAt).toLocaleDateString()}</p>
                  </div>
                  {r.status === "pending" && (
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => approve(r.id)}
                        disabled={update.isPending}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 border border-green-200 rounded text-sm font-medium hover:bg-green-200 transition-colors disabled:opacity-60"
                      >
                        <CheckCircle className="w-3.5 h-3.5" /> Approve
                      </button>
                      <button
                        onClick={() => reject(r.id)}
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
