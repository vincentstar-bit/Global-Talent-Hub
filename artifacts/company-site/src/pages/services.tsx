import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "wouter";
import { Building2, BarChart3, HeartPulse, Ship, Cpu, FlaskConical, Home, Globe, ArrowRight, CheckCircle, TrendingUp, Users } from "lucide-react";

const divisions = [
  {
    id: "engineering",
    name: "Engineering & Technology",
    icon: Building2,
    tagline: "Building infrastructure that lasts generations",
    revenue: "$2.4B",
    employees: "12,000+",
    countries: 28,
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=450&fit=crop",
    desc: "Our flagship division delivers turnkey infrastructure projects across road networks, rail corridors, bridges, ports, energy facilities, and smart city developments. Operating across 28 countries, we bring Chinese engineering excellence and international standards to some of the world's most challenging environments.",
    services: ["Large-scale infrastructure design & construction", "Smart city planning & implementation", "Power plant & energy facility development", "Transport & logistics infrastructure", "Water treatment & sanitation projects", "Project management for government & private clients"],
    projects: [
      { name: "Tanzania Rail Corridor", value: "$2.1B", year: "2024" },
      { name: "Lagos Port Expansion", value: "$480M", year: "2023" },
      { name: "Riyadh Smart District", value: "$680M", year: "2023" },
    ],
  },
  {
    id: "finance",
    name: "Finance & Investment",
    icon: BarChart3,
    tagline: "Strategic capital across global markets",
    revenue: "$1.8B",
    employees: "4,200+",
    countries: 35,
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=450&fit=crop",
    desc: "SinoGlobal Capital manages a diversified portfolio of investments across private equity, real estate, infrastructure funds, and public markets. Our team of 4,200+ finance professionals serves sovereign wealth funds, institutional investors, and corporate clients across 35 countries.",
    services: ["Private equity & venture capital", "M&A advisory & transaction management", "Treasury & FX risk management", "Infrastructure project finance", "Structured trade finance", "Sovereign advisory services"],
    projects: [
      { name: "SE Asia Infrastructure Fund", value: "$800M", year: "2024" },
      { name: "UK Renewable Energy Portfolio", value: "$340M", year: "2023" },
      { name: "African Sovereign Bond Placement", value: "$600M", year: "2023" },
    ],
  },
  {
    id: "healthcare",
    name: "Healthcare & Pharmaceuticals",
    icon: HeartPulse,
    tagline: "Advancing medicine for emerging markets",
    revenue: "$980M",
    employees: "8,500+",
    countries: 18,
    img: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&h=450&fit=crop",
    desc: "BioSino Medical — our pharmaceutical division — develops, manufactures, and distributes essential medicines and vaccines across Asia, Africa, and the Middle East. With 3,200 researchers across 6 R&D centres, we focus on diseases prevalent in emerging markets that are underserved by global pharma.",
    services: ["Pharmaceutical R&D & clinical trials", "Generic and branded medicine manufacturing", "Vaccine development & cold-chain distribution", "Hospital design & healthcare infrastructure", "Medical device distribution", "Healthcare workforce training programs"],
    projects: [
      { name: "SGE-2204 Oncology Programme", value: "Phase III", year: "2024" },
      { name: "Malaria Vaccine Partnership (WHO)", value: "$120M", year: "2023" },
      { name: "Nigeria Hospital Network", value: "$210M", year: "2022" },
    ],
  },
  {
    id: "logistics",
    name: "Operations & Logistics",
    icon: Ship,
    tagline: "Connecting supply chains across continents",
    revenue: "$1.1B",
    employees: "9,800+",
    countries: 38,
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=450&fit=crop",
    desc: "SinoGlobal Logistics is a full-service supply chain management company, operating warehousing, freight forwarding, customs clearance, and last-mile delivery networks across 38 countries. We specialise in linking Chinese manufacturers with emerging market consumers through efficient, tech-enabled logistics.",
    services: ["International freight forwarding (sea, air, rail)", "Bonded warehouse management", "Cross-border customs clearance", "Cold chain logistics", "E-commerce fulfilment services", "Supply chain consulting & optimisation"],
    projects: [
      { name: "China-Europe Rail Freight Hub", value: "$450M", year: "2023" },
      { name: "West Africa Distribution Network", value: "$180M", year: "2023" },
      { name: "Cold Chain Pharma Network, SE Asia", value: "$95M", year: "2024" },
    ],
  },
  {
    id: "it",
    name: "Information Technology",
    icon: Cpu,
    tagline: "Enterprise technology for a connected world",
    revenue: "$760M",
    employees: "6,200+",
    countries: 22,
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop",
    desc: "SinoGlobal Technologies provides enterprise software, cloud infrastructure, AI solutions, and cybersecurity services to governments, financial institutions, and large enterprises across 22 countries. Our cloud platform serves 12+ million users daily and powers mission-critical applications for 80+ government clients.",
    services: ["Enterprise cloud platform (SinoCloud)", "AI & machine learning solutions", "Cybersecurity & data protection", "Government digital transformation", "ERP system implementation", "Digital identity & smart card systems"],
    projects: [
      { name: "Kenya National Digital ID Platform", value: "$85M", year: "2024" },
      { name: "Saudi E-Government Cloud Migration", value: "$320M", year: "2023" },
      { name: "SinoCloud Enterprise Suite v3.0", value: "Platform", year: "2023" },
    ],
  },
  {
    id: "research",
    name: "Research & Development",
    icon: FlaskConical,
    tagline: "Innovating for the next decade",
    revenue: "$340M",
    employees: "4,100+",
    countries: 8,
    img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=450&fit=crop",
    desc: "SinoGlobal R&D invests 8% of annual group revenue into breakthrough research across materials science, clean energy, biotechnology, and advanced manufacturing. With laboratories in Beijing, Shanghai, Singapore, London, and Munich, we file an average of 120 patents per year.",
    services: ["Advanced materials research", "Clean energy & hydrogen technology", "Biotechnology & genomics", "Smart manufacturing & robotics", "Quantum computing applications", "University & government research partnerships"],
    projects: [
      { name: "Solid-State Battery Programme", value: "$200M", year: "Ongoing" },
      { name: "Green Hydrogen Pilot Plant", value: "$150M", year: "2023" },
      { name: "Synthetic Biology Platform", value: "$80M", year: "2024" },
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-[#0a1628] pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&h=600&fit=crop" alt="SinoGlobal operations" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-[#c9a227]" />
            <span className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold">Business Divisions</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">Our Services</h1>
          <p className="text-white/70 text-xl max-w-3xl leading-relaxed">
            Six core divisions — each a market leader — delivering integrated solutions for the world's most complex challenges. Combined revenue: $8.2B across 43 countries.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            {divisions.map((d) => (
              <a key={d.id} href={`#${d.id}`} className="px-4 py-2 bg-white/5 border border-white/10 text-white/70 rounded-full text-sm hover:border-[#c9a227] hover:text-[#c9a227] transition-colors">
                {d.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Overview metrics */}
      <section className="bg-[#c9a227] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "6", label: "Core Divisions" },
              { value: "$8.2B", label: "Combined Revenue" },
              { value: "47,000+", label: "Professionals" },
              { value: "43", label: "Countries Served" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-[#0a1628]">{s.value}</div>
                <div className="text-[#0a1628]/70 text-sm font-semibold">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Division sections */}
      {divisions.map((div, index) => (
        <section key={div.id} id={div.id} className={`py-24 ${index % 2 === 0 ? "bg-background" : "bg-muted/20"}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? "lg:grid-flow-dense" : ""}`}>
              <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#c9a227] flex items-center justify-center">
                    <div.icon className="w-5 h-5 text-[#0a1628]" />
                  </div>
                  <span className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold">Division</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">{div.name}</h2>
                <p className="text-muted-foreground italic mb-6">{div.tagline}</p>
                <div className="flex gap-6 mb-6">
                  {[
                    { icon: TrendingUp, label: "Revenue", value: div.revenue },
                    { icon: Users, label: "Team", value: div.employees },
                    { icon: Globe, label: "Countries", value: `${div.countries}` },
                  ].map((s) => (
                    <div key={s.label}>
                      <div className="text-xl font-bold text-[#c9a227]">{s.value}</div>
                      <div className="text-xs text-muted-foreground">{s.label}</div>
                    </div>
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">{div.desc}</p>
                <div className="mb-6">
                  <h4 className="font-bold text-foreground text-sm mb-3">Core Services</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {div.services.map((s) => (
                      <div key={s} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-[#c9a227] shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm mb-3">Featured Projects</h4>
                  <div className="space-y-2">
                    {div.projects.map((p) => (
                      <div key={p.name} className="flex items-center justify-between bg-card border border-border rounded-lg px-4 py-3">
                        <span className="text-sm font-medium text-foreground">{p.name}</span>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="text-[#c9a227] font-semibold">{p.value}</span>
                          <span>{p.year}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={`relative ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                <img src={div.img} alt={div.name} className="rounded-2xl w-full h-80 lg:h-[420px] object-cover shadow-2xl" />
                <div className="absolute -bottom-5 -right-5 bg-[#c9a227] rounded-xl px-6 py-4 shadow-xl hidden md:block">
                  <div className="text-[#0a1628] font-bold text-lg">{div.revenue}</div>
                  <div className="text-[#0a1628]/70 text-xs">Annual Revenue</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-20 bg-[#0a1628]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Work With Us?</h2>
          <p className="text-white/60 mb-8 text-lg">Our business development teams are based in 43 countries. Let's discuss how SinoGlobal can serve your needs.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="px-8 py-4 bg-[#c9a227] text-[#0a1628] font-bold rounded hover:bg-[#d4af37] transition-colors inline-flex items-center gap-2">
              Contact a Division <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/careers" className="px-8 py-4 border border-white/20 text-white font-semibold rounded hover:border-[#c9a227] hover:text-[#c9a227] transition-colors">
              Join Our Team
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
