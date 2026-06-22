import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Award, Users, Globe, TrendingUp, CheckCircle, MapPin, Linkedin, ArrowRight, Building2, Star, Quote } from "lucide-react";
import { Link } from "wouter";

const milestones = [
  { year: "2003", title: "Company Founded", desc: "Established at Zhongguancun Science Park, Beijing with 120 staff and initial focus on infrastructure engineering consulting.", tag: "Foundation" },
  { year: "2006", title: "First International Expansion", desc: "Opened regional offices in Singapore and Hong Kong, launching Southeast Asia operations. First overseas infrastructure contract worth $180M.", tag: "Expansion" },
  { year: "2009", title: "IPO on Shanghai Exchange", desc: "Successful public listing raising CNY 4.2 billion. Valuation at IPO: CNY 28 billion. Oversubscribed by 14x.", tag: "Milestone" },
  { year: "2011", title: "African Entry", desc: "Entered Nigerian and Kenyan markets with landmark infrastructure development contracts totaling $640M.", tag: "Expansion" },
  { year: "2013", title: "European Acquisition", desc: "Acquired German engineering consultancy Technor GmbH, bringing 800 European engineers into the SinoGlobal family.", tag: "M&A" },
  { year: "2014", title: "Fortune Global 500", desc: "First inclusion in the Fortune Global 500 at position #387 — the fastest Chinese company to achieve this milestone.", tag: "Recognition" },
  { year: "2016", title: "BioSino Medical Acquisition", desc: "Acquired BioSino Medical Ltd. for $1.1B, creating our Healthcare & Pharmaceuticals division with 3,200 research staff.", tag: "M&A" },
  { year: "2018", title: "European HQ, London", desc: "Established European headquarters at 30 St Mary Axe, London. Secured £800M in UK and European contracts within 18 months.", tag: "Expansion" },
  { year: "2020", title: "Americas Launch", desc: "Opened New York and Toronto offices, securing $1.2B in North American contracts within the first year of operations.", tag: "Expansion" },
  { year: "2022", title: "47,000 Employees", desc: "Crossed the 47,000-employee milestone across 43 countries and 6 continents — a 4x increase from 2015.", tag: "Milestone" },
  { year: "2023", title: "Record Revenue: $8.2B", desc: "Achieved record annual revenue of USD 8.2 billion with 18% year-on-year growth. Ranked #312 on Fortune Global 500.", tag: "Financial" },
  { year: "2024", title: "East Africa Infrastructure Deal", desc: "Signed landmark $2.1B contract with Tanzanian government for 450km rail corridor and two major port upgrades.", tag: "Current" },
];

const executives = [
  {
    name: "Li Hongbin",
    title: "Chairman of the Board",
    bio: "Former Vice Minister of Commerce with 35 years in international trade and corporate governance. Founded SinoGlobal in 2003 and has steered its transformation from a 120-person consultancy to a Fortune Global 500 enterprise.",
    location: "Beijing, China",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    education: "PhD Economics, Peking University",
  },
  {
    name: "Zhang Wei",
    title: "Chief Executive Officer",
    bio: "MBA from Harvard Business School. Led SinoGlobal's global expansion strategy and digital transformation from 2015. Previously MD at CITIC Capital. Fluent in English, Mandarin, and Cantonese.",
    location: "Beijing / London",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
    education: "MBA, Harvard Business School",
  },
  {
    name: "Chen Xiaoming",
    title: "Chief Financial Officer",
    bio: "Former partner at PwC Beijing with 25 years in multinational finance. Oversees $8.2B in consolidated revenues and strategic capital allocation. CPA, CFA and ACCA certified.",
    location: "Shanghai, China",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop",
    education: "MSc Finance, London Business School",
  },
  {
    name: "Sarah Mitchell",
    title: "Chief Operating Officer",
    bio: "British national with 20 years in multinational operations. Previously COO at Tata Consulting. Led the integration of 12 subsidiary companies since joining SinoGlobal in 2018.",
    location: "London, UK",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
    education: "BA Engineering, Cambridge University",
  },
  {
    name: "Dr. Wang Fang",
    title: "Chief Technology Officer",
    bio: "PhD in Computer Science from Peking University. Pioneer in enterprise AI and smart infrastructure systems. Holds 47 patents. Named among China's Top 100 Technology Leaders (2022, 2023).",
    location: "Beijing, China",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop",
    education: "PhD Computer Science, Peking University",
  },
  {
    name: "Ibrahim Al-Rashid",
    title: "President, Middle East & Africa",
    bio: "Saudi-born executive with deep expertise in GCC infrastructure and sub-Saharan African business development. Oversees a $1.8B portfolio across 18 African and Middle Eastern countries.",
    location: "Dubai, UAE",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop",
    education: "MBA, INSEAD",
  },
];

