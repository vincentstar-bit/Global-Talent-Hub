import { Link } from "wouter";
import { Globe, Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0a1628] text-white/70 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded bg-[#c9a227] flex items-center justify-center">
                <Globe className="w-5 h-5 text-[#0d1b2e]" />
              </div>
              <div>
                <div className="text-white font-bold text-base">SINOGLOBAL</div>
                <div className="text-[#c9a227] text-[10px] tracking-widest uppercase">Enterprise Co., Ltd.</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              A Fortune Global 500 company delivering excellence across engineering, finance, healthcare, logistics, and technology in 43 countries worldwide.
            </p>
            <div className="space-y-2 text-sm mb-6">
              <div className="flex gap-2.5 items-start">
                <MapPin className="w-4 h-4 mt-0.5 text-[#c9a227] shrink-0" />
                <span>Zhongguancun Science Park, Haidian District, Beijing 100190, China</span>
              </div>
              <div className="flex gap-2.5 items-center">
                <Phone className="w-4 h-4 text-[#c9a227] shrink-0" />
                <a href="tel:+861088886666" className="hover:text-[#c9a227] transition-colors">+86 10 8888 6666</a>
              </div>
              <div className="flex gap-2.5 items-center">
                <Mail className="w-4 h-4 text-[#c9a227] shrink-0" />
                <a href="mailto:info@sinoglobal.com" className="hover:text-[#c9a227] transition-colors">info@sinoglobal.com</a>
              </div>
            </div>
            <div className="flex gap-3">
              {[Linkedin, Twitter, Facebook].map((Icon, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#c9a227] hover:bg-[#c9a227]/10 cursor-pointer transition-colors">
                  <Icon className="w-4 h-4 text-white/60 hover:text-[#c9a227]" />
                </div>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold text-xs mb-5 tracking-widest uppercase">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className="hover:text-[#c9a227] transition-colors">About SinoGlobal</Link></li>
              <li><Link href="/about#team" className="hover:text-[#c9a227] transition-colors">Executive Team</Link></li>
              <li><Link href="/about#milestones" className="hover:text-[#c9a227] transition-colors">Our History</Link></li>
              <li><Link href="/sustainability" className="hover:text-[#c9a227] transition-colors">Sustainability</Link></li>
              <li><Link href="/newsroom" className="hover:text-[#c9a227] transition-colors">Newsroom</Link></li>
              <li><Link href="/investors" className="hover:text-[#c9a227] transition-colors">Investor Relations</Link></li>
            </ul>
          </div>

          {/* Divisions */}
          <div>
            <h4 className="text-white font-bold text-xs mb-5 tracking-widest uppercase">Business</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/services#engineering" className="hover:text-[#c9a227] transition-colors">Engineering & Technology</Link></li>
              <li><Link href="/services#finance" className="hover:text-[#c9a227] transition-colors">Finance & Investment</Link></li>
              <li><Link href="/services#logistics" className="hover:text-[#c9a227] transition-colors">Operations & Logistics</Link></li>
              <li><Link href="/services#healthcare" className="hover:text-[#c9a227] transition-colors">Healthcare & Pharma</Link></li>
              <li><Link href="/services#it" className="hover:text-[#c9a227] transition-colors">Information Technology</Link></li>
              <li><Link href="/services#research" className="hover:text-[#c9a227] transition-colors">Research & Development</Link></li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold text-xs mb-5 tracking-widest uppercase">Resources</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/careers" className="hover:text-[#c9a227] transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-[#c9a227] transition-colors">Contact Us</Link></li>
              <li><Link href="/portal" className="hover:text-[#c9a227] transition-colors">Worker Portal</Link></li>
              <li><Link href="/investors" className="hover:text-[#c9a227] transition-colors">Annual Reports</Link></li>
              <li><Link href="/sustainability" className="hover:text-[#c9a227] transition-colors">ESG Report</Link></li>
            </ul>
            <div className="mt-8 p-4 bg-white/5 border border-white/10 rounded-xl">
              <div className="text-white text-xs font-semibold mb-1">ISO 9001:2015 Certified</div>
              <div className="text-white/40 text-xs">Fortune Global 500 · MSCI ESG: AA</div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} SinoGlobal Enterprise Co., Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-[#c9a227] cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-[#c9a227] cursor-pointer transition-colors">Terms of Use</span>
            <span className="hover:text-[#c9a227] cursor-pointer transition-colors">Cookie Policy</span>
            <span>Registered in the People's Republic of China</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
