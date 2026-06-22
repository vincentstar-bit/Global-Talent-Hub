import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "wouter";
import { Globe, Users, TrendingUp, Award, Shield, ChevronRight, Building2, Briefcase, Target, Heart, Cpu, HeartPulse, Ship, FlaskConical, BarChart3, Leaf, ArrowRight, Star, Quote } from "lucide-react";

const stats = [
  { label: "Countries", value: "43", sub: "across 6 continents" },
  { label: "Employees", value: "47,000+", sub: "worldwide" },
  { label: "Annual Revenue", value: "$8.2B", sub: "FY 2023" },
  { label: "Years Operating", value: "21+", sub: "since 2003" },
];

const divisions = [
  { name: "Engineering & Technology", icon: Building2, desc: "Pioneering next-generation infrastructure and smart city solutions across Asia and Africa.", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=250&fit=crop", href: "/services#engineering" },
  { name: "Finance & Investment", icon: BarChart3, desc: "Managing strategic capital allocations, M&A advisory, and global investment portfolios.", img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop", href: "/services#finance" },
  { name: "Operations & Logistics", icon: Ship, desc: "End-to-end supply chain management connecting manufacturers to markets in 43 countries.", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=250&fit=crop", href: "/services#logistics" },
  { name: "Healthcare & Pharmaceuticals", icon: HeartPulse, desc: "Developing life-saving medicines and healthcare infrastructure in emerging markets.", img: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&h=250&fit=crop", href: "/services#healthcare" },
  { name: "Information Technology", icon: Cpu, desc: "Delivering enterprise software, cloud platforms, and cybersecurity solutions worldwide.", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop", href: "/services#it" },
  { name: "Research & Development", icon: FlaskConical, desc: "Driving breakthrough innovations in materials science, biotech, and clean energy.", img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=250&fit=crop", href: "/services#research" },
  { name: "Construction & Real Estate", icon: Building2, desc: "Building landmark commercial and residential developments across three continents.", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=250&fit=crop", href: "/services" },
  { name: "International Trade & Customs", icon: Globe, desc: "Facilitating compliant cross-border trade and customs clearance at global scale.", img: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=400&h=250&fit=crop", href: "/services" },
];

const values = [
  { icon: Target, title: "Innovation", desc: "We invest 8% of annual revenue in R&D, pioneering solutions that define future industries." },
  { icon: Shield, title: "Integrity", desc: "Every decision upholds the highest standards of corporate governance and ethical conduct." },
  { icon: Globe, title: "Global Excellence", desc: "World-class standards applied consistently across every market and every operation." },
  { icon: TrendingUp, title: "Sustainable Growth", desc: "Long-term value creation through environmentally and socially responsible practices." },
  { icon: Heart, title: "People First", desc: "Our 47,000 employees are our greatest asset — their development drives our success." },
];

const team = [
  { name: "Li Hongbin", title: "Chairman", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&face" },
  { name: "Zhang Wei", title: "Chief Executive Officer", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop" },
  { name: "Sarah Mitchell", title: "Chief Operating Officer", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop" },
  { name: "Dr. Wang Fang", title: "Chief Technology Officer", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop" },
];

const news = [
  { date: "June 2024", tag: "Expansion", title: "SinoGlobal Secures $2.1B Infrastructure Contract in East Africa", img: "https://images.unsplash.com/photo-1508861647785-f6424b5e2f12?w=400&h=220&fit=crop", excerpt: "A landmark contract with the Tanzanian government for a 450km rail corridor and two port upgrades cements our leading position in Sub-Saharan Africa." },
  { date: "May 2024", tag: "Technology", title: "BioSino Medical Receives FDA Breakthrough Therapy Designation", img: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&h=220&fit=crop", excerpt: "Our pharmaceutical division's novel oncology compound SGE-2204 receives priority review, accelerating potential US market entry by 2026." },
  { date: "April 2024", tag: "Finance", title: "SinoGlobal Reports Record Q1 Revenue of $2.3B", img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=220&fit=crop", excerpt: "First-quarter results exceed analyst expectations by 12%, driven by strong performance in engineering and logistics divisions." },
];

const offices = ["Beijing", "Shanghai", "Hong Kong", "Singapore", "Tokyo", "Seoul", "Dubai", "London", "New York", "Lagos", "Nairobi", "Sydney", "Mumbai", "Paris", "Toronto", "Frankfurt", "Johannesburg", "Riyadh"];

const awards = [
  { label: "Fortune Global 500", sub: "Ranked #312 (2023)" },
  { label: "ISO 9001:2015", sub: "Quality Management" },
  { label: "ISO 14001:2015", sub: "Environmental" },
  { label: "CDP Climate A–", sub: "Leadership Rating" },
  { label: "MSCI ESG: AA", sub: "Sustainability" },
  { label: "UN Global Compact", sub: "Signatory" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center bg-[#0a1628] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&h=900&fit=crop"
            alt="SinoGlobal headquarters"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/90 to-[#0a1628]/60" />
        </div>
        <div className="absolute top-32 right-0 w-96 h-96 rounded-full bg-[#c9a227]/5 blur-3xl" />
        <div className="absolute bottom-20 right-48 w-64 h-64 rounded-full bg-[#c9a227]/8 blur-2xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 mt-16 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-[#c9a227]/30 bg-[#c9a227]/5">
              <Star className="w-3.5 h-3.5 text-[#c9a227] fill-[#c9a227]" />
              <span className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold">Fortune Global 500 — Ranked #312</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
              Building Tomorrow's
              <span className="block text-[#c9a227] mt-1">World Economy</span>
            </h1>
            <p className="text-white/65 text-lg sm:text-xl leading-relaxed max-w-2xl mb-10">
              SinoGlobal Enterprise Co., Ltd. is a leading Chinese multinational headquartered in Beijing, delivering excellence across engineering, finance, healthcare, logistics, and technology in <strong className="text-white/90">43 countries</strong> worldwide.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/about" className="px-8 py-3.5 bg-[#c9a227] text-[#0a1628] font-bold rounded hover:bg-[#d4af37] transition-colors">
                Discover Our Story
              </Link>
              <Link href="/careers" className="px-8 py-3.5 border border-white/30 text-white rounded hover:border-[#c9a227] hover:text-[#c9a227] transition-colors font-medium">
                View Opportunities
              </Link>
            </div>
          </div>

          {/* Floating stat cards */}
          <div className="absolute bottom-16 right-8 hidden xl:flex flex-col gap-3">
            {[
              { value: "47,000+", label: "Employees" },
              { value: "$8.2B", label: "Revenue 2023" },
              { value: "43", label: "Countries" },
            ].map((s) => (
              <div key={s.label} className="bg-white/5 backdrop-blur border border-white/10 rounded-xl px-5 py-3 text-right">
                <div className="text-2xl font-bold text-[#c9a227]">{s.value}</div>
                <div className="text-white/50 text-xs">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#c9a227] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold text-[#0a1628] mb-1">{stat.value}</div>
                <div className="text-[#0a1628]/80 text-sm font-semibold uppercase tracking-wide">{stat.label}</div>
                <div className="text-[#0a1628]/55 text-xs mt-0.5">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About excerpt with image */}
      <section className="py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-8 bg-[#c9a227]" />
                <span className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold">About SinoGlobal</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">Two Decades of Global Leadership</h2>
              <p className="text-muted-foreground leading-relaxed mb-5 text-lg">
                Founded in 2003 at Zhongguancun Science Park — China's Silicon Valley — SinoGlobal has grown from a regional engineering firm into one of China's most internationally recognized conglomerates. Today, we operate across 43 countries with 47,000 employees driving measurable impact in critical industries.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Under Chairman Li Hongbin and CEO Zhang Wei, SinoGlobal has maintained an <strong className="text-foreground">18% compound annual growth rate</strong> over the past decade, while earning ISO 9001, ISO 14001, and OHSAS 18001 certifications for quality, environmental responsibility, and workplace safety.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: "HQ Location", value: "Beijing, China" },
                  { label: "Founded", value: "2003" },
                  { label: "Exchange", value: "Shanghai Stock Exchange" },
                  { label: "Fortune Rank", value: "#312 Global (2023)" },
                ].map((item) => (
                  <div key={item.label} className="border-l-2 border-[#c9a227] pl-4">
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">{item.label}</div>
                    <div className="font-bold text-foreground text-sm mt-0.5">{item.value}</div>
                  </div>
                ))}
              </div>
              <Link href="/about" className="inline-flex items-center gap-2 text-[#c9a227] font-semibold hover:gap-4 transition-all group">
                Read Our Full Story <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&h=500&fit=crop"
                alt="SinoGlobal headquarters"
                className="rounded-2xl w-full h-80 lg:h-96 object-cover shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#c9a227] rounded-xl p-6 shadow-xl">
                <div className="text-3xl font-bold text-[#0a1628]">18%</div>
                <div className="text-[#0a1628]/80 text-xs font-semibold uppercase tracking-wide mt-1">Annual Growth Rate</div>
                <div className="text-[#0a1628]/60 text-xs">10-year average CAGR</div>
              </div>
              <div className="absolute -top-4 -right-4 bg-[#0d1b2e] border border-white/10 rounded-xl p-4 shadow-xl">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="w-4 h-4 text-[#c9a227]" />
                  <span className="text-white text-xs font-semibold">Fortune 500</span>
                </div>
                <div className="text-[#c9a227] text-xl font-bold">#312</div>
                <div className="text-white/40 text-xs">Global ranking 2023</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Divisions */}
      <section className="py-28 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8 bg-[#c9a227]" />
              <span className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold">Our Business</span>
              <div className="h-px w-8 bg-[#c9a227]" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">Diversified Portfolio</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Twelve strategic business units working in concert to deliver integrated solutions for the world's most complex challenges.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {divisions.map((div) => (
              <Link key={div.name} href={div.href} className="group bg-card border border-border rounded-xl overflow-hidden hover:border-[#c9a227]/50 hover:shadow-xl transition-all duration-300">
                <div className="relative h-40 overflow-hidden">
                  <img src={div.img} alt={div.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <div className="w-8 h-8 rounded-lg bg-[#c9a227] flex items-center justify-center shadow">
                      <div.icon className="w-4 h-4 text-[#0a1628]" />
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-foreground text-sm mb-2 group-hover:text-[#c9a227] transition-colors">{div.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{div.desc}</p>
                  <div className="flex items-center gap-1 mt-4 text-[#c9a227] text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/services" className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#c9a227] text-[#c9a227] rounded hover:bg-[#c9a227] hover:text-[#0a1628] transition-colors font-semibold">
              Explore All Divisions <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Our People */}
      <section className="py-28 bg-[#0a1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-8 bg-[#c9a227]" />
                <span className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold">Our People</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-6">Global Talent, One Team</h2>
              <p className="text-white/65 leading-relaxed mb-6 text-lg">
                Our workforce spans 47,000 professionals from over 80 nationalities. We believe that diversity of thought, background, and experience is the foundation of our competitive advantage.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { value: "80+", label: "Nationalities" },
                  { value: "38%", label: "Women in Leadership" },
                  { value: "$340M", label: "Annual Training Spend" },
                  { value: "94%", label: "Retention Rate" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <div className="text-2xl font-bold text-[#c9a227]">{s.value}</div>
                    <div className="text-white/60 text-sm mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
              <Link href="/careers" className="inline-flex items-center gap-2 px-6 py-3 bg-[#c9a227] text-[#0a1628] font-semibold rounded hover:bg-[#d4af37] transition-colors">
                Join Our Team <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=350&h=250&fit=crop" alt="Team collaboration" className="rounded-xl object-cover w-full h-48" />
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=350&h=250&fit=crop" alt="Professional at work" className="rounded-xl object-cover w-full h-48 mt-8" />
              <img src="https://images.unsplash.com/photo-1571624436279-b272aff752b5?w=350&h=250&fit=crop" alt="Global team" className="rounded-xl object-cover w-full h-48 -mt-8" />
              <img src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=350&h=250&fit=crop" alt="Business meeting" className="rounded-xl object-cover w-full h-48" />
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Spotlight */}
      <section className="py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8 bg-[#c9a227]" />
              <span className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold">Leadership</span>
              <div className="h-px w-8 bg-[#c9a227]" />
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-3">Executive Team</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Guided by world-class leaders with decades of international experience.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((person) => (
              <div key={person.name} className="text-center group">
                <div className="relative inline-block mb-5">
                  <img
                    src={person.img}
                    alt={person.name}
                    className="w-28 h-28 rounded-full object-cover mx-auto border-4 border-border group-hover:border-[#c9a227] transition-colors shadow-lg"
                  />
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#c9a227] rounded-full flex items-center justify-center">
                    <Star className="w-3.5 h-3.5 text-[#0a1628] fill-[#0a1628]" />
                  </div>
                </div>
                <h3 className="font-bold text-foreground text-lg">{person.name}</h3>
                <p className="text-[#c9a227] text-sm font-medium mt-1">{person.title}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/about#team" className="inline-flex items-center gap-2 text-[#c9a227] font-semibold hover:gap-3 transition-all">
              Meet the Full Team <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-28 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8 bg-[#c9a227]" />
              <span className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold">Core Values</span>
              <div className="h-px w-8 bg-[#c9a227]" />
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">What We Stand For</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">These principles guide every decision, partnership, and project across our global operations.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {values.map((val, i) => (
              <div key={val.title} className="bg-card border border-border rounded-xl p-8 text-center hover:border-[#c9a227]/50 hover:shadow-lg transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-[#c9a227]/10 border border-[#c9a227]/20 flex items-center justify-center mx-auto mb-5 group-hover:bg-[#c9a227]/20 transition-colors">
                  <val.icon className="w-7 h-7 text-[#c9a227]" />
                </div>
                <div className="text-3xl font-black text-[#c9a227]/20 mb-2">0{i+1}</div>
                <h3 className="font-bold text-foreground mb-3 text-lg">{val.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-14">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-8 bg-[#c9a227]" />
                <span className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold">Latest News</span>
              </div>
              <h2 className="text-4xl font-bold text-foreground">Recent Highlights</h2>
            </div>
            <Link href="/newsroom" className="hidden md:flex items-center gap-2 text-[#c9a227] font-semibold hover:gap-3 transition-all">
              All News <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map((article) => (
              <Link href="/newsroom" key={article.title} className="group bg-card border border-border rounded-xl overflow-hidden hover:border-[#c9a227]/40 hover:shadow-lg transition-all">
                <div className="relative h-48 overflow-hidden">
                  <img src={article.img} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#c9a227] text-[#0a1628] text-xs font-bold rounded-full">{article.tag}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-xs text-muted-foreground mb-2">{article.date}</div>
                  <h3 className="font-bold text-foreground text-base mb-3 leading-snug group-hover:text-[#c9a227] transition-colors">{article.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{article.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8 md:hidden">
            <Link href="/newsroom" className="inline-flex items-center gap-2 text-[#c9a227] font-semibold">
              All News <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Sustainability teaser */}
      <section className="py-28 bg-[#0a1628] relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1400&h=600&fit=crop" alt="Sustainability" className="w-full h-full object-cover opacity-10" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-8 bg-[#c9a227]" />
                <span className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold">Sustainability</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-6">Our Commitment to a Better World</h2>
              <p className="text-white/65 leading-relaxed mb-8 text-lg">
                SinoGlobal is committed to achieving carbon neutrality by 2045. We have reduced emissions by 34% since 2015 and invested $1.2B in renewable energy projects across our operational footprint.
              </p>
              <div className="grid grid-cols-3 gap-6 mb-8">
                {[
                  { value: "34%", label: "Emissions Reduced" },
                  { value: "$1.2B", label: "Clean Energy Investment" },
                  { value: "2045", label: "Carbon Neutral Target" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-bold text-[#c9a227]">{s.value}</div>
                    <div className="text-white/50 text-xs mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
              <Link href="/sustainability" className="inline-flex items-center gap-2 px-6 py-3 border border-[#c9a227] text-[#c9a227] rounded hover:bg-[#c9a227] hover:text-[#0a1628] transition-colors font-semibold">
                <Leaf className="w-4 h-4" /> Our ESG Report
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "CDP Climate Rating", value: "A–", sub: "Leadership Level" },
                { label: "MSCI ESG Rating", value: "AA", sub: "Strong performer" },
                { label: "Renewable Energy", value: "42%", sub: "of total power use" },
                { label: "Female Leadership", value: "38%", sub: "senior positions" },
              ].map((item) => (
                <div key={item.label} className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:border-[#c9a227]/30 transition-colors">
                  <div className="text-3xl font-bold text-[#c9a227] mb-1">{item.value}</div>
                  <div className="text-white text-sm font-semibold">{item.label}</div>
                  <div className="text-white/40 text-xs mt-1">{item.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8 bg-[#c9a227]" />
              <span className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold">Global Presence</span>
              <div className="h-px w-8 bg-[#c9a227]" />
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">Operating Across 6 Continents</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Our offices bring local expertise with international standards to every market we serve.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {offices.map((city) => (
              <span key={city} className="px-4 py-2 border border-border rounded-full text-sm text-muted-foreground hover:border-[#c9a227] hover:text-[#c9a227] transition-colors cursor-default">
                {city}
              </span>
            ))}
            <span className="px-4 py-2 border border-[#c9a227]/40 rounded-full text-sm text-[#c9a227] font-medium">+25 more cities</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
            {[
              { region: "Asia Pacific", offices: "18 offices" },
              { region: "Middle East", offices: "6 offices" },
              { region: "Africa", offices: "9 offices" },
              { region: "Europe", offices: "7 offices" },
              { region: "Americas", offices: "5 offices" },
              { region: "Oceania", offices: "2 offices" },
            ].map((r) => (
              <div key={r.region} className="bg-card border border-border rounded-xl p-5">
                <div className="font-bold text-foreground text-sm">{r.region}</div>
                <div className="text-[#c9a227] text-xs mt-1">{r.offices}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications strip */}
      <section className="py-16 bg-muted/20 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-muted-foreground uppercase tracking-widest mb-8 font-semibold">Accreditations & Recognition</p>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            {awards.map((a) => (
              <div key={a.label} className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#c9a227]/10 border border-[#c9a227]/30 flex items-center justify-center mx-auto mb-3">
                  <Award className="w-5 h-5 text-[#c9a227]" />
                </div>
                <div className="text-sm font-bold text-foreground">{a.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{a.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chairman Quote */}
      <section className="py-28 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border border-border rounded-2xl p-12 text-center relative">
            <Quote className="w-12 h-12 text-[#c9a227]/20 mx-auto mb-6" />
            <blockquote className="text-2xl font-light text-foreground leading-relaxed italic mb-10">
              "SinoGlobal Enterprise was built on a simple conviction: that Chinese enterprise excellence, applied globally with humility and respect, can create prosperity for all. We remain committed to that founding vision with every decision we make."
            </blockquote>
            <div className="flex items-center justify-center gap-5">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop"
                alt="Li Hongbin"
                className="w-16 h-16 rounded-full object-cover border-2 border-[#c9a227]"
              />
              <div className="text-left">
                <div className="font-bold text-foreground text-lg">Li Hongbin</div>
                <div className="text-[#c9a227] text-sm font-medium">Chairman of the Board</div>
                <div className="text-muted-foreground text-xs">SinoGlobal Enterprise Co., Ltd.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#c9a227]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-[#0a1628] mb-4">Ready to Join Our Global Team?</h2>
          <p className="text-[#0a1628]/70 mb-8 text-lg">Explore career opportunities across 12 divisions and 43 countries. All hires personally verified by senior leadership.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/careers" className="px-10 py-4 bg-[#0a1628] text-white font-bold rounded hover:bg-[#0d1f38] transition-colors">
              View All Jobs
            </Link>
            <Link href="/portal" className="px-10 py-4 border-2 border-[#0a1628] text-[#0a1628] font-bold rounded hover:bg-[#0a1628]/10 transition-colors">
              Worker Portal
            </Link>
            <Link href="/contact" className="px-10 py-4 border-2 border-[#0a1628]/40 text-[#0a1628]/80 font-semibold rounded hover:border-[#0a1628] hover:text-[#0a1628] transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
