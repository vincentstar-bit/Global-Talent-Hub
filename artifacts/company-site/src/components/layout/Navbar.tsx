import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, Globe, ChevronDown, Building2, Leaf, Newspaper, TrendingUp,
  Users, Award, Clock, Briefcase, Cpu, HeartPulse, Ship, FlaskConical,
  Home as HomeIcon, BarChart3, Phone, Mail, Search, Languages,
  Truck, Wrench, HardHat, Plane, Anchor, FileText, Scale, BookOpen,
  ShieldCheck, LineChart, Handshake, MapPin, CalendarDays, Info
} from "lucide-react";

const aboutLinks = [
  { href: "/about", label: "Our Story", sub: "History & founding since 2003", icon: Clock },
  { href: "/about#team", label: "Executive Team", sub: "Leadership profiles", icon: Users },
  { href: "/about#milestones", label: "Milestones", sub: "21 years of growth", icon: TrendingUp },
  { href: "/about#certifications", label: "Certifications & Awards", sub: "ISO & global recognitions", icon: Award },
  { href: "/about", label: "Corporate Governance", sub: "Policies & compliance", icon: ShieldCheck },
  { href: "/about", label: "Global Offices", sub: "40+ locations worldwide", icon: MapPin },
];

const businessLinks = [
  { href: "/services#engineering", label: "Engineering & Technology", sub: "Smart infrastructure & cities", icon: Building2 },
  { href: "/services#finance", label: "Finance & Investment", sub: "Capital & M&A advisory", icon: BarChart3 },
  { href: "/services#healthcare", label: "Healthcare & Pharma", sub: "Life-saving medicines", icon: HeartPulse },
  { href: "/services#logistics", label: "Operations & Logistics", sub: "43-country supply chain", icon: Ship },
  { href: "/services#it", label: "Information Technology", sub: "Cloud & cybersecurity", icon: Cpu },
  { href: "/services#research", label: "Research & Development", sub: "Biotech & clean energy", icon: FlaskConical },
  { href: "/services", label: "Construction & Real Estate", sub: "Landmark developments", icon: HardHat },
  { href: "/services", label: "International Trade", sub: "Cross-border compliance", icon: Handshake },
];

const careersLinks = [
  { href: "/careers", label: "Moving & Relocation Jobs", sub: "International placement roles", icon: Truck },
  { href: "/careers", label: "Engineering Positions", sub: "Technical & field roles", icon: Wrench },
  { href: "/careers", label: "Operations & Logistics", sub: "Supply chain & transport", icon: Anchor },
  { href: "/careers", label: "Corporate & Finance", sub: "Office & professional roles", icon: Briefcase },
  { href: "/careers", label: "Healthcare & Medical", sub: "Clinical & pharma careers", icon: HeartPulse },
  { href: "/careers", label: "Technology & IT", sub: "Software & infrastructure", icon: Cpu },
  { href: "/careers", label: "International Assignments", sub: "Expat & overseas postings", icon: Plane },
  { href: "/careers", label: "Graduate Programme", sub: "Entry-level & internships", icon: BookOpen },
];

const moreLinks = [
  { href: "/sustainability", label: "Sustainability & ESG", sub: "Carbon goals & impact", icon: Leaf },
  { href: "/newsroom", label: "Newsroom", sub: "Press & announcements", icon: Newspaper },
  { href: "/investors", label: "Investor Relations", sub: "Reports & IR contact", icon: LineChart },
  { href: "/contact", label: "Global Offices", sub: "Find a location near you", icon: MapPin },
  { href: "/contact", label: "Media & PR", sub: "Press enquiries", icon: FileText },
  { href: "/contact", label: "Legal & Compliance", sub: "Policies & documents", icon: Scale },
];

