import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "wouter";
import { Calendar, Tag, ArrowRight, ChevronRight, Newspaper, TrendingUp, Globe, HeartPulse, Cpu, Leaf } from "lucide-react";

const featured = {
  title: "SinoGlobal Secures Landmark $2.1B Infrastructure Contract in East Africa",
  date: "June 14, 2024",
  tag: "Business",
  img: "https://images.unsplash.com/photo-1508861647785-f6424b5e2f12?w=900&h=500&fit=crop",
  excerpt: "SinoGlobal Enterprise Co., Ltd. has signed a landmark infrastructure development agreement with the Government of Tanzania for the design, construction, and operation of a 450-kilometre rail corridor connecting Dar es Salaam to Dodoma, alongside comprehensive upgrades to two major Indian Ocean ports. The contract, valued at USD 2.1 billion, represents the largest single infrastructure award in East African history.",
  body: "CEO Zhang Wei said: 'This contract reflects the trust that African governments have placed in SinoGlobal over more than a decade of responsible project delivery. We are proud to be part of Tanzania's economic transformation story.' Construction is expected to begin in Q4 2024, with completion targeted by 2029. The project will create approximately 28,000 local jobs during the construction phase.",
};

const articles = [
  {
    title: "BioSino Medical Receives FDA Breakthrough Therapy Designation for SGE-2204",
    date: "May 22, 2024",
    tag: "Healthcare",
    img: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=500&h=280&fit=crop",
    excerpt: "Our pharmaceutical division's novel oncology compound SGE-2204 receives priority review designation, accelerating potential US market entry by up to three years.",
    icon: HeartPulse,
  },
  {
    title: "SinoGlobal Reports Record Q1 2024 Revenue of $2.3B, Up 21% Year-on-Year",
    date: "April 30, 2024",
    tag: "Financial",
    img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&h=280&fit=crop",
    excerpt: "First-quarter results exceed consensus analyst expectations by 12%, driven by exceptional performance in Engineering and Logistics divisions across African and Middle Eastern markets.",
    icon: TrendingUp,
  },
  {
    title: "SinoCloud Enterprise v3.0 Launched — Powers 12M Daily Users Across 22 Countries",
    date: "April 12, 2024",
    tag: "Technology",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=280&fit=crop",
    excerpt: "The latest version of our flagship cloud platform introduces AI-native workflows, real-time analytics, and edge computing capabilities designed for emerging market infrastructure.",
    icon: Cpu,
  },
  {
    title: "SinoGlobal and UN Environment Programme Launch $200M Green Hydrogen Initiative",
    date: "March 28, 2024",
    tag: "Sustainability",
    img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=500&h=280&fit=crop",
    excerpt: "A multi-year partnership to develop green hydrogen production facilities in Kenya, Morocco, and Chile — supporting the global clean energy transition at scale.",
    icon: Leaf,
  },
  {
    title: "SinoGlobal Expands to Mumbai and Johannesburg With New Regional Offices",
    date: "March 5, 2024",
    tag: "Expansion",
    img: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=280&fit=crop",
    excerpt: "Two new strategic offices in India and South Africa open the door to $4.2 trillion in combined GDP — expanding our Asian subcontinent and Southern African footprint.",
    icon: Globe,
  },
  {
    title: "SinoGlobal Awarded 'China's Most Admired Company' by Fortune China for 5th Year",
    date: "February 18, 2024",
    tag: "Recognition",
    img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=500&h=280&fit=crop",
    excerpt: "For the fifth consecutive year, SinoGlobal has been named China's Most Admired Company in the diversified industrials category by Fortune China magazine.",
    icon: TrendingUp,
  },
];

const pressReleases = [
  { title: "SinoGlobal Q1 2024 Financial Results", date: "April 30, 2024" },
  { title: "Annual General Meeting — Board Resolution Outcomes", date: "April 18, 2024" },
  { title: "SinoGlobal and Siemens AG Sign MoU for Smart Infrastructure Collaboration", date: "March 20, 2024" },
  { title: "Appointment of New Chief Sustainability Officer", date: "March 8, 2024" },
  { title: "SinoGlobal 2023 Annual ESG Report Published", date: "February 29, 2024" },
  { title: "FY 2023 Full-Year Financial Results", date: "February 22, 2024" },
];

