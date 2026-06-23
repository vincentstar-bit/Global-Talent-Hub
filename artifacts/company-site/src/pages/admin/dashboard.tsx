import { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { useGetDashboardStats, getGetDashboardStatsQueryKey } from "@workspace/api-client-react";
import { Link } from "wouter";
import {
  Users, UserCheck, Clock, FileText, TrendingUp, Plus,
  KeyRound, X, Eye, EyeOff, CheckCircle2, AlertCircle,
  Lock, ShieldCheck, ArrowRight
} from "lucide-react";

/* ─── Reset Password Modal ─── */
function ResetPasswordModal({ onClose }: { onClose: () => void }) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const validate = () => {
    if (!current) return "Current password is required.";
    if (next.length < 8) return "New password must be at least 8 characters.";
    if (next !== confirm) return "New passwords do not match.";
    if (next === current) return "New password must be different from the current one.";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setError("");
    setLoading(true);
    try {
      const base = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";
      const res = await fetch(`${base}/api/auth/admin/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ currentPassword: current, newPassword: next }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to reset password.");
      setSuccess(true);
      setTimeout(onClose, 2200);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const strength = (() => {
    if (!next) return 0;
    let s = 0;
    if (next.length >= 8) s++;
    if (/[A-Z]/.test(next)) s++;
    if (/[0-9]/.test(next)) s++;
    if (/[^A-Za-z0-9]/.test(next)) s++;
    return s;
  })();

  const strengthLabel = ["", "Weak", "Fair", "Strong", "Very Strong"][strength];
  const strengthColor = ["", "bg-red-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"][strength];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#c9a227]/10 border border-[#c9a227]/20 flex items-center justify-center shrink-0">
              <KeyRound className="w-5 h-5 text-[#c9a227]" />
            </div>
            <div>
              <div className="font-bold text-foreground text-sm">Reset Password</div>
              <div className="text-muted-foreground text-xs">Update your admin password</div>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 py-5">
          {success ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-7 h-7 text-green-600" />
              </div>
              <div className="font-bold text-foreground text-base mb-1">Password Updated</div>
              <p className="text-muted-foreground text-sm">Your password has been changed successfully.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: "Current Password", value: current, set: setCurrent, show: showCurrent, toggle: () => setShowCurrent(!showCurrent), ac: "current-password" },
                { label: "New Password", value: next, set: setNext, show: showNext, toggle: () => setShowNext(!showNext), ac: "new-password" },
                { label: "Confirm New Password", value: confirm, set: setConfirm, show: showConfirm, toggle: () => setShowConfirm(!showConfirm), ac: "new-password" },
              ].map(({ label, value, set, show, toggle, ac }) => (
                <div key={label}>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">{label}</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type={show ? "text" : "password"}
                      value={value}
                      onChange={(e) => set(e.target.value)}
                      required
                      autoComplete={ac}
                      placeholder="••••••••"
                      className={`w-full bg-muted/50 border rounded-xl pl-9 pr-10 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a227]/40 focus:border-[#c9a227]/60 placeholder-muted-foreground/40 transition-all ${
                        label === "Confirm New Password" && value && value !== next ? "border-red-400" : "border-border"
                      }`}
                    />
                    <button type="button" onClick={toggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                      {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {label === "New Password" && next && (
                    <div className="mt-1.5">
                      <div className="flex gap-1 mb-0.5">
                        {[1,2,3,4].map(i => <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= strength ? strengthColor : "bg-muted"}`} />)}
                      </div>
                      <p className={`text-xs font-medium ${strength <= 1 ? "text-red-500" : strength === 2 ? "text-yellow-500" : strength === 3 ? "text-blue-500" : "text-green-500"}`}>{strengthLabel}</p>
                    </div>
                  )}
                  {label === "Confirm New Password" && value && value !== next && (
                    <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                  )}
                </div>
              ))}

              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              <div className="flex gap-3 pt-1">
                <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors">Cancel</button>
                <button type="submit" disabled={loading} className="flex-1 py-2.5 bg-[#c9a227] text-[#0a1628] font-bold rounded-xl text-sm hover:bg-[#d4af37] transition-colors disabled:opacity-60">
                  {loading ? "Updating…" : "Update Password"}
                </button>
              </div>
            </form>
          )}
        </div>

        {!success && (
          <div className="px-6 pb-4 flex items-center gap-2 text-muted-foreground">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <p className="text-xs">Takes effect immediately for all future logins.</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Dashboard ─── */
export default function AdminDashboardPage() {
  const [showReset, setShowReset] = useState(false);
  const { data: stats, isLoading } = useGetDashboardStats({ query: { queryKey: getGetDashboardStatsQueryKey() } });

  const statCards = [
    {
      label: "Total Workers",
      value: stats?.totalWorkers ?? 0,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
    },
    {
      label: "Active Workers",
      value: stats?.activeWorkers ?? 0,
      icon: UserCheck,
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-100",
    },
    {
      label: "Pending Leaves",
      value: stats?.pendingLeaveRequests ?? 0,
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-100",
    },
    {
      label: "Total Leaves",
      value: stats?.totalLeaveRequests ?? 0,
      icon: FileText,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-100",
    },
  ];

  return (
    <AdminLayout>
      {showReset && <ResetPasswordModal onClose={() => setShowReset(false)} />}

      <div className="space-y-6 max-w-7xl mx-auto">

        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground text-xs lg:text-sm mt-0.5">SinoGlobal Enterprise — Administration Overview</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowReset(true)}
              className="flex items-center gap-1.5 px-3 py-2 border border-border text-foreground font-medium rounded-lg text-xs lg:text-sm hover:border-[#c9a227]/50 hover:text-[#c9a227] transition-colors"
            >
              <KeyRound className="w-3.5 h-3.5 lg:w-4 lg:h-4 shrink-0" />
              <span>Reset Password</span>
            </button>
            <Link
              href="/admin/workers/new"
              className="flex items-center gap-1.5 px-3 py-2 bg-[#c9a227] text-[#0a1628] font-semibold rounded-lg text-xs lg:text-sm hover:bg-[#d4af37] transition-colors"
            >
              <Plus className="w-3.5 h-3.5 lg:w-4 lg:h-4 shrink-0" />
              <span>Add Worker</span>
            </Link>
          </div>
        </div>

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {isLoading
            ? [1,2,3,4].map(i => <div key={i} className="bg-card border border-border rounded-xl p-4 animate-pulse h-24 lg:h-28" />)
            : statCards.map((card) => (
              <div key={card.label} className={`bg-card border ${card.border} rounded-xl p-4 lg:p-5`}>
                <div className={`w-9 h-9 rounded-lg ${card.bg} flex items-center justify-center mb-3`}>
                  <card.icon className={`w-5 h-5 ${card.color}`} />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-foreground leading-none mb-1">{card.value}</div>
                <div className="text-xs text-muted-foreground leading-tight">{card.label}</div>
              </div>
            ))
          }
        </div>

        {/* ── Charts Row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Workers by department */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-bold text-foreground text-sm mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#c9a227]" /> Workers by Department
            </h3>
            {stats && stats.workersByDepartment.length > 0 ? (
              <div className="space-y-3">
                {stats.workersByDepartment.sort((a, b) => b.count - a.count).map((dept) => (
                  <div key={dept.department}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-foreground font-medium truncate pr-2">{dept.department}</span>
                      <span className="text-muted-foreground shrink-0">{dept.count}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div className="bg-[#c9a227] h-1.5 rounded-full transition-all" style={{ width: `${(dept.count / (stats.totalWorkers || 1)) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">No department data yet</p>
                <Link href="/admin/workers/new" className="text-xs text-[#c9a227] hover:underline mt-1 block">Add workers →</Link>
              </div>
            )}
          </div>

          {/* Leave requests by status */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-bold text-foreground text-sm mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#c9a227]" /> Leave Requests by Status
            </h3>
            {stats && stats.leaveRequestsByStatus.length > 0 ? (
              <div className="space-y-3">
                {stats.leaveRequestsByStatus.map((s) => (
                  <div key={s.status} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                        s.status === "approved" ? "bg-green-500"
                        : s.status === "pending" ? "bg-yellow-500"
                        : "bg-red-500"
                      }`} />
                      <span className="text-sm capitalize text-foreground font-medium">{s.status}</span>
                    </div>
                    <span className="font-bold text-foreground text-lg">{s.count}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Clock className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">No leave requests yet</p>
                <Link href="/admin/leave-types" className="text-xs text-[#c9a227] hover:underline mt-1 block">Configure leave types →</Link>
              </div>
            )}
          </div>
        </div>

        {/* ── Recent Workers ── */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h3 className="font-bold text-foreground text-sm">Recently Added Workers</h3>
            <Link href="/admin/workers" className="text-xs text-[#c9a227] hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {stats && stats.recentWorkers.length > 0 ? (
            <div className="divide-y divide-border">
              {stats.recentWorkers.map((worker) => (
                <Link
                  key={worker.id}
                  href={`/admin/workers/${worker.id}`}
                  className="flex items-center gap-3 px-5 py-3.5 hover:bg-muted/40 transition-colors"
                >
                  {worker.photoUrl ? (
                    <img src={worker.photoUrl} alt={worker.firstName} className="w-9 h-9 rounded-full object-cover shrink-0" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-[#c9a227]/10 border border-[#c9a227]/20 flex items-center justify-center shrink-0">
                      <Users className="w-4 h-4 text-[#c9a227]" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-foreground text-sm truncate">{worker.firstName} {worker.lastName}</div>
                    <div className="text-xs text-muted-foreground truncate">{worker.jobTitle} · {worker.department}</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs border shrink-0 ${
                    worker.status === "active"
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-muted text-muted-foreground border-border"
                  } capitalize`}>{worker.status}</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <Users className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-3">No workers added yet</p>
              <Link
                href="/admin/workers/new"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#c9a227] text-[#0a1628] font-semibold rounded-lg text-sm hover:bg-[#d4af37] transition-colors"
              >
                <Plus className="w-4 h-4" /> Add First Worker
              </Link>
            </div>
          )}
        </div>

        {/* ── Quick Actions ── */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <Link href="/admin/leave-requests"
              className="bg-card border border-border rounded-xl p-4 hover:border-[#c9a227]/40 hover:shadow-sm transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center mb-3">
                <Clock className="w-4 h-4 text-amber-600" />
              </div>
              <div className="font-semibold text-foreground text-xs lg:text-sm leading-tight mb-1">Leave Requests</div>
              <div className="text-xs text-muted-foreground leading-tight hidden sm:block">Approve or reject pending</div>
            </Link>

            <Link href="/admin/leave-letters"
              className="bg-card border border-border rounded-xl p-4 hover:border-[#c9a227]/40 hover:shadow-sm transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center mb-3">
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
              <div className="font-semibold text-foreground text-xs lg:text-sm leading-tight mb-1">Leave Letters</div>
              <div className="text-xs text-muted-foreground leading-tight hidden sm:block">Read formal submissions</div>
            </Link>

            <Link href="/admin/leave-types"
              className="bg-card border border-border rounded-xl p-4 hover:border-[#c9a227]/40 hover:shadow-sm transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center mb-3">
                <TrendingUp className="w-4 h-4 text-purple-600" />
              </div>
              <div className="font-semibold text-foreground text-xs lg:text-sm leading-tight mb-1">Leave Types</div>
              <div className="text-xs text-muted-foreground leading-tight hidden sm:block">Configure days & policies</div>
            </Link>

            <button
              onClick={() => setShowReset(true)}
              className="bg-card border border-border rounded-xl p-4 hover:border-[#c9a227]/40 hover:shadow-sm transition-all text-left w-full"
            >
              <div className="w-8 h-8 rounded-lg bg-[#c9a227]/10 border border-[#c9a227]/20 flex items-center justify-center mb-3">
                <KeyRound className="w-4 h-4 text-[#c9a227]" />
              </div>
              <div className="font-semibold text-foreground text-xs lg:text-sm leading-tight mb-1">Reset Password</div>
              <div className="text-xs text-muted-foreground leading-tight hidden sm:block">Change admin password</div>
            </button>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
