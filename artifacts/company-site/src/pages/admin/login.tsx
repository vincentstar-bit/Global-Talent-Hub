import { useState } from "react";
import { useLocation } from "wouter";
import { useAdminLogin, getGetAdminMeQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Globe, Lock, User, Eye, EyeOff } from "lucide-react";

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
        queryClient.setQueryData(getGetAdminMeQueryKey(), session);
        navigate("/admin/dashboard");
      },
      onError: () => setError("Invalid credentials. Please check your username and password."),
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    login.mutate({ data: { username, password } });
  };

  return (
    <div className="min-h-screen bg-[#0a1628] flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 border-r border-white/10 bg-gradient-to-br from-[#0a1628] to-[#0d1f38]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-[#c9a227] flex items-center justify-center">
            <Globe className="w-5 h-5 text-[#0a1628]" />
          </div>
          <div>
            <div className="text-white font-bold tracking-wide">SINOGLOBAL</div>
            <div className="text-[#c9a227] text-[10px] tracking-widest uppercase">Enterprise Co., Ltd.</div>
          </div>
        </div>

        <div>
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Enterprise Administration<br />
            <span className="text-[#c9a227]">Portal</span>
          </h2>
          <p className="text-white/50 text-sm leading-relaxed max-w-sm">
            Secure access for authorized SinoGlobal administrators. Manage workforce contracts, leave entitlements, and worker profiles across all 43 countries.
          </p>
        </div>

        <div className="space-y-4">
          {["Worker ID & contract management", "Leave type configuration", "Leave request approval", "Payment tracking & reporting"].map((f) => (
            <div key={f} className="flex items-center gap-3 text-white/60 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-[#c9a227]" />
              {f}
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-8 h-8 rounded bg-[#c9a227] flex items-center justify-center">
              <Globe className="w-4 h-4 text-[#0a1628]" />
            </div>
            <div className="text-white font-bold">SINOGLOBAL Admin</div>
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">Administrator Sign In</h3>
          <p className="text-white/50 text-sm mb-8">Access is restricted to authorized personnel only.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-white/70 block mb-2">Username</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/15 rounded-lg pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a227] focus:border-[#c9a227] placeholder-white/30"
                  placeholder="admin"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-white/70 block mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/15 rounded-lg pl-10 pr-10 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a227] focus:border-[#c9a227] placeholder-white/30"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-destructive/20 border border-destructive/40 rounded-lg px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={login.isPending}
              className="w-full bg-[#c9a227] text-[#0a1628] font-bold py-3 rounded-lg hover:bg-[#d4af37] transition-colors disabled:opacity-60 mt-2"
            >
              {login.isPending ? "Authenticating..." : "Sign In to Admin Panel"}
            </button>
          </form>

          <p className="text-white/30 text-xs text-center mt-8">
            Default credentials: admin / SinoGlobal@2024
          </p>
        </div>
      </div>
    </div>
  );
}
