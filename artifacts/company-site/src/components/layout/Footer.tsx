import { Link } from "wouter";
import { Globe, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0a1628] text-white/70 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded bg-[#c9a227] flex items-center justify-center">
                <Globe className="w-5 h-5 text-[#0d1b2e]" />
              </div>
              <div>
                <div className="text-white font-bold text-sm">SINOGLOBAL</div>
                <div className="text-[#c9a227] text-[10px] tracking-widest">Enterprise Co., Ltd.</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              A Fortune Global 500 company driving innovation and sustainable growth across 43 countries worldwide.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-[#c9a227] transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-[#c9a227] transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-[#c9a227] transition-colors">Contact</Link></li>
              <li><Link href="/portal" className="hover:text-[#c9a227] transition-colors">Worker Portal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">Divisions</h4>
            <ul className="space-y-2 text-sm">
              <li>Engineering & Technology</li>
              <li>Finance & Investment</li>
              <li>Operations & Logistics</li>
              <li>Healthcare & Pharma</li>
              <li>International Trade</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">Headquarters</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-[#c9a227] shrink-0" />
                <span>Zhongguancun Science Park, Haidian District, Beijing 100190, China</span>
              </li>
              <li className="flex gap-2">
                <Phone className="w-4 h-4 mt-0.5 text-[#c9a227] shrink-0" />
                <span>+86 10 8888 6666</span>
              </li>
              <li className="flex gap-2">
                <Mail className="w-4 h-4 mt-0.5 text-[#c9a227] shrink-0" />
                <span>info@sinoglobal.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} SinoGlobal Enterprise Co., Ltd. All rights reserved.</p>
          <p>Registered in the People's Republic of China | ISO 9001:2015 Certified</p>
        </div>
      </div>
    </footer>
  );
}
