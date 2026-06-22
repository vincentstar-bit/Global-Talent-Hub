import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "wouter";
import { Globe, Users, TrendingUp, Award, Shield, ChevronRight, Building2, Briefcase, Target, Heart } from "lucide-react";

const stats = [
  { label: "Countries", value: "43" },
  { label: "Employees", value: "47,000+" },
  { label: "Annual Revenue", value: "$8.2B" },
  { label: "Years in Business", value: "21+" },
];

const divisions = [
  { name: "Engineering & Technology", desc: "Pioneering next-generation infrastructure and smart city solutions across Asia and beyond." },
  { name: "Finance & Investment", desc: "Managing strategic capital allocations, M&A advisory, and global investment portfolios." },
  { name: "Operations & Logistics", desc: "End-to-end supply chain management connecting manufacturers to markets in 43 countries." },
  { name: "Healthcare & Pharmaceuticals", desc: "Developing life-saving medicines and healthcare infrastructure in emerging markets." },
  { name: "Construction & Real Estate", desc: "Building landmark commercial and residential developments across three continents." },
  { name: "International Trade & Customs", desc: "Facilitating compliant cross-border trade and customs clearance at global scale." },
  { name: "Information Technology", desc: "Delivering enterprise software, cloud platforms, and cybersecurity solutions." },
  { name: "Research & Development", desc: "Driving breakthrough innovations in materials science, biotech, and clean energy." },
];

const values = [
  { icon: Target, title: "Innovation", desc: "We invest 8% of revenue annually in R&D, pioneering solutions that define future industries." },
  { icon: Shield, title: "Integrity", desc: "Every decision upholds the highest standards of corporate governance and ethical conduct." },
  { icon: Globe, title: "Global Excellence", desc: "World-class standards applied consistently across every market and every operation." },
  { icon: TrendingUp, title: "Sustainable Growth", desc: "Long-term value creation through environmentally and socially responsible business practices." },
  { icon: Heart, title: "People First", desc: "Our 47,000 employees are our greatest asset — their development drives our success." },
];

