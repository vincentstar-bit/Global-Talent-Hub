import { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { useGetDashboardStats, useListWorkers, getGetDashboardStatsQueryKey } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Users, UserCheck, Clock, FileText, TrendingUp, Plus, KeyRound, X, Eye, EyeOff, CheckCircle2, AlertCircle, Lock, ShieldCheck } from "lucide-react";

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
    if (next === current) return "New password must be different from the current password.";
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
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#c9a227]/10 border border-[#c9a227]/20 flex items-center justify-center">
              <KeyRound className="w-4.5 h-4.5 text-[#c9a227] w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-foreground text-base">Reset Password</div>
              <div className="text-muted-foreground text-xs">Update your administrator password</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 py-6">
          {success ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-7 h-7 text-green-600" />
              </div>
              <div className="font-bold text-foreground text-lg mb-1">Password Updated</div>
              <p className="text-muted-foreground text-sm">Your password has been changed successfully.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Current password */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Current Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type={showCurrent ? "text" : "password"}
                    value={current}
                    onChange={(e) => setCurrent(e.target.value)}
                    required
                    autoComplete="current-password"
                    placeholder="Enter current password"
                    className="w-full bg-muted/50 border border-border rounded-xl pl-9 pr-10 py-3 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a227]/40 focus:border-[#c9a227]/60 placeholder-muted-foreground/50 transition-all"
                  />
                  <button type="button" onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* New password */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type={showNext ? "text" : "password"}
                    value={next}
                    onChange={(e) => setNext(e.target.value)}
                    required
                    autoComplete="new-password"
                    placeholder="At least 8 characters"
                    className="w-full bg-muted/50 border border-border rounded-xl pl-9 pr-10 py-3 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a227]/40 focus:border-[#c9a227]/60 placeholder-muted-foreground/50 transition-all"
                  />
                  <button type="button" onClick={() => setShowNext(!showNext)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showNext ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {next && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= strength ? strengthColor : "bg-muted"}`} />
                      ))}
                    </div>
                    <p className={`text-xs font-medium ${
                      strength <= 1 ? "text-red-500" : strength === 2 ? "text-yellow-500" : strength === 3 ? "text-blue-500" : "text-green-500"
                    }`}>{strengthLabel}</p>
                  </div>
                )}
              </div>

              {/* Confirm password */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Confirm New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                    autoComplete="new-password"
                    placeholder="Repeat new password"
                    className={`w-full bg-muted/50 border rounded-xl pl-9 pr-10 py-3 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a227]/40 focus:border-[#c9a227]/60 placeholder-muted-foreground/50 transition-all ${
                      confirm && confirm !== next ? "border-red-400" : "border-border"
                    }`}
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {confirm && confirm !== next && (
                  <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                )}
              </div>

              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-3 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-3 bg-[#c9a227] text-[#0a1628] font-bold rounded-xl text-sm hover:bg-[#d4af37] transition-colors disabled:opacity-60"
                >
                  {loading ? "Updating…" : "Update Password"}
                </button>
              </div>
            </form>
          )}
        </div>

        {!success && (
          <div className="px-6 pb-5 flex items-center gap-2 text-muted-foreground">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <p className="text-xs">Password change takes effect immediately for all future logins.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const [showReset, setShowReset] = useState(false);
  const { data: stats, isLoading } = useGetDashboardStats({ query: { queryKey: getGetDashboardStatsQueryKey() } });

  const statCards = stats ? [
    { label: "Total Workers", value: stats.totalWorkers, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Active Workers", value: stats.activeWorkers, icon: UserCheck, color: "text-green-600", bg: "bg-green-50" },
    { label: "Pending Leave Requests", value: stats.pendingLeaveRequests, icon: Clock, color: "text-yellow-600", bg: "bg-yellow-50" },
    { label: "Total Leave Requests", value: stats.totalLeaveRequests, icon: FileText, color: "text-purple-600", bg: "bg-purple-50" },
  ] : [];

  return (
    <AdminLayout>
      {showReset && <ResetPasswordModal onClose={() => setShowReset(false)} />}

      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-1">SinoGlobal Enterprise — Administration Overview</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowReset(true)}
              className="flex items-center gap-2 px-4 py-2 border border-border text-foreground font-medium rounded text-sm hover:border-[#c9a227]/50 hover:text-[#c9a227] transition-colors"
            >
              <KeyRound className="w-4 h-4" /> Reset Password
            </button>
            <Link
              href="/admin/workers/new"
              className="flex items-center gap-2 px-4 py-2 bg-[#c9a227] text-[#0a1628] font-semibold rounded text-sm hover:bg-[#d4af37] transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Worker
            </Link>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {isLoading ? (
            [1,2,3,4].map(i => <div key={i} className="bg-card border border-border rounded-lg p-6 animate-pulse h-28" />)
          ) : (
            statCards.map((card) => (
              <div key={card.label} className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-9 h-9 rounded-lg ${card.bg} flex items-center justify-center`}>
                    <card.icon className={`w-5 h-5 ${card.color}`} />
                  </div>
                  <span className="text-sm text-muted-foreground">{card.label}</span>
                </div>
                <div className="text-3xl font-bold text-foreground">{card.value}</div>
              </div>
            ))
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Workers by department */}
          {stats && stats.workersByDepartment.length > 0 && (
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#c9a227]" /> Workers by Department
              </h3>
              <div className="space-y-3">
                {stats.workersByDepartment.sort((a, b) => b.count - a.count).map((dept) => (
                  <div key={dept.department}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-foreground font-medium">{dept.department}</span>
                      <span className="text-muted-foreground">{dept.count}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div
                        className="bg-[#c9a227] h-1.5 rounded-full"
                        style={{ width: `${(dept.count / stats.totalWorkers) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Leave requests by status */}
          {stats && stats.leaveRequestsByStatus.length > 0 && (
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#c9a227]" /> Leave Requests by Status
              </h3>
              <div className="space-y-3">
                {stats.leaveRequestsByStatus.map((s) => (
                  <div key={s.status} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${
                        s.status === "approved" ? "bg-green-500"
                        : s.status === "pending" ? "bg-yellow-500"
                        : "bg-red-500"
                      }`} />
                      <span className="text-sm capitalize text-foreground">{s.status}</span>
                    </div>
                    <span className="font-bold text-foreground">{s.count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Recent workers */}
        {stats && stats.recentWorkers.length > 0 && (
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-foreground">Recently Added Workers</h3>
              <Link href="/admin/workers" className="text-xs text-[#c9a227] hover:underline">View all</Link>
            </div>
            <div className="space-y-3">
              {stats.recentWorkers.map((worker) => (
                <Link key={worker.id} href={`/admin/workers/${worker.id}`} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  {worker.photoUrl ? (
                    <img src={worker.photoUrl} alt={worker.firstName} className="w-9 h-9 rounded-full object-cover" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-[#c9a227]/10 flex items-center justify-center">
                      <Users className="w-4 h-4 text-[#c9a227]" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground text-sm">{worker.firstName} {worker.lastName}</div>
                    <div className="text-xs text-muted-foreground">{worker.jobTitle} · {worker.department}</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs border ${
                    worker.status === "active" ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-muted text-muted-foreground border-border"
                  } capitalize`}>{worker.status}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Link href="/admin/leave-requests" className="bg-card border border-border rounded-lg p-5 hover:border-[#c9a227]/40 transition-colors">
            <Clock className="w-6 h-6 text-[#c9a227] mb-3" />
            <div className="font-semibold text-foreground text-sm">Review Leave Requests</div>
            <div className="text-xs text-muted-foreground mt-1">Approve or reject pending requests</div>
          </Link>
          <Link href="/admin/leave-letters" className="bg-card border border-border rounded-lg p-5 hover:border-[#c9a227]/40 transition-colors">
            <FileText className="w-6 h-6 text-[#c9a227] mb-3" />
            <div className="font-semibold text-foreground text-sm">Review Leave Letters</div>
            <div className="text-xs text-muted-foreground mt-1">Read formal letters submitted by workers</div>
          </Link>
          <Link href="/admin/leave-types" className="bg-card border border-border rounded-lg p-5 hover:border-[#c9a227]/40 transition-colors">
            <TrendingUp className="w-6 h-6 text-[#c9a227] mb-3" />
            <div className="font-semibold text-foreground text-sm">Configure Leave Types</div>
            <div className="text-xs text-muted-foreground mt-1">Set amounts, max days, and policies</div>
          </Link>
          <button
            onClick={() => setShowReset(true)}
            className="bg-card border border-border rounded-lg p-5 hover:border-[#c9a227]/40 transition-colors text-left w-full"
          >
            <KeyRound className="w-6 h-6 text-[#c9a227] mb-3" />
            <div className="font-semibold text-foreground text-sm">Reset Password</div>
            <div className="text-xs text-muted-foreground mt-1">Change your admin account password</div>
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
