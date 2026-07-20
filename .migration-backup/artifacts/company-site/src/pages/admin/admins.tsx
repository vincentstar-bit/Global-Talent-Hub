import AdminLayout from "@/components/layout/AdminLayout";
import { useGetAdminMe } from "@workspace/api-client-react";
import { useState, useEffect } from "react";
import {
  UserCog, Plus, Trash2, X, Eye, EyeOff, ShieldAlert,
  ShieldCheck, CheckCircle2, AlertCircle, Lock, User, Tag, Loader2
} from "lucide-react";

type AdminUser = {
  id: number;
  username: string;
  displayName: string | null;
  createdAt: string;
  createdBy: string | null;
};

const BASE = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";

async function apiFetch(path: string, options?: RequestInit) {
  const res = await fetch(`${BASE}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

const inputCls =
  "w-full bg-muted/50 border border-border rounded-xl px-3 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a227]/40 focus:border-[#c9a227]/60 placeholder-muted-foreground/40 transition-all";

function AddAdminModal({ onClose, onCreated }: { onClose: () => void; onCreated: (a: AdminUser) => void }) {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const strength = (() => {
    if (!password) return 0;
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  })();
  const strengthLabel = ["", "Weak", "Fair", "Strong", "Very Strong"][strength];
  const strengthColor = ["", "bg-red-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"][strength];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (username.trim().length < 3) { setError("Username must be at least 3 characters."); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true);
    try {
      const admin = await apiFetch("/api/auth/admins", {
        method: "POST",
        body: JSON.stringify({ username: username.trim(), password, displayName: displayName.trim() || undefined }),
      });
      setSuccess(true);
      setTimeout(() => { onCreated(admin); onClose(); }, 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#c9a227]/10 border border-[#c9a227]/20 flex items-center justify-center shrink-0">
              <UserCog className="w-5 h-5 text-[#c9a227]" />
            </div>
            <div>
              <div className="font-bold text-foreground text-sm">Add Admin</div>
              <div className="text-muted-foreground text-xs">Create a new administrator account</div>
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
              <div className="font-bold text-foreground text-base mb-1">Admin Created</div>
              <p className="text-muted-foreground text-sm">The new admin can now log in.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Username *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input className={`${inputCls} pl-9`} value={username} onChange={e => setUsername(e.target.value)} placeholder="e.g. john.doe" required autoComplete="off" />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Display Name</label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input className={`${inputCls} pl-9`} value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder="e.g. John Doe (optional)" autoComplete="off" />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Password *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type={showPw ? "text" : "password"}
                    className={`${inputCls} pl-9 pr-10`}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    required
                    autoComplete="new-password"
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {password && (
                  <div className="mt-1.5">
                    <div className="flex gap-1 mb-0.5">
                      {[1,2,3,4].map(i => <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= strength ? strengthColor : "bg-muted"}`} />)}
                    </div>
                    <p className={`text-xs font-medium ${strength <= 1 ? "text-red-500" : strength === 2 ? "text-yellow-500" : strength === 3 ? "text-blue-500" : "text-green-500"}`}>{strengthLabel}</p>
                  </div>
                )}
              </div>

              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              <div className="flex gap-3 pt-1">
                <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors">Cancel</button>
                <button type="submit" disabled={loading} className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#c9a227] text-[#0a1628] font-bold rounded-xl text-sm hover:bg-[#d4af37] transition-colors disabled:opacity-60">
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating…</> : "Create Admin"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminManagementPage() {
  const { data: session } = useGetAdminMe();
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const isSuperAdmin = (session as any)?.isSuperAdmin === true;

  useEffect(() => {
    if (!isSuperAdmin) return;
    apiFetch("/api/auth/admins")
      .then(setAdmins)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [isSuperAdmin]);

  const handleDelete = async (id: number, username: string) => {
    if (!confirm(`Remove admin "${username}"? They will no longer be able to log in.`)) return;
    setDeletingId(id);
    try {
      await apiFetch(`/api/auth/admins/${id}`, { method: "DELETE" });
      setAdmins((prev) => prev.filter((a) => a.id !== id));
    } catch (err: any) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleCreated = (admin: AdminUser) => {
    setAdmins((prev) => [...prev, admin]);
  };

  if (!isSuperAdmin) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mb-4">
            <ShieldAlert className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-lg font-bold text-foreground mb-2">Super Admin Only</h2>
          <p className="text-muted-foreground text-sm max-w-xs">Managing admin accounts is restricted to the primary super admin.</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {showAdd && <AddAdminModal onClose={() => setShowAdd(false)} onCreated={handleCreated} />}

      <div className="space-y-6 max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-foreground">Admin Management</h1>
            <p className="text-muted-foreground text-xs lg:text-sm mt-0.5">Manage administrator accounts</p>
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#c9a227] text-[#0a1628] font-semibold rounded-lg text-sm hover:bg-[#d4af37] transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" /> Add Admin
          </button>
        </div>

        {/* Super Admin Card */}
        <div>
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Primary Super Admin</div>
          <div className="bg-card border border-[#c9a227]/30 rounded-xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#c9a227]/10 border border-[#c9a227]/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#c9a227]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-foreground text-sm">{session?.username}</div>
              <div className="text-xs text-muted-foreground">Super Admin · Configured via environment</div>
            </div>
            <span className="px-2 py-0.5 rounded-full text-xs bg-[#c9a227]/10 text-[#c9a227] border border-[#c9a227]/20 shrink-0">Super Admin</span>
          </div>
        </div>

        {/* Secondary Admins */}
        <div>
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Secondary Admins {!loading && `(${admins.length})`}
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1,2].map(i => <div key={i} className="h-16 bg-muted rounded-xl animate-pulse" />)}
            </div>
          ) : error ? (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">
              <AlertCircle className="w-4 h-4 shrink-0" /> {error}
            </div>
          ) : admins.length === 0 ? (
            <div className="text-center py-12 bg-card border border-border rounded-xl">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                <UserCog className="w-6 h-6 text-muted-foreground" />
              </div>
              <div className="font-medium text-foreground text-sm mb-1">No secondary admins yet</div>
              <p className="text-xs text-muted-foreground mb-4">Add admins to let other team members manage the system.</p>
              <button onClick={() => setShowAdd(true)} className="px-4 py-2 bg-[#c9a227] text-[#0a1628] font-semibold rounded-lg text-sm hover:bg-[#d4af37] transition-colors">
                Add First Admin
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {admins.map((admin) => (
                <div key={admin.id} className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-foreground text-sm">{admin.displayName || admin.username}</div>
                    <div className="text-xs text-muted-foreground">
                      @{admin.username}
                      {admin.createdBy && ` · Added by ${admin.createdBy}`}
                      {admin.createdAt && ` · ${new Date(admin.createdAt).toLocaleDateString()}`}
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-xs bg-blue-50 text-blue-600 border border-blue-100 shrink-0">Admin</span>
                  <button
                    onClick={() => handleDelete(admin.id, admin.username)}
                    disabled={deletingId === admin.id}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40 shrink-0"
                    title="Remove admin"
                  >
                    {deletingId === admin.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-start gap-2 bg-muted/40 border border-border rounded-xl px-4 py-3 text-xs text-muted-foreground">
          <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-[#c9a227]" />
          <p>Secondary admins have full access to the admin panel but cannot add or remove other admins. Only the super admin can manage this page.</p>
        </div>
      </div>
    </AdminLayout>
  );
}