const offices = ["Beijing", "Shanghai", "Hong Kong", "Singapore", "Tokyo", "Seoul", "Dubai", "London", "New York", "Lagos", "Nairobi", "Sydney", "Mumbai", "Paris", "Toronto"];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center bg-[#0a1628] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0d1f38] to-[#0a1628]" />
        <div className="absolute inset-0 opacity-5" style={{backgroundImage: "radial-gradient(circle at 25% 50%, #c9a227 0%, transparent 50%), radial-gradient(circle at 75% 20%, #c9a227 0%, transparent 40%)"}} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 mt-16">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px w-12 bg-[#c9a227]" />
              <span className="text-[#c9a227] text-xs tracking-widest uppercase font-medium">Fortune Global 500 Company</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Building Tomorrow's
              <span className="block text-[#c9a227]">World Economy</span>
            </h1>
            <p className="text-white/70 text-lg sm:text-xl leading-relaxed max-w-2xl mb-10">
              SinoGlobal Enterprise Co., Ltd. is a leading Chinese multinational corporation headquartered in Beijing, delivering excellence across engineering, finance, healthcare, logistics, and technology in 43 countries worldwide.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/about" className="px-8 py-3.5 bg-[#c9a227] text-[#0a1628] font-semibold rounded hover:bg-[#d4af37] transition-colors">
                Discover Our Story
              </Link>
              <Link href="/careers" className="px-8 py-3.5 border border-white/30 text-white rounded hover:border-[#c9a227] hover:text-[#c9a227] transition-colors">
                View Opportunities
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#c9a227] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold text-[#0a1628] mb-1">{stat.value}</div>
                <div className="text-[#0a1628]/70 text-sm font-medium uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About excerpt */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-8 bg-[#c9a227]" />
                <span className="text-[#c9a227] text-xs tracking-widest uppercase font-medium">About SinoGlobal</span>
              </div>
              <h2 className="text-4xl font-bold text-foreground mb-6">Two Decades of Global Leadership</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Founded in 2003 at Zhongguancun Science Park — China's Silicon Valley — SinoGlobal Enterprise has grown from a regional engineering firm into one of China's most internationally recognized conglomerates. Today, we operate in 43 countries with 47,000 employees delivering measurable impact across critical industries.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Under the leadership of Chairman Li Hongbin and CEO Zhang Wei, SinoGlobal has maintained a compound annual growth rate of 18% over the past decade, while earning ISO 9001:2015, ISO 14001:2015, and OHSAS 18001 certifications for our unwavering commitment to quality, environmental responsibility, and workplace safety.
              </p>
              <Link href="/about" className="inline-flex items-center gap-2 text-[#c9a227] font-semibold hover:gap-3 transition-all">
                Read Our Full Story <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Building2, label: "HQ in Beijing", sub: "Zhongguancun Science Park" },
                { icon: Globe, label: "43 Countries", sub: "Global operations" },
                { icon: Users, label: "47,000+", sub: "Employees worldwide" },
                { icon: Award, label: "ISO Certified", sub: "9001, 14001, 18001" },
              ].map((item) => (
                <div key={item.label} className="bg-card border border-border rounded-lg p-6">
                  <item.icon className="w-8 h-8 text-[#c9a227] mb-3" />
                  <div className="font-bold text-foreground">{item.label}</div>
                  <div className="text-sm text-muted-foreground">{item.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divisions */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8 bg-[#c9a227]" />
              <span className="text-[#c9a227] text-xs tracking-widest uppercase font-medium">Our Divisions</span>
              <div className="h-px w-8 bg-[#c9a227]" />
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">Diversified Business Portfolio</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Twelve strategic business units working in concert to deliver integrated solutions for the world's most complex challenges.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {divisions.map((div) => (
              <div key={div.name} className="bg-card border border-border rounded-lg p-6 hover:border-[#c9a227]/40 hover:shadow-md transition-all group">
                <div className="w-1 h-8 bg-[#c9a227] rounded mb-4 group-hover:h-12 transition-all" />
                <h3 className="font-bold text-foreground mb-2 text-sm">{div.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{div.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#0a1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8 bg-[#c9a227]" />
              <span className="text-[#c9a227] text-xs tracking-widest uppercase font-medium">Our Values</span>
              <div className="h-px w-8 bg-[#c9a227]" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {values.map((val) => (
              <div key={val.title} className="text-center">
                <div className="w-14 h-14 rounded-full bg-[#c9a227]/10 border border-[#c9a227]/30 flex items-center justify-center mx-auto mb-4">
                  <val.icon className="w-6 h-6 text-[#c9a227]" />
                </div>
                <h3 className="font-bold text-white mb-2">{val.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8 bg-[#c9a227]" />
              <span className="text-[#c9a227] text-xs tracking-widest uppercase font-medium">Global Presence</span>
              <div className="h-px w-8 bg-[#c9a227]" />
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">Operating Across 6 Continents</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Our offices span the globe, bringing local expertise with international standards to every market we serve.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {offices.map((city) => (
              <span key={city} className="px-4 py-2 border border-border rounded-full text-sm text-muted-foreground hover:border-[#c9a227] hover:text-[#c9a227] transition-colors cursor-default">
                {city}
              </span>
            ))}
            <span className="px-4 py-2 border border-[#c9a227]/40 rounded-full text-sm text-[#c9a227]">+28 more</span>
          </div>
        </div>
      </section>

      {/* Leadership message */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="h-px w-8 bg-[#c9a227]" />
            <span className="text-[#c9a227] text-xs tracking-widest uppercase font-medium">From Our Chairman</span>
            <div className="h-px w-8 bg-[#c9a227]" />
          </div>
          <blockquote className="text-2xl font-light text-foreground leading-relaxed italic mb-8">
            "SinoGlobal Enterprise was built on a simple conviction: that Chinese enterprise excellence, applied globally with humility and respect, can create prosperity for all. We remain committed to that founding vision with every decision we make."
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#c9a227]/20 border-2 border-[#c9a227]/40 flex items-center justify-center">
              <Users className="w-5 h-5 text-[#c9a227]" />
            </div>
            <div className="text-left">
              <div className="font-bold text-foreground">Li Hongbin</div>
              <div className="text-sm text-muted-foreground">Chairman, SinoGlobal Enterprise Co., Ltd.</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#c9a227]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#0a1628] mb-4">Ready to Join Our Global Team?</h2>
          <p className="text-[#0a1628]/70 mb-8">Explore career opportunities across 12 divisions and 43 countries.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/careers" className="px-8 py-3.5 bg-[#0a1628] text-white font-semibold rounded hover:bg-[#0d1f38] transition-colors">
              View All Jobs
            </Link>
            <Link href="/portal" className="px-8 py-3.5 border-2 border-[#0a1628] text-[#0a1628] font-semibold rounded hover:bg-[#0a1628]/10 transition-colors">
              Worker Portal
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