const certifications = [
  { title: "ISO 9001:2015", sub: "Quality Management Systems", desc: "Certified across all 43 operational territories" },
  { title: "ISO 14001:2015", sub: "Environmental Management", desc: "Full compliance with international environmental standards" },
  { title: "OHSAS 18001", sub: "Occupational Health & Safety", desc: "Zero major incidents across operations for 5 consecutive years" },
  { title: "Fortune Global 500", sub: "Ranked #312 in 2023", desc: "Highest-ever ranking — fastest rise in the 2023 list" },
  { title: "UN Global Compact", sub: "Signatory since 2012", desc: "Committed to human rights, labour, environment & anti-corruption" },
  { title: "CDP Climate Leadership", sub: "Rating: A– (2023)", desc: "Among top 10% of companies globally for climate disclosure" },
  { title: "MSCI ESG Rating: AA", sub: "Strong Performer", desc: "Recognised for governance, social responsibility and environmental stewardship" },
  { title: "China Top 500 Enterprises", sub: "23 Consecutive Years", desc: "Unbroken streak since founding year — a record for Chinese multinationals" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-[#0a1628] pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&h=700&fit=crop" alt="SinoGlobal" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] to-[#0a1628]/80" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-[#c9a227]" />
            <span className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold">About Us</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">Our Story</h1>
          <p className="text-white/70 text-xl max-w-3xl leading-relaxed">
            From a small engineering consultancy in Beijing's technology corridor to a Fortune Global 500 multinational operating across 43 countries — this is the story of SinoGlobal Enterprise.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#c9a227] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "2003", label: "Year Founded", sub: "Zhongguancun, Beijing" },
              { value: "$8.2B", label: "Annual Revenue", sub: "FY 2023 record" },
              { value: "47,000+", label: "Global Employees", sub: "80+ nationalities" },
              { value: "43", label: "Countries", sub: "6 continents" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-[#0a1628]">{s.value}</div>
                <div className="text-[#0a1628]/80 text-sm font-semibold mt-1">{s.label}</div>
                <div className="text-[#0a1628]/55 text-xs">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              { icon: TrendingUp, title: "Our Mission", text: "To create sustainable economic value by delivering world-class services in engineering, finance, healthcare, and technology — connecting China's innovation capabilities with global market demands while empowering local communities in every country we operate." },
              { icon: Globe, title: "Our Vision", text: "To become the world's most trusted and admired multinational enterprise by 2030 — recognised not only for commercial success but for the transformative positive impact we create in every community and every life across our global footprint." },
              { icon: Star, title: "Our Purpose", text: "We believe that business, done with integrity and purpose, is the most powerful force for human progress. SinoGlobal exists to prove that global enterprise can create prosperity — not just for shareholders, but for all stakeholders." },
            ].map((item) => (
              <div key={item.title} className="bg-card border border-border rounded-2xl p-10 hover:border-[#c9a227]/40 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#c9a227]/10 flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6 text-[#c9a227]" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company snapshot image */}
      <section className="py-0 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="grid grid-cols-3 gap-4 h-72">
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=400&fit=crop" alt="HQ" className="rounded-2xl object-cover w-full h-full" />
            <img src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=400&fit=crop" alt="Team" className="rounded-2xl object-cover w-full h-full" />
            <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&h=400&fit=crop" alt="Operations" className="rounded-2xl object-cover w-full h-full" />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section id="milestones" className="py-24 bg-muted/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8 bg-[#c9a227]" />
              <span className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold">Our Journey</span>
              <div className="h-px w-8 bg-[#c9a227]" />
            </div>
            <h2 className="text-4xl font-bold text-foreground">21 Years of Growth</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">Key milestones that shaped SinoGlobal into a global enterprise leader.</p>
          </div>
          <div className="relative">
            <div className="absolute left-20 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-0">
              {milestones.map((m, i) => (
                <div key={m.year} className="flex gap-8 group">
                  <div className="relative flex-shrink-0 w-16 text-right pt-6">
                    <span className="text-[#c9a227] font-bold text-sm">{m.year}</span>
                    <div className="absolute right-[-25px] top-[28px] w-3.5 h-3.5 rounded-full bg-[#c9a227] border-2 border-background shadow" />
                  </div>
                  <div className="flex-1 pb-8 pt-4 pl-6 border-b border-border last:border-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-bold text-foreground text-base">{m.title}</h4>
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${m.tag === "Current" ? "bg-[#c9a227] text-[#0a1628]" : "bg-muted text-muted-foreground"}`}>{m.tag}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Executive Team */}
      <section id="team" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8 bg-[#c9a227]" />
              <span className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold">Leadership</span>
              <div className="h-px w-8 bg-[#c9a227]" />
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-3">Executive Team</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">World-class leaders with deep expertise across industries and geographies.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {executives.map((exec) => (
              <div key={exec.name} className="bg-card border border-border rounded-2xl overflow-hidden hover:border-[#c9a227]/40 hover:shadow-lg transition-all group">
                <div className="relative h-56 overflow-hidden">
                  <img src={exec.img} alt={exec.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center gap-1 text-white/70 text-xs">
                      <MapPin className="w-3 h-3" /> {exec.location}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-foreground text-lg">{exec.name}</h3>
                  <p className="text-[#c9a227] text-sm font-semibold mb-1">{exec.title}</p>
                  <p className="text-xs text-muted-foreground mb-3">{exec.education}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{exec.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chairman Quote */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0a1628] rounded-2xl p-12 text-center relative">
            <Quote className="w-10 h-10 text-[#c9a227]/30 mx-auto mb-6" />
            <blockquote className="text-xl font-light text-white leading-relaxed italic mb-8">
              "We did not set out to build a big company. We set out to solve big problems. Greatness followed from that purpose."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop" alt="Li Hongbin" className="w-14 h-14 rounded-full border-2 border-[#c9a227]" />
              <div className="text-left">
                <div className="font-bold text-white">Li Hongbin</div>
                <div className="text-[#c9a227] text-sm">Chairman, SinoGlobal Enterprise Co., Ltd.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" className="py-24 bg-[#0a1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8 bg-[#c9a227]" />
              <span className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold">Accreditations</span>
              <div className="h-px w-8 bg-[#c9a227]" />
            </div>
            <h2 className="text-4xl font-bold text-white">Certifications & Awards</h2>
            <p className="text-white/50 mt-3 max-w-xl mx-auto">Recognised by the world's most respected standards bodies and ratings agencies.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert) => (
              <div key={cert.title} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[#c9a227]/30 transition-colors">
                <CheckCircle className="w-6 h-6 text-[#c9a227] mb-3" />
                <h4 className="font-bold text-white text-sm mb-1">{cert.title}</h4>
                <p className="text-[#c9a227] text-xs font-medium mb-2">{cert.sub}</p>
                <p className="text-white/50 text-xs leading-relaxed">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#c9a227]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#0a1628] mb-4">Explore Our Business Divisions</h2>
          <p className="text-[#0a1628]/70 mb-8">Learn more about our eight diversified business units and the solutions we deliver globally.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/services" className="px-8 py-3.5 bg-[#0a1628] text-white font-bold rounded hover:bg-[#0d1f38] transition-colors inline-flex items-center gap-2">
              Our Services <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="px-8 py-3.5 border-2 border-[#0a1628] text-[#0a1628] font-bold rounded hover:bg-[#0a1628]/10 transition-colors">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
