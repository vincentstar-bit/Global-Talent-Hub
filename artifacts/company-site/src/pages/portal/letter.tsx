import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useCreateLeaveLetter } from "@workspace/api-client-react";
import { CheckCircle, ChevronRight } from "lucide-react";

const RECIPIENT_TITLES = ["Supervisor", "HR Manager", "Managing Director", "Department Head", "Operations Manager"];

export default function PortalLetterPage() {
  const [, navigate] = useLocation();
  const [workerId, setWorkerId] = useState<number | null>(null);
  const [leaveTypeId, setLeaveTypeId] = useState<number | null>(null);
  const [workerName, setWorkerName] = useState("");
  const [recipient, setRecipient] = useState("Supervisor");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const id = sessionStorage.getItem("portal_worker_id");
    const typeId = sessionStorage.getItem("portal_selected_leave_type_id");
    const name = sessionStorage.getItem("portal_worker_name");
    if (!id) { navigate("/portal"); return; }
    setWorkerId(parseInt(id));
    setLeaveTypeId(typeId ? parseInt(typeId) : null);
    setWorkerName(name || "");
    setSubject(`Formal Leave Application — ${name || "Employee"}`);
    setBody(`Dear ${recipient},\n\nI am writing to formally request leave from my duties at SinoGlobal Enterprise Co., Ltd.\n\nI have submitted a leave request through the Worker Portal and I am attaching this letter to provide formal notice to you as my ${recipient.toLowerCase()}.\n\nI respectfully request your approval and will ensure that all pending responsibilities are properly handed over or completed prior to my leave commencement.\n\nThank you for your consideration.\n\nYours sincerely,\n${name || "[Employee Name]"}`);
  }, []);

  useEffect(() => {
    if (workerName) {
      setBody((prev) => {
        const lines = prev.split("\n");
        lines[0] = `Dear ${recipient},`;
        lines[4] = `I respectfully request your approval and will ensure that all pending responsibilities are properly handed over or completed prior to my leave commencement.`;
        return lines.join("\n");
      });
    }
  }, [recipient]);

  const createLetter = useCreateLeaveLetter({
    mutation: {
      onSuccess: () => setSubmitted(true),
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workerId || !leaveTypeId) return;
    createLetter.mutate({
      data: { workerId, leaveTypeId, subject, body, recipientTitle: recipient },
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4 py-32">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 rounded-full bg-green-100 border-2 border-green-200 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Letter Submitted Successfully</h2>
            <p className="text-muted-foreground mb-2">Your formal leave letter has been submitted for review by your {recipient}.</p>
            <p className="text-muted-foreground text-sm mb-8">You will receive a response through your HR department. Response times may vary depending on workload and the nature of your request.</p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => { navigate("/portal"); sessionStorage.clear(); }}
                className="px-6 py-3 bg-[#c9a227] text-[#0a1628] font-semibold rounded hover:bg-[#d4af37] transition-colors"
              >
                Return to Portal
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="bg-[#0a1628] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-[#c9a227]" />
            <span className="text-[#c9a227] text-xs tracking-widest uppercase font-medium">Worker Portal</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">Write Your Leave Letter</h1>
          <p className="text-white/60">Compose a formal letter to submit alongside your leave request for supervisor review.</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Steps */}
          <div className="flex items-center gap-2 mb-8 text-xs text-muted-foreground">
            <span className="px-3 py-1 rounded-full bg-muted text-foreground font-medium">1. Verify Identity</span>
            <ChevronRight className="w-3 h-3" />
            <span className="px-3 py-1 rounded-full bg-muted text-foreground font-medium">2. Select Leave</span>
            <ChevronRight className="w-3 h-3" />
            <span className="px-3 py-1 rounded-full bg-[#c9a227] text-[#0a1628] font-medium">3. Write Letter</span>
          </div>

          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-8 space-y-6">
            <div>
              <label className="text-sm font-semibold text-foreground block mb-1.5">Addressed To</label>
              <select
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full border border-border rounded px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-[#c9a227]"
              >
                {RECIPIENT_TITLES.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-foreground block mb-1.5">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="w-full border border-border rounded px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-[#c9a227]"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-foreground block mb-1.5">Letter Body</label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={14}
                required
                className="w-full border border-border rounded px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-[#c9a227] font-mono resize-none leading-relaxed"
              />
              <p className="text-xs text-muted-foreground mt-1">Write your formal letter above. The template has been pre-filled but you may edit it to suit your specific situation.</p>
            </div>
            <button
              type="submit"
              disabled={!subject || !body || createLetter.isPending}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#c9a227] text-[#0a1628] font-semibold rounded hover:bg-[#d4af37] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createLetter.isPending ? "Submitting..." : <><CheckCircle className="w-4 h-4" /> Submit Letter for Review</>}
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}
