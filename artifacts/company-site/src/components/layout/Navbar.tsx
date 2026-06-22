import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Globe, ChevronDown, Building2, Leaf, Newspaper, TrendingUp, Users, Award, Clock, Briefcase, Cpu, HeartPulse, Ship, FlaskConical, Home as HomeIcon, BarChart3 } from "lucide-react";

const aboutLinks = [
  { href: "/about", label: "Our Story", sub: "History & founding", icon: Clock },
  { href: "/about#team", label: "Executive Team", sub: "Leadership profiles", icon: Users },
  { href: "/about#milestones", label: "Milestones", sub: "21 years of growth", icon: TrendingUp },
  { href: "/about#certifications", label: "Certifications", sub: "ISO & global awards", icon: Award },
];

const businessLinks = [
  { href: "/services#engineering", label: "Engineering & Technology", icon: Building2 },
  { href: "/services#finance", label: "Finance & Investment", icon: BarChart3 },
  { href: "/services#healthcare", label: "Healthcare & Pharma", icon: HeartPulse },
  { href: "/services#logistics", label: "Operations & Logistics", icon: Ship },
  { href: "/services#it", label: "Information Technology", icon: Cpu },
  { href: "/services#research", label: "Research & Development", icon: FlaskConical },
];

const moreLinks = [
  { href: "/sustainability", label: "Sustainability", icon: Leaf },
  { href: "/newsroom", label: "Newsroom", icon: Newspaper },
  { href: "/investors", label: "Investors", icon: TrendingUp },
];

function DropdownMenu({ label, children, isActive }: { label: string; children: React.ReactNode; isActive?: boolean }) {
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
        className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded ${
          isActive || open ? "text-[#c9a227] bg-white/5" : "text-white/80 hover:text-white hover:bg-white/5"
        }`}
      >
        {label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-[#0d1b2e] border border-white/10 rounded-lg shadow-xl z-50 min-w-[220px] py-2">
          {children}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [location] = useLocation();

  const isActive = (path: string) => location === path || location.startsWith(path + "/");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0d1b2e]/97 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-2">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded bg-[#c9a227] flex items-center justify-center shadow-lg">
              <Globe className="w-5 h-5 text-[#0d1b2e]" />
            </div>
            <div>
              <div className="text-white font-bold text-sm leading-tight tracking-wide">SINOGLOBAL</div>
              <div className="text-[#c9a227] text-[9px] tracking-widest uppercase font-medium">Enterprise Co., Ltd.</div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-0.5">
            <Link
              href="/"
              className={`px-3 py-2 text-sm font-medium transition-colors rounded ${
                location === "/" ? "text-[#c9a227] bg-white/5" : "text-white/80 hover:text-white hover:bg-white/5"
              }`}
            >
              Home
            </Link>

            <DropdownMenu label="About" isActive={isActive("/about")}>
              {aboutLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-start gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors group"
                >
                  <link.icon className="w-4 h-4 text-[#c9a227] mt-0.5 shrink-0" />
                  <div>
                    <div className="text-white text-sm font-medium group-hover:text-[#c9a227] transition-colors">{link.label}</div>
                    <div className="text-white/40 text-xs">{link.sub}</div>
                  </div>
                </Link>
              ))}
            </DropdownMenu>

            <DropdownMenu label="Business" isActive={isActive("/services")}>
              <div className="px-3 py-1.5">
                <div className="text-[#c9a227] text-[10px] tracking-widest uppercase font-medium mb-1">Our Divisions</div>
              </div>
              {businessLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors group"
                >
                  <link.icon className="w-4 h-4 text-[#c9a227] shrink-0" />
                  <div className="text-white/80 text-sm group-hover:text-white transition-colors">{link.label}</div>
                </Link>
              ))}
            </DropdownMenu>

            <DropdownMenu label="More" isActive={isActive("/sustainability") || isActive("/newsroom") || isActive("/investors")}>
              {moreLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors group"
                >
                  <link.icon className="w-4 h-4 text-[#c9a227] shrink-0" />
                  <div className="text-white/80 text-sm group-hover:text-white transition-colors">{link.label}</div>
                </Link>
              ))}
            </DropdownMenu>

            <Link
              href="/careers"
              className={`px-3 py-2 text-sm font-medium transition-colors rounded ${
                isActive("/careers") ? "text-[#c9a227] bg-white/5" : "text-white/80 hover:text-white hover:bg-white/5"
              }`}
            >
              Careers
            </Link>
            <Link
              href="/contact"
              className={`px-3 py-2 text-sm font-medium transition-colors rounded ${
                isActive("/contact") ? "text-[#c9a227] bg-white/5" : "text-white/80 hover:text-white hover:bg-white/5"
              }`}
            >
              Contact
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/portal"
              className="px-4 py-2 text-sm font-medium border border-white/20 text-white/80 rounded hover:border-[#c9a227] hover:text-[#c9a227] transition-colors"
            >
              Worker Portal
            </Link>
          </div>

          <button
            className="lg:hidden text-white/80 hover:text-white p-2"
            onClick={() => { setOpen(!open); setMobileSection(null); }}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-[#0a1628] border-t border-white/10 max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-3 space-y-1">
            <Link href="/" onClick={() => setOpen(false)} className="block px-3 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded">Home</Link>

            <button
              onClick={() => setMobileSection(mobileSection === "about" ? null : "about")}
              className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded"
            >
              About <ChevronDown className={`w-4 h-4 transition-transform ${mobileSection === "about" ? "rotate-180" : ""}`} />
            </button>
            {mobileSection === "about" && (
              <div className="pl-4 space-y-1 border-l border-[#c9a227]/30 ml-3">
                {aboutLinks.map((l) => <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-white/60 hover:text-[#c9a227]">{l.label}</Link>)}
              </div>
            )}

            <button
              onClick={() => setMobileSection(mobileSection === "business" ? null : "business")}
              className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded"
            >
              Business <ChevronDown className={`w-4 h-4 transition-transform ${mobileSection === "business" ? "rotate-180" : ""}`} />
            </button>
            {mobileSection === "business" && (
              <div className="pl-4 space-y-1 border-l border-[#c9a227]/30 ml-3">
                {businessLinks.map((l) => <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-white/60 hover:text-[#c9a227]">{l.label}</Link>)}
              </div>
            )}

            <Link href="/sustainability" onClick={() => setOpen(false)} className="block px-3 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded">Sustainability</Link>
            <Link href="/newsroom" onClick={() => setOpen(false)} className="block px-3 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded">Newsroom</Link>
            <Link href="/investors" onClick={() => setOpen(false)} className="block px-3 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded">Investors</Link>
            <Link href="/careers" onClick={() => setOpen(false)} className="block px-3 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded">Careers</Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="block px-3 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded">Contact</Link>
            <div className="pt-2 border-t border-white/10">
              <Link href="/portal" onClick={() => setOpen(false)} className="block px-3 py-2.5 text-sm text-[#c9a227] font-medium">Worker Portal</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
