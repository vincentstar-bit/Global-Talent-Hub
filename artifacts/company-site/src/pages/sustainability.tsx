import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "wouter";
import { Leaf, Zap, Users, Globe, CheckCircle, TrendingDown, Award, ArrowRight, TreePine, Droplets, Sun, Factory } from "lucide-react";

const pillars = [
  {
    icon: Leaf,
    title: "Environmental Stewardship",
    desc: "Achieving carbon neutrality by 2045, reducing operational emissions 34% since 2015, and investing $1.2B in renewable energy across our global footprint.",
    stats: [
      { value: "34%", label: "Emissions Reduction (vs 2015)" },
      { value: "42%", label: "Renewable Energy Share" },
      { value: "2045", label: "Carbon Neutral Target" },
    ],
    img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=350&fit=crop",
  },
  {
    icon: Users,
    title: "Social Responsibility",
    desc: "Investing in communities where we operate — from local hiring programs to healthcare infrastructure and education partnerships across 43 countries.",
    stats: [
      { value: "180,000+", label: "Local Jobs Created" },
      { value: "$340M", label: "Community Investment" },
      { value: "800+", label: "Schools & Clinics Supported" },
    ],
    img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=350&fit=crop",
  },
  {
    icon: Award,
    title: "Corporate Governance",
    desc: "Rigorous governance frameworks, transparent reporting, and a board-level ESG committee ensuring accountability across all operations.",
    stats: [
      { value: "AA", label: "MSCI ESG Rating" },
      { value: "A–", label: "CDP Climate Rating" },
      { value: "100%", label: "Anti-corruption Training" },
    ],
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=350&fit=crop",
  },
];

const initiatives = [
  { icon: Sun, title: "Solar Infrastructure Programme", desc: "Deploying 2.4GW of solar capacity across African and Southeast Asian markets by 2026, providing clean power to 4 million households.", tag: "Energy", status: "Active" },
  { icon: TreePine, title: "Carbon Forest Initiative", desc: "Partnering with national governments to plant 50 million trees across degraded land in Nigeria, Kenya, and Indonesia by 2027.", tag: "Climate", status: "Active" },
  { icon: Droplets, title: "Clean Water Access Project", desc: "Building water treatment and sanitation infrastructure for 2 million people across rural communities in sub-Saharan Africa.", tag: "Social", status: "Active" },
  { icon: Factory, title: "Green Manufacturing Transition", desc: "Converting all 12 major manufacturing facilities to zero-carbon energy by 2030, supported by a $400M internal green bond.", tag: "Operations", status: "2025–2030" },
  { icon: Users, title: "Women in STEM Scholarship", desc: "Annual scholarships for 500 women in STEM fields across developing markets, with guaranteed internship pathways at SinoGlobal.", tag: "Social", status: "Since 2018" },
  { icon: Zap, title: "EV Fleet Transition", desc: "Converting all 8,500 company vehicles globally to electric or hydrogen fuel cell by 2028, reducing scope 2 fleet emissions by 91%.", tag: "Transport", status: "2024–2028" },
];

