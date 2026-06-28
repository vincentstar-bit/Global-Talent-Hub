import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "wouter";
import { CheckCircle, ArrowRight, Flame, Shield, Wrench, Globe, Users, TrendingUp, AlertTriangle, Zap, Layers, Anchor } from "lucide-react";

const rigs = [
  {
    id: "sge-pioneer",
    name: "SGE Pioneer",
    type: "Semi-Submersible",
    status: "Operational",
    location: "Gulf of Guinea, Nigeria",
    depth: "1,800m",
    capacity: "50,000 bbl/day",
    crew: 220,
    year: 2019,
    img: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&h=500&fit=crop",
    desc: "Our flagship deep-water semi-submersible rig, SGE Pioneer operates in ultra-deep waters off the Nigerian coast. Equipped with the latest automated drilling and blowout preventer technology, it sets the benchmark for efficiency and safety in the region.",
  },
  {
    id: "sge-dragon",
    name: "SGE Dragon",
    type: "Jack-Up Rig",
    status: "Operational",
    location: "South China Sea",
    depth: "120m",
    capacity: "30,000 bbl/day",
    crew: 150,
    year: 2017,
    img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=500&fit=crop",
    desc: "SGE Dragon is a premium independent leg jack-up rig deployed in the South China Sea. Purpose-built for shallow-water fields, it supports SinoGlobal's upstream operations in partnership with national energy companies across Southeast Asia.",
  },
  {
    id: "sge-atlas",
    name: "SGE Atlas",
    type: "Drillship",
    status: "Operational",
    location: "Offshore Angola, Block 32",
    depth: "3,000m",
    capacity: "60,000 bbl/day",
    crew: 200,
    year: 2021,
    img: "https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?w=800&h=500&fit=crop",
    desc: "The most advanced vessel in the SinoGlobal fleet, SGE Atlas is a sixth-generation ultra-deep-water drillship capable of operating in 3,000 metres of water. Deployed in Angola's prolific Block 32, it leverages dynamic positioning and AI-assisted drilling systems.",
  },
  {
    id: "sge-horizon",
    name: "SGE Horizon",
    type: "Fixed Platform",
    status: "Under Construction",
    location: "Persian Gulf, UAE",
    depth: "80m",
    capacity: "45,000 bbl/day",
    crew: 180,
    year: 2026,
    img: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&h=500&fit=crop",
    desc: "Currently under construction and scheduled for commissioning in late 2026, SGE Horizon is a steel-jacket fixed platform designed for long-term production in the Persian Gulf. Built to withstand extreme temperatures and endure a 30-year operational life.",
  },
];

const capabilities = [
  {
    icon: Layers,
    title: "Deep-Water Drilling",
    desc: "Operations down to 3,000 metres water depth using sixth-generation semi-submersibles and drillships with dual-gradient drilling systems.",
  },
  {
    icon: Wrench,
    title: "Well Engineering",
    desc: "Full-cycle well design, casing & completion engineering, and well-integrity management across exploration, appraisal, and production wells.",
  },
  {
    icon: Shield,
    title: "Safety & Compliance",
    desc: "ISO 45001 certified HSE management. All rigs operate under IMCA, IADC, and OPITO standards with real-time safety monitoring dashboards.",
  },
  {
    icon: Zap,
    title: "Enhanced Oil Recovery",
    desc: "Proprietary EOR techniques including polymer flooding and CO₂ injection, improving field recovery rates by up to 18% above industry average.",
  },
  {
    icon: Globe,
    title: "Logistics & Supply Chain",
    desc: "Integrated offshore logistics — helicopter crew changes, supply vessel management, and subsea intervention — across 4 continents.",
  },
  {
    icon: Flame,
    title: "Gas Processing",
    desc: "Zero-routine-flaring policy enforced across all assets. Associated gas captured and processed for local LNG supply or reinjection.",
  },
];

const stats = [
  { value: "4", label: "Active / Under Construction Rigs" },
  { value: "185,000", label: "Barrels per Day (Gross)" },
  { value: "12", label: "Countries with Upstream Assets" },
  { value: "750+", label: "Offshore Personnel" },
];