const languages = [
  { code: "EN", label: "English", flag: "🇺🇸" },
  { code: "ZH", label: "中文", flag: "🇨🇳" },
  { code: "AR", label: "العربية", flag: "🇦🇪" },
  { code: "FR", label: "Français", flag: "🇫🇷" },
  { code: "DE", label: "Deutsch", flag: "🇩🇪" },
  { code: "JA", label: "日本語", flag: "🇯🇵" },
  { code: "KO", label: "한국어", flag: "🇰🇷" },
  { code: "ES", label: "Español", flag: "🇪🇸" },
];

const dropdownVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.18, ease: "easeOut" } },
  exit: { opacity: 0, y: -6, scale: 0.97, transition: { duration: 0.12 } },
};

function NavDropdown({ label, children, isActive }: { label: string; children: React.ReactNode; isActive?: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors rounded ${
          isActive || open ? "text-[#c9a227] bg-white/5" : "text-white/80 hover:text-white hover:bg-white/5"
        }`}
      >
        {label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-full left-0 mt-1 bg-[#0d1b2e] border border-white/10 rounded-xl shadow-2xl z-50 min-w-[260px] py-2 overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MegaDropdown({ label, children, isActive, wide }: { label: string; children: React.ReactNode; isActive?: boolean; wide?: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors rounded ${
          isActive || open ? "text-[#c9a227] bg-white/5" : "text-white/80 hover:text-white hover:bg-white/5"
        }`}
      >
        {label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`absolute top-full left-0 mt-1 bg-[#0d1b2e] border border-white/10 rounded-xl shadow-2xl z-50 ${wide ? "w-[560px]" : "w-[520px]"} py-3 overflow-hidden`}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(languages[0]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors rounded border ${
          open ? "border-[#c9a227]/50 text-[#c9a227] bg-white/5" : "border-white/15 text-white/60 hover:text-white hover:border-white/30"
        }`}
      >
        <span>{selected.flag}</span>
        <span>{selected.code}</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-full right-0 mt-1 bg-[#0d1b2e] border border-white/10 rounded-xl shadow-2xl z-50 min-w-[180px] py-2 overflow-hidden"
          >
            <div className="px-3 py-1.5 border-b border-white/10 mb-1">
              <div className="text-[#c9a227] text-[10px] tracking-widest uppercase font-medium">Select Language</div>
            </div>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { setSelected(lang); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors hover:bg-white/5 ${
                  selected.code === lang.code ? "text-[#c9a227]" : "text-white/70 hover:text-white"
                }`}
              >
                <span className="text-base">{lang.flag}</span>
                <span>{lang.label}</span>
                {selected.code === lang.code && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#c9a227]" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const isActive = (path: string) => location === path || location.startsWith(path + "/");

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-[#0d1b2e]/98 shadow-xl backdrop-blur-md" : "bg-[#0d1b2e]/97 backdrop-blur-md"
    } border-b border-white/10`}>
      {/* Top utility bar */}
      <div className="hidden lg:block bg-[#070f1c] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-8 text-xs text-white/40">
            <div className="flex items-center gap-6">
              <a href="tel:+861088886666" className="flex items-center gap-1.5 hover:text-[#c9a227] transition-colors">
                <Phone className="w-3 h-3" /> +86 10 8888 6666
              </a>
              <a href="mailto:info@sinoglobal.com" className="flex items-center gap-1.5 hover:text-[#c9a227] transition-colors">
                <Mail className="w-3 h-3" /> info@sinoglobal.com
              </a>
              <span className="text-white/20">|</span>
              <span className="flex items-center gap-1"><CalendarDays className="w-3 h-3" /> Mon–Fri 09:00–18:00 CST</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-white/25">Fortune Global 500 · ISO 9001:2015 · MSCI ESG: AA · UN Global Compact</span>
              <Link href="/investors" className="hover:text-[#c9a227] transition-colors">Investor Relations</Link>
              <span className="text-white/20">|</span>
              <Link href="/newsroom" className="hover:text-[#c9a227] transition-colors">Press Room</Link>
              <span className="text-white/20">|</span>
              <Link href="/portal" className="hover:text-[#c9a227] transition-colors">Worker Portal</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 py-2">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-9 h-9 rounded bg-[#c9a227] flex items-center justify-center shadow-lg"
            >
              <Globe className="w-5 h-5 text-[#0d1b2e]" />
            </motion.div>
            <div>
              <div className="text-white font-bold text-sm leading-tight tracking-wide">SINOGLOBAL</div>
              <div className="text-[#c9a227] text-[9px] tracking-widest uppercase font-medium">Enterprise Co., Ltd.</div>
            </div>
          </Link>

          <div className="hidden xl:flex items-center gap-0">
            <Link
              href="/"
              className={`px-3 py-2 text-sm font-medium transition-colors rounded ${
                location === "/" ? "text-[#c9a227] bg-white/5" : "text-white/80 hover:text-white hover:bg-white/5"
              }`}
            >
              Home
            </Link>

            <NavDropdown label="About" isActive={isActive("/about")}>
              <div className="px-3 py-1.5 border-b border-white/10 mb-1">
                <div className="text-[#c9a227] text-[10px] tracking-widest uppercase font-medium">About SinoGlobal</div>
              </div>
              {aboutLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-start gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#c9a227]/10 flex items-center justify-center shrink-0 group-hover:bg-[#c9a227]/20 transition-colors mt-0.5">
                    <link.icon className="w-4 h-4 text-[#c9a227]" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium group-hover:text-[#c9a227] transition-colors">{link.label}</div>
                    <div className="text-white/40 text-xs">{link.sub}</div>
                  </div>
                </Link>
              ))}
            </NavDropdown>

            <MegaDropdown label="Business" isActive={isActive("/services")} wide>
              <div className="px-4 py-2 border-b border-white/10 mb-1 flex items-center justify-between">
                <div className="text-[#c9a227] text-[10px] tracking-widest uppercase font-medium">Our Business Divisions</div>
                <Link href="/services" className="text-white/40 text-xs hover:text-[#c9a227] transition-colors">View all →</Link>
              </div>
              <div className="grid grid-cols-2 gap-0.5 px-2 pb-2">
                {businessLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex items-start gap-3 px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#c9a227]/10 flex items-center justify-center shrink-0 group-hover:bg-[#c9a227]/20 transition-colors mt-0.5">
                      <link.icon className="w-4 h-4 text-[#c9a227]" />
                    </div>
                    <div>
                      <div className="text-white/90 text-sm font-medium group-hover:text-[#c9a227] transition-colors leading-tight">{link.label}</div>
                      <div className="text-white/35 text-xs mt-0.5">{link.sub}</div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mx-4 mt-1 p-3 bg-[#c9a227]/8 border border-[#c9a227]/20 rounded-lg">
                <div className="text-[#c9a227] text-xs font-semibold mb-0.5">Fortune Global 500 · Ranked #312</div>
                <div className="text-white/40 text-xs">Operating across 43 countries, 6 continents</div>
              </div>
            </MegaDropdown>

            <MegaDropdown label="Careers" isActive={isActive("/careers")} wide>
              <div className="px-4 py-2 border-b border-white/10 mb-1 flex items-center justify-between">
                <div className="text-[#c9a227] text-[10px] tracking-widest uppercase font-medium">Career Opportunities</div>
                <Link href="/careers" className="text-white/40 text-xs hover:text-[#c9a227] transition-colors">All jobs →</Link>
              </div>
              <div className="grid grid-cols-2 gap-0.5 px-2 pb-2">
                {careersLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex items-start gap-3 px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#c9a227]/10 flex items-center justify-center shrink-0 group-hover:bg-[#c9a227]/20 transition-colors mt-0.5">
                      <link.icon className="w-4 h-4 text-[#c9a227]" />
                    </div>
                    <div>
                      <div className="text-white/90 text-sm font-medium group-hover:text-[#c9a227] transition-colors leading-tight">{link.label}</div>
                      <div className="text-white/35 text-xs mt-0.5">{link.sub}</div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mx-4 mt-1 p-3 bg-[#c9a227]/8 border border-[#c9a227]/20 rounded-lg flex items-center justify-between">
                <div>
                  <div className="text-[#c9a227] text-xs font-semibold mb-0.5">Now Hiring — 200+ Open Roles</div>
                  <div className="text-white/40 text-xs">Positions across Asia, Europe & the Americas</div>
                </div>
                <Link href="/careers" className="shrink-0 px-3 py-1.5 bg-[#c9a227] text-[#0a1628] text-xs font-bold rounded hover:bg-[#d4af37] transition-colors">
                  Apply Now
                </Link>
              </div>
            </MegaDropdown>

            <NavDropdown label="Resources" isActive={isActive("/sustainability") || isActive("/newsroom") || isActive("/investors")}>
              <div className="px-3 py-1.5 border-b border-white/10 mb-1">
                <div className="text-[#c9a227] text-[10px] tracking-widest uppercase font-medium">Resources & Info</div>
              </div>
              {moreLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-start gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#c9a227]/10 flex items-center justify-center shrink-0 group-hover:bg-[#c9a227]/20 transition-colors mt-0.5">
                    <link.icon className="w-4 h-4 text-[#c9a227]" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium group-hover:text-[#c9a227] transition-colors">{link.label}</div>
                    <div className="text-white/40 text-xs">{link.sub}</div>
                  </div>
                </Link>
              ))}
            </NavDropdown>

            <Link
              href="/contact"
              className={`px-3 py-2 text-sm font-medium transition-colors rounded ${
                isActive("/contact") ? "text-[#c9a227] bg-white/5" : "text-white/80 hover:text-white hover:bg-white/5"
              }`}
            >
              Contact
            </Link>
          </div>

          <div className="hidden xl:flex items-center gap-2">
            <LanguageSelector />
            <Link
              href="/portal"
              className="px-4 py-2 text-sm font-medium border border-[#c9a227] text-[#c9a227] rounded hover:bg-[#c9a227] hover:text-[#0a1628] transition-colors"
            >
              Worker Portal
            </Link>
          </div>

          <button
            className="xl:hidden text-white/80 hover:text-white p-2"
            onClick={() => { setOpen(!open); setMobileSection(null); }}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-[#0a1628] border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1 max-h-[80vh] overflow-y-auto">
              <Link href="/" onClick={() => setOpen(false)} className="block px-3 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded">Home</Link>

              {[
                { key: "about", label: "About", links: aboutLinks },
                { key: "business", label: "Business", links: businessLinks },
                { key: "careers", label: "Careers", links: careersLinks },
                { key: "resources", label: "Resources", links: moreLinks },
              ].map(({ key, label, links }) => (
                <div key={key}>
                  <button
                    onClick={() => setMobileSection(mobileSection === key ? null : key)}
                    className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded"
                  >
                    {label} <ChevronDown className={`w-4 h-4 transition-transform ${mobileSection === key ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {mobileSection === key && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4 space-y-1 border-l border-[#c9a227]/30 ml-3 overflow-hidden"
                      >
                        {links.map((l) => (
                          <Link key={l.label} href={l.href} onClick={() => setOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-white/60 hover:text-[#c9a227]">
                            <l.icon className="w-3.5 h-3.5" />{l.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              <Link href="/contact" onClick={() => setOpen(false)} className="block px-3 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded">Contact</Link>
              <div className="pt-2 border-t border-white/10 space-y-2">
                <Link href="/portal" onClick={() => setOpen(false)} className="block px-3 py-2.5 text-sm text-[#c9a227] font-medium border border-[#c9a227]/30 rounded">Worker Portal</Link>
                <div className="flex flex-wrap gap-2 px-3">
                  {languages.map((lang) => (
                    <button key={lang.code} className="px-2 py-1 text-xs text-white/50 hover:text-[#c9a227] border border-white/10 rounded transition-colors">
                      {lang.flag} {lang.code}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
