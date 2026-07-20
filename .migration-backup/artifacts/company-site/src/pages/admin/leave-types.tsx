import AdminLayout from "@/components/layout/AdminLayout";
import { useListLeaveTypes, useCreateLeaveType, useUpdateLeaveType, useDeleteLeaveType, getListLeaveTypesQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Plus, Edit, Trash2, X, Save, CalendarDays } from "lucide-react";

const inputCls = "w-full border border-border rounded px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-[#c9a227]";
const empty = { name: "", description: "", maxDays: 14, amount: 0, requiresApproval: true, isActive: true };

export default function AdminLeaveTypesPage() {
  const queryClient = useQueryClient();
  const { data: types, isLoading } = useListLeaveTypes({ query: { queryKey: getListLeaveTypesQueryKey() } });
  const [modal, setModal] = useState<"create" | "edit" | null>(null);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<any>(empty);
  const set = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

  const openCreate = () => { setForm(empty); setEditing(null); setModal("create"); };
  const openEdit = (t: any) => { setForm({ ...t }); setEditing(t); setModal("edit"); };

  const create = useCreateLeaveType({ mutation: { onSuccess: () => { queryClient.invalidateQueries({ queryKey: getListLeaveTypesQueryKey() }); setModal(null); } } });
  const update = useUpdateLeaveType({ mutation: { onSuccess: () => { queryClient.invalidateQueries({ queryKey: getListLeaveTypesQueryKey() }); setModal(null); } } });
  const del = useDeleteLeaveType({ mutation: { onSuccess: () => queryClient.invalidateQueries({ queryKey: getListLeaveTypesQueryKey() }) } });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { ...form, maxDays: Number(form.maxDays), amount: Number(form.amount) };
    if (modal === "edit" && editing) update.mutate({ id: editing.id, data });
    else create.mutate({ data });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Leave Type Configuration</h1>
            <p className="text-muted-foreground text-sm mt-1">Configure leave types available to workers. These will be displayed in the worker portal.</p>
          </div>
          <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-[#c9a227] text-[#0a1628] font-semibold rounded text-sm hover:bg-[#d4af37]">
            <Plus className="w-4 h-4" /> Add Leave Type
          </button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{[1,2,3,4].map(i => <div key={i} className="h-32 bg-muted rounded-lg animate-pulse" />)}</div>
        ) : !types?.length ? (
          <div className="text-center py-16 bg-card border border-border rounded-lg">
            <CalendarDays className="w-10 h-10 text-muted mx-auto mb-3" />
            <div className="font-medium text-foreground mb-1">No leave types configured</div>
            <p className="text-sm text-muted-foreground mb-4">Add leave types so workers can submit leave applications.</p>
            <button onClick={openCreate} className="px-4 py-2 bg-[#c9a227] text-[#0a1628] font-semibold rounded text-sm">Add First Leave Type</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {types.map((t) => (
              <div key={t.id} className="bg-card border border-border rounded-lg p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-foreground">{t.name}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${t.isActive ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>
                        {t.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{t.description}</p>
                    <div className="flex flex-wrap gap-3 text-xs">
                      <span className="bg-muted px-2 py-1 rounded font-medium">Max {t.maxDays} days</span>
                      <span className="bg-[#c9a227]/10 text-[#c9a227] px-2 py-1 rounded font-medium">${t.amount} compensation</span>
                      {t.requiresApproval && <span className="bg-muted px-2 py-1 rounded text-muted-foreground">Requires approval</span>}
                    </div>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <button onClick={() => openEdit(t)} className="p-1.5 text-muted-foreground hover:text-[#c9a227]"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => confirm("Delete this leave type?") && del.mutate({ id: t.id })} className="p-1.5 text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-bold text-foreground">{modal === "edit" ? "Edit Leave Type" : "Add Leave Type"}</h2>
              <button onClick={() => setModal(null)}><X className="w-5 h-5 text-muted-foreground" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div><label className="text-xs font-medium text-muted-foreground block mb-1">Leave Type Name *</label><input className={inputCls} value={form.name} onChange={e => set("name", e.target.value)} placeholder="e.g. Annual Leave" required /></div>
              <div><label className="text-xs font-medium text-muted-foreground block mb-1">Description *</label><textarea rows={2} className={`${inputCls} resize-none`} value={form.description} onChange={e => set("description", e.target.value)} required /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs font-medium text-muted-foreground block mb-1">Maximum Days *</label><input type="number" min="1" className={inputCls} value={form.maxDays} onChange={e => set("maxDays", e.target.value)} required /></div>
                <div><label className="text-xs font-medium text-muted-foreground block mb-1">Compensation Amount (USD)</label><input type="number" min="0" step="0.01" className={inputCls} value={form.amount} onChange={e => set("amount", e.target.value)} /></div>
              </div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={form.requiresApproval} onChange={e => set("requiresApproval", e.target.checked)} className="w-4 h-4 accent-[#c9a227]" />
                  Requires Supervisor Approval
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={form.isActive} onChange={e => set("isActive", e.target.checked)} className="w-4 h-4 accent-[#c9a227]" />
                  Active (visible to workers)
                </label>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setModal(null)} className="px-4 py-2 border border-border rounded text-sm hover:bg-muted">Cancel</button>
                <button type="submit" disabled={create.isPending || update.isPending} className="flex items-center gap-2 px-5 py-2 bg-[#c9a227] text-[#0a1628] font-semibold rounded text-sm disabled:opacity-60">
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
