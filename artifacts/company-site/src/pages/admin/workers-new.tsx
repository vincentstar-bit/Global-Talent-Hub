import AdminLayout from "@/components/layout/AdminLayout";
import { useCreateWorker, getListWorkersQueryKey } from "@workspace/api-client-react";
import { useLocation } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useRef } from "react";
import { ArrowLeft, Save, Upload, X, User } from "lucide-react";

const DEPARTMENTS = ["Engineering & Technology", "Finance & Investment", "Legal & Compliance", "Human Resources", "Operations & Logistics", "Sales & Business Development", "Research & Development", "Information Technology", "Healthcare & Pharmaceuticals", "Construction & Real Estate", "Manufacturing & Production", "International Trade & Customs"];

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div>
      <label className="text-sm font-medium text-foreground block mb-1.5">
        {label}{required && <span className="text-destructive ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

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
      <div className="w-16 h-16 rounded-lg border-2 border-dashed border-border bg-muted/30 flex items-center justify-center overflow-hidden shrink-0">
        {value ? (
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <User className="w-6 h-6 text-muted-foreground/40" />
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
            <X className="w-3 h-3" /> Remove
          </button>
        )}
        <p className="text-xs text-muted-foreground mt-1">JPG, PNG, WEBP — max 5MB</p>
      </div>
    </div>
  );
}

export default function AdminWorkersNewPage() {
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", jobTitle: "", department: DEPARTMENTS[0],
    contractStart: "", contractEnd: "", contractDeal: "", paymentStatus: "pending",
    paymentAmount: 0, paymentPaid: 0, assignedCountry: "", countryEntryDate: "",
    countryStayYears: "", photoUrl: "", nationality: "", passportNumber: "", hiredBy: "", notes: "", status: "active",
  });

  const create = useCreateWorker({
    mutation: {
      onSuccess: (worker) => {
        queryClient.invalidateQueries({ queryKey: getListWorkersQueryKey() });
        navigate(`/admin/workers/${worker.id}`);
      },
    },
  });

  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    create.mutate({
      data: {
        ...form,
        paymentAmount: Number(form.paymentAmount),
        paymentPaid: Number(form.paymentPaid),
        countryStayYears: form.countryStayYears ? Number(form.countryStayYears) : undefined,
      } as any,
    });
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate("/admin/workers")} className="p-2 text-muted-foreground hover:text-foreground rounded hover:bg-muted transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Add New Worker</h1>
            <p className="text-muted-foreground text-sm mt-0.5">A unique Access Token will be generated automatically.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal info */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="font-bold text-foreground mb-4 pb-3 border-b border-border">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="First Name" required><input className={inputCls} value={form.firstName} onChange={e => set("firstName", e.target.value)} required /></Field>
              <Field label="Last Name" required><input className={inputCls} value={form.lastName} onChange={e => set("lastName", e.target.value)} required /></Field>
              <Field label="Email Address"><input type="email" className={inputCls} value={form.email} onChange={e => set("email", e.target.value)} /></Field>
              <Field label="Phone Number"><input className={inputCls} value={form.phone} onChange={e => set("phone", e.target.value)} /></Field>
              <Field label="Nationality"><input className={inputCls} value={form.nationality} onChange={e => set("nationality", e.target.value)} placeholder="e.g. Nigerian" /></Field>
              <Field label="Passport Number"><input className={inputCls} value={form.passportNumber} onChange={e => set("passportNumber", e.target.value)} /></Field>
              <div className="md:col-span-2">
                <Field label="Worker Photo">
                  <PhotoUpload value={form.photoUrl} onChange={(url) => set("photoUrl", url)} />
                </Field>
              </div>
            </div>
          </div>

          {/* Employment */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="font-bold text-foreground mb-4 pb-3 border-b border-border">Employment Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Job Title" required><input className={inputCls} value={form.jobTitle} onChange={e => set("jobTitle", e.target.value)} required /></Field>
              <Field label="Department" required>
                <select className={inputCls} value={form.department} onChange={e => set("department", e.target.value)} required>
                  {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </Field>
              <Field label="Status">
                <select className={inputCls} value={form.status} onChange={e => set("status", e.target.value)}>
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                  <option value="terminated">Terminated</option>
                </select>
              </Field>
              <Field label="Hired By (MD / Senior Staff Name)"><input className={inputCls} value={form.hiredBy} onChange={e => set("hiredBy", e.target.value)} placeholder="e.g. Zhang Wei (CEO)" /></Field>
            </div>
          </div>

          {/* Contract */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="font-bold text-foreground mb-4 pb-3 border-b border-border">Contract Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Contract Start Date" required><input type="date" className={inputCls} value={form.contractStart} onChange={e => set("contractStart", e.target.value)} required /></Field>
              <Field label="Contract End Date" required><input type="date" className={inputCls} value={form.contractEnd} onChange={e => set("contractEnd", e.target.value)} required /></Field>
              <div className="md:col-span-2">
                <Field label="Contract Deal / Terms" required>
                  <textarea rows={4} className={`${inputCls} resize-none`} value={form.contractDeal} onChange={e => set("contractDeal", e.target.value)} placeholder="Describe the contract terms, scope of work, deliverables, and any special arrangements..." required />
                </Field>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="font-bold text-foreground mb-4 pb-3 border-b border-border">Payment Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field label="Payment Status">
                <select className={inputCls} value={form.paymentStatus} onChange={e => set("paymentStatus", e.target.value)}>
                  <option value="pending">Pending</option>
                  <option value="half">Half / Partial</option>
                  <option value="completed">Completed</option>
                </select>
              </Field>
              <Field label="Total Contract Value (USD)"><input type="number" min="0" step="0.01" className={inputCls} value={form.paymentAmount} onChange={e => set("paymentAmount", e.target.value)} /></Field>
              <Field label="Amount Already Paid (USD)"><input type="number" min="0" step="0.01" className={inputCls} value={form.paymentPaid} onChange={e => set("paymentPaid", e.target.value)} /></Field>
            </div>
          </div>

          {/* Country assignment */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="font-bold text-foreground mb-4 pb-3 border-b border-border">Country Assignment</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field label="Assigned Country"><input className={inputCls} value={form.assignedCountry} onChange={e => set("assignedCountry", e.target.value)} placeholder="e.g. Nigeria" /></Field>
              <Field label="Date of Country Entry"><input type="date" className={inputCls} value={form.countryEntryDate} onChange={e => set("countryEntryDate", e.target.value)} /></Field>
              <Field label="Authorized Stay (Years)"><input type="number" min="1" className={inputCls} value={form.countryStayYears} onChange={e => set("countryStayYears", e.target.value)} placeholder="e.g. 2" /></Field>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="font-bold text-foreground mb-4 pb-3 border-b border-border">Internal Notes</h2>
            <textarea rows={3} className={`${inputCls} resize-none`} value={form.notes} onChange={e => set("notes", e.target.value)} placeholder="Internal notes visible only to admins..." />
          </div>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => navigate("/admin/workers")} className="px-5 py-2.5 border border-border rounded text-sm hover:bg-muted transition-colors">Cancel</button>
            <button type="submit" disabled={create.isPending} className="flex items-center gap-2 px-6 py-2.5 bg-[#c9a227] text-[#0a1628] font-semibold rounded text-sm hover:bg-[#d4af37] transition-colors disabled:opacity-60">
              <Save className="w-4 h-4" />
              {create.isPending ? "Creating..." : "Create Worker"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
