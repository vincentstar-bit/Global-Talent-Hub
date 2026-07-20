import AdminLayout from "@/components/layout/AdminLayout";
import { useListJobs, useCreateJob, useUpdateJob, useDeleteJob, getListJobsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Plus, Edit, Trash2, X, Save, Briefcase } from "lucide-react";

const inputCls = "w-full border border-border rounded px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-[#c9a227]";
const emptyForm = { title: "", department: "", description: "", responsibilities: "", requirements: "", salary: "", photoUrl: "", isActive: true };

export default function AdminJobsPage() {
  const queryClient = useQueryClient();
  const { data: jobs, isLoading } = useListJobs({ query: { queryKey: getListJobsQueryKey() } });
  const [modal, setModal] = useState<"create" | "edit" | null>(null);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<any>(emptyForm);
  const set = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

  const openCreate = () => { setForm(emptyForm); setEditing(null); setModal("create"); };
  const openEdit = (job: any) => { setForm({ ...job }); setEditing(job); setModal("edit"); };

  const create = useCreateJob({ mutation: { onSuccess: () => { queryClient.invalidateQueries({ queryKey: getListJobsQueryKey() }); setModal(null); } } });
  const update = useUpdateJob({ mutation: { onSuccess: () => { queryClient.invalidateQueries({ queryKey: getListJobsQueryKey() }); setModal(null); } } });
  const del = useDeleteJob({ mutation: { onSuccess: () => queryClient.invalidateQueries({ queryKey: getListJobsQueryKey() }) } });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modal === "edit" && editing) update.mutate({ id: editing.id, data: form });
    else create.mutate({ data: form });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Job Roles</h1>
            <p className="text-muted-foreground text-sm mt-1">Manage public job listings on the careers page</p>
          </div>
          <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-[#c9a227] text-[#0a1628] font-semibold rounded text-sm hover:bg-[#d4af37]">
            <Plus className="w-4 h-4" /> Add Job Role
          </button>
        </div>

        {isLoading ? (
          <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-20 bg-muted rounded-lg animate-pulse" />)}</div>
        ) : !jobs?.length ? (
          <div className="text-center py-16 bg-card border border-border rounded-lg">
            <Briefcase className="w-10 h-10 text-muted mx-auto mb-3" />
            <div className="font-medium text-foreground mb-1">No job roles yet</div>
            <button onClick={openCreate} className="mt-3 px-4 py-2 bg-[#c9a227] text-[#0a1628] font-semibold rounded text-sm">Add First Job</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {jobs.map((job) => (
              <div key={job.id} className="bg-card border border-border rounded-lg p-5 flex gap-4">
                {job.photoUrl && <img src={job.photoUrl} alt={job.title} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-foreground">{job.title}</h3>
                      <p className="text-sm text-muted-foreground">{job.department} · {job.salary}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${job.isActive ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>{job.isActive ? "Active" : "Hidden"}</span>
                      <button onClick={() => openEdit(job)} className="p-1.5 text-muted-foreground hover:text-[#c9a227]"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => confirm("Delete this job role?") && del.mutate({ id: job.id })} className="p-1.5 text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{job.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-bold text-foreground">{modal === "edit" ? "Edit Job Role" : "Add Job Role"}</h2>
              <button onClick={() => setModal(null)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs font-medium text-muted-foreground block mb-1">Job Title *</label><input className={inputCls} value={form.title} onChange={e => set("title", e.target.value)} required /></div>
                <div><label className="text-xs font-medium text-muted-foreground block mb-1">Department *</label><input className={inputCls} value={form.department} onChange={e => set("department", e.target.value)} required /></div>
              </div>
              <div><label className="text-xs font-medium text-muted-foreground block mb-1">Description *</label><textarea rows={3} className={`${inputCls} resize-none`} value={form.description} onChange={e => set("description", e.target.value)} required /></div>
              <div><label className="text-xs font-medium text-muted-foreground block mb-1">Responsibilities</label><textarea rows={4} className={`${inputCls} resize-none`} value={form.responsibilities} onChange={e => set("responsibilities", e.target.value)} placeholder="List key responsibilities..." /></div>
              <div><label className="text-xs font-medium text-muted-foreground block mb-1">Requirements</label><textarea rows={4} className={`${inputCls} resize-none`} value={form.requirements} onChange={e => set("requirements", e.target.value)} placeholder="List qualifications and experience required..." /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs font-medium text-muted-foreground block mb-1">Salary Range *</label><input className={inputCls} value={form.salary} onChange={e => set("salary", e.target.value)} placeholder="e.g. $80,000 – $120,000/year" required /></div>
                <div><label className="text-xs font-medium text-muted-foreground block mb-1">Photo URL</label><input className={inputCls} value={form.photoUrl} onChange={e => set("photoUrl", e.target.value)} placeholder="https://..." /></div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="isActive" checked={form.isActive} onChange={e => set("isActive", e.target.checked)} className="w-4 h-4 accent-[#c9a227]" />
                <label htmlFor="isActive" className="text-sm text-foreground">Visible on careers page</label>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setModal(null)} className="px-4 py-2 border border-border rounded text-sm hover:bg-muted">Cancel</button>
                <button type="submit" disabled={create.isPending || update.isPending} className="flex items-center gap-2 px-5 py-2 bg-[#c9a227] text-[#0a1628] font-semibold rounded text-sm hover:bg-[#d4af37] disabled:opacity-60">
                  <Save className="w-4 h-4" />{create.isPending || update.isPending ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
