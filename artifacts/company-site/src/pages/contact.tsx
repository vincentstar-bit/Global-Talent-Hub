import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const offices = [
  { city: "Beijing (HQ)", country: "China", address: "Zhongguancun Science Park, Haidian District, Beijing 100190", phone: "+86 10 8888 6666", email: "hq@sinoglobal.com" },
  { city: "Shanghai", country: "China", address: "Lujiazui Finance & Trade Zone, Pudong New Area, Shanghai 200120", phone: "+86 21 5888 3333", email: "shanghai@sinoglobal.com" },
  { city: "Hong Kong", country: "SAR, China", address: "Two International Finance Centre, 8 Finance Street, Central, Hong Kong", phone: "+852 2888 5500", email: "hk@sinoglobal.com" },
  { city: "Singapore", country: "Singapore", address: "One Raffles Place, #45-01, Singapore 048616", phone: "+65 6888 9900", email: "sg@sinoglobal.com" },
  { city: "London", country: "United Kingdom", address: "30 St Mary Axe (The Gherkin), London EC3A 8EP", phone: "+44 20 7888 4400", email: "london@sinoglobal.com" },
  { city: "New York", country: "United States", address: "1 World Trade Center, Suite 8500, New York, NY 10007", phone: "+1 212 888 7700", email: "ny@sinoglobal.com" },
  { city: "Dubai", country: "UAE", address: "Dubai International Financial Centre, Gate District, Dubai", phone: "+971 4 888 3300", email: "dubai@sinoglobal.com" },
  { city: "Lagos", country: "Nigeria", address: "Victoria Island, Adeola Odeku Street, Lagos, Nigeria", phone: "+234 1 888 5500", email: "lagos@sinoglobal.com" },
];

type Status = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    subject: "Business Partnership",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send");
      setStatus("success");
      setForm({ name: "", email: "", company: "", subject: "Business Partnership", message: "" });
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  const inputClass = "w-full border border-border rounded px-4 py-2.5 text-sm bg-card focus:outline-none focus:ring-2 focus:ring-[#c9a227]";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="bg-[#0a1628] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-[#c9a227]" />
            <span className="text-[#c9a227] text-xs tracking-widest uppercase font-medium">Contact</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">Get in Touch</h1>
          <p className="text-white/70 text-xl max-w-2xl">Our global offices are ready to assist you. Reach out to the office nearest to your location.</p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact form */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-foreground mb-6">Send a Message</h2>

              {status === "success" ? (
                <div className="flex flex-col items-center gap-4 py-12 text-center">
                  <CheckCircle2 className="w-14 h-14 text-green-500" />
                  <h3 className="text-lg font-bold text-foreground">Message Sent!</h3>
                  <p className="text-muted-foreground text-sm max-w-xs">Thank you for reaching out. Our team will respond within 1–2 business days.</p>
                  <button onClick={() => setStatus("idle")} className="mt-2 text-sm text-[#c9a227] underline underline-offset-2">Send another message</button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1.5">Full Name <span className="text-red-500">*</span></label>
                    <input type="text" value={form.name} onChange={set("name")} required className={inputClass} placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1.5">Email Address <span className="text-red-500">*</span></label>
                    <input type="email" value={form.email} onChange={set("email")} required className={inputClass} placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1.5">Company</label>
                    <input type="text" value={form.company} onChange={set("company")} className={inputClass} placeholder="Your company name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1.5">Subject</label>
                    <select value={form.subject} onChange={set("subject")} className={inputClass}>
                      <option>Business Partnership</option>
                      <option>Career Inquiry</option>
                      <option>Media & Press</option>
                      <option>Investment Relations</option>
                      <option>General Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1.5">Message <span className="text-red-500">*</span></label>
                    <textarea rows={5} value={form.message} onChange={set("message")} required minLength={10} className={`${inputClass} resize-none`} placeholder="Your message..." />
                  </div>

                  {status === "error" && (
                    <div className="flex items-start gap-2 p-3 rounded bg-red-50 border border-red-200 text-red-700 text-sm">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-[#c9a227] text-[#0a1628] font-semibold py-3 rounded hover:bg-[#d4af37] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {status === "loading" ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : "Send Message"}
                  </button>
                </form>
              )}

              <div className="mt-8 space-y-4 pt-8 border-t border-border">
                <div className="flex gap-3">
                  <Clock className="w-5 h-5 text-[#c9a227] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-foreground">Business Hours (Beijing)</div>
                    <div className="text-sm text-muted-foreground">Monday – Friday, 09:00 – 18:00 CST</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Mail className="w-5 h-5 text-[#c9a227] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-foreground">General Inquiries</div>
                    <div className="text-sm text-muted-foreground">info@sinoglobal.com</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone className="w-5 h-5 text-[#c9a227] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-foreground">Global Switchboard</div>
                    <div className="text-sm text-muted-foreground">+86 10 8888 6666</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Offices */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-foreground mb-6">Our Offices</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {offices.map((office) => (
                  <div key={office.city} className="bg-card border border-border rounded-lg p-5 hover:border-[#c9a227]/40 transition-colors">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-4 h-4 text-[#c9a227]" />
                      <h3 className="font-bold text-foreground text-sm">{office.city}</h3>
                      <span className="text-xs text-muted-foreground">{office.country}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{office.address}</p>
                    <div className="space-y-1">
                      <a href={`tel:${office.phone}`} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-[#c9a227] transition-colors">
                        <Phone className="w-3 h-3" /> {office.phone}
                      </a>
                      <a href={`mailto:${office.email}`} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-[#c9a227] transition-colors">
                        <Mail className="w-3 h-3" /> {office.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
