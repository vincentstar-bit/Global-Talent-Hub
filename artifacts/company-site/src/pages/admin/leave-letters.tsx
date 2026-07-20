import AdminLayout from "@/components/layout/AdminLayout";
import { useListLeaveLetters, getListLeaveLettersQueryKey } from "@workspace/api-client-react";
import { FileText, Mail } from "lucide-react";

export default function AdminLeaveLettersPage() {
  const { data: letters, isLoading } = useListLeaveLetters({}, { query: { queryKey: getListLeaveLettersQueryKey() } });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Leave Letters</h1>
          <p className="text-muted-foreground text-sm mt-1">Formal letters submitted by workers through the self-service portal</p>
        </div>

        {isLoading ? (
          <div className="space-y-4">{[1,2,3].map(i => <div key={i} className="h-40 bg-muted rounded-lg animate-pulse" />)}</div>
        ) : !letters?.length ? (
          <div className="text-center py-16 bg-card border border-border rounded-lg">
            <FileText className="w-10 h-10 text-muted mx-auto mb-3" />
            <div className="font-medium text-foreground">No letters submitted yet</div>
            <p className="text-sm text-muted-foreground mt-1">Workers write formal letters after submitting a leave request.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {letters.map((letter) => (
              <div key={letter.id} className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="bg-muted/40 border-b border-border px-6 py-4 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Mail className="w-4 h-4 text-[#c9a227]" />
                      <span className="font-bold text-foreground">{letter.subject}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      From: <span className="font-medium text-foreground">{letter.workerName || `Worker #${letter.workerId}`}</span>
                      {" · "}To: <span className="font-medium text-foreground">{letter.recipientTitle}</span>
                      {" · "}{letter.leaveTypeName}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${letter.status === "submitted" ? "bg-blue-100 text-blue-700" : "bg-muted text-muted-foreground"}`}>
                      {letter.status}
                    </span>
                    <div className="text-xs text-muted-foreground mt-1">{new Date(letter.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="px-6 py-5">
                  <pre className="text-sm text-foreground whitespace-pre-wrap font-sans leading-relaxed">{letter.body}</pre>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
