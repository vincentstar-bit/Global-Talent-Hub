import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useGetWorkerByToken, getGetWorkerByTokenQueryKey } from "@workspace/api-client-react";
import { useParams, useLocation } from "wouter";
import {
  User, Briefcase, DollarSign, Globe, Calendar,
  ChevronLeft, FileText, Phone, Mail, Shield,
  Clock, MapPin, Hash, BadgeCheck, AlertTriangle,
  Building2, CreditCard
} from "lucide-react";
import { differenceInDays, parseISO, addYears, format } from "date-fns";

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    active: "bg-emerald-100 text-emerald-800 border-emerald-200",
    suspended: "bg-amber-100 text-amber-800 border-amber-200",
    terminated: "bg-red-100 text-red-800 border-red-200",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border capitalize ${map[status] ?? "bg-muted text-muted-foreground border-border"}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === "active" ? "bg-emerald-500" : status === "suspended" ? "bg-amber-500" : "bg-red-500"}`} />
      {status}
    </span>
  );
}

function PaymentBadge({ status }: { status: string }) {
  const map: Record<string, { cls: string; label: string }> = {
    completed: { cls: "bg-emerald-100 text-emerald-800 border-emerald-200", label: "Fully Paid" },
    half: { cls: "bg-amber-100 text-amber-800 border-amber-200", label: "Partial Payment" },
    pending: { cls: "bg-red-100 text-red-800 border-red-200", label: "Payment Pending" },
  };
  const { cls, label } = map[status] ?? { cls: "bg-muted text-muted-foreground border-border", label: status };
  return <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${cls}`}>{label}</span>;
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-border/50 last:border-0">
      <span className="text-sm text-muted-foreground shrink-0">{label}</span>
      <span className="text-sm font-medium text-foreground text-right">{value}</span>
    </div>
  );
}

function Card({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-border bg-muted/30">
        <Icon className="w-4 h-4 text-[#c9a227]" />
        <h3 className="font-bold text-foreground text-sm">{title}</h3>
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  );
}

