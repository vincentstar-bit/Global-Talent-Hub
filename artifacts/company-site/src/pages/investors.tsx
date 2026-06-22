import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "wouter";
import { TrendingUp, BarChart3, Calendar, FileText, Phone, Mail, ArrowRight, ChevronRight, DollarSign, Users, Globe, Award } from "lucide-react";

const financials = [
  { year: "FY 2023", revenue: "$8.2B", growth: "+18%", ebitda: "$1.64B", margin: "20.0%", eps: "$3.42" },
  { year: "FY 2022", revenue: "$6.9B", growth: "+15%", ebitda: "$1.31B", margin: "19.0%", eps: "$2.88" },
  { year: "FY 2021", revenue: "$6.0B", growth: "+12%", ebitda: "$1.08B", margin: "18.0%", eps: "$2.50" },
  { year: "FY 2020", revenue: "$5.4B", growth: "+8%", ebitda: "$0.92B", margin: "17.1%", eps: "$2.18" },
];

const events = [
  { date: "July 30, 2024", title: "Q2 2024 Financial Results", type: "Earnings" },
  { date: "August 14, 2024", title: "Annual General Meeting 2024", type: "AGM" },
  { date: "September 12, 2024", title: "Capital Markets Day — London", type: "Investor Event" },
  { date: "October 30, 2024", title: "Q3 2024 Financial Results", type: "Earnings" },
  { date: "November 18–22, 2024", title: "Non-Deal Roadshow — New York & Toronto", type: "Roadshow" },
];

const reports = [
  { title: "FY 2023 Annual Report", type: "Annual Report", date: "March 2024", size: "8.4 MB" },
  { title: "Q1 2024 Earnings Release", type: "Earnings", date: "April 2024", size: "1.2 MB" },
  { title: "2023 ESG Report", type: "ESG", date: "February 2024", size: "5.6 MB" },
  { title: "2024 Interim Report", type: "Interim", date: "August 2024", size: "2.8 MB" },
  { title: "FY 2023 Investor Presentation", type: "Presentation", date: "March 2024", size: "6.2 MB" },
  { title: "Credit Rating Report — Moody's A2", type: "Rating", date: "January 2024", size: "0.8 MB" },
];

const governance = [
  { title: "Board Composition", desc: "10-member board: 6 independent non-executive directors, 3 executive directors, 1 employee representative. 40% women on the board." },
  { title: "Audit Committee", desc: "All-independent committee chaired by former PwC Global Managing Partner. Meets quarterly and oversees all financial reporting and external audit." },
  { title: "Remuneration Policy", desc: "Executive pay linked 60% to long-term TSR performance targets over 3 years, aligned with shareholder interests." },
  { title: "Anti-Corruption", desc: "Zero-tolerance policy enforced through mandatory training for all 47,000 employees, anonymous whistleblower hotline, and external audit." },
];

