import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import { useLocation } from "wouter";
import {
  Mail, Search, CheckCircle2, XCircle, Clock,
  Calendar, ChevronLeft, FileText, AlertCircle,
  MessageSquare, ArrowRight
} from "lucide-react";

const BASE = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";

function StatusIcon({ status }: { status: string }) {
  if (status === "approved") return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
  if (status === "rejected") return <XCircle className="w-5 h-5 text-red-500" />;
  return <Clock className="w-5 h-5 text-amber-500" />;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    approved: "bg-emerald-100 text-emerald-800 border-emerald-200",
    rejected: "bg-red-100 text-red-800 border-red-200",
    pending:  "bg-amber-100 text-amber-800 border-amber-200",
  };
  const labels: Record<string, string> = {
    approved: "Approved",
    rejected: "Declined",
    pending:  "Pending Review",
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border capitalize ${map[status] ?? "bg-muted text-muted-foreground border-border"}`}>
      {labels[status] ?? status}
    </span>
  );
}

function RequestCard({ req }: { req: any }) {
  const isApproved = req.status === "approved";
  const isRejected = req.status === "rejected";
  const isPending  = req.status === "pending";

  return (
    <div className={`bg-card border rounded-2xl overflow-hidden transition-all ${
      isApproved ? "border-emerald-200" :
      isRejected ? "border-red-200" :
      "border-border"
    }`}>
      {/* Header */}
      <div className={`flex items-center justify-between px-5 py-4 border-b ${
        isApproved ? "bg-emerald-50 border-emerald-100" :
        isRejected ? "bg-red-50 border-red-100" :
        "bg-muted/30 border-border"
      }`}>
        <div className="flex items-center gap-3">
          <StatusIcon status={req.status} />
          <div>
            <p className="font-bold text-foreground text-sm">{req.leaveTypeName ?? "Leave Request"}</p>
            <p className="text-xs text-muted-foreground">Reference #{req.id}</p>
          </div>
        </div>
        <StatusBadge status={req.status} />
      </div>

      {/* Body */}
      <div className="px-5 py-4 space-y-3">
        {/* Dates */}
        <div className="flex items-center gap-2 text-sm text-foreground">
          <Calendar className="w-4 h-4 text-[#c9a227] shrink-0" />
          <span className="font-medium">{req.startDate}</span>
          <ArrowRight className="w-3 h-3 text-muted-foreground" />
          <span className="font-medium">{req.endDate}</span>
        </div>

        {/* Submitted date */}
        <div className="text-xs text-muted-foreground">
          Submitted: {req.createdAt ? new Date(req.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "—"}
        </div>

        {/* Reason */}
        {req.reason && (
          <div className="text-sm text-muted-foreground leading-relaxed bg-muted/30 rounded-xl px-3 py-2">
            {req.reason}
          </div>
        )}

        {/* Admin decision / receipt */}
        {(isApproved || isRejected) && (
          <div className={`rounded-xl border px-4 py-3 space-y-1 ${
            isApproved ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"
          }`}>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-1.5">
              <MessageSquare className={`w-3.5 h-3.5 ${isApproved ? "text-emerald-600" : "text-red-600"}`} />
              <span className={isApproved ? "text-emerald-700" : "text-red-700"}>
                {isApproved ? "Approval Receipt" : "Declined Notice"}
              </span>
            </div>
            {req.adminNote ? (
              <p className={`text-sm leading-relaxed ${isApproved ? "text-emerald-800" : "text-red-800"}`}>
                {req.adminNote}
              </p>
            ) : (
              <p className={`text-sm italic ${isApproved ? "text-emerald-600" : "text-red-600"}`}>
                {isApproved
                  ? "Your leave has been approved. No additional note was added."
                  : "Your request was declined. Contact HR for more information."}
              </p>
            )}
          </div>
        )}

        {/* Pending message */}
        {isPending && (
          <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5 text-xs text-amber-700">
            <Clock className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            Your request is currently under review by the HR department.
          </div>
        )}
      </div>
    </div>
  );
}

export default function PortalReviewPage() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState(() => sessionStorage.getItem("portal_contact_email") ?? "");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError("");
    setSearched(false);
    try {
      const res = await fetch(`${BASE}/api/leave-requests/by-email/${encodeURIComponent(email.trim().toLowerCase())}`);
      if (res.status === 404) {
        setRequests([]);
        setError("No leave requests found for this email address. Make sure you use the same email you submitted with.");
      } else if (!res.ok) {
        setError("Something went wrong. Please try again.");
      } else {
        const data = await res.json();
        setRequests(data);
        setSubmittedEmail(email.trim());
      }
    } catch {
      setError("Could not connect to the server. Please try again.");
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  const pending  = requests.filter((r) => r.status === "pending");
  const approved = requests.filter((r) => r.status === "approved");
  const rejected = requests.filter((r) => r.status === "rejected");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#0a1628] pt-28 pb-10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate("/portal")}
            className="flex items-center gap-1.5 text-white/50 hover:text-white text-sm mb-5 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Portal
          </button>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-8 bg-[#c9a227]" />
            <span className="text-[#c9a227] text-xs tracking-widest uppercase font-medium">Worker Portal</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Check Leave Request Status</h1>
          <p className="text-white/50 text-sm">Enter the email address you used when submitting your leave request.</p>
        </div>
      </section>

      <div className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Email search form */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
                Your Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your.email@example.com"
                  className="w-full border border-border rounded-xl pl-10 pr-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-[#c9a227]/50 focus:border-[#c9a227] transition-all"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">Use the same email you entered when you applied for leave.</p>
            </div>
            <button
              type="submit"
              disabled={loading || !email.trim()}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#c9a227] text-[#0a1628] font-bold rounded-xl hover:bg-[#d4af37] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-lg shadow-[#c9a227]/20"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#0a1628] border-t-transparent rounded-full animate-spin" />
                  Searching…
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" /> Check My Requests
                </>
              )}
            </button>
          </form>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            {error}
          </div>
        )}

        {/* Results */}
        {!error && searched && requests.length > 0 && (
          <div className="space-y-4">
            {/* Summary bar */}
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-foreground">
                {requests.length} request{requests.length !== 1 ? "s" : ""} found
              </p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                {approved.length > 0 && <span className="flex items-center gap-1 text-emerald-600"><CheckCircle2 className="w-3.5 h-3.5" />{approved.length} approved</span>}
                {rejected.length > 0 && <span className="flex items-center gap-1 text-red-500"><XCircle className="w-3.5 h-3.5" />{rejected.length} declined</span>}
                {pending.length > 0 && <span className="flex items-center gap-1 text-amber-600"><Clock className="w-3.5 h-3.5" />{pending.length} pending</span>}
              </div>
            </div>

            {/* Cards */}
            <div className="space-y-3">
              {requests.map((req) => <RequestCard key={req.id} req={req} />)}
            </div>
          </div>
        )}

        {/* Empty state after search */}
        {!error && searched && requests.length === 0 && !error && (
          <div className="text-center py-12">
            <FileText className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-foreground font-semibold mb-1">No requests found</p>
            <p className="text-muted-foreground text-sm">Try the email address you used when applying for leave.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
