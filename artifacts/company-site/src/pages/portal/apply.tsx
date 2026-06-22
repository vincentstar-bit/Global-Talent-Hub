import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useCreateLeaveRequest } from "@workspace/api-client-react";
import { Calendar, ChevronRight } from "lucide-react";

export default function PortalApplyPage() {
  const [, navigate] = useLocation();
  const [workerId, setWorkerId] = useState<number | null>(null);
  const [workerName, setWorkerName] = useState("");
  const [leaveTypes, setLeaveTypes] = useState<any[]>([]);
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

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
        navigate("/portal/letter");
      },
    },
  });

  const selectedLeaveType = leaveTypes.find((lt) => lt.id === selectedType);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workerId || !selectedType || !startDate || !endDate) return;
    createRequest.mutate({
      data: { workerId, leaveTypeId: selectedType, startDate, endDate, reason },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="bg-[#0a1628] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-[#c9a227]" />
            <span className="text-[#c9a227] text-xs tracking-widest uppercase font-medium">Worker Portal</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">Apply for Leave</h1>
          {workerName && <p className="text-white/60">Applicant: <span className="text-white font-medium">{workerName}</span></p>}
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Steps */}
          <div className="flex items-center gap-2 mb-8 text-xs text-muted-foreground">
            <span className="px-3 py-1 rounded-full bg-muted text-foreground font-medium">1. Verify Identity</span>
            <ChevronRight className="w-3 h-3" />
            <span className="px-3 py-1 rounded-full bg-[#c9a227] text-[#0a1628] font-medium">2. Select Leave</span>
            <ChevronRight className="w-3 h-3" />
            <span className="px-3 py-1 rounded-full bg-muted">3. Write Letter</span>
          </div>

          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-8 space-y-6">
            <div>
              <label className="text-sm font-semibold text-foreground block mb-3">Select Leave Type</label>
              {leaveTypes.length === 0 ? (
                <p className="text-muted-foreground text-sm">No leave types configured. Contact your HR department.</p>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {leaveTypes.map((lt) => (
                    <button
                      type="button"
                      key={lt.id}
                      onClick={() => setSelectedType(lt.id)}
                      className={`text-left border rounded-lg p-4 transition-colors ${
                        selectedType === lt.id
                          ? "border-[#c9a227] bg-[#c9a227]/5"
                          : "border-border hover:border-[#c9a227]/40"
                      }`}
                    >
                      <div className="font-semibold text-foreground text-sm">{lt.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{lt.description}</div>
                      <div className="flex gap-4 mt-2 text-xs">
                        <span className="text-muted-foreground">Max: <strong className="text-foreground">{lt.maxDays} days</strong></span>
                        <span className="text-muted-foreground">Compensation: <strong className="text-[#c9a227]">${lt.amount}</strong></span>
                        {lt.requiresApproval && <span className="text-muted-foreground italic">Requires approval</span>}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-foreground block mb-1.5">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  className="w-full border border-border rounded px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-[#c9a227]"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground block mb-1.5">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                  min={startDate}
                  className="w-full border border-border rounded px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-[#c9a227]"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground block mb-1.5">Reason (Brief)</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                placeholder="Briefly describe the reason for your leave request..."
                className="w-full border border-border rounded px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-[#c9a227] resize-none"
              />
              <p className="text-xs text-muted-foreground mt-1">You will write a formal letter to your supervisor on the next step.</p>
            </div>

            <button
              type="submit"
              disabled={!selectedType || !startDate || !endDate || createRequest.isPending}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#c9a227] text-[#0a1628] font-semibold rounded hover:bg-[#d4af37] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createRequest.isPending ? "Processing..." : <>Continue to Write Letter <ChevronRight className="w-4 h-4" /></>}
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}
