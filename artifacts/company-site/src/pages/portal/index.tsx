import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import { useLocation } from "wouter";
import { Search, Shield, Globe, FileText, CheckCircle2 } from "lucide-react";

export default function PortalPage() {
  const [, navigate] = useLocation();
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const token = input.trim().toUpperCase();
    if (!token) return;
    if (token.length < 5) {
      setError("Please enter a valid Worker ID or Access Token.");
      return;
    }
    setError("");
    navigate(`/portal/worker/${token}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#0a1628] pt-32 pb-24 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(#c9a227 1px, transparent 1px), linear-gradient(90deg, #c9a227 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(201,162,39,0.06) 0%, transparent 70%)" }}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center gap-2 mb-5">
            <div className="h-px w-8 bg-[#c9a227]" />
            <span className="text-[#c9a227] text-xs tracking-widest uppercase font-medium">Employee Self-Service</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-5 leading-tight">
            Worker<br />
            <span className="text-[#c9a227]">Identity Portal</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl leading-relaxed mb-10">
            Enter your Worker ID or Access Token to securely access your contract details, payment status, country assignment, and leave entitlements.
          </p>

          {/* Search box */}
          <div className="bg-white/5 border border-white/15 rounded-2xl p-6 backdrop-blur-sm">
            <p className="text-white/60 text-sm mb-4">Your Access Token was issued by HR upon contract signing. Format: <code className="text-[#c9a227] font-mono">SGE-XXXXX-XXXXX</code></p>
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => { setInput(e.target.value); setError(""); }}
                placeholder="Enter Worker ID or Access Token (e.g. SGE-12345-67890)"
                className="flex-1 bg-white/8 border border-white/20 rounded-xl px-4 py-3.5 text-white text-sm font-mono placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#c9a227]/50 focus:border-[#c9a227]/60 transition-all"
                autoCapitalize="characters"
              />
              <button
                type="submit"
                className="px-6 py-3.5 bg-[#c9a227] text-[#0a1628] font-bold rounded-xl hover:bg-[#d4af37] transition-colors flex items-center gap-2 text-sm shadow-lg shadow-[#c9a227]/25 shrink-0"
              >
                <Search className="w-4 h-4" />
                Look Up
              </button>
            </form>
            {error && (
              <div className="flex items-center gap-2 mt-3 text-red-400 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                {error}
              </div>
            )}
            <p className="text-white/30 text-xs mt-3">
              Token lookup is case-insensitive. Contact your HR department if you have not received your access token.
            </p>
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section className="py-14 bg-background border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: FileText,
                title: "Contract & Payment",
                desc: "View your full contract terms, payment progress, and outstanding balances.",
              },
              {
                icon: Globe,
                title: "Country Assignment",
                desc: "Check your assigned country, entry date, and authorized stay duration.",
              },
              {
                icon: CheckCircle2,
                title: "Leave Entitlements",
                desc: "Browse available leave types and submit formal leave applications online.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#c9a227]/10 border border-[#c9a227]/20 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-[#c9a227]" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm mb-1">{item.title}</p>
                  <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security note */}
      <section className="py-10 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#0a1628] flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-[#c9a227]" />
            </div>
            <div>
              <p className="font-bold text-foreground text-sm mb-1">Your Data is Secure</p>
              <p className="text-muted-foreground text-xs leading-relaxed max-w-2xl">
                Access is restricted to verified employees only. Each session is authenticated via a unique access token. SinoGlobal Enterprise does not store your session beyond your visit. For security concerns, contact <span className="text-foreground">hr@sinoglobal.com</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
