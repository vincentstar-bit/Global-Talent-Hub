import AdminLayout from "@/components/layout/AdminLayout";
import { useGetWorker, useUpdateWorker, useListLeaveRequests, getGetWorkerQueryKey, getListWorkersQueryKey, getListLeaveRequestsQueryKey } from "@workspace/api-client-react";
import { useParams, useLocation } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Save, User, Copy, CheckCheck, Calendar, Upload, X } from "lucide-react";
import { differenceInDays, parseISO, addYears } from "date-fns";

const DEPARTMENTS = ["Engineering & Technology", "Finance & Investment", "Legal & Compliance", "Human Resources", "Operations & Logistics", "Sales & Business Development", "Research & Development", "Information Technology", "Healthcare & Pharmaceuticals", "Construction & Real Estate", "Manufacturing & Production", "International Trade & Customs"];
const inputCls = "w-full border border-border rounded px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-[#c9a227]";

function PhotoUpload({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  };
  return (
    <div className="flex items-center gap-4">
      <div className="w-20 h-20 rounded-lg border-2 border-dashed border-border bg-muted/30 flex items-center justify-center overflow-hidden shrink-0">
        {value ? (
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <User className="w-7 h-7 text-muted-foreground/40" />
        )}
      </div>
      <div className="flex-1">
        <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        <button
          type="button"
          onClick={() => ref.current?.click()}
          className="flex items-center gap-2 px-4 py-2 border border-border rounded text-sm hover:bg-muted transition-colors"
        >
          <Upload className="w-3.5 h-3.5" /> {value ? "Change Photo" : "Upload Photo"}
        </button>
        {value && (
          <button type="button" onClick={() => onChange("")} className="flex items-center gap-1.5 mt-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors">
            <X className="w-3 h-3" /> Remove photo
          </button>
        )}
        <p className="text-xs text-muted-foreground mt-1">JPG, PNG, WEBP — max 5MB</p>
      </div>
    </div>
  );
}

