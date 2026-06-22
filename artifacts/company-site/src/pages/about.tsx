import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Award, Users, Globe, TrendingUp, CheckCircle } from "lucide-react";

const milestones = [
  { year: "2003", title: "Company Founded", desc: "Established at Zhongguancun Science Park, Beijing with initial focus on engineering consulting." },
  { year: "2006", title: "First International Expansion", desc: "Opened offices in Singapore and Hong Kong, launching Southeast Asia operations." },
  { year: "2009", title: "IPO on Shanghai Exchange", desc: "Successful public listing raising CNY 4.2 billion for global expansion." },
  { year: "2011", title: "African Expansion", desc: "Entered Nigerian and Kenyan markets with infrastructure development contracts." },
  { year: "2014", title: "Fortune Global 500", desc: "First inclusion in the Fortune Global 500, ranking at position 387." },
  { year: "2016", title: "Pharmaceutical Division", desc: "Acquired BioSino Medical Ltd., creating our Healthcare & Pharmaceuticals division." },
  { year: "2018", title: "European Headquarters", desc: "Established European HQ in London; acquired German engineering firm Technor AG." },
  { year: "2020", title: "Americas Entry", desc: "Opened New York and Toronto offices, securing $1.2B in North American contracts." },
  { year: "2022", title: "47,000 Employees", desc: "Crossed the 47,000-employee milestone across 43 countries." },
  { year: "2023", title: "Revenue $8.2B", desc: "Achieved record revenue of USD 8.2 billion with 18% year-on-year growth." },
];

const executives = [
  { name: "Li Hongbin", title: "Chairman of the Board", bio: "Former Vice Minister of Commerce with 35 years of experience in international trade and corporate governance. Founded SinoGlobal in 2003." },
  { name: "Zhang Wei", title: "Chief Executive Officer", bio: "MBA from Harvard Business School. Led SinoGlobal's global expansion strategy and the company's digital transformation initiative from 2015." },
  { name: "Chen Xiaoming", title: "Chief Financial Officer", desc: "Former partner at PwC Beijing. Oversees $8.2B in consolidated revenues and strategic capital allocation across all divisions." },
  { name: "Sarah Mitchell", title: "Chief Operating Officer", bio: "British national with 20 years in multinational operations. Previously COO at Tata Consulting. Joined SinoGlobal in 2018." },
  { name: "Dr. Wang Fang", title: "Chief Technology Officer", bio: "PhD in Computer Science from Peking University. Pioneer in enterprise AI and smart infrastructure systems." },
  { name: "Ibrahim Al-Rashid", title: "President, Middle East & Africa", bio: "Saudi-born executive with deep expertise in GCC infrastructure markets and sub-Saharan African business development." },
];

const certifications = [
  "ISO 9001:2015 — Quality Management Systems",
  "ISO 14001:2015 — Environmental Management",
  "OHSAS 18001 — Occupational Health & Safety",
  "Fortune Global 500 Member (Ranked #312 in 2023)",
  "UN Global Compact Signatory",
  "CDP Climate Leadership Rating — A-",
  "MSCI ESG Rating: AA",
  "China Top 500 Enterprises (23 consecutive years)",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#0a1628] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-[#c9a227]" />
            <span className="text-[#c9a227] text-xs tracking-widest uppercase font-medium">About Us</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">Our Story</h1>
          <p className="text-white/70 text-xl max-w-3xl leading-relaxed">
            From a small engineering consultancy in Beijing's technology corridor to a Fortune Global 500 multinational — this is the story of SinoGlobal Enterprise.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#c9a227] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "2003", label: "Year Founded" },
              { value: "$8.2B", label: "Annual Revenue" },
              { value: "47,000+", label: "Global Employees" },
              { value: "43", label: "Countries" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-[#0a1628]">{s.value}</div>
                <div className="text-[#0a1628]/70 text-sm font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-card border border-border rounded-lg p-10">
              <div className="w-10 h-10 rounded bg-[#c9a227]/10 flex items-center justify-center mb-6">
                <TrendingUp className="w-5 h-5 text-[#c9a227]" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To create sustainable economic value by delivering world-class services in engineering, finance, healthcare, and technology — connecting China's innovation capabilities with global market demands while empowering local communities in every country we operate.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-10">
              <div className="w-10 h-10 rounded bg-[#c9a227]/10 flex items-center justify-center mb-6">
                <Globe className="w-5 h-5 text-[#c9a227]" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To become the world's most trusted and admired multinational enterprise by 2030 — recognized not only for our commercial success but for the positive impact we create in every community we serve, and every life we touch across our global operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8 bg-[#c9a227]" />
              <span className="text-[#c9a227] text-xs tracking-widest uppercase font-medium">Our Journey</span>
              <div className="h-px w-8 bg-[#c9a227]" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">21 Years of Growth</h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-8">
              {milestones.map((m) => (
                <div key={m.year} className="flex gap-8 pl-0">
                  <div className="relative flex-shrink-0 w-16 text-right">
                    <span className="text-[#c9a227] font-bold text-sm">{m.year}</span>
                    <div className="absolute right-[-25px] top-0.5 w-3 h-3 rounded-full bg-[#c9a227] border-2 border-background" />
                  </div>
                  <div className="pb-8">
                    <h4 className="font-bold text-foreground mb-1">{m.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Executive Team */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8 bg-[#c9a227]" />
              <span className="text-[#c9a227] text-xs tracking-widest uppercase font-medium">Leadership</span>
              <div className="h-px w-8 bg-[#c9a227]" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">Executive Team</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {executives.map((exec) => (
              <div key={exec.name} className="bg-card border border-border rounded-lg p-6 hover:border-[#c9a227]/40 transition-colors">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#c9a227]/20 to-[#0a1628]/20 border border-[#c9a227]/30 flex items-center justify-center mb-4">
                  <Users className="w-7 h-7 text-[#c9a227]" />
                </div>
                <h3 className="font-bold text-foreground">{exec.name}</h3>
                <p className="text-[#c9a227] text-sm font-medium mb-3">{exec.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{exec.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 bg-[#0a1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8 bg-[#c9a227]" />
              <span className="text-[#c9a227] text-xs tracking-widest uppercase font-medium">Accreditations</span>
              <div className="h-px w-8 bg-[#c9a227]" />
            </div>
            <h2 className="text-3xl font-bold text-white">Certifications & Awards</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {certifications.map((cert) => (
              <div key={cert} className="flex items-start gap-3 bg-white/5 rounded-lg px-5 py-4">
                <CheckCircle className="w-5 h-5 text-[#c9a227] shrink-0 mt-0.5" />
                <span className="text-white/80 text-sm">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
