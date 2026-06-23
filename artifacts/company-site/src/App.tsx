import { useState } from "react";
import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LoadingScreen from "@/components/LoadingScreen";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home";
import AboutPage from "@/pages/about";
import CareersPage from "@/pages/careers";
import ContactPage from "@/pages/contact";
import ServicesPage from "@/pages/services";
import SustainabilityPage from "@/pages/sustainability";
import NewsroomPage from "@/pages/newsroom";
import InvestorsPage from "@/pages/investors";
import PortalPage from "@/pages/portal/index";
import PortalApplyPage from "@/pages/portal/apply";
import PortalLetterPage from "@/pages/portal/letter";
import AdminLoginPage from "@/pages/admin/login";
import AdminDashboardPage from "@/pages/admin/dashboard";
import AdminWorkersPage from "@/pages/admin/workers";
import AdminWorkersNewPage from "@/pages/admin/workers-new";
import AdminWorkerDetailPage from "@/pages/admin/worker-detail";
import AdminJobsPage from "@/pages/admin/jobs";
import AdminLeaveTypesPage from "@/pages/admin/leave-types";
import AdminLeaveRequestsPage from "@/pages/admin/leave-requests";
import AdminLeaveLettersPage from "@/pages/admin/leave-letters";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30_000 } },
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/careers" component={CareersPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/services" component={ServicesPage} />
      <Route path="/sustainability" component={SustainabilityPage} />
      <Route path="/newsroom" component={NewsroomPage} />
      <Route path="/investors" component={InvestorsPage} />
      <Route path="/portal" component={PortalPage} />
      <Route path="/portal/apply" component={PortalApplyPage} />
      <Route path="/portal/letter" component={PortalLetterPage} />
      <Route path="/admin">
        {() => <Redirect to="/admin/login" />}
      </Route>
      <Route path="/admin/login" component={AdminLoginPage} />
      <Route path="/admin/dashboard" component={AdminDashboardPage} />
      <Route path="/admin/workers" component={AdminWorkersPage} />
      <Route path="/admin/workers/new" component={AdminWorkersNewPage} />
      <Route path="/admin/workers/:id" component={AdminWorkerDetailPage} />
      <Route path="/admin/jobs" component={AdminJobsPage} />
      <Route path="/admin/leave-types" component={AdminLeaveTypesPage} />
      <Route path="/admin/leave-requests" component={AdminLeaveRequestsPage} />
      <Route path="/admin/leave-letters" component={AdminLeaveLettersPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
        <div style={{ visibility: loaded ? "visible" : "hidden" }}>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
