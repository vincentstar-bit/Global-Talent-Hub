import AdminLayout from "@/components/layout/AdminLayout";
import { useListWorkers, useDeleteWorker, getListWorkersQueryKey } from "@workspace/api-client-react";
import { Link } from "wouter";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Search, Trash2, Edit, Copy, CheckCheck, Users } from "lucide-react";

export default function AdminWorkersPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const { data: workers, isLoading } = useListWorkers(
    { search: search || undefined, department: department || undefined, status: status || undefined },
    { query: { queryKey: getListWorkersQueryKey({ search: search || undefined, department: department || undefined, status: status || undefined }) } }
  );

  const deleteWorker = useDeleteWorker({
    mutation: {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: getListWorkersQueryKey() }),
    },
  });

  const departments = [...new Set(workers?.map((w) => w.department) ?? [])];

  const handleCopy = (token: string, id: number) => {
    navigator.clipboard.writeText(token);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: number, name: string) => {
    if (confirm(`Delete worker ${name}? This cannot be undone.`)) {
      deleteWorker.mutate({ id });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Workers</h1>
            <p className="text-muted-foreground text-sm mt-1">{workers?.length ?? 0} total workers</p>
          </div>
          <Link href="/admin/workers/new" className="flex items-center gap-2 px-4 py-2 bg-[#c9a227] text-[#0a1628] font-semibold rounded text-sm hover:bg-[#d4af37] transition-colors">
            <Plus className="w-4 h-4" /> Add Worker
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search name, title, token..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-border rounded text-sm bg-card focus:outline-none focus:ring-2 focus:ring-[#c9a227]"
            />
          </div>
          <select value={department} onChange={(e) => setDepartment(e.target.value)} className="border border-border rounded px-3 py-2 text-sm bg-card focus:outline-none focus:ring-2 focus:ring-[#c9a227]">
            <option value="">All Departments</option>
            {departments.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="border border-border rounded px-3 py-2 text-sm bg-card focus:outline-none focus:ring-2 focus:ring-[#c9a227]">
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="terminated">Terminated</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center text-muted-foreground">Loading workers...</div>
          ) : !workers?.length ? (
            <div className="p-12 text-center">
              <Users className="w-12 h-12 text-muted mx-auto mb-3" />
              <div className="font-medium text-foreground mb-1">No workers found</div>
              <p className="text-sm text-muted-foreground mb-4">Add your first worker to get started.</p>
              <Link href="/admin/workers/new" className="inline-flex items-center gap-2 px-4 py-2 bg-[#c9a227] text-[#0a1628] font-semibold rounded text-sm">
                <Plus className="w-4 h-4" /> Add Worker
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Worker</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Department</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Country</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Contract End</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Payment</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Access Token</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {workers.map((worker) => (
                    <tr key={worker.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {worker.photoUrl ? (
                            <img src={worker.photoUrl} alt={worker.firstName} className="w-8 h-8 rounded-full object-cover" />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-[#c9a227]/10 flex items-center justify-center">
                              <Users className="w-4 h-4 text-[#c9a227]" />
                            </div>
                          )}
                          <div>
                            <div className="font-medium text-foreground">{worker.firstName} {worker.lastName}</div>
                            <div className="text-xs text-muted-foreground">{worker.jobTitle}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{worker.department}</td>
                      <td className="px-4 py-3 text-muted-foreground">{worker.assignedCountry || "—"}</td>
                      <td className="px-4 py-3 text-muted-foreground">{worker.contractEnd}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border capitalize ${
                          worker.paymentStatus === "completed" ? "bg-green-50 text-green-700 border-green-200"
                          : worker.paymentStatus === "half" ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                          : "bg-red-50 text-red-700 border-red-200"
                        }`}>{worker.paymentStatus}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <code className="text-xs font-mono bg-muted px-2 py-0.5 rounded">{worker.accessToken}</code>
                          <button onClick={() => handleCopy(worker.accessToken, worker.id)} className="text-muted-foreground hover:text-[#c9a227] transition-colors">
                            {copiedId === worker.id ? <CheckCheck className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border capitalize ${
                          worker.status === "active" ? "bg-green-50 text-green-700 border-green-200"
                          : worker.status === "suspended" ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                          : "bg-red-50 text-red-700 border-red-200"
                        }`}>{worker.status}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Link href={`/admin/workers/${worker.id}`} className="p-1.5 text-muted-foreground hover:text-[#c9a227] transition-colors">
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button onClick={() => handleDelete(worker.id, `${worker.firstName} ${worker.lastName}`)} className="p-1.5 text-muted-foreground hover:text-destructive transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