const timeline = [
  { year: "2015", event: "Signed UN Global Compact", detail: "Committed to human rights, labour standards, environmental protection, and anti-corruption principles." },
  { year: "2018", event: "First ESG Report Published", detail: "Launched annual ESG reporting framework aligned with GRI Standards and TCFD recommendations." },
  { year: "2020", event: "Net Zero Pledge Announced", detail: "Committed to achieving net-zero greenhouse gas emissions across all operations by 2045." },
  { year: "2021", event: "CDP Climate Leadership", detail: "Achieved A– rating — placing SinoGlobal in the top 10% of global companies for climate disclosure." },
  { year: "2022", event: "$1.2B Green Investment", detail: "Committed $1.2 billion to renewable energy, clean water, and sustainable infrastructure over five years." },
  { year: "2023", event: "MSCI ESG Rating: AA", detail: "Upgraded to AA — recognising strong performance across environmental, social, and governance metrics." },
  { year: "2024", event: "Scope 3 Emissions Inventory", detail: "Completed full Scope 3 emissions mapping across all 43 country operations and 2,400 suppliers." },
];

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-[#0a1628] pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1400&h=700&fit=crop" alt="Sustainability" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/80 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-[#c9a227]" />
            <span className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold">ESG & Sustainability</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">Building a Better World</h1>
          <p className="text-white/70 text-xl max-w-3xl leading-relaxed">
            Sustainability is not a side project at SinoGlobal — it is embedded in every investment decision, every contract, and every community we serve across 43 countries.
          </p>
          <div className="flex flex-wrap gap-8 mt-10">
            {[
              { value: "34%", label: "Emissions reduced since 2015" },
              { value: "A–", label: "CDP Climate Rating" },
              { value: "AA", label: "MSCI ESG Rating" },
              { value: "$1.2B", label: "Committed to green investment" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-[#c9a227]">{s.value}</div>
                <div className="text-white/60 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8 bg-[#c9a227]" />
              <span className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold">Our Approach</span>
              <div className="h-px w-8 bg-[#c9a227]" />
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">ESG Framework</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Our sustainability strategy is built on three interconnected pillars — environment, social, and governance — each with measurable targets and annual reporting.</p>
          </div>
          <div className="space-y-20">
            {pillars.map((pillar, i) => (
              <div key={pillar.title} className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? "lg:grid-flow-dense" : ""}`}>
                <div className={i % 2 === 1 ? "lg:col-start-2" : ""}>
                  <div className="w-12 h-12 rounded-xl bg-[#c9a227]/10 border border-[#c9a227]/30 flex items-center justify-center mb-5">
                    <pillar.icon className="w-6 h-6 text-[#c9a227]" />
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-4">{pillar.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-8 text-lg">{pillar.desc}</p>
                  <div className="grid grid-cols-3 gap-4">
                    {pillar.stats.map((s) => (
                      <div key={s.label} className="bg-card border border-border rounded-xl p-5 text-center">
                        <div className="text-2xl font-bold text-[#c9a227]">{s.value}</div>
                        <div className="text-xs text-muted-foreground mt-1 leading-tight">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}>
                  <img src={pillar.img} alt={pillar.title} className="rounded-2xl w-full h-72 object-cover shadow-xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives */}
      <section className="py-24 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8 bg-[#c9a227]" />
              <span className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold">Programmes</span>
              <div className="h-px w-8 bg-[#c9a227]" />
            </div>
            <h2 className="text-4xl font-bold text-foreground">Flagship Initiatives</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initiatives.map((item) => (
              <div key={item.title} className="bg-card border border-border rounded-xl p-7 hover:border-[#c9a227]/40 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#c9a227]/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-[#c9a227]" />
                  </div>
                  <span className="px-2.5 py-1 bg-muted text-muted-foreground text-xs rounded-full font-medium">{item.status}</span>
                </div>
                <div className="text-xs font-semibold text-[#c9a227] mb-2 uppercase tracking-wide">{item.tag}</div>
                <h3 className="font-bold text-foreground text-base mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ESG Timeline */}
      <section className="py-24 bg-[#0a1628]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8 bg-[#c9a227]" />
              <span className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold">Progress</span>
              <div className="h-px w-8 bg-[#c9a227]" />
            </div>
            <h2 className="text-4xl font-bold text-white">ESG Journey</h2>
          </div>
          <div className="relative">
            <div className="absolute left-14 top-0 bottom-0 w-px bg-white/10" />
            <div className="space-y-8">
              {timeline.map((item) => (
                <div key={item.year} className="flex gap-8">
                  <div className="relative flex-shrink-0 w-10 text-right pt-0.5">
                    <span className="text-[#c9a227] font-bold text-xs">{item.year}</span>
                    <div className="absolute right-[-21px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#c9a227]" />
                  </div>
                  <div className="flex-1 pb-6 border-b border-white/10 last:border-0 pl-6">
                    <h4 className="font-bold text-white mb-1">{item.event}</h4>
                    <p className="text-sm text-white/50 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8 bg-[#c9a227]" />
              <span className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold">2030 Targets</span>
              <div className="h-px w-8 bg-[#c9a227]" />
            </div>
            <h2 className="text-4xl font-bold text-foreground">Our Commitments</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              "Reduce Scope 1 & 2 emissions by 60% vs 2015 baseline by 2030",
              "Source 80% of electricity from renewable energy by 2030",
              "Achieve zero waste-to-landfill across all manufacturing facilities by 2028",
              "Ensure 40% women in senior leadership by 2026",
              "Train 100% of employees in ethics and anti-corruption annually",
              "Publish verified ESG data aligned with TCFD and GRI Standards",
              "Invest minimum 2% of net profit in community development annually",
              "Achieve ISO 50001 Energy Management certification across all major sites by 2026",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 bg-card border border-border rounded-lg px-5 py-4">
                <CheckCircle className="w-5 h-5 text-[#c9a227] shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#c9a227]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#0a1628] mb-4">Download Our ESG Report</h2>
          <p className="text-[#0a1628]/70 mb-8">Our annual ESG report provides full disclosure on progress against all targets, aligned with GRI Standards and TCFD recommendations.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-3.5 bg-[#0a1628] text-white font-bold rounded hover:bg-[#0d1f38] transition-colors">
              Download 2023 ESG Report (PDF)
            </button>
            <Link href="/contact" className="px-8 py-3.5 border-2 border-[#0a1628] text-[#0a1628] font-bold rounded hover:bg-[#0a1628]/10 transition-colors">
              ESG Enquiries
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