const safetyMetrics = [
  { label: "Lost Time Incident Rate (LTIR)", value: "0.12", benchmark: "Industry avg: 0.45" },
  { label: "Total Recordable Incident Rate (TRIR)", value: "0.31", benchmark: "Industry avg: 0.92" },
  { label: "Zero Uncontrolled Hydrocarbon Releases", value: "3 yrs", benchmark: "Since 2022" },
  { label: "HSE Training Hours (2024)", value: "82,400", benchmark: "Per fleet" },
];

const partners = [
  "Nigerian National Petroleum Corporation (NNPC)",
  "Angola National Oil Company (Sonangol)",
  "Abu Dhabi National Oil Company (ADNOC)",
  "China National Offshore Oil Corporation (CNOOC)",
  "TotalEnergies SE",
  "Shell Plc",
];

export default function OilRigsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-[#0a1628] pt-32 pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=1600&h=700&fit=crop"
            alt="Offshore oil rig at sea"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/90 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-[#c9a227]" />
            <span className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold">Upstream Energy Division</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Oil Rig<br />Operations
          </h1>
          <p className="text-white/70 text-xl max-w-2xl leading-relaxed mb-8">
            SinoGlobal Energy operates a world-class fleet of offshore drilling rigs across four continents — combining Chinese engineering excellence with global operational standards to unlock the world's deepest and most complex hydrocarbon reserves.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="px-8 py-4 bg-[#c9a227] text-[#0a1628] font-bold rounded hover:bg-[#d4af37] transition-colors inline-flex items-center gap-2">
              Enquire About Our Fleet <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#fleet" className="px-8 py-4 border border-white/20 text-white font-semibold rounded hover:border-[#c9a227] hover:text-[#c9a227] transition-colors">
              View Fleet
            </a>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#c9a227] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-[#0a1628]">{s.value}</div>
                <div className="text-[#0a1628]/70 text-sm font-semibold">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-8 bg-[#c9a227]" />
                <span className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold">About Our Operations</span>
              </div>
              <h2 className="text-4xl font-bold text-foreground mb-6">Powering the World's Energy Security</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                SinoGlobal's Upstream Energy Division was established in 2012 to extend the group's engineering capabilities into offshore hydrocarbon extraction. Today, our fleet of semi-submersible rigs, jack-ups, drillships, and fixed platforms produces over 185,000 barrels of oil equivalent per day across assets in West Africa, Southeast Asia, and the Middle East.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We operate in partnership with national oil companies and international majors, bringing Chinese capital efficiency alongside globally certified HSE and operational management systems. Every rig in our fleet meets IMCA, IADC, and flag-state requirements, and our zero-routine-flaring policy is enforced across all assets.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Anchor, label: "4 Rig Types", sub: "Semi-sub, Jack-up, Drillship, Fixed" },
                  { icon: Globe, label: "12 Countries", sub: "Upstream oil & gas assets" },
                  { icon: Users, label: "750+ Crew", sub: "Offshore personnel worldwide" },
                  { icon: Shield, label: "ISO 45001", sub: "HSE management certified" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3 p-4 bg-card border border-border rounded-xl">
                    <div className="w-9 h-9 rounded-lg bg-[#c9a227]/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-[#c9a227]" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-foreground">{item.label}</div>
                      <div className="text-xs text-muted-foreground">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=600&fit=crop"
                alt="Offshore drilling operations"
                className="rounded-2xl w-full h-[460px] object-cover shadow-2xl"
              />
              <div className="absolute -bottom-5 -left-5 bg-[#0a1628] border border-[#c9a227]/30 rounded-xl px-6 py-4 shadow-xl hidden md:block">
                <div className="text-[#c9a227] font-bold text-lg">185,000 bbl/day</div>
                <div className="text-white/60 text-xs">Gross Production Capacity</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet */}
      <section id="fleet" className="py-24 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8 bg-[#c9a227]" />
              <span className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold">Our Fleet</span>
              <div className="h-px w-8 bg-[#c9a227]" />
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">Offshore Drilling Assets</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From shallow-water jack-ups to ultra-deep-water drillships — our fleet is designed to access reserves others cannot reach.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {rigs.map((rig) => (
              <div key={rig.id} className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg hover:border-[#c9a227]/40 transition-colors group">
                <div className="relative h-56 overflow-hidden">
                  <img src={rig.img} alt={rig.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      rig.status === "Operational"
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                    }`}>
                      {rig.status === "Operational" ? "● " : "◌ "}{rig.status}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="text-white font-bold text-xl">{rig.name}</div>
                    <div className="text-[#c9a227] text-sm">{rig.type}</div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">{rig.desc}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Location", value: rig.location },
                      { label: "Water Depth", value: rig.depth },
                      { label: "Capacity", value: rig.capacity },
                      { label: "Crew", value: `${rig.crew} personnel` },
                      { label: "Commissioned", value: rig.year },
                      { label: "Rig Type", value: rig.type },
                    ].map((item) => (
                      <div key={item.label} className="bg-muted/40 rounded-lg px-3 py-2">
                        <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-0.5">{item.label}</div>
                        <div className="text-sm font-semibold text-foreground">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8 bg-[#c9a227]" />
              <span className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold">Technical Excellence</span>
              <div className="h-px w-8 bg-[#c9a227]" />
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">Core Capabilities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              End-to-end upstream capability — from exploration drilling to enhanced recovery — backed by world-class engineering teams.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap) => (
              <div key={cap.title} className="p-6 bg-card border border-border rounded-2xl hover:border-[#c9a227]/40 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-[#c9a227]/10 flex items-center justify-center mb-4 group-hover:bg-[#c9a227]/20 transition-colors">
                  <cap.icon className="w-6 h-6 text-[#c9a227]" />
                </div>
                <h3 className="text-foreground font-bold text-lg mb-2">{cap.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety */}
      <section className="py-24 bg-[#0a1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-8 bg-[#c9a227]" />
                <span className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold">Health, Safety & Environment</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-6">Safety is Non-Negotiable</h2>
              <p className="text-white/60 leading-relaxed mb-6">
                Every SinoGlobal rig operates under a comprehensive HSE Management System certified to ISO 45001 and OSHAS 18001 standards. Our safety performance consistently outperforms the IADC industry benchmark, driven by a culture that empowers every crew member to stop unsafe work.
              </p>
              <div className="flex items-start gap-3 p-4 bg-[#c9a227]/8 border border-[#c9a227]/20 rounded-xl mb-6">
                <AlertTriangle className="w-5 h-5 text-[#c9a227] shrink-0 mt-0.5" />
                <p className="text-white/70 text-sm">
                  <span className="text-[#c9a227] font-semibold">Stop-Work Authority:</span> Every crew member, regardless of rank, has the absolute right and responsibility to stop any operation they believe is unsafe.
                </p>
              </div>
              <div className="space-y-3">
                {["Real-time well control monitoring (24/7)", "Quarterly unannounced safety audits", "Blowout preventer (BOP) testing every 14 days", "Emergency response drills — monthly", "Zero-routine-flaring policy across all assets"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#c9a227] shrink-0" />
                    <span className="text-white/70 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {safetyMetrics.map((m) => (
                <div key={m.label} className="bg-white/5 border border-white/10 rounded-xl px-6 py-5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white/60 text-sm">{m.label}</span>
                    <span className="text-[#c9a227] text-xs">{m.benchmark}</span>
                  </div>
                  <div className="text-3xl font-bold text-white">{m.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-24 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8 bg-[#c9a227]" />
              <span className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold">Industry Partnerships</span>
              <div className="h-px w-8 bg-[#c9a227]" />
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">Joint Venture Partners</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We co-invest and co-operate with the world's leading national oil companies and international majors.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {partners.map((partner) => (
              <div key={partner} className="flex items-center gap-3 bg-card border border-border rounded-xl px-5 py-4 hover:border-[#c9a227]/40 transition-colors">
                <div className="w-2 h-2 rounded-full bg-[#c9a227] shrink-0" />
                <span className="text-sm font-medium text-foreground">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0a1628]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Partner With Our Energy Division</h2>
          <p className="text-white/60 mb-8 text-lg">
            Interested in joint ventures, rig charters, or technical services? Our upstream team is ready to discuss opportunities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="px-8 py-4 bg-[#c9a227] text-[#0a1628] font-bold rounded hover:bg-[#d4af37] transition-colors inline-flex items-center gap-2">
              Contact Energy Division <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/careers" className="px-8 py-4 border border-white/20 text-white font-semibold rounded hover:border-[#c9a227] hover:text-[#c9a227] transition-colors">
              Offshore Careers
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
