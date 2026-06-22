import { Link, useLocation } from "wouter";
import {
  LayoutDashboard, Users, Briefcase, CalendarDays,
  FileText, LogOut, Globe, Mail, ChevronRight
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

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location, navigate] = useLocation();
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

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar text-sidebar-foreground flex flex-col fixed inset-y-0 z-40">
        <div className="p-5 border-b border-sidebar-border">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-[#c9a227] flex items-center justify-center">
              <Globe className="w-4 h-4 text-[#0d1b2e]" />
            </div>
            <div>
              <div className="text-sidebar-foreground font-bold text-xs tracking-wide">SINOGLOBAL</div>
              <div className="text-[#c9a227] text-[9px] tracking-widest">Admin Panel</div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = location.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium transition-colors ${
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
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          {session && (
            <div className="text-xs text-sidebar-foreground/60 mb-3 px-3">
              Logged in as <span className="text-[#c9a227] font-medium">{session.username}</span>
            </div>
          )}
          <button
            onClick={() => logout.mutate({})}
            className="flex items-center gap-2 px-3 py-2 text-sm text-sidebar-foreground/70 hover:text-destructive transition-colors w-full rounded hover:bg-destructive/10"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 flex-1 min-w-0">
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border px-6 py-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">SinoGlobal</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground capitalize">{location.replace("/admin/", "").replace("-", " ") || "Admin"}</span>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
