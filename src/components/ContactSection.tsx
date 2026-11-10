import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Phone, MessageCircle, MapPin, Mail, Send, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 96323 45415",
    href: "tel:+919632345415",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+91 96323 45415",
    href: "https://wa.me/919632345415",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "skycabsbangalore@gmail.com",
    href: "mailto:skycabsbangalore@gmail.com",
    color: "bg-accent/20 text-accent-foreground",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "56, Begur, Bengaluru, Karnataka - 562149, India",
    href: "#",
    color: "bg-emerald/10 text-emerald",
  },
];

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const text = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email || "Not provided"}\nPhone: ${form.phone}\nMessage: ${form.message || "Not provided"}`
    );

    toast({ title: "Message ready ✅", description: "Send it on WhatsApp and we'll get back to you shortly." });
    window.open(`https://wa.me/919632345415?text=${text}`, "_blank");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="contact" className="section-padding bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-body text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3 block">
            Get in Touch
          </span>
          <h2 className="section-title">Contact Us Anytime</h2>
          <p className="section-subtitle">
            We're available 24/7 on phone and WhatsApp. Reach out for bookings, queries, or custom packages.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact cards */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            {contactInfo.map((c, i) => (
              <motion.a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-4 bg-card rounded-2xl p-5 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-xl ${c.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                  <c.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">{c.label}</p>
                  <p className="font-body text-sm font-semibold text-foreground">{c.value}</p>
                </div>
              </motion.a>
            ))}

            {/* Hours card */}
            <div className="bg-primary rounded-2xl p-5 text-primary-foreground">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-5 h-5" />
                <span className="font-body text-sm font-bold">Working Hours</span>
              </div>
              <p className="font-body text-xs text-primary-foreground/80">
                We operate 24 hours, 7 days a week. Book anytime, travel anytime!
              </p>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3 bg-card rounded-3xl p-8 md:p-10 border border-border premium-shadow"
          >
            <h3 className="font-heading text-2xl text-foreground mb-2">Send Us a Message</h3>
            <p className="font-body text-sm text-muted-foreground mb-8">
              Fill the form below and we'll get back to you within minutes
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="font-body text-xs font-semibold text-foreground mb-1.5 block">Your Name *</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-muted/50 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="font-body text-xs font-semibold text-foreground mb-1.5 block">Phone Number *</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-muted/50 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  placeholder="+91 96323 45415"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="font-body text-xs font-semibold text-foreground mb-1.5 block">Email Address</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-border bg-muted/50 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                placeholder="you@example.com"
              />
            </div>
            <div className="mb-6">
              <label className="font-body text-xs font-semibold text-foreground mb-1.5 block">Your Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-border bg-muted/50 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                placeholder="Tell us about your travel plans..."
              />
            </div>
            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
              <Send className="w-4 h-4" /> Send via WhatsApp
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