export default function WorkerProfilePage() {
  const params = useParams<{ token: string }>();
  const [, navigate] = useLocation();
  const token = params.token?.toUpperCase() ?? "";

  const { data: worker, isLoading, error } = useGetWorkerByToken(token, {
    query: { queryKey: getGetWorkerByTokenQueryKey(token) }
  });

  const handleApplyLeave = () => {
    if (!worker) return;
    sessionStorage.setItem("portal_worker_id", String(worker.id));
    sessionStorage.setItem("portal_worker_name", `${worker.firstName} ${worker.lastName}`);
    sessionStorage.setItem("portal_worker_token", token);
    sessionStorage.setItem("portal_leave_types", JSON.stringify(worker.leaveTypes));
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    navigate("/portal/apply");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-3 border-[#c9a227] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground text-sm">Loading profile…</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !worker) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">Worker Not Found</h2>
            <p className="text-muted-foreground text-sm mb-6">No record matches this ID or access token. Please verify the code with your HR department.</p>
            <button onClick={() => navigate("/portal")} className="px-5 py-2.5 bg-[#c9a227] text-[#0a1628] font-semibold rounded-xl hover:bg-[#d4af37] transition-colors">
              Back to Portal
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const contractEnd = parseISO(worker.contractEnd);
  const daysRemaining = differenceInDays(contractEnd, new Date());
  const contractStart = parseISO(worker.contractStart);
  const totalDays = differenceInDays(contractEnd, contractStart);
  const elapsedDays = totalDays - daysRemaining;
  const contractProgress = Math.min(100, Math.max(0, (elapsedDays / totalDays) * 100));
  const payProgress = worker.paymentAmount > 0
    ? Math.min(100, (worker.paymentPaid / worker.paymentAmount) * 100)
    : 0;

  let countryTimeLeft: string | null = null;
  if (worker.countryEntryDate && worker.countryStayYears) {
    const exitDate = addYears(parseISO(worker.countryEntryDate), worker.countryStayYears);
    const daysLeft = differenceInDays(exitDate, new Date());
    countryTimeLeft = daysLeft > 0
      ? `${Math.floor(daysLeft / 365)} yr ${Math.floor((daysLeft % 365) / 30)} mo remaining`
      : "Stay period has ended";
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero banner */}
      <div className="bg-[#0a1628] pt-28 pb-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate("/portal")}
            className="flex items-center gap-1.5 text-white/50 hover:text-white text-sm mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Portal
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 pb-0">
            {/* Avatar */}
            <div className="relative shrink-0">
              {worker.photoUrl ? (
                <img
                  src={worker.photoUrl}
                  alt={worker.firstName}
                  className="w-28 h-28 rounded-2xl object-cover border-4 border-white/20 shadow-2xl"
                />
              ) : (
                <div className="w-28 h-28 rounded-2xl bg-[#c9a227]/15 border-4 border-white/10 flex items-center justify-center shadow-2xl">
                  <User className="w-12 h-12 text-[#c9a227]" />
                </div>
              )}
              {worker.status === "active" && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#0a1628]" />
              )}
            </div>

            {/* Identity */}
            <div className="flex-1 pb-6">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold text-white">{worker.firstName} {worker.lastName}</h1>
                <StatusBadge status={worker.status} />
              </div>
              <p className="text-[#c9a227] font-semibold text-lg">{worker.jobTitle}</p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-white/50 text-sm">
                <span className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" />{worker.department}</span>
                {worker.assignedCountry && <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{worker.assignedCountry}</span>}
                {worker.nationality && <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" />{worker.nationality}</span>}
              </div>
            </div>
          </div>

          {/* Token strip */}
          <div className="border-t border-white/10 flex items-center justify-between py-3 mt-2">
            <div className="flex items-center gap-2 text-white/40 text-xs">
              <Hash className="w-3.5 h-3.5" />
              <span>Access Token:</span>
              <code className="text-white/70 font-mono">{worker.accessToken}</code>
            </div>
            {worker.hiredBy && (
              <span className="text-white/40 text-xs">Hired by <span className="text-white/60">{worker.hiredBy}</span></span>
            )}
          </div>
        </div>
      </div>

      {/* KPI strip */}
      <div className="bg-[#07101e] border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
            {[
              {
                label: "Contract Remaining",
                value: daysRemaining > 0 ? `${daysRemaining} days` : "Expired",
                sub: `Until ${format(contractEnd, "MMM d, yyyy")}`,
                urgent: daysRemaining < 90 && daysRemaining > 0,
                expired: daysRemaining <= 0,
              },
              {
                label: "Contract Progress",
                value: `${Math.round(contractProgress)}%`,
                sub: `${Math.round(elapsedDays)} of ${totalDays} days`,
                urgent: false,
                expired: false,
              },
              {
                label: "Payment Progress",
                value: `${Math.round(payProgress)}%`,
                sub: `$${worker.paymentPaid.toLocaleString()} paid`,
                urgent: false,
                expired: false,
              },
              {
                label: "Leave Types",
                value: worker.leaveTypes?.length ?? 0,
                sub: "Available entitlements",
                urgent: false,
                expired: false,
              },
            ].map((kpi) => (
              <div key={kpi.label} className="px-5 py-4 text-center">
                <div className={`text-xl font-bold ${kpi.expired ? "text-red-400" : kpi.urgent ? "text-amber-400" : "text-white"}`}>
                  {kpi.value}
                </div>
                <div className="text-[10px] text-white/50 mt-0.5">{kpi.label}</div>
                <div className="text-[10px] text-white/30">{kpi.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Contract Details */}
          <Card title="Contract Details" icon={Briefcase}>
            <InfoRow label="Start Date" value={format(contractStart, "MMMM d, yyyy")} />
            <InfoRow label="End Date" value={format(contractEnd, "MMMM d, yyyy")} />
            <InfoRow
              label="Days Remaining"
              value={
                <span className={daysRemaining <= 0 ? "text-red-500 font-bold" : daysRemaining < 90 ? "text-amber-500 font-bold" : "text-emerald-600 font-bold"}>
                  {daysRemaining > 0 ? `${daysRemaining} days` : "Contract Expired"}
                </span>
              }
            />
            <div className="mt-3">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Progress</span><span>{Math.round(contractProgress)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${contractProgress > 90 ? "bg-red-500" : contractProgress > 70 ? "bg-amber-500" : "bg-[#c9a227]"}`}
                  style={{ width: `${contractProgress}%` }}
                />
              </div>
            </div>
            {worker.contractDeal && (
              <div className="mt-4 pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground mb-1.5 uppercase tracking-wider font-semibold">Contract Terms</p>
                <p className="text-sm text-foreground leading-relaxed">{worker.contractDeal}</p>
              </div>
            )}
          </Card>

          {/* Payment */}
          <Card title="Payment Status" icon={DollarSign}>
            <InfoRow label="Status" value={<PaymentBadge status={worker.paymentStatus} />} />
            <InfoRow
              label="Total Contract Value"
              value={<span className="font-bold">${worker.paymentAmount.toLocaleString()}</span>}
            />
            <InfoRow
              label="Amount Paid"
              value={<span className="text-emerald-600 font-bold">${worker.paymentPaid.toLocaleString()}</span>}
            />
            <InfoRow
              label="Outstanding Balance"
              value={
                <span className={`font-bold ${worker.paymentAmount - worker.paymentPaid > 0 ? "text-red-500" : "text-emerald-600"}`}>
                  ${Math.max(0, worker.paymentAmount - worker.paymentPaid).toLocaleString()}
                </span>
              }
            />
            <div className="mt-3">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Payment progress</span><span>{Math.round(payProgress)}% paid</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div
                  className="bg-[#c9a227] h-3 rounded-full transition-all"
                  style={{ width: `${payProgress}%` }}
                />
              </div>
            </div>
          </Card>

          {/* Personal Info */}
          <Card title="Personal Information" icon={User}>
            {worker.nationality && <InfoRow label="Nationality" value={worker.nationality} />}
            {worker.passportNumber && <InfoRow label="Passport Number" value={<code className="text-xs bg-muted px-2 py-0.5 rounded font-mono">{worker.passportNumber}</code>} />}
            {worker.email && <InfoRow label="Email" value={<span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-muted-foreground" />{worker.email}</span>} />}
            {worker.phone && <InfoRow label="Phone" value={<span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-muted-foreground" />{worker.phone}</span>} />}
            {!worker.nationality && !worker.email && !worker.phone && (
              <p className="text-sm text-muted-foreground py-2">Personal details are not disclosed in this view.</p>
            )}
          </Card>

          {/* Country Assignment */}
          {worker.assignedCountry && (
            <Card title="Country Assignment" icon={Globe}>
              <InfoRow label="Assigned Country" value={<span className="font-bold">{worker.assignedCountry}</span>} />
              {worker.countryEntryDate && (
                <InfoRow label="Date of Entry" value={format(parseISO(worker.countryEntryDate), "MMMM d, yyyy")} />
              )}
              {worker.countryStayYears && (
                <InfoRow label="Authorized Stay" value={`${worker.countryStayYears} year${worker.countryStayYears !== 1 ? "s" : ""}`} />
              )}
              {countryTimeLeft && (
                <InfoRow
                  label="Time Remaining"
                  value={<span className="text-[#c9a227] font-semibold">{countryTimeLeft}</span>}
                />
              )}
              {worker.countryEntryDate && worker.countryStayYears && (
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Shield className="w-3.5 h-3.5 text-[#c9a227]" />
                    Valid authorization under SinoGlobal international deployment policy
                  </div>
                </div>
              )}
            </Card>
          )}
        </div>

        {/* Leave Entitlements */}
        {worker.leaveTypes && worker.leaveTypes.length > 0 && (
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-muted/30">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-[#c9a227]" />
                <h3 className="font-bold text-foreground text-sm">Available Leave Entitlements</h3>
              </div>
              <span className="text-xs text-muted-foreground">{worker.leaveTypes.length} type{worker.leaveTypes.length !== 1 ? "s" : ""} available</span>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {worker.leaveTypes.map((lt: any) => (
                  <div key={lt.id} className="border border-border rounded-xl p-4 hover:border-[#c9a227]/40 hover:bg-muted/20 transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <div className="font-bold text-foreground text-sm">{lt.name}</div>
                      {lt.requiresApproval && (
                        <span className="text-[9px] uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded font-semibold">Approval</span>
                      )}
                    </div>
                    {lt.description && <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{lt.description}</p>}
                    <div className="flex items-center gap-3 text-xs">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span className="font-semibold text-foreground">{lt.maxDays}</span> days max
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <CreditCard className="w-3 h-3" />
                        <span className="font-semibold text-[#c9a227]">${lt.amount}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-foreground mb-0.5">Ready to apply for leave?</p>
                  <p className="text-xs text-muted-foreground">Select a leave type and submit a formal letter for approval.</p>
                </div>
                <button
                  onClick={handleApplyLeave}
                  className="flex items-center gap-2 px-6 py-3 bg-[#c9a227] text-[#0a1628] font-bold rounded-xl hover:bg-[#d4af37] transition-colors text-sm shrink-0 shadow-lg shadow-[#c9a227]/20"
                >
                  <FileText className="w-4 h-4" />
                  Apply for Leave
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Verification footer */}
        <div className="bg-muted/40 border border-border rounded-2xl p-5 flex items-start gap-4">
          <BadgeCheck className="w-8 h-8 text-[#c9a227] shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-foreground text-sm mb-1">Verified SinoGlobal Employee Record</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              This profile is authenticated via a unique access token issued by SinoGlobal Enterprise Co., Ltd. HR department.
              If any information appears incorrect, please contact your HR representative immediately.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
