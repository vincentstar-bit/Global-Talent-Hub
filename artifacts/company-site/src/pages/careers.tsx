import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import { useListJobs } from "@workspace/api-client-react";
import { Briefcase, MapPin, DollarSign, ChevronDown, ChevronUp, Users, Clock } from "lucide-react";

const benefits = [
  "Competitive salary with performance bonuses",
  "Comprehensive international health insurance",
  "Annual leave and vacation allowances",
  "Relocation assistance for international assignments",
  "Continuous professional development programs",
  "Global mobility opportunities across 43 countries",
  "Pension and retirement planning support",
  "Flexible working arrangements where applicable",
];

export default function CareersPage() {
  const { data: jobs, isLoading } = useListJobs();
  const [expanded, setExpanded] = useState<number | null>(null);
  const [filter, setFilter] = useState("");

  const filtered = jobs?.filter((j) =>
    filter ? j.department === filter : true
  ) ?? [];

  const departments = [...new Set(jobs?.map((j) => j.department) ?? [])];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#0a1628] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-[#c9a227]" />
            <span className="text-[#c9a227] text-xs tracking-widest uppercase font-medium">Careers</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">Join SinoGlobal</h1>
          <p className="text-white/70 text-xl max-w-3xl leading-relaxed">
            Build a global career with one of China's most prestigious multinationals. We hire exceptional talent across 12 divisions in 43 countries — verified candidates hired by our MD and senior leadership team.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-[#c9a227]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#0a1628] mb-8 text-center">Why Work at SinoGlobal</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((b) => (
              <div key={b} className="bg-[#0a1628]/10 rounded-lg px-4 py-3 text-sm text-[#0a1628] font-medium">
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Process */}
      <section className="py-16 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-foreground">Our Hiring Process</h2>
            <p className="text-muted-foreground mt-2">All hires are verified and approved by our MD or senior leadership</p>
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-0">
            {[
              { step: "01", title: "Application Review", desc: "Our HR team reviews your credentials and background verification." },
              { step: "02", title: "Technical Assessment", desc: "Skills evaluation tailored to your specific division and role." },
              { step: "03", title: "Leadership Interview", desc: "Direct interview with MD or senior staff member overseeing your division." },
              { step: "04", title: "Contract & Onboarding", desc: "Contract signed, Worker ID issued, and formal onboarding begins." },
            ].map((step, i) => (
              <div key={step.step} className="flex-1 flex flex-col md:flex-row items-start md:items-center">
                <div className="flex-1 bg-card border border-border rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-[#c9a227] mb-2">{step.step}</div>
                  <h4 className="font-bold text-foreground mb-1 text-sm">{step.title}</h4>
                  <p className="text-xs text-muted-foreground">{step.desc}</p>
                </div>
                {i < 3 && <div className="hidden md:block w-6 h-px bg-border flex-shrink-0" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs */}
      <section className="py-24 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Open Positions</h2>
              <p className="text-muted-foreground mt-1">{filtered.length} position{filtered.length !== 1 ? "s" : ""} available</p>
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-border rounded px-4 py-2 text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-[#c9a227]"
            >
              <option value="">All Departments</option>
              {departments.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[1,2,3].map(i => (
                <div key={i} className="bg-card border border-border rounded-lg p-6 animate-pulse">
                  <div className="h-5 bg-muted rounded w-48 mb-3" />
                  <div className="h-4 bg-muted rounded w-32" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">No positions available in this category at the moment.</div>
          ) : (
            <div className="space-y-4">
              {filtered.map((job) => (
                <div key={job.id} className="bg-card border border-border rounded-lg overflow-hidden hover:border-[#c9a227]/40 transition-colors">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex gap-4">
                        {job.photoUrl && (
                          <img
                            src={job.photoUrl}
                            alt={job.title}
                            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                          />
                        )}
                        <div>
                          <h3 className="font-bold text-foreground text-lg">{job.title}</h3>
                          <div className="flex flex-wrap gap-3 mt-2">
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Briefcase className="w-3.5 h-3.5" /> {job.department}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <MapPin className="w-3.5 h-3.5" /> Beijing, China & International
                            </span>
                            <span className="flex items-center gap-1 text-xs text-[#c9a227] font-medium">
                              <DollarSign className="w-3.5 h-3.5" /> {job.salary}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setExpanded(expanded === job.id ? null : job.id)}
                        className="flex items-center gap-2 px-4 py-2 border border-[#c9a227] text-[#c9a227] rounded text-sm hover:bg-[#c9a227] hover:text-[#0a1628] transition-colors shrink-0"
                      >
                        {expanded === job.id ? <><ChevronUp className="w-4 h-4" /> Less</> : <><ChevronDown className="w-4 h-4" /> Details</>}
                      </button>
                    </div>

                    <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{job.description}</p>

                    {expanded === job.id && (
                      <div className="mt-6 pt-6 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
                            <Users className="w-4 h-4 text-[#c9a227]" /> Key Responsibilities
                          </h4>
                          <div className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{job.responsibilities}</div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[#c9a227]" /> Requirements
                          </h4>
                          <div className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{job.requirements}</div>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-xs text-muted-foreground bg-muted/50 rounded px-4 py-3">
                            <strong className="text-foreground">Note:</strong> All candidates are subject to background verification. Offers are extended only by our MD or senior staff member. Successful candidates receive a unique Worker ID and Access Token upon contract signing.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