const tagColors: Record<string, string> = {
  Business: "bg-blue-500/20 text-blue-300",
  Financial: "bg-green-500/20 text-green-300",
  Healthcare: "bg-pink-500/20 text-pink-300",
  Technology: "bg-purple-500/20 text-purple-300",
  Sustainability: "bg-emerald-500/20 text-emerald-300",
  Expansion: "bg-amber-500/20 text-amber-300",
  Recognition: "bg-yellow-500/20 text-yellow-300",
};

export default function NewsroomPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#0a1628] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-[#c9a227]" />
            <span className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold">Media Centre</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Newsroom</h1>
          <p className="text-white/70 text-xl max-w-2xl">Latest news, press releases, and media resources from SinoGlobal Enterprise.</p>
        </div>
      </section>

      {/* Featured Story */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-sm text-muted-foreground font-semibold mb-6 uppercase tracking-wide">Featured Story</div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-card border border-border rounded-2xl overflow-hidden shadow-lg">
            <div className="relative">
              <img src={featured.img} alt={featured.title} className="w-full h-full object-cover min-h-72" />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold bg-[#c9a227] text-[#0a1628]`}>{featured.tag}</span>
              </div>
            </div>
            <div className="p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                <Calendar className="w-3.5 h-3.5" /> {featured.date}
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4 leading-snug">{featured.title}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">{featured.excerpt}</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic">{featured.body}</p>
              <button className="inline-flex items-center gap-2 text-[#c9a227] font-semibold hover:gap-3 transition-all w-fit">
                Read Full Release <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Recent News Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-10">Recent News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div key={article.title} className="group bg-card border border-border rounded-xl overflow-hidden hover:border-[#c9a227]/40 hover:shadow-lg transition-all cursor-pointer">
                <div className="relative h-44 overflow-hidden">
                  <img src={article.img} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${tagColors[article.tag] ?? "bg-white/10 text-white"}`}>{article.tag}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <Calendar className="w-3 h-3" /> {article.date}
                  </div>
                  <h3 className="font-bold text-foreground text-base mb-3 leading-snug group-hover:text-[#c9a227] transition-colors">{article.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{article.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Releases + Media Contacts */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-foreground mb-6">Press Releases</h2>
              <div className="space-y-3">
                {pressReleases.map((pr) => (
                  <div key={pr.title} className="flex items-center justify-between bg-card border border-border rounded-lg px-5 py-4 hover:border-[#c9a227]/30 transition-colors group cursor-pointer">
                    <div>
                      <div className="font-medium text-foreground text-sm group-hover:text-[#c9a227] transition-colors">{pr.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">{pr.date}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-[#c9a227] transition-colors shrink-0 ml-4" />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Media Contacts</h2>
              <div className="space-y-4">
                {[
                  { name: "Global Media Relations", email: "press@sinoglobal.com", phone: "+86 10 8888 6666 ext. 800" },
                  { name: "Investor Relations", email: "ir@sinoglobal.com", phone: "+86 10 8888 6666 ext. 810" },
                  { name: "ESG & Sustainability", email: "esg@sinoglobal.com", phone: "+86 10 8888 6666 ext. 820" },
                ].map((c) => (
                  <div key={c.name} className="bg-card border border-border rounded-xl p-5">
                    <div className="font-semibold text-foreground text-sm mb-2">{c.name}</div>
                    <a href={`mailto:${c.email}`} className="text-[#c9a227] text-sm block hover:underline">{c.email}</a>
                    <div className="text-muted-foreground text-xs mt-1">{c.phone}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-[#0a1628] rounded-xl p-6">
                <h3 className="font-bold text-white mb-2">Media Enquiries</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4">Our communications team responds to all media enquiries within 24 business hours.</p>
                <Link href="/contact" className="inline-flex items-center gap-2 text-[#c9a227] text-sm font-semibold">
                  Contact Us <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
