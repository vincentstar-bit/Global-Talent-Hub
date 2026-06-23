import { useState } from "react";
import { useLocation } from "wouter";
import { useAdminLogin, getGetAdminMeQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Globe, Lock, Mail, Eye, EyeOff, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const login = useAdminLogin({
    mutation: {
      onSuccess: (session) => {
        if ((session as any).token) {
          localStorage.setItem("admin_token", (session as any).token);
        }
        queryClient.setQueryData(getGetAdminMeQueryKey(), session);
        navigate("/admin/dashboard");
      },
      onError: () => setError("Invalid credentials. Please check your email and password."),
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    login.mutate({ data: { username, password } });
  };

  return (
    <div className="min-h-screen bg-[#04080f] flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 border-r border-white/8 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #04080f 0%, #07101e 60%, #0a1628 100%)" }}
      >
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(#c9a227 1px, transparent 1px), linear-gradient(90deg, #c9a227 1px, transparent 1px)",
            backgroundSize: "50px 50px"
          }}
        />
        {/* Glow orb */}
        <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(201,162,39,0.1) 0%, transparent 70%)" }}
        />

        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#c9a227] flex items-center justify-center shadow-lg">
            <Globe className="w-5 h-5 text-[#0a1628]" />
          </div>
          <div>
            <div className="text-white font-bold tracking-widest text-sm">SINOGLOBAL</div>
            <div className="text-[#c9a227] text-[9px] tracking-widest uppercase">Enterprise Co., Ltd.</div>
          </div>
        </div>

        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#c9a227]/25 bg-[#c9a227]/5 mb-6">
            <ShieldCheck className="w-3.5 h-3.5 text-[#c9a227]" />
            <span className="text-[#c9a227] text-[10px] tracking-widest uppercase font-semibold">Secure Access Only</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-5 leading-tight">
            Enterprise<br />Administration<br />
            <span className="text-[#c9a227]">Portal</span>
          </h2>
          <p className="text-white/40 text-sm leading-relaxed max-w-sm">
            Restricted access for authorized SinoGlobal administrators. Manage workforce contracts, leave entitlements, and worker profiles across all 43 countries.
          </p>
        </div>

        <div className="relative space-y-3">
          {[
            "Worker ID & contract management",
            "Leave type configuration",
            "Leave request approval",
            "Password & security settings",
            "Payment tracking & reporting",
          ].map((f) => (
            <div key={f} className="flex items-center gap-3 text-white/50 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-[#c9a227] shrink-0" />
              {f}
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 sm:px-10"
        style={{ background: "linear-gradient(180deg, #04080f 0%, #07101e 100%)" }}
      >
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-8 h-8 rounded-lg bg-[#c9a227] flex items-center justify-center">
              <Globe className="w-4 h-4 text-[#0a1628]" />
            </div>
            <div className="text-white font-bold tracking-wide text-sm">SINOGLOBAL Admin</div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Administrator Sign In</h3>
            <p className="text-white/40 text-sm">Access is restricted to authorized personnel only.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-semibold text-white/60 uppercase tracking-wider block mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                <input
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                  className="w-full bg-white/4 border border-white/12 rounded-xl pl-10 pr-4 py-3.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a227]/60 focus:border-[#c9a227]/60 placeholder-white/20 transition-all"
                  placeholder="admin@sinoglobal.com"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-white/60 uppercase tracking-wider block mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full bg-white/4 border border-white/12 rounded-xl pl-10 pr-11 py-3.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a227]/60 focus:border-[#c9a227]/60 placeholder-white/20 transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-sm text-red-300 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={login.isPending}
              className="w-full bg-[#c9a227] text-[#04080f] font-bold py-3.5 rounded-xl hover:bg-[#d4af37] transition-colors disabled:opacity-60 mt-2 text-sm tracking-wide shadow-lg shadow-[#c9a227]/15"
            >
              {login.isPending ? "Authenticating…" : "Sign In to Admin Panel"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/8 flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-white/20" />
            <p className="text-white/20 text-xs">
              Protected by session-based authentication · 24h token expiry
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
