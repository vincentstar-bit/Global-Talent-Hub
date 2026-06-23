import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard, Users, Briefcase, CalendarDays,
  FileText, LogOut, Globe, ChevronRight, Menu, X, ShieldCheck
} from "lucide-react";
import { useAdminLogout, useGetAdminMe } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";

const navItems = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/workers", icon: Users, label: "Workers" },
  { href: "/admin/jobs", icon: Briefcase, label: "Job Roles" },
  { href: "/admin/leave-types", icon: CalendarDays, label: "Leave Types" },
  { href: "/admin/leave-requests", icon: CalendarDays, label: "Leave Requests" },
  { href: "/admin/leave-letters", icon: FileText, label: "Leave Letters" },
];

function SidebarContent({
  location,
  session,
  onLogout,
  onNavClick,
}: {
  location: string;
  session: any;
  onLogout: () => void;
  onNavClick?: () => void;
}) {
  const isSuperAdmin = (session as any)?.isSuperAdmin === true;

  return (
    <>
      <div className="p-5 border-b border-sidebar-border shrink-0">
        <Link href="/" className="flex items-center gap-3" onClick={onNavClick}>
          <div className="w-7 h-7 rounded bg-[#c9a227] flex items-center justify-center shrink-0">
            <Globe className="w-4 h-4 text-[#0d1b2e]" />
          </div>
          <div>
            <div className="text-sidebar-foreground font-bold text-xs tracking-wide">SINOGLOBAL</div>
            <div className="text-[#c9a227] text-[9px] tracking-widest uppercase">Admin Panel</div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const active = location.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavClick}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-[#c9a227]/15 text-[#c9a227]"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              }`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}

        {isSuperAdmin && (
          <>
            <div className="pt-3 pb-1 px-3">
              <div className="text-[9px] uppercase tracking-widest text-sidebar-foreground/30">System</div>
            </div>
            <Link
              href="/admin/admins"
              onClick={onNavClick}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                location.startsWith("/admin/admins")
                  ? "bg-[#c9a227]/15 text-[#c9a227]"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              }`}
            >
              <ShieldCheck className="w-4 h-4 shrink-0" />
              Admins
            </Link>
          </>
        )}
      </nav>

      <div className="p-4 border-t border-sidebar-border shrink-0">
        {session && (
          <div className="px-3 mb-3">
            <div className="text-[9px] uppercase tracking-widest text-sidebar-foreground/40 mb-0.5">Logged in as</div>
            <div className="text-xs text-[#c9a227] font-medium truncate">{session.username}</div>
          </div>
        )}
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-3 py-2 text-sm text-sidebar-foreground/70 hover:text-destructive transition-colors w-full rounded-lg hover:bg-destructive/10"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Sign Out
        </button>
      </div>
    </>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location, navigate] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data: session } = useGetAdminMe();
  const logout = useAdminLogout({
    mutation: {
      onSuccess: () => {
        queryClient.clear();
        navigate("/admin/login");
      },
    },
  });

  const handleLogout = () => {
    setMobileOpen(false);
    localStorage.removeItem("admin_token");
    logout.mutate();
  };

  const pageLabel = location.replace("/admin/", "").replace(/-/g, " ") || "Admin";

  return (
    <div className="flex min-h-screen bg-background">
      {/* ── Desktop Sidebar ── */}
      <aside className="hidden lg:flex w-64 bg-sidebar text-sidebar-foreground flex-col fixed inset-y-0 z-40">
        <SidebarContent location={location} session={session} onLogout={handleLogout} />
      </aside>

      {/* ── Mobile Sidebar Overlay ── */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <aside className="relative w-72 max-w-[85vw] bg-sidebar text-sidebar-foreground flex flex-col h-full shadow-2xl">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>
            <SidebarContent
              location={location}
              session={session}
              onLogout={handleLogout}
              onNavClick={() => setMobileOpen(false)}
            />
          </aside>
        </div>
      )}

      {/* ── Main content ── */}
      <main className="lg:ml-64 flex-1 min-w-0 flex flex-col">
        {/* Sticky top bar */}
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border px-4 lg:px-6 py-3.5 flex items-center gap-3">
          {/* Hamburger (mobile only) */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground shrink-0"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground min-w-0">
            <Link href="/" className="hover:text-foreground transition-colors shrink-0">SinoGlobal</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-foreground capitalize truncate">{pageLabel}</span>
          </div>
        </header>

        {/* Page content */}
        <div className="p-4 lg:p-6 flex-1">{children}</div>
      </main>
    </div>
  );
}
