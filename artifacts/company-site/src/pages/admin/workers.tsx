import AdminLayout from "@/components/layout/AdminLayout";
import { useListWorkers, useDeleteWorker, getListWorkersQueryKey } from "@workspace/api-client-react";
import { Link } from "wouter";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Search, Trash2, Edit, Copy, CheckCheck, Users, Mail, X, Send, CheckCircle2, AlertCircle } from "lucide-react";

const BASE = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";

type ComposeModal = {
  workerId: number;
  workerName: string;
  email: string;
};

function ComposeEmailModal({
  modal,
  onClose,
}: {
  modal: ComposeModal;
  onClose: () => void;
}) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;
    setSending(true);
    setError("");
    try {
      const res = await fetch(`${BASE}/api/workers/${modal.workerId}/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ subject: subject.trim(), message: message.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send email.");
      setSent(true);
      setTimeout(onClose, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-xl shadow-2xl w-full max-w-lg">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border bg-[#0a1628] rounded-t-xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#c9a227]/20 flex items-center justify-center">
              <Mail className="w-4 h-4 text-[#c9a227]" />
            </div>
            <div>
              <h2 className="font-bold text-white text-sm">Message Worker</h2>
              <p className="text-xs text-white/50">{modal.workerName} · {modal.email}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-white/10 transition-colors">
            <X className="w-4 h-4 text-white/60" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          {sent ? (
            <div className="flex flex-col items-center py-8 gap-3">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-green-600" />
              </div>
              <p className="font-bold text-foreground">Email sent!</p>
              <p className="text-sm text-muted-foreground text-center">
                Your message was delivered to <strong>{modal.email}</strong>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSend} className="space-y-4">
              {/* To field (read-only) */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">To</label>
                <div className="flex items-center gap-2 bg-muted/50 border border-border rounded-lg px-3 py-2.5">
                  <Mail className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  <span className="text-sm text-foreground">{modal.workerName}</span>
                  <span className="text-sm text-muted-foreground">〈{modal.email}〉</span>
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  placeholder="e.g. Regarding your upcoming assignment"
                  className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-[#c9a227]/50 focus:border-[#c9a227] placeholder-muted-foreground/50"
                />
              </div>

              {/* Message */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={6}
                  placeholder="Type your message here…"
                  className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-[#c9a227]/50 focus:border-[#c9a227] resize-none placeholder-muted-foreground/50"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Sent from <span className="font-medium">support@dynamicoffshoredrilling.com</span>. Worker can reply to that address.
                </p>
              </div>

              {error && (
                <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  {error}
                </div>
              )}

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={sending || !subject.trim() || !message.trim()}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#c9a227] text-[#0a1628] font-bold rounded-lg text-sm hover:bg-[#d4af37] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <div className="w-4 h-4 border-2 border-[#0a1628] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <><Send className="w-4 h-4" /> Send Email</>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminWorkersPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [composeModal, setComposeModal] = useState<ComposeModal | null>(null);

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

  const openCompose = (worker: any) => {
    setComposeModal({
      workerId: worker.id,
      workerName: `${worker.firstName} ${worker.lastName}`,
      email: worker.email,
    });
  };

  return (
    <AdminLayout>
      {composeModal && (
        <ComposeEmailModal
          modal={composeModal}
          onClose={() => setComposeModal(null)}
        />
      )}

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
                            {worker.email && (
                              <div className="text-xs text-muted-foreground/70">{worker.email}</div>
                            )}
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
                        <div className="flex items-center gap-1.5">
                          {worker.email && (
                            <button
                              onClick={() => openCompose(worker)}
                              title={`Email ${worker.firstName}`}
                              className="p-1.5 text-muted-foreground hover:text-[#c9a227] transition-colors"
                            >
                              <Mail className="w-4 h-4" />
                            </button>
                          )}
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
