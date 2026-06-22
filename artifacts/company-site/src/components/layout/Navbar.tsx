import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Globe } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
  { href: "/portal", label: "Worker Portal" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0d1b2e]/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#c9a227] flex items-center justify-center">
              <Globe className="w-5 h-5 text-[#0d1b2e]" />
            </div>
            <div>
              <div className="text-white font-bold text-sm leading-tight tracking-wide">SINOGLOBAL</div>
              <div className="text-[#c9a227] text-[10px] tracking-widest uppercase">Enterprise Co., Ltd.</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium transition-colors rounded ${
                  location === link.href
                    ? "text-[#c9a227] bg-white/5"
                    : "text-white/80 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin/login"
              className="ml-4 px-4 py-2 text-sm font-semibold bg-[#c9a227] text-[#0d1b2e] rounded hover:bg-[#d4af37] transition-colors"
            >
              Admin Login
            </Link>
          </div>

          <button
            className="md:hidden text-white/80 hover:text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-[#0d1b2e] border-t border-white/10 px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/admin/login"
            onClick={() => setOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-[#c9a227]"
          >
            Admin Login
          </Link>
        </div>
      )}
    </nav>
  );
}
