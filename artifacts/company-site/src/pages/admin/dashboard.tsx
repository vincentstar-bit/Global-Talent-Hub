import AdminLayout from "@/components/layout/AdminLayout";
import { useGetDashboardStats, useListWorkers, getGetDashboardStatsQueryKey } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Users, UserCheck, Clock, FileText, TrendingUp, Plus } from "lucide-react";

export default function AdminDashboardPage() {
  const { data: stats, isLoading } = useGetDashboardStats({ query: { queryKey: getGetDashboardStatsQueryKey() } });

  const statCards = stats ? [
    { label: "Total Workers", value: stats.totalWorkers, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Active Workers", value: stats.activeWorkers, icon: UserCheck, color: "text-green-600", bg: "bg-green-50" },
    { label: "Pending Leave Requests", value: stats.pendingLeaveRequests, icon: Clock, color: "text-yellow-600", bg: "bg-yellow-50" },
    { label: "Total Leave Requests", value: stats.totalLeaveRequests, icon: FileText, color: "text-purple-600", bg: "bg-purple-50" },
  ] : [];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-1">SinoGlobal Enterprise — Administration Overview</p>
          </div>
          <Link
            href="/admin/workers/new"
            className="flex items-center gap-2 px-4 py-2 bg-[#c9a227] text-[#0a1628] font-semibold rounded text-sm hover:bg-[#d4af37] transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Worker
          </Link>
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
        </div>
      </div>
    </AdminLayout>
  );
}
