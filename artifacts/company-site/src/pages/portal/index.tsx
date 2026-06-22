import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import { useGetWorkerByToken, getGetWorkerByTokenQueryKey } from "@workspace/api-client-react";
import { useLocation } from "wouter";
import { Search, User, Briefcase, Calendar, DollarSign, Globe, Clock, ChevronRight, FileText } from "lucide-react";
import { differenceInDays, parseISO, addYears, format } from "date-fns";

function PaymentBadge({ status }: { status: string }) {
  const cls = status === "completed"
    ? "bg-green-100 text-green-800 border-green-200"
    : status === "half"
    ? "bg-yellow-100 text-yellow-800 border-yellow-200"
    : "bg-red-100 text-red-800 border-red-200";
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border capitalize ${cls}`}>
      {status === "half" ? "Partial Payment" : status}
    </span>
  );
}

function WorkerProfile({ token }: { token: string }) {
  const { data: worker, isLoading, error } = useGetWorkerByToken(token, {
    query: { queryKey: getGetWorkerByTokenQueryKey(token) }
  });
  const [, navigate] = useLocation();

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse mt-8">
        <div className="h-32 bg-muted rounded-lg" />
        <div className="h-24 bg-muted rounded-lg" />
        <div className="h-24 bg-muted rounded-lg" />
      </div>
    );
  }

  if (error || !worker) {
    return (
      <div className="mt-8 p-6 bg-destructive/10 border border-destructive/30 rounded-lg text-center">
        <div className="text-destructive font-semibold mb-1">Worker Not Found</div>
        <p className="text-sm text-muted-foreground">No worker record matches this ID or access token. Please verify the code and try again, or contact your HR department.</p>
      </div>
    );
  }

  const contractEndDate = parseISO(worker.contractEnd);
  const daysRemaining = differenceInDays(contractEndDate, new Date());

  let countryTimeLeft: string | null = null;
  if (worker.countryEntryDate && worker.countryStayYears) {
    const entryDate = parseISO(worker.countryEntryDate);
    const exitDate = addYears(entryDate, worker.countryStayYears);
    const daysLeft = differenceInDays(exitDate, new Date());
    countryTimeLeft = daysLeft > 0
      ? `${Math.floor(daysLeft / 365)} years, ${Math.floor((daysLeft % 365) / 30)} months remaining`
      : "Stay period has ended";
  }

  return (
    <div className="mt-8 space-y-6">
      {/* Worker header */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <div className="flex items-start gap-5">
          {worker.photoUrl ? (
            <img src={worker.photoUrl} alt={worker.firstName} className="w-20 h-20 rounded-full object-cover border-2 border-[#c9a227]/40" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-[#c9a227]/10 border-2 border-[#c9a227]/30 flex items-center justify-center">
              <User className="w-8 h-8 text-[#c9a227]" />
            </div>
          )}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold text-foreground">{worker.firstName} {worker.lastName}</h2>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                worker.status === "active" ? "bg-green-100 text-green-800 border-green-200"
                : worker.status === "suspended" ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                : "bg-red-100 text-red-800 border-red-200"
              } capitalize`}>{worker.status}</span>
            </div>
            <p className="text-[#c9a227] font-semibold">{worker.jobTitle}</p>
            <p className="text-muted-foreground text-sm">{worker.department}</p>
            {worker.hiredBy && (
              <p className="text-xs text-muted-foreground mt-1">Hired by: <span className="font-medium text-foreground">{worker.hiredBy}</span></p>
            )}
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground mb-1">Access Token</div>
            <code className="text-xs bg-muted px-2 py-1 rounded font-mono text-foreground">{worker.accessToken}</code>
          </div>
        </div>
      </div>

      {/* Contract details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-bold text-foreground flex items-center gap-2 mb-4">
            <Briefcase className="w-4 h-4 text-[#c9a227]" /> Contract Details
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Start Date</span>
              <span className="font-medium">{worker.contractStart}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">End Date</span>
              <span className="font-medium">{worker.contractEnd}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Days Remaining</span>
              <span className={`font-bold ${daysRemaining < 90 ? "text-destructive" : "text-green-600"}`}>
                {daysRemaining > 0 ? `${daysRemaining} days` : "Expired"}
              </span>
            </div>
            <div className="pt-3 border-t border-border">
              <div className="text-muted-foreground mb-1">Contract Deal</div>
              <div className="text-foreground font-medium leading-relaxed">{worker.contractDeal}</div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-bold text-foreground flex items-center gap-2 mb-4">
            <DollarSign className="w-4 h-4 text-[#c9a227]" /> Payment Status
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Status</span>
              <PaymentBadge status={worker.paymentStatus} />
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Contract Value</span>
              <span className="font-bold">${worker.paymentAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount Paid</span>
              <span className="font-bold text-green-600">${worker.paymentPaid.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Outstanding Balance</span>
              <span className="font-bold text-destructive">${(worker.paymentAmount - worker.paymentPaid).toLocaleString()}</span>
            </div>
            <div className="pt-2">
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-[#c9a227] h-2 rounded-full transition-all"
                  style={{ width: `${Math.min(100, (worker.paymentPaid / worker.paymentAmount) * 100)}%` }}
                />
              </div>
              <div className="text-xs text-muted-foreground mt-1 text-right">
                {Math.round((worker.paymentPaid / worker.paymentAmount) * 100)}% paid
              </div>
            </div>
          </div>
        </div>

        {worker.assignedCountry && (
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-bold text-foreground flex items-center gap-2 mb-4">
              <Globe className="w-4 h-4 text-[#c9a227]" /> Country Assignment
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Assigned Country</span>
                <span className="font-medium">{worker.assignedCountry}</span>
              </div>
              {worker.countryEntryDate && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date of Entry</span>
                  <span className="font-medium">{worker.countryEntryDate}</span>
                </div>
              )}
              {worker.countryStayYears && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Authorized Stay</span>
                  <span className="font-medium">{worker.countryStayYears} year{worker.countryStayYears !== 1 ? "s" : ""}</span>
                </div>
              )}
              {countryTimeLeft && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time Remaining</span>
                  <span className="font-medium text-[#c9a227]">{countryTimeLeft}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {worker.nationality && (
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-bold text-foreground flex items-center gap-2 mb-4">
              <User className="w-4 h-4 text-[#c9a227]" /> Personal Information
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Nationality</span>
                <span className="font-medium">{worker.nationality}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Leave Types */}
      {worker.leaveTypes && worker.leaveTypes.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-bold text-foreground flex items-center gap-2 mb-5">
            <Calendar className="w-4 h-4 text-[#c9a227]" /> Available Leave Entitlements
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {worker.leaveTypes.map((lt: any) => (
              <div key={lt.id} className="border border-border rounded-lg p-4 hover:border-[#c9a227]/40 transition-colors">
                <div className="font-semibold text-foreground text-sm mb-1">{lt.name}</div>
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{lt.description}</p>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Max Days: <span className="font-medium text-foreground">{lt.maxDays}</span></span>
                  <span className="text-muted-foreground">Amount: <span className="font-medium text-[#c9a227]">${lt.amount}</span></span>
                </div>
                {lt.requiresApproval && (
                  <p className="text-xs text-muted-foreground mt-2 italic">Requires approval</p>
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-border">
            <button
              onClick={() => {
                sessionStorage.setItem("portal_worker_id", String(worker.id));
                sessionStorage.setItem("portal_worker_name", `${worker.firstName} ${worker.lastName}`);
                sessionStorage.setItem("portal_leave_types", JSON.stringify(worker.leaveTypes));
                navigate("/portal/apply");
              }}
              className="flex items-center gap-2 px-6 py-3 bg-[#c9a227] text-[#0a1628] font-semibold rounded hover:bg-[#d4af37] transition-colors"
            >
              <FileText className="w-4 h-4" />
              Apply for Leave / Vacation
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PortalPage() {
  const [input, setInput] = useState("");
  const [token, setToken] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) setToken(input.trim().toUpperCase());
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
          <h1 className="text-5xl font-bold text-white mb-6">Employee Self-Service</h1>
          <p className="text-white/70 text-xl max-w-2xl">Enter your Worker ID or Access Token to view your contract details, payment status, country assignment, and leave entitlements.</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-foreground mb-2">Verify Your Identity</h2>
            <p className="text-muted-foreground text-sm mb-6">Your Worker ID / Access Token was provided to you by your HR department upon contract signing.</p>
            <form onSubmit={handleSearch} className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter Worker ID or Access Token (e.g. SGE-12345-67890)"
                className="flex-1 border border-border rounded-lg px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-[#c9a227] font-mono"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-[#c9a227] text-[#0a1628] font-semibold rounded-lg hover:bg-[#d4af37] transition-colors flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                Look Up
              </button>
            </form>
            <p className="text-xs text-muted-foreground mt-3">
              Your token is case-insensitive. Contact your HR department if you have not received your access token.
            </p>
          </div>

          {token && <WorkerProfile token={token} />}
        </div>
      </section>

      <Footer />
    </div>
  );
}
