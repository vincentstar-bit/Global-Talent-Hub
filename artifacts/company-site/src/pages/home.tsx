import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Globe, Users, TrendingUp, Award, Shield, ChevronRight, Building2,
  Target, Heart, Cpu, HeartPulse, Ship, FlaskConical, BarChart3,
  Leaf, ArrowRight, Star, Quote, Zap, CheckCircle2, Play,
  Truck, HardHat, Wrench, Anchor, Plane, Briefcase, MapPin,
  Clock, ChevronDown, Phone, Mail, BadgeCheck
} from "lucide-react";

/* ─── Animation helpers ─── */
function FadeInSection({ children, delay = 0, direction = "up" }: {
  children: React.ReactNode; delay?: number; direction?: "up" | "left" | "right" | "none"
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const initial =
    direction === "up" ? { opacity: 0, y: 40 } :
    direction === "left" ? { opacity: 0, x: -40 } :
    direction === "right" ? { opacity: 0, x: 40 } :
    { opacity: 0 };
  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : initial}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const num = parseFloat(value.replace(/[^0-9.]/g, ""));
    if (isNaN(num)) { setDisplay(value); return; }
    const prefix = value.match(/^\D*/)?.[0] ?? "";
    const postfix = value.match(/\D+$/)?.[0] ?? "";
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = num / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= num) {
        setDisplay(prefix + num + postfix);
        clearInterval(timer);
      } else {
        const rounded = num < 10 ? start.toFixed(1) : Math.floor(start).toString();
        setDisplay(prefix + rounded + postfix);
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, value]);

  return <span ref={ref}>{display}</span>;
}

/* ─── Data ─── */
const stats = [
  { label: "Countries", value: "43", sub: "across 6 continents", icon: Globe },
  { label: "Employees", value: "47,000+", sub: "worldwide", icon: Users },
  { label: "Annual Revenue", value: "$8.2B", sub: "FY 2023", icon: TrendingUp },
  { label: "Years Operating", value: "21+", sub: "since 2003", icon: Award },
];

const movingJobs = [
  {
    title: "International Relocation Specialist",
    location: "Singapore / Dubai",
    type: "Full-time",
    dept: "Operations",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=320&fit=crop",
    icon: Truck,
    tags: ["Relocation", "International", "Logistics"],
    urgent: true,
  },
  {
    title: "Heavy Equipment Operator",
    location: "Malaysia / Indonesia",
    type: "Contract",
    dept: "Engineering",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&h=320&fit=crop",
    icon: HardHat,
    tags: ["Construction", "Field Work", "Equipment"],
    urgent: false,
  },
  {
    title: "Port & Freight Coordinator",
    location: "Shanghai / Hong Kong",
    type: "Full-time",
    dept: "Logistics",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&h=320&fit=crop",
    icon: Anchor,
    tags: ["Shipping", "Customs", "Freight"],
    urgent: true,
  },
  {
    title: "Civil & Structural Engineer",
    location: "Tokyo / Seoul",
    type: "Full-time",
    dept: "Engineering",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=320&fit=crop",
    icon: Wrench,
    tags: ["Engineering", "Infrastructure", "Design"],
    urgent: false,
  },
  {
    title: "International Flight Operations",
    location: "Beijing / London",
    type: "Full-time",
    dept: "Aviation",
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=500&h=320&fit=crop",
    icon: Plane,
    tags: ["Aviation", "Travel", "International"],
    urgent: false,
  },
  {
    title: "Healthcare Project Manager",
    location: "Mumbai / Bangkok",
    type: "Full-time",
    dept: "Healthcare",
    img: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=500&h=320&fit=crop",
    icon: HeartPulse,
    tags: ["Healthcare", "Management", "Projects"],
    urgent: true,
  },
];