export default function AdminWorkerDetailPage() {
  const params = useParams<{ id: string }>();
  const id = parseInt(params.id);
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState<any>(null);

  const { data: worker, isLoading } = useGetWorker(id, { query: { queryKey: getGetWorkerQueryKey(id) } });
  const { data: leaveRequests } = useListLeaveRequests(
    { workerId: id },
    { query: { queryKey: getListLeaveRequestsQueryKey({ workerId: id }) } }
  );

  useEffect(() => {
    if (worker && !form) setForm({ ...worker });
  }, [worker]);

  const update = useUpdateWorker({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetWorkerQueryKey(id) });
        queryClient.invalidateQueries({ queryKey: getListWorkersQueryKey() });
      },
    },
  });

  const set = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    update.mutate({ id, data: { ...form, paymentAmount: Number(form.paymentAmount), paymentPaid: Number(form.paymentPaid) } });
  };

  const handleCopy = () => {
    if (worker) { navigator.clipboard.writeText(worker.accessToken); setCopied(true); setTimeout(() => setCopied(false), 2000); }
  };

  if (isLoading || !form) return <AdminLayout><div className="animate-pulse space-y-4"><div className="h-32 bg-muted rounded-lg" /><div className="h-48 bg-muted rounded-lg" /></div></AdminLayout>;

  const daysRemaining = differenceInDays(parseISO(worker!.contractEnd), new Date());
  let countryTimeLeft: string | null = null;
  if (worker!.countryEntryDate && worker!.countryStayYears) {
    const exitDate = addYears(parseISO(worker!.countryEntryDate), worker!.countryStayYears);
    const d = differenceInDays(exitDate, new Date());
    countryTimeLeft = d > 0 ? `${Math.floor(d / 365)}y ${Math.floor((d % 365) / 30)}m remaining` : "Stay period ended";
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate("/admin/workers")} className="p-2 text-muted-foreground hover:text-foreground rounded hover:bg-muted transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">{worker!.firstName} {worker!.lastName}</h1>
            <p className="text-muted-foreground text-sm">{worker!.jobTitle} · {worker!.department}</p>
          </div>
          <div className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded">
            <code className="text-xs font-mono">{worker!.accessToken}</code>
            <button onClick={handleCopy} className="text-muted-foreground hover:text-[#c9a227] transition-colors">
              {copied ? <CheckCheck className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-xs text-muted-foreground mb-1">Contract Remaining</div>
            <div className={`text-2xl font-bold ${daysRemaining < 90 ? "text-destructive" : "text-foreground"}`}>
              {daysRemaining > 0 ? `${daysRemaining}d` : "Expired"}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">Ends {worker!.contractEnd}</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-xs text-muted-foreground mb-1">Payment Progress</div>
            <div className="text-2xl font-bold text-foreground">{Math.round(((worker!.paymentPaid ?? 0) / Math.max(worker!.paymentAmount, 1)) * 100)}%</div>
            <div className="text-xs text-muted-foreground mt-0.5">${(worker!.paymentPaid ?? 0).toLocaleString()} / ${worker!.paymentAmount.toLocaleString()}</div>
          </div>
          {countryTimeLeft && (
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-xs text-muted-foreground mb-1">Country Stay ({worker!.assignedCountry})</div>
              <div className="text-lg font-bold text-[#c9a227]">{countryTimeLeft}</div>
              <div className="text-xs text-muted-foreground mt-0.5">Entry: {worker!.countryEntryDate}</div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="font-bold text-foreground mb-4 pb-3 border-b border-border">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div><label className="text-xs font-medium text-muted-foreground block mb-1">First Name</label><input className={inputCls} value={form.firstName} onChange={e => set("firstName", e.target.value)} /></div>
              <div><label className="text-xs font-medium text-muted-foreground block mb-1">Last Name</label><input className={inputCls} value={form.lastName} onChange={e => set("lastName", e.target.value)} /></div>
              <div><label className="text-xs font-medium text-muted-foreground block mb-1">Email</label><input className={inputCls} value={form.email || ""} onChange={e => set("email", e.target.value)} /></div>
              <div><label className="text-xs font-medium text-muted-foreground block mb-1">Phone</label><input className={inputCls} value={form.phone || ""} onChange={e => set("phone", e.target.value)} /></div>
              <div><label className="text-xs font-medium text-muted-foreground block mb-1">Nationality</label><input className={inputCls} value={form.nationality || ""} onChange={e => set("nationality", e.target.value)} /></div>
              <div><label className="text-xs font-medium text-muted-foreground block mb-1">Passport Number</label><input className={inputCls} value={form.passportNumber || ""} onChange={e => set("passportNumber", e.target.value)} /></div>
              <div className="md:col-span-2">
                <label className="text-xs font-medium text-muted-foreground block mb-2">Worker Photo</label>
                <PhotoUpload value={form.photoUrl || ""} onChange={(url) => set("photoUrl", url)} />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="font-bold text-foreground mb-4 pb-3 border-b border-border">Employment</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div><label className="text-xs font-medium text-muted-foreground block mb-1">Job Title</label><input className={inputCls} value={form.jobTitle} onChange={e => set("jobTitle", e.target.value)} /></div>
              <div><label className="text-xs font-medium text-muted-foreground block mb-1">Department</label>
                <select className={inputCls} value={form.department} onChange={e => set("department", e.target.value)}>
                  {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div><label className="text-xs font-medium text-muted-foreground block mb-1">Status</label>
                <select className={inputCls} value={form.status} onChange={e => set("status", e.target.value)}>
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                  <option value="terminated">Terminated</option>
                </select>
              </div>
              <div><label className="text-xs font-medium text-muted-foreground block mb-1">Hired By</label><input className={inputCls} value={form.hiredBy || ""} onChange={e => set("hiredBy", e.target.value)} /></div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="font-bold text-foreground mb-4 pb-3 border-b border-border">Contract & Payment</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div><label className="text-xs font-medium text-muted-foreground block mb-1">Contract Start</label><input type="date" className={inputCls} value={form.contractStart} onChange={e => set("contractStart", e.target.value)} /></div>
              <div><label className="text-xs font-medium text-muted-foreground block mb-1">Contract End</label><input type="date" className={inputCls} value={form.contractEnd} onChange={e => set("contractEnd", e.target.value)} /></div>
              <div className="md:col-span-2"><label className="text-xs font-medium text-muted-foreground block mb-1">Contract Deal</label><textarea rows={3} className={`${inputCls} resize-none`} value={form.contractDeal} onChange={e => set("contractDeal", e.target.value)} /></div>
              <div><label className="text-xs font-medium text-muted-foreground block mb-1">Payment Status</label>
                <select className={inputCls} value={form.paymentStatus} onChange={e => set("paymentStatus", e.target.value)}>
                  <option value="pending">Pending</option>
                  <option value="half">Half / Partial</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div><label className="text-xs font-medium text-muted-foreground block mb-1">Total Contract Value</label><input type="number" className={inputCls} value={form.paymentAmount} onChange={e => set("paymentAmount", e.target.value)} /></div>
              <div><label className="text-xs font-medium text-muted-foreground block mb-1">Amount Paid</label><input type="number" className={inputCls} value={form.paymentPaid} onChange={e => set("paymentPaid", e.target.value)} /></div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="font-bold text-foreground mb-4 pb-3 border-b border-border">Country Assignment</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div><label className="text-xs font-medium text-muted-foreground block mb-1">Country</label><input className={inputCls} value={form.assignedCountry || ""} onChange={e => set("assignedCountry", e.target.value)} /></div>
              <div><label className="text-xs font-medium text-muted-foreground block mb-1">Entry Date</label><input type="date" className={inputCls} value={form.countryEntryDate || ""} onChange={e => set("countryEntryDate", e.target.value)} /></div>
              <div><label className="text-xs font-medium text-muted-foreground block mb-1">Authorized Stay (Years)</label><input type="number" className={inputCls} value={form.countryStayYears || ""} onChange={e => set("countryStayYears", e.target.value)} /></div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="font-bold text-foreground mb-3 pb-3 border-b border-border">Internal Notes</h2>
            <textarea rows={3} className={`${inputCls} resize-none`} value={form.notes || ""} onChange={e => set("notes", e.target.value)} />
          </div>

          {/* Leave requests */}
          {leaveRequests && leaveRequests.length > 0 && (
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="font-bold text-foreground mb-4 pb-3 border-b border-border flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#c9a227]" /> Leave Requests ({leaveRequests.length})
              </h2>
              <div className="space-y-3">
                {leaveRequests.map((r) => (
                  <div key={r.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg text-sm">
                    <div>
                      <div className="font-medium text-foreground">{r.leaveTypeName}</div>
                      <div className="text-xs text-muted-foreground">{r.startDate} → {r.endDate}</div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                      r.status === "approved" ? "bg-green-100 text-green-700"
                      : r.status === "pending" ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                    }`}>{r.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => navigate("/admin/workers")} className="px-5 py-2.5 border border-border rounded text-sm hover:bg-muted transition-colors">Cancel</button>
            <button type="submit" disabled={update.isPending} className="flex items-center gap-2 px-6 py-2.5 bg-[#c9a227] text-[#0a1628] font-semibold rounded text-sm hover:bg-[#d4af37] disabled:opacity-60">
              <Save className="w-4 h-4" />{update.isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
