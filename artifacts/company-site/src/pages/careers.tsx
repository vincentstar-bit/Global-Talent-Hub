import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useListJobs } from "@workspace/api-client-react";
import { Briefcase, MapPin, DollarSign, ChevronDown, ChevronUp, Users, Clock, CheckCircle, Star, ArrowRight, Globe, Award, Zap } from "lucide-react";

const careerSlides = [
  {
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1800&h=900&fit=crop",
    label: "Engineering",
    tagline: "Structural & civil engineers shaping tomorrow's skylines",
  },
  {
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1800&h=900&fit=crop",
    label: "Aviation",
    tagline: "Pilots flying international routes across 43 countries",
  },
  {
    img: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1800&h=900&fit=crop",
    label: "Healthcare",
    tagline: "Doctors and medical staff delivering care across continents",
  },
  {
    img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1800&h=900&fit=crop",
    label: "Electrical",
    tagline: "Electricians powering infrastructure projects worldwide",
  },
  {
    img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1800&h=900&fit=crop",
    label: "Heavy Transport",
    tagline: "Truck drivers keeping global supply chains moving",
  },
];

const kbVariants = [
  { initial: { scale: 1.18, x: "4%", y: "2%" }, animate: { scale: 1, x: "0%", y: "0%" } },
  { initial: { scale: 1, x: "0%", y: "0%" }, animate: { scale: 1.18, x: "-4%", y: "-2%" } },
  { initial: { scale: 1.14, x: "-3%", y: "3%" }, animate: { scale: 1, x: "3%", y: "-2%" } },
  { initial: { scale: 1, x: "3%", y: "-2%" }, animate: { scale: 1.14, x: "-3%", y: "2%" } },
  { initial: { scale: 1.12, x: "0%", y: "-3%" }, animate: { scale: 1, x: "0%", y: "3%" } },
];