const divisions = [
  { name: "Engineering & Technology", icon: Building2, desc: "Pioneering next-generation infrastructure and smart city solutions across Asia and the Americas.", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=250&fit=crop", href: "/services#engineering" },
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
  { date: "June 2024", tag: "Technology", title: "BioSino Medical Receives FDA Breakthrough Therapy Designation", img: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&h=220&fit=crop", excerpt: "Our pharmaceutical division's novel oncology compound SGE-2204 receives priority review from the US FDA." },
  { date: "May 2024", tag: "Finance", title: "SinoGlobal Reports Record Q1 Revenue of $2.3B", img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=220&fit=crop", excerpt: "First-quarter results exceed analyst expectations by 12%, driven by engineering and logistics divisions." },
  { date: "April 2024", tag: "Expansion", title: "SinoGlobal Secures $1.8B Infrastructure Contract in Southeast Asia", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=220&fit=crop", excerpt: "A landmark infrastructure contract covering highway, rail, and port upgrades across the ASEAN region." },
];

const offices = [
  "Beijing", "Shanghai", "Hong Kong", "Guangzhou", "Shenzhen",
  "Singapore", "Kuala Lumpur", "Bangkok", "Jakarta",
  "Tokyo", "Seoul", "Osaka",
  "Dubai", "Abu Dhabi", "Riyadh", "Doha",
  "London", "Paris", "Frankfurt", "Amsterdam", "Zurich",
  "New York", "Los Angeles", "Toronto",
  "Sydney", "Melbourne",
  "Mumbai", "New Delhi",
];

const awards = [
  { label: "Fortune Global 500", sub: "Ranked #312 (2023)" },
  { label: "ISO 9001:2015", sub: "Quality Management" },
  { label: "ISO 14001:2015", sub: "Environmental" },
  { label: "CDP Climate A–", sub: "Leadership Rating" },
  { label: "MSCI ESG: AA", sub: "Sustainability" },
  { label: "UN Global Compact", sub: "Signatory" },
];

const companyFacts = [
  { label: "Headquarters", value: "Beijing, China", icon: MapPin },
  { label: "Founded", value: "2003", icon: Clock },
  { label: "Stock Exchange", value: "Shanghai (SSE)", icon: TrendingUp },
  { label: "Fortune Rank", value: "#312 Global", icon: Award },
  { label: "Annual Revenue", value: "$8.2 Billion", icon: BarChart3 },
  { label: "Total Employees", value: "47,000+", icon: Users },
  { label: "Countries", value: "43 Nations", icon: Globe },
  { label: "CAGR (10yr)", value: "18%", icon: BarChart3 },
];

/* ─── Floating Particle ─── */
function FloatingOrb({ x, y, size, delay, duration }: { x: string; y: string; size: number; delay: number; duration: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-[#c9a227]/10 blur-2xl pointer-events-none"
      style={{ left: x, top: y, width: size, height: size }}
      animate={{ y: [0, -30, 0], opacity: [0.3, 0.7, 0.3], scale: [1, 1.15, 1] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function PulsingIcon({ icon: Icon, delay = 0 }: { icon: React.ElementType; delay?: number }) {
  return (
    <motion.div
      className="w-16 h-16 rounded-2xl bg-[#c9a227]/10 border border-[#c9a227]/20 flex items-center justify-center mx-auto mb-5"
      animate={{ boxShadow: ["0 0 0px #c9a22700", "0 0 20px #c9a22740", "0 0 0px #c9a22700"] }}
      transition={{ duration: 2.5, delay, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{ scale: 1.15, backgroundColor: "rgba(201,162,39,0.25)" }}
    >
      <Icon className="w-7 h-7 text-[#c9a227]" />
    </motion.div>
  );
}

/* ─── Page ─── */
export default function HomePage() {
  const [activeTab, setActiveTab] = useState(0);
  const [jobFilter, setJobFilter] = useState("All");

  const jobCategories = ["All", "Operations", "Engineering", "Logistics", "Healthcare", "Aviation"];
  const filteredJobs = jobFilter === "All" ? movingJobs : movingJobs.filter(j => j.dept === jobFilter);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center bg-[#06101f] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&h=900&fit=crop"
            alt="SinoGlobal headquarters"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#06101f] via-[#06101f]/92 to-[#06101f]/55" />
        </div>

        <FloatingOrb x="65%" y="15%" size={320} delay={0} duration={6} />
        <FloatingOrb x="75%" y="55%" size={200} delay={2} duration={8} />
        <FloatingOrb x="10%" y="70%" size={160} delay={1} duration={7} />

        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(#c9a227 1px, transparent 1px), linear-gradient(90deg, #c9a227 1px, transparent 1px)",
          backgroundSize: "80px 80px"
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 mt-20 w-full">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-[#c9a227]/30 bg-[#c9a227]/5"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-3.5 h-3.5 text-[#c9a227] fill-[#c9a227]" />
              </motion.div>
              <span className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold">Fortune Global 500 — Ranked #312</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6"
            >
              Building Tomorrow's
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="block text-[#c9a227] mt-1"
              >
                World Economy
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-white/65 text-lg sm:text-xl leading-relaxed max-w-2xl mb-10"
            >
              SinoGlobal Enterprise Co., Ltd. is a leading Chinese multinational headquartered in Beijing, delivering excellence across engineering, finance, healthcare, logistics, and technology in{" "}
              <strong className="text-white/90">43 countries</strong> worldwide.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-wrap gap-4"
            >
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <a href="#moving-jobs" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#c9a227] text-[#0a1628] font-bold rounded hover:bg-[#d4af37] transition-colors">
                  View Open Positions <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link href="/about" className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/30 text-white rounded hover:border-[#c9a227] hover:text-[#c9a227] transition-colors font-medium">
                  Discover Our Story
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-wrap gap-3 mt-10"
            >
              {["ISO 9001:2015", "MSCI ESG: AA", "UN Global Compact", "CDP Climate A–", "Fortune 500"].map((badge) => (
                <div key={badge} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">
                  <CheckCircle2 className="w-3 h-3 text-[#c9a227]" />
                  <span className="text-white/60 text-xs">{badge}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="absolute bottom-16 right-8 hidden xl:flex flex-col gap-3"
          >
            {[
              { value: "47,000+", label: "Employees", icon: Users },
              { value: "$8.2B", label: "Revenue 2023", icon: TrendingUp },
              { value: "43", label: "Countries", icon: Globe },
              { value: "200+", label: "Open Positions", icon: Briefcase },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.12 }}
                whileHover={{ scale: 1.05, x: -4 }}
                className="bg-white/5 backdrop-blur border border-white/10 rounded-xl px-5 py-3 text-right flex items-center gap-4 cursor-default"
              >
                <div className="w-8 h-8 rounded-lg bg-[#c9a227]/20 flex items-center justify-center shrink-0">
                  <s.icon className="w-4 h-4 text-[#c9a227]" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#c9a227]">{s.value}</div>
                  <div className="text-white/50 text-xs">{s.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="text-white/30 text-xs tracking-widest uppercase">Scroll</div>
          <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </section>

      {/* ── Stats bar ── */}
      <section className="bg-[#c9a227] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <FadeInSection key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <motion.div
                    className="w-10 h-10 rounded-xl bg-[#0a1628]/15 flex items-center justify-center mx-auto mb-3"
                    whileHover={{ scale: 1.15, rotate: 10 }}
                  >
                    <stat.icon className="w-5 h-5 text-[#0a1628]" />
                  </motion.div>
                  <div className="text-4xl font-bold text-[#0a1628] mb-1">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="text-[#0a1628]/80 text-sm font-semibold uppercase tracking-wide">{stat.label}</div>
                  <div className="text-[#0a1628]/55 text-xs mt-0.5">{stat.sub}</div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ── MOVING JOBS SECTION (Featured)
      ══════════════════════════════════════════ */}
      <section id="moving-jobs" className="py-28 bg-[#06101f] relative overflow-hidden">
        <FloatingOrb x="85%" y="5%" size={350} delay={0} duration={9} />
        <FloatingOrb x="0%" y="60%" size={220} delay={2} duration={7} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-5">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-px w-8 bg-[#c9a227]" />
                <span className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold">Now Hiring</span>
                <div className="h-px w-8 bg-[#c9a227]" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Moving & Operations Jobs</h2>
              <p className="text-white/55 max-w-2xl mx-auto text-lg">
                Join SinoGlobal's global workforce. We are actively recruiting for moving, relocation, field, and operations roles across Asia, Europe, and the Middle East.
              </p>
            </div>
          </FadeInSection>

          {/* Stats ribbon */}
          <FadeInSection delay={0.1}>
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              {[
                { label: "Open Positions", value: "200+" },
                { label: "Countries Hiring", value: "28" },
                { label: "Avg. Salary Package", value: "$5,200/mo" },
                { label: "Start Date", value: "Immediate" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-3 px-5 py-3 bg-white/5 border border-white/10 rounded-xl">
                  <div>
                    <div className="text-[#c9a227] font-bold text-lg">{s.value}</div>
                    <div className="text-white/45 text-xs">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeInSection>

          {/* Filter tabs */}
          <FadeInSection delay={0.15}>
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {jobCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setJobFilter(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    jobFilter === cat
                      ? "bg-[#c9a227] text-[#0a1628]"
                      : "bg-white/5 border border-white/15 text-white/60 hover:text-white hover:border-[#c9a227]/40"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeInSection>

          {/* Job cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredJobs.map((job, i) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  href="/careers"
                  className="group bg-white/4 border border-white/10 rounded-2xl overflow-hidden hover:border-[#c9a227]/50 hover:shadow-2xl hover:shadow-[#c9a227]/5 transition-all duration-300 block h-full"
                >
                  <div className="relative h-44 overflow-hidden">
                    <motion.img
                      src={job.img}
                      alt={job.title}
                      className="w-full h-full object-cover brightness-75 group-hover:brightness-90 transition-all duration-500"
                      whileHover={{ scale: 1.07 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06101f]/90 via-[#06101f]/30 to-transparent" />
                    {job.urgent && (
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">URGENT</span>
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 bg-[#c9a227] text-[#0a1628] text-xs font-bold rounded-full">{job.dept}</span>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <div className="w-9 h-9 rounded-xl bg-[#c9a227] flex items-center justify-center shadow-lg">
                        <job.icon className="w-4.5 h-4.5 text-[#0a1628] w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-white text-base mb-3 group-hover:text-[#c9a227] transition-colors leading-tight">
                      {job.title}
                    </h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-white/50 text-sm">
                        <MapPin className="w-3.5 h-3.5 text-[#c9a227] shrink-0" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-2 text-white/50 text-sm">
                        <Clock className="w-3.5 h-3.5 text-[#c9a227] shrink-0" />
                        {job.type}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {job.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 bg-white/5 border border-white/10 text-white/50 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                      <span className="text-[#c9a227] text-xs font-semibold">SinoGlobal Enterprise</span>
                      <span className="inline-flex items-center gap-1 text-white/40 text-xs group-hover:text-[#c9a227] transition-colors">
                        Apply <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Benefits strip */}
          <FadeInSection delay={0.2}>
            <div className="bg-white/4 border border-white/10 rounded-2xl p-8 mb-8">
              <h3 className="text-white font-bold text-lg text-center mb-6">Why Work With SinoGlobal?</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { icon: Plane, title: "Paid Relocation", desc: "Full travel & accommodation" },
                  { icon: Award, title: "Competitive Pay", desc: "Above-market packages" },
                  { icon: Globe, title: "Global Exposure", desc: "Work across 43 countries" },
                  { icon: BadgeCheck, title: "Visa Sponsorship", desc: "Full legal support" },
                ].map((b, i) => (
                  <motion.div
                    key={b.title}
                    className="text-center"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#c9a227]/15 border border-[#c9a227]/25 flex items-center justify-center mx-auto mb-3">
                      <b.icon className="w-5 h-5 text-[#c9a227]" />
                    </div>
                    <div className="text-white font-semibold text-sm">{b.title}</div>
                    <div className="text-white/40 text-xs mt-1">{b.desc}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.25}>
            <div className="text-center">
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 px-10 py-4 bg-[#c9a227] text-[#0a1628] font-bold rounded-lg hover:bg-[#d4af37] transition-colors text-lg shadow-lg shadow-[#c9a227]/20"
              >
                Browse All 200+ Positions <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ── About excerpt ── */}
      <section className="py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeInSection direction="left">
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
                  Under Chairman Li Hongbin and CEO Zhang Wei, SinoGlobal has maintained an <strong className="text-foreground">18% compound annual growth rate</strong> over the past decade, while earning ISO 9001, ISO 14001, and OHSAS 18001 certifications across all major divisions.
                </p>

                {/* Company fact grid */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {companyFacts.map((fact) => (
                    <motion.div
                      key={fact.label}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-3 border border-border rounded-xl px-4 py-3 bg-card hover:border-[#c9a227]/40 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#c9a227]/10 flex items-center justify-center shrink-0">
                        <fact.icon className="w-4 h-4 text-[#c9a227]" />
                      </div>
                      <div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wide">{fact.label}</div>
                        <div className="font-bold text-foreground text-sm">{fact.value}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <Link href="/about" className="inline-flex items-center gap-2 text-[#c9a227] font-semibold hover:gap-4 transition-all group">
                  Read Our Full Story <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </FadeInSection>

            <FadeInSection direction="right" delay={0.15}>
              <div className="relative">
                <motion.img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&h=500&fit=crop"
                  alt="SinoGlobal headquarters"
                  className="rounded-2xl w-full h-80 lg:h-96 object-cover shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="absolute -bottom-6 -left-6 bg-[#c9a227] rounded-xl p-6 shadow-xl"
                >
                  <div className="text-3xl font-bold text-[#0a1628]">18%</div>
                  <div className="text-[#0a1628]/80 text-xs font-semibold uppercase tracking-wide mt-1">Annual Growth Rate</div>
                  <div className="text-[#0a1628]/60 text-xs">10-year average CAGR</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="absolute -top-4 -right-4 bg-[#0d1b2e] border border-white/10 rounded-xl p-4 shadow-xl"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="w-4 h-4 text-[#c9a227]" />
                    <span className="text-white text-xs font-semibold">Fortune 500</span>
                  </div>
                  <div className="text-[#c9a227] text-xl font-bold">#312</div>
                  <div className="text-white/40 text-xs">Global ranking 2023</div>
                </motion.div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* ── Business Divisions ── */}
      <section className="py-28 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-px w-8 bg-[#c9a227]" />
                <span className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold">Our Business</span>
                <div className="h-px w-8 bg-[#c9a227]" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">Diversified Portfolio</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Eight strategic business units working in concert to deliver integrated solutions for the world's most complex challenges.
              </p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {divisions.map((div, i) => (
              <motion.div
                key={div.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <Link href={div.href} className="group bg-card border border-border rounded-xl overflow-hidden hover:border-[#c9a227]/50 hover:shadow-xl transition-all duration-300 block">
                  <div className="relative h-40 overflow-hidden">
                    <motion.img
                      src={div.img}
                      alt={div.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/80 via-transparent to-transparent" />
                    <motion.div
                      className="absolute bottom-3 left-3 w-8 h-8 rounded-lg bg-[#c9a227] flex items-center justify-center shadow"
                      whileHover={{ rotate: 15, scale: 1.2 }}
                    >
                      <div.icon className="w-4 h-4 text-[#0a1628]" />
                    </motion.div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-foreground text-sm mb-2 group-hover:text-[#c9a227] transition-colors">{div.name}</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">{div.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <FadeInSection delay={0.2}>
            <div className="text-center mt-10">
              <Link href="/services" className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#c9a227] text-[#c9a227] rounded hover:bg-[#c9a227] hover:text-[#0a1628] transition-colors font-semibold">
                Explore All Divisions <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ── Our People ── */}
      <section className="py-28 bg-[#06101f] relative overflow-hidden">
        <FloatingOrb x="80%" y="10%" size={300} delay={0.5} duration={7} />
        <FloatingOrb x="5%" y="60%" size={200} delay={1.5} duration={9} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeInSection direction="left">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-px w-8 bg-[#c9a227]" />
                  <span className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold">Our People</span>
                </div>
                <h2 className="text-4xl font-bold text-white mb-6">Global Talent, One Team</h2>
                <p className="text-white/65 leading-relaxed mb-6 text-lg">
                  Our workforce spans 47,000 professionals from over 80 nationalities. Diversity of thought, background, and experience is the foundation of our competitive advantage.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { value: "80+", label: "Nationalities" },
                    { value: "38%", label: "Women in Leadership" },
                    { value: "$340M", label: "Annual Training Spend" },
                    { value: "94%", label: "Retention Rate" },
                  ].map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      whileHover={{ y: -4, borderColor: "#c9a22760" }}
                      className="bg-white/5 border border-white/10 rounded-xl p-5"
                    >
                      <div className="text-2xl font-bold text-[#c9a227]"><AnimatedCounter value={s.value} /></div>
                      <div className="text-white/60 text-sm mt-1">{s.label}</div>
                    </motion.div>
                  ))}
                </div>
                <Link href="/careers" className="inline-flex items-center gap-2 px-6 py-3 bg-[#c9a227] text-[#0a1628] font-semibold rounded hover:bg-[#d4af37] transition-colors">
                  Join Our Team <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </FadeInSection>

            <FadeInSection direction="right" delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=350&h=250&fit=crop", alt: "Team collaboration", mt: "" },
                  { src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=350&h=250&fit=crop", alt: "Professional at work", mt: "mt-8" },
                  { src: "https://images.unsplash.com/photo-1571624436279-b272aff752b5?w=350&h=250&fit=crop", alt: "Global team", mt: "-mt-8" },
                  { src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=350&h=250&fit=crop", alt: "Business meeting", mt: "" },
                ].map((img, i) => (
                  <motion.img
                    key={img.alt}
                    src={img.src}
                    alt={img.alt}
                    className={`rounded-xl object-cover w-full h-48 ${img.mt}`}
                    whileHover={{ scale: 1.04, zIndex: 10 }}
                    transition={{ duration: 0.3 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ transitionDelay: `${i * 0.08}s` }}
                  />
                ))}
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* ── Leadership Spotlight ── */}
      <section className="py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-px w-8 bg-[#c9a227]" />
                <span className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold">Leadership</span>
                <div className="h-px w-8 bg-[#c9a227]" />
              </div>
              <h2 className="text-4xl font-bold text-foreground mb-3">Executive Team</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Guided by world-class leaders with decades of international experience across engineering, finance, technology, and operations.</p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((person, i) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="relative inline-block mb-5">
                  <motion.img
                    src={person.img}
                    alt={person.name}
                    className="w-28 h-28 rounded-full object-cover mx-auto border-4 border-border shadow-lg"
                    whileHover={{ scale: 1.08, borderColor: "#c9a227" }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#c9a227] rounded-full flex items-center justify-center"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                  >
                    <Star className="w-3.5 h-3.5 text-[#0a1628] fill-[#0a1628]" />
                  </motion.div>
                </div>
                <h3 className="font-bold text-foreground text-lg">{person.name}</h3>
                <p className="text-[#c9a227] text-sm font-medium mt-1">{person.title}</p>
              </motion.div>
            ))}
          </div>

          <FadeInSection delay={0.2}>
            <div className="text-center mt-10">
              <Link href="/about#team" className="inline-flex items-center gap-2 text-[#c9a227] font-semibold hover:gap-3 transition-all">
                Meet the Full Team <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="py-28 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-px w-8 bg-[#c9a227]" />
                <span className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold">Core Values</span>
                <div className="h-px w-8 bg-[#c9a227]" />
              </div>
              <h2 className="text-4xl font-bold text-foreground mb-4">What We Stand For</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">These principles guide every decision, partnership, and project across our global operations.</p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(201,162,39,0.12)" }}
                className="bg-card border border-border rounded-xl p-8 text-center transition-colors hover:border-[#c9a227]/50 group cursor-default"
              >
                <PulsingIcon icon={val.icon} delay={i * 0.4} />
                <div className="text-3xl font-black text-[#c9a227]/20 mb-2">0{i + 1}</div>
                <h3 className="font-bold text-foreground mb-3 text-lg">{val.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Latest News ── */}
      <section className="py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
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
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map((article, i) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href="/newsroom" className="group bg-card border border-border rounded-xl overflow-hidden hover:border-[#c9a227]/40 hover:shadow-lg transition-all block">
                  <div className="relative h-48 overflow-hidden">
                    <motion.img
                      src={article.img}
                      alt={article.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute top-4 left-4">
                      <motion.span
                        whileHover={{ scale: 1.1 }}
                        className="px-3 py-1 bg-[#c9a227] text-[#0a1628] text-xs font-bold rounded-full inline-block"
                      >
                        {article.tag}
                      </motion.span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-muted-foreground mb-2">{article.date}</div>
                    <h3 className="font-bold text-foreground text-base mb-3 leading-snug group-hover:text-[#c9a227] transition-colors">{article.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{article.excerpt}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sustainability teaser ── */}
      <section className="py-28 bg-[#06101f] relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1400&h=600&fit=crop" alt="Sustainability" className="w-full h-full object-cover opacity-10" />
        </div>
        <FloatingOrb x="70%" y="20%" size={280} delay={0} duration={8} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeInSection direction="left">
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
                  ].map((s, i) => (
                    <motion.div key={s.label} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i * 0.15 }}>
                      <div className="text-2xl font-bold text-[#c9a227]"><AnimatedCounter value={s.value} /></div>
                      <div className="text-white/50 text-xs mt-1">{s.label}</div>
                    </motion.div>
                  ))}
                </div>
                <Link href="/sustainability" className="inline-flex items-center gap-2 px-6 py-3 border border-[#c9a227] text-[#c9a227] rounded hover:bg-[#c9a227] hover:text-[#0a1628] transition-colors font-semibold">
                  <Leaf className="w-4 h-4" /> Our ESG Report
                </Link>
              </div>
            </FadeInSection>

            <FadeInSection direction="right" delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "CDP Climate Rating", value: "A–", sub: "Leadership Level" },
                  { label: "MSCI ESG Rating", value: "AA", sub: "Strong performer" },
                  { label: "Renewable Energy", value: "42%", sub: "of total power use" },
                  { label: "Female Leadership", value: "38%", sub: "senior positions" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    className="bg-white/5 border border-white/10 rounded-xl p-6 text-center"
                    whileHover={{ scale: 1.04, borderColor: "#c9a22750" }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="text-3xl font-bold text-[#c9a227] mb-1"><AnimatedCounter value={item.value} /></div>
                    <div className="text-white text-sm font-semibold">{item.label}</div>
                    <div className="text-white/40 text-xs mt-1">{item.sub}</div>
                  </motion.div>
                ))}
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* ── Global Presence ── */}
      <section className="py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-px w-8 bg-[#c9a227]" />
                <span className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold">Global Presence</span>
                <div className="h-px w-8 bg-[#c9a227]" />
              </div>
              <h2 className="text-4xl font-bold text-foreground mb-4">Operating Across 6 Continents</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Our offices bring local expertise with international standards to every market we serve.</p>
            </div>
          </FadeInSection>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {offices.map((city, i) => (
              <motion.span
                key={city}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ scale: 1.1, borderColor: "#c9a227", color: "#c9a227" }}
                className="px-4 py-2 border border-border rounded-full text-sm text-muted-foreground cursor-default transition-colors"
              >
                {city}
              </motion.span>
            ))}
            <motion.span
              whileHover={{ scale: 1.1 }}
              className="px-4 py-2 border border-[#c9a227]/40 rounded-full text-sm text-[#c9a227] font-medium cursor-default"
            >
              +14 more cities
            </motion.span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            {[
              { region: "Asia Pacific", offices: "18 offices", icon: "🌏" },
              { region: "Middle East", offices: "6 offices", icon: "🌍" },
              { region: "Europe", offices: "7 offices", icon: "🌍" },
              { region: "Americas", offices: "5 offices", icon: "🌎" },
              { region: "Oceania", offices: "2 offices", icon: "🌏" },
            ].map((r, i) => (
              <motion.div
                key={r.region}
                className="bg-card border border-border rounded-xl p-5"
                whileHover={{ y: -4, borderColor: "#c9a22750", boxShadow: "0 10px 30px rgba(201,162,39,0.08)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="text-2xl mb-2">{r.icon}</div>
                <div className="font-bold text-foreground text-sm">{r.region}</div>
                <div className="text-[#c9a227] text-xs mt-1">{r.offices}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications strip ── */}
      <section className="py-16 bg-muted/20 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-muted-foreground uppercase tracking-widest mb-8 font-semibold">Accreditations & Recognition</p>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            {awards.map((a, i) => (
              <motion.div
                key={a.label}
                className="text-center group cursor-default"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
              >
                <motion.div
                  className="w-12 h-12 rounded-full bg-[#c9a227]/10 border border-[#c9a227]/30 flex items-center justify-center mx-auto mb-3"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, delay: i * 0.5, repeat: Infinity }}
                >
                  <Award className="w-5 h-5 text-[#c9a227]" />
                </motion.div>
                <div className="text-sm font-bold text-foreground">{a.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{a.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-24 bg-[#c9a227] relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: "radial-gradient(circle, #0a1628 1px, transparent 1px)",
            backgroundSize: "30px 30px"
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInSection>
            <motion.div
              className="w-16 h-16 rounded-2xl bg-[#0a1628]/15 flex items-center justify-center mx-auto mb-6"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Zap className="w-8 h-8 text-[#0a1628]" />
            </motion.div>
            <h2 className="text-4xl font-bold text-[#0a1628] mb-4">Ready to Join or Partner With SinoGlobal?</h2>
            <p className="text-[#0a1628]/70 text-lg mb-8 max-w-xl mx-auto">
              Whether you're looking for a global career opportunity or a strategic business partnership, we're ready to connect.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link href="/careers" className="inline-flex items-center gap-2 px-8 py-4 bg-[#0a1628] text-white font-bold rounded-lg hover:bg-[#0d1b2e] transition-colors">
                  View Open Jobs <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#0a1628] text-[#0a1628] font-bold rounded-lg hover:bg-[#0a1628]/10 transition-colors">
                  Contact Our Team
                </Link>
              </motion.div>
            </div>
          </FadeInSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
