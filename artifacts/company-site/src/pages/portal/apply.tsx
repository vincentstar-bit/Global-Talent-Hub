import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useCreateLeaveRequest } from "@workspace/api-client-react";
import {
  Calendar, ChevronRight, Clock, CreditCard, CheckCircle2,
  Mail, ChevronLeft, AlertCircle
} from "lucide-react";

const inputCls = "w-full border border-border rounded-xl px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-[#c9a227]/50 focus:border-[#c9a227] placeholder-muted-foreground/50 transition-all";

function StepIndicator({ step }: { step: number }) {
  const steps = ["Select Leave", "Your Details", "Write Letter"];
  return (
    <div className="flex items-center gap-0 mb-8">
      {steps.map((label, i) => {
        const num = i + 1;
        const done = step > num;
        const active = step === num;
        return (
          <div key={label} className="flex items-center gap-0 flex-1 last:flex-none">
            <div className={`flex items-center gap-2 shrink-0 ${active ? "" : "opacity-60"}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                done ? "bg-[#c9a227] border-[#c9a227] text-[#0a1628]" :
                active ? "border-[#c9a227] text-[#c9a227] bg-[#c9a227]/10" :
                "border-border text-muted-foreground"
              }`}>
                {done ? <CheckCircle2 className="w-4 h-4" /> : num}
              </div>
              <span className={`text-xs font-semibold hidden sm:block ${active ? "text-foreground" : "text-muted-foreground"}`}>{label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-px mx-3 ${step > num ? "bg-[#c9a227]" : "bg-border"} transition-all`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function PortalApplyPage() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState(1);
  const [workerId, setWorkerId] = useState<number | null>(null);
  const [workerName, setWorkerName] = useState("");
  const [leaveTypes, setLeaveTypes] = useState<any[]>([]);
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const id = sessionStorage.getItem("portal_worker_id");
    const name = sessionStorage.getItem("portal_worker_name");
    const types = sessionStorage.getItem("portal_leave_types");
    if (!id) { navigate("/portal"); return; }
    setWorkerId(parseInt(id));
    setWorkerName(name || "");
    setLeaveTypes(types ? JSON.parse(types) : []);
  }, []);

  const createRequest = useCreateLeaveRequest({
    mutation: {
      onSuccess: (data) => {
        sessionStorage.setItem("portal_leave_request_id", String(data.id));
        sessionStorage.setItem("portal_selected_leave_type_id", String(selectedType));
        sessionStorage.setItem("portal_contact_email", email);
        navigate("/portal/letter");
      },
      onError: () => setError("Failed to submit your request. Please try again."),
    },
  });

  const selectedLeaveType = leaveTypes.find((lt) => lt.id === selectedType);
  const today = new Date().toISOString().split("T")[0];
  const leaveDays = startDate && endDate
    ? Math.max(0, Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000) + 1)
    : 0;

  const handleStep1Next = () => {
    if (!selectedType) return;
    setStep(2);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!workerId || !selectedType || !startDate || !endDate || !email) return;
    createRequest.mutate({
      data: { workerId, leaveTypeId: selectedType, startDate, endDate, reason },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="bg-[#0a1628] pt-28 pb-10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <button onClick={() => navigate(-1 as any)} className="flex items-center gap-1.5 text-white/50 hover:text-white text-sm mb-5 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-8 bg-[#c9a227]" />
            <span className="text-[#c9a227] text-xs tracking-widest uppercase font-medium">Worker Portal</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-1">Apply for Leave</h1>
          {workerName && <p className="text-white/50 text-sm">Applicant: <span className="text-white font-medium">{workerName}</span></p>}
        </div>
      </section>

      <section className="py-10 bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <StepIndicator step={step} />

          {/* ── Step 1: Select Leave Type ── */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h2 className="font-bold text-foreground text-lg mb-1">Select Leave Type</h2>
                <p className="text-muted-foreground text-sm">Choose the category that best describes your leave request.</p>
              </div>

              {leaveTypes.length === 0 ? (
                <div className="bg-card border border-border rounded-xl p-8 text-center">
                  <Calendar className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground text-sm">No leave types configured. Contact your HR department.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {leaveTypes.map((lt) => (
                    <button
                      type="button"
                      key={lt.id}
                      onClick={() => setSelectedType(lt.id)}
                      className={`w-full text-left border-2 rounded-2xl p-5 transition-all ${
                        selectedType === lt.id
                          ? "border-[#c9a227] bg-[#c9a227]/5 shadow-sm"
                          : "border-border hover:border-[#c9a227]/40 bg-card"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="font-bold text-foreground text-sm mb-1">{lt.name}</div>
                          {lt.description && <p className="text-xs text-muted-foreground leading-relaxed mb-3">{lt.description}</p>}
                          <div className="flex flex-wrap gap-3 text-xs">
                            <span className="flex items-center gap-1.5 text-muted-foreground bg-muted px-2.5 py-1 rounded-lg">
                              <Clock className="w-3 h-3" /> <strong className="text-foreground">{lt.maxDays}</strong> days max
                            </span>
                            {lt.requiresApproval && (
                              <span className="flex items-center gap-1.5 text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
                                Requires approval
                              </span>
                            )}
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                          selectedType === lt.id ? "border-[#c9a227] bg-[#c9a227]" : "border-border"
                        }`}>
                          {selectedType === lt.id && <div className="w-2 h-2 rounded-full bg-[#0a1628]" />}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              <button
                onClick={handleStep1Next}
                disabled={!selectedType}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#c9a227] text-[#0a1628] font-bold rounded-xl hover:bg-[#d4af37] transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm shadow-lg shadow-[#c9a227]/20"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ── Step 2: Contact Details + Dates ── */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Summary of selected leave */}
              {selectedLeaveType && (
                <div className="bg-[#c9a227]/5 border border-[#c9a227]/30 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-0.5">Selected Leave Type</p>
                    <p className="font-bold text-foreground">{selectedLeaveType.name}</p>
                    <p className="text-xs text-muted-foreground">Up to {selectedLeaveType.maxDays} days</p>
                  </div>
                  <button type="button" onClick={() => { setStep(1); window.scrollTo({ top: 0, left: 0, behavior: "instant" }); }} className="text-xs text-[#c9a227] hover:underline">Change</button>
                </div>
              )}

              {/* Email */}
              <div>
                <h2 className="font-bold text-foreground text-lg mb-1">Your Contact Details</h2>
                <p className="text-muted-foreground text-sm mb-4">So the company can notify you of any updates regarding your leave request.</p>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Email Address <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="your.email@example.com"
                    className={`${inputCls} pl-10`}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1.5">We will send approval/rejection notifications to this address.</p>
              </div>

              {/* Dates */}
              <div>
                <h2 className="font-bold text-foreground text-base mb-4">Leave Period</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Start Date <span className="text-red-500">*</span></label>
                    <input type="date" value={startDate} min={today} onChange={(e) => setStartDate(e.target.value)} required className={inputCls} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">End Date <span className="text-red-500">*</span></label>
                    <input type="date" value={endDate} min={startDate || today} onChange={(e) => setEndDate(e.target.value)} required className={inputCls} />
                  </div>
                </div>
                {leaveDays > 0 && (
                  <div className="mt-2 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#c9a227]" />
                    <span className="text-xs text-muted-foreground">
                      Duration: <strong className="text-foreground">{leaveDays} calendar day{leaveDays !== 1 ? "s" : ""}</strong>
                      {selectedLeaveType && leaveDays > selectedLeaveType.maxDays && (
                        <span className="text-red-500 ml-2">— exceeds the {selectedLeaveType.maxDays}-day limit</span>
                      )}
                    </span>
                  </div>
                )}
              </div>

              {/* Reason */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Brief Reason</label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={3}
                  placeholder="Briefly describe the reason for your leave request…"
                  className={`${inputCls} resize-none`}
                />
                <p className="text-xs text-muted-foreground mt-1.5">You will write a full formal letter in the next step.</p>
              </div>

              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => { setStep(1); window.scrollTo({ top: 0, left: 0, behavior: "instant" }); }}
                  className="flex items-center gap-2 px-4 py-3 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="submit"
                  disabled={!email || !startDate || !endDate || createRequest.isPending}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#c9a227] text-[#0a1628] font-bold rounded-xl hover:bg-[#d4af37] transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm shadow-lg shadow-[#c9a227]/20"
                >
                  {createRequest.isPending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#0a1628] border-t-transparent rounded-full animate-spin" />
                      Processing…
                    </>
                  ) : (
                    <>Continue to Write Letter <ChevronRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