function CareersHeroBg({ current, prev }: { current: number; prev: number | null }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {careerSlides.map((slide, i) => {
        const kb = kbVariants[i % kbVariants.length];
        const isActive = i === current;
        const isPrev = i === prev;
        if (!isActive && !isPrev) return null;
        return (
          <motion.div
            key={i}
            className="absolute inset-0"
            initial={{ opacity: isPrev ? 1 : 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          >
            <motion.img
              src={slide.img}
              alt={slide.label}
              className="w-full h-full object-cover"
              initial={kb.initial}
              animate={isActive ? kb.animate : kb.initial}
              transition={{ duration: 6, ease: "easeInOut" }}
            />
          </motion.div>
        );
      })}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/95 via-[#0a1628]/80 to-[#0a1628]/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/70 via-transparent to-[#0a1628]/30" />
    </div>
  );
}

const benefits = [
  { icon: DollarSign, title: "Competitive Compensation", desc: "Market-leading salaries, annual performance bonuses, and long-term incentive plans." },
  { icon: Globe, title: "International Mobility", desc: "Global rotation programs across 43 countries with relocation packages and housing allowances." },
  { icon: Award, title: "Health & Wellness", desc: "Comprehensive international health insurance for you and your dependants, including dental and vision." },
  { icon: Zap, title: "Career Development", desc: "$340M invested annually in professional development, executive MBA sponsorship, and mentoring." },
  { icon: Users, title: "Inclusive Culture", desc: "80+ nationalities working as one team. 38% women in leadership. Zero tolerance for discrimination." },
  { icon: Star, title: "Pension & Security", desc: "Employer-matched pension plans, life insurance, and long-service recognition programmes." },
];

const testimonials = [
  { name: "Amara Okonkwo", title: "Operations Manager, Lagos", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop", quote: "SinoGlobal gave me the opportunity to work across three continents before I turned 35. The exposure is unmatched anywhere else." },
  { name: "James Chukwuemeka", title: "Senior Engineer, Nairobi", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", quote: "I joined as a junior engineer and within four years led a $200M infrastructure project. The pace of growth here is extraordinary." },
  { name: "Lin Mei", title: "Finance Director, Singapore", img: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop", quote: "The international exposure and high-calibre colleagues at SinoGlobal are the best I've encountered in my 15-year career in finance." },
];

export default function CareersPage() {
  const { data: jobs, isLoading } = useListJobs();
  const [expanded, setExpanded] = useState<number | null>(null);
  const [filter, setFilter] = useState("");
  const [slide, setSlide] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setSlide((c) => { setPrev(c); return (c + 1) % careerSlides.length; });
    }, 5500);
    return () => clearInterval(id);
  }, []);

  const filtered = jobs?.filter((j) =>
    filter ? j.department === filter : true
  ) ?? [];

  const departments = [...new Set(jobs?.map((j) => j.department) ?? [])];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-[#0a1628] min-h-[70vh] flex items-center overflow-hidden">
        <CareersHeroBg current={slide} prev={prev} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40 w-full">
          {/* Live industry label */}
          <AnimatePresence mode="wait">
            <motion.div
              key={slide}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-4"
            >
              <span className="w-6 h-0.5 bg-[#c9a227] rounded-full" />
              <span className="text-[#c9a227]/80 text-sm font-semibold tracking-widest uppercase">
                {careerSlides[slide].label}
              </span>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">Join SinoGlobal</h1>
            <p className="text-white/70 text-xl max-w-2xl leading-relaxed mb-8">
              Build a global career with one of China's most prestigious multinationals. We hire exceptional talent across 12 divisions in 43 countries — all candidates personally verified by our MD and senior leadership.
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-8 mb-10">
            {[
              { value: "47,000+", label: "Team Members" },
              { value: "43", label: "Countries" },
              { value: "80+", label: "Nationalities" },
              { value: "12", label: "Business Divisions" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-[#c9a227]">{s.value}</div>
                <div className="text-white/50 text-sm">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Slide dots + tagline */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {careerSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setPrev(slide); setSlide(i); }}
                  className={`transition-all duration-300 rounded-full ${i === slide ? "w-8 h-2 bg-[#c9a227]" : "w-2 h-2 bg-white/30 hover:bg-white/60"}`}
                />
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.span
                key={slide}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.4 }}
                className="text-white/40 text-xs italic"
              >
                {careerSlides[slide].tagline}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8 bg-[#c9a227]" />
              <span className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold">Why SinoGlobal</span>
              <div className="h-px w-8 bg-[#c9a227]" />
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">Life at SinoGlobal</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">We invest in our people because they are the foundation of everything we achieve globally.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="bg-card border border-border rounded-xl p-7 hover:border-[#c9a227]/40 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 rounded-xl bg-[#c9a227]/10 border border-[#c9a227]/20 flex items-center justify-center mb-5 group-hover:bg-[#c9a227]/20 transition-colors">
                  <b.icon className="w-6 h-6 text-[#c9a227]" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team photos */}
      <section className="py-0 pb-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-4 gap-3 h-56">
            <img src="https://images.unsplash.com/photo-1571624436279-b272aff752b5?w=350&h=300&fit=crop" alt="Team" className="rounded-xl object-cover w-full h-full col-span-1" />
            <img src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=300&fit=crop" alt="Meeting" className="rounded-xl object-cover w-full h-full col-span-2" />
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=350&h=300&fit=crop" alt="Professional" className="rounded-xl object-cover w-full h-full col-span-1" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8 bg-[#c9a227]" />
              <span className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold">Our People</span>
              <div className="h-px w-8 bg-[#c9a227]" />
            </div>
            <h2 className="text-4xl font-bold text-foreground">Hear From Our Team</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-card border border-border rounded-xl p-8">
                <div className="flex gap-1 mb-5">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-[#c9a227] fill-[#c9a227]" />)}
                </div>
                <p className="text-muted-foreground leading-relaxed italic mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#c9a227]/30" />
                  <div>
                    <div className="font-bold text-foreground text-sm">{t.name}</div>
                    <div className="text-[#c9a227] text-xs">{t.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Process */}
      <section className="py-24 bg-[#0a1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8 bg-[#c9a227]" />
              <span className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold">Process</span>
              <div className="h-px w-8 bg-[#c9a227]" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-3">Our Hiring Process</h2>
            <p className="text-white/50 max-w-xl mx-auto">All hires are verified and personally approved by our MD or senior leadership — ensuring only the most qualified candidates join our global team.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Application Review", desc: "Our HR team thoroughly reviews your credentials, experience, and background verification checks.", icon: CheckCircle },
              { step: "02", title: "Technical Assessment", desc: "Skills evaluation and technical interview tailored to your specific role and division.", icon: Award },
              { step: "03", title: "Leadership Interview", desc: "Direct interview with our Managing Director or divisional senior staff member.", icon: Users },
              { step: "04", title: "Offer & Onboarding", desc: "Contract issued, unique Worker ID and Access Token generated. Formal onboarding begins.", icon: Star },
            ].map((step, i) => (
              <div key={step.step} className="bg-white/5 border border-white/10 rounded-xl p-7 text-center hover:border-[#c9a227]/30 transition-colors">
                <div className="text-4xl font-black text-[#c9a227]/30 mb-3">{step.step}</div>
                <step.icon className="w-8 h-8 text-[#c9a227] mx-auto mb-4" />
                <h4 className="font-bold text-white mb-3">{step.title}</h4>
                <p className="text-xs text-white/50 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-px w-8 bg-[#c9a227]" />
                <span className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold">Available Roles</span>
              </div>
              <h2 className="text-4xl font-bold text-foreground">Open Positions</h2>
              <p className="text-muted-foreground mt-1">{filtered.length} position{filtered.length !== 1 ? "s" : ""} currently available</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Filter by:</span>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-border rounded-lg px-4 py-2.5 text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-[#c9a227]"
              >
                <option value="">All Departments</option>
                {departments.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[1,2,3].map(i => (
                <div key={i} className="bg-card border border-border rounded-xl p-8 animate-pulse">
                  <div className="flex gap-5">
                    <div className="w-16 h-16 bg-muted rounded-xl" />
                    <div className="flex-1">
                      <div className="h-5 bg-muted rounded w-56 mb-3" />
                      <div className="h-4 bg-muted rounded w-36" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>No positions available in this department at the moment.</p>
            </div>
          ) : (
            <div className="space-y-5">
              {filtered.map((job) => (
                <div key={job.id} className="bg-card border border-border rounded-xl overflow-hidden hover:border-[#c9a227]/50 hover:shadow-lg transition-all">
                  <div className="p-8">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                      <div className="flex gap-5">
                        {job.photoUrl && (
                          <img
                            src={job.photoUrl}
                            alt={job.title}
                            className="w-18 h-18 w-16 h-16 rounded-xl object-cover flex-shrink-0 border border-border"
                          />
                        )}
                        <div>
                          <h3 className="font-bold text-foreground text-xl mb-2">{job.title}</h3>
                          <div className="flex flex-wrap gap-4 mt-2">
                            <span className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
                              <Briefcase className="w-3.5 h-3.5" /> {job.department}
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
                              <MapPin className="w-3.5 h-3.5" /> Beijing, China & International
                            </span>
                            <span className="flex items-center gap-1.5 text-xs font-semibold text-[#c9a227] bg-[#c9a227]/10 px-3 py-1.5 rounded-full">
                              <DollarSign className="w-3.5 h-3.5" /> {job.salary}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setExpanded(expanded === job.id ? null : job.id)}
                        className="flex items-center gap-2 px-6 py-3 border border-[#c9a227] text-[#c9a227] rounded-lg text-sm font-semibold hover:bg-[#c9a227] hover:text-[#0a1628] transition-colors shrink-0"
                      >
                        {expanded === job.id ? <><ChevronUp className="w-4 h-4" /> Close</> : <><ChevronDown className="w-4 h-4" /> View Details</>}
                      </button>
                    </div>

                    <p className="text-muted-foreground mt-5 leading-relaxed">{job.description}</p>

                    {expanded === job.id && (
                      <div className="mt-8 pt-8 border-t border-border">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                          <div>
                            <h4 className="font-bold text-foreground text-sm mb-4 flex items-center gap-2">
                              <Users className="w-4 h-4 text-[#c9a227]" /> Key Responsibilities
                            </h4>
                            <div className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{job.responsibilities}</div>
                          </div>
                          <div>
                            <h4 className="font-bold text-foreground text-sm mb-4 flex items-center gap-2">
                              <Clock className="w-4 h-4 text-[#c9a227]" /> Requirements
                            </h4>
                            <div className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{job.requirements}</div>
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-muted/50 rounded-xl px-6 py-5">
                          <div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              <strong className="text-foreground">Important:</strong> All candidates undergo thorough background verification. Offers are extended exclusively by our MD or divisional senior leadership. Successful candidates receive a unique <strong className="text-foreground">Worker ID and Access Token</strong> upon contract signing.
                            </p>
                          </div>
                          <button className="px-6 py-3 bg-[#c9a227] text-[#0a1628] font-bold rounded-lg hover:bg-[#d4af37] transition-colors shrink-0 flex items-center gap-2">
                            Apply Now <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#c9a227]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#0a1628] mb-4">Don't See Your Role?</h2>
          <p className="text-[#0a1628]/70 mb-8">We are always looking for exceptional talent. Send us your CV and we'll keep you in mind for future opportunities across our 12 divisions.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:careers@sinoglobal.com" className="px-8 py-3.5 bg-[#0a1628] text-white font-bold rounded hover:bg-[#0d1f38] transition-colors inline-flex items-center gap-2">
              Send Your CV <ArrowRight className="w-4 h-4" />
            </a>
            <a href="mailto:careers@sinoglobal.com" className="px-8 py-3.5 border-2 border-[#0a1628] text-[#0a1628] font-bold rounded hover:bg-[#0a1628]/10 transition-colors">
              careers@sinoglobal.com
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