export default function InvestorsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-[#0a1628] pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1400&h=600&fit=crop" alt="Investor Relations" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] to-[#0a1628]/80" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-[#c9a227]" />
            <span className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold">Investor Relations</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">Investors</h1>
          <p className="text-white/70 text-xl max-w-3xl leading-relaxed">
            SinoGlobal Enterprise is listed on the Shanghai Stock Exchange (ticker: 601888.SS). We are committed to transparent, timely communication with our shareholders and the investment community.
          </p>
          <div className="flex flex-wrap gap-8 mt-10">
            {[
              { value: "$8.2B", label: "FY 2023 Revenue" },
              { value: "+18%", label: "YoY Growth" },
              { value: "20.0%", label: "EBITDA Margin" },
              { value: "A2", label: "Moody's Rating" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-[#c9a227]">{s.value}</div>
                <div className="text-white/60 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="bg-[#c9a227] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: TrendingUp, value: "18%", label: "10-Year CAGR" },
              { icon: DollarSign, value: "$3.42", label: "EPS (FY 2023)" },
              { icon: BarChart3, value: "$1.64B", label: "EBITDA (FY 2023)" },
              { icon: Award, value: "A2 / BBB+", label: "Credit Ratings" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <s.icon className="w-6 h-6 text-[#0a1628]/60 mb-2" />
                <div className="text-3xl font-bold text-[#0a1628]">{s.value}</div>
                <div className="text-[#0a1628]/70 text-sm font-semibold">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Performance */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8 bg-[#c9a227]" />
              <span className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold">Performance</span>
              <div className="h-px w-8 bg-[#c9a227]" />
            </div>
            <h2 className="text-4xl font-bold text-foreground">Financial Highlights</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-[#c9a227]">
                  <th className="text-left py-4 px-4 text-sm font-bold text-foreground">Financial Year</th>
                  <th className="text-right py-4 px-4 text-sm font-bold text-foreground">Revenue</th>
                  <th className="text-right py-4 px-4 text-sm font-bold text-foreground">Growth</th>
                  <th className="text-right py-4 px-4 text-sm font-bold text-foreground">EBITDA</th>
                  <th className="text-right py-4 px-4 text-sm font-bold text-foreground">Margin</th>
                  <th className="text-right py-4 px-4 text-sm font-bold text-foreground">EPS</th>
                </tr>
              </thead>
              <tbody>
                {financials.map((row, i) => (
                  <tr key={row.year} className={`border-b border-border ${i === 0 ? "bg-[#c9a227]/5" : ""}`}>
                    <td className="py-4 px-4 font-semibold text-foreground">
                      {row.year} {i === 0 && <span className="ml-2 text-xs bg-[#c9a227] text-[#0a1628] px-2 py-0.5 rounded font-bold">Latest</span>}
                    </td>
                    <td className="py-4 px-4 text-right font-bold text-[#c9a227]">{row.revenue}</td>
                    <td className="py-4 px-4 text-right text-green-500 font-semibold">{row.growth}</td>
                    <td className="py-4 px-4 text-right text-foreground">{row.ebitda}</td>
                    <td className="py-4 px-4 text-right text-muted-foreground">{row.margin}</td>
                    <td className="py-4 px-4 text-right text-muted-foreground">{row.eps}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-4">All figures in USD. Full audited financial statements available in our Annual Reports.</p>
        </div>
      </section>

      {/* Calendar + Reports */}
      <section className="py-24 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Events Calendar */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-8 bg-[#c9a227]" />
                <span className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold">Calendar</span>
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-8">Investor Events</h2>
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.title} className="flex gap-5 bg-card border border-border rounded-xl p-5 hover:border-[#c9a227]/30 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-[#c9a227]/10 flex items-center justify-center shrink-0">
                      <Calendar className="w-5 h-5 text-[#c9a227]" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">{event.date}</div>
                      <div className="font-semibold text-foreground text-sm">{event.title}</div>
                      <span className="inline-block mt-1.5 px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded font-medium">{event.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reports */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-8 bg-[#c9a227]" />
                <span className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold">Documents</span>
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-8">Reports & Filings</h2>
              <div className="space-y-3">
                {reports.map((report) => (
                  <div key={report.title} className="flex items-center justify-between bg-card border border-border rounded-xl px-5 py-4 hover:border-[#c9a227]/30 transition-colors group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <FileText className="w-5 h-5 text-[#c9a227] shrink-0" />
                      <div>
                        <div className="font-medium text-foreground text-sm group-hover:text-[#c9a227] transition-colors">{report.title}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{report.date} · {report.size}</div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-muted text-muted-foreground text-xs rounded font-medium shrink-0 ml-4">{report.type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Governance */}
      <section className="py-24 bg-[#0a1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8 bg-[#c9a227]" />
              <span className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold">Governance</span>
              <div className="h-px w-8 bg-[#c9a227]" />
            </div>
            <h2 className="text-4xl font-bold text-white">Corporate Governance</h2>
            <p className="text-white/50 mt-3 max-w-xl mx-auto">Our governance framework meets or exceeds requirements of the Shanghai Stock Exchange, the Hong Kong SFC, and the UK Corporate Governance Code.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {governance.map((item) => (
              <div key={item.title} className="bg-white/5 border border-white/10 rounded-xl p-7 hover:border-[#c9a227]/30 transition-colors">
                <h4 className="font-bold text-white mb-3">{item.title}</h4>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IR Contacts */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8 bg-[#c9a227]" />
              <span className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold">Contact</span>
              <div className="h-px w-8 bg-[#c9a227]" />
            </div>
            <h2 className="text-4xl font-bold text-foreground">Investor Relations Contacts</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { name: "Director of IR", person: "Monica Chen", email: "ir@sinoglobal.com", phone: "+86 10 8888 6666 ext. 810", region: "Global" },
              { name: "IR Manager — Europe", person: "James Worthington", email: "ir.europe@sinoglobal.com", phone: "+44 20 7888 4410", region: "Europe / Americas" },
              { name: "IR Manager — Asia", person: "Alicia Tan", email: "ir.asia@sinoglobal.com", phone: "+65 6888 9910", region: "Asia Pacific" },
            ].map((c) => (
              <div key={c.name} className="bg-card border border-border rounded-xl p-6 hover:border-[#c9a227]/40 transition-colors">
                <div className="text-xs font-semibold text-[#c9a227] uppercase tracking-wide mb-2">{c.region}</div>
                <h4 className="font-bold text-foreground mb-0.5">{c.person}</h4>
                <p className="text-sm text-muted-foreground mb-4">{c.name}</p>
                <div className="space-y-2">
                  <a href={`mailto:${c.email}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[#c9a227] transition-colors">
                    <Mail className="w-4 h-4" /> {c.email}
                  </a>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4" /> {c.phone}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
