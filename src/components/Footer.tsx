import { Phone, MessageCircle, MapPin, Mail, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";

const quickLinks = [
  { label: "Airport Cabs", href: "#services" },
  { label: "Outstation Cabs", href: "#services" },
  { label: "Sightseeing Cabs", href: "#services" },
  { label: "Srisailam Packages", href: "#packages" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const routesCol1 = [
  "Bangalore To Mysore", "Bangalore To Coorg", "Bangalore To Ooty",
  "Bangalore To Tirupati", "Bangalore To Chennai", "Bangalore To Hampi",
  "Bangalore To Wayanad", "Bangalore To Kodaikanal",
];

const routesCol2 = [
  "Bangalore To Hyderabad", "Bangalore To Goa", "Bangalore To Munnar",
  "Bangalore To Shirdi", "Bangalore To Srisailam", "Bangalore To Vizag",
  "Bangalore To Vellore", "Bangalore To Pondicherry",
];

const Footer = () => (
  <footer className="bg-footer text-footer-foreground">
    <div className="max-w-7xl mx-auto section-padding pb-8">
      {/* CTA banner */}
      <div className="relative bg-primary rounded-3xl p-8 md:p-12 mb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle at 0% 100%, hsl(var(--accent)) 0%, transparent 50%), radial-gradient(circle at 100% 0%, hsl(var(--secondary)) 0%, transparent 50%)"
        }} />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-heading text-2xl md:text-3xl text-primary-foreground mb-2">
              Ready for Your Next Adventure?
            </h3>
            <p className="font-body text-sm text-primary-foreground/80 max-w-lg">
              Book your ride now and experience premium travel at the best prices in Bangalore
            </p>
          </div>
          <div className="flex gap-3">
            <a href="tel:+919632345415" className="bg-card text-foreground font-body font-semibold px-6 py-3 rounded-xl hover:shadow-lg transition-all flex items-center gap-2">
              <Phone className="w-4 h-4" /> Call Now
            </a>
            <a href="https://wa.me/919632345415" target="_blank" rel="noopener noreferrer" className="btn-outline-light !border-primary-foreground/30 flex items-center gap-2">
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <span className="font-heading text-lg text-primary-foreground">UCB</span>
            </div>
            <div>
              <span className="font-heading text-lg leading-tight block text-card">Urbania Cabs</span>
              <span className="font-body text-[9px] font-bold uppercase tracking-[0.2em] text-primary">Bangalore</span>
            </div>
          </div>
          <p className="font-body text-sm leading-relaxed mb-5">
            Bangalore's trusted outstation cab service with 24/7 availability, experienced drivers, and the most affordable prices.
          </p>
          <div className="space-y-2.5 text-sm">
            <a href="tel:+919632345415" className="flex items-center gap-2.5 hover:text-primary transition-colors font-body">
              <Phone className="w-4 h-4 text-primary" /> +91 96323 45415
            </a>
            <a href="https://wa.me/919632345415" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-primary transition-colors font-body">
              <MessageCircle className="w-4 h-4 text-primary" /> +91 96323 45415
            </a>
            <div className="flex items-center gap-2.5 font-body">
              <MapPin className="w-4 h-4 text-primary shrink-0" /> 56, Begur, Bengaluru, Karnataka - 562149, India
            </div>
            <a href="mailto:skycabsbangalore@gmail.com" className="flex items-center gap-2.5 hover:text-primary transition-colors font-body">
              <Mail className="w-4 h-4 text-primary" /> skycabsbangalore@gmail.com
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading text-lg text-card mb-5">Quick Links</h4>
          <ul className="space-y-2.5">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="font-body text-sm hover:text-primary hover:pl-1 transition-all">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Routes Col1 */}
        <div>
          <h4 className="font-heading text-lg text-card mb-5">Popular Routes</h4>
          <ul className="space-y-2.5">
            {routesCol1.map((r) => (
              <li key={r}>
                <a href="#contact" className="font-body text-sm hover:text-primary hover:pl-1 transition-all">{r}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Routes Col2 */}
        <div>
          <h4 className="font-heading text-lg text-card mb-5">More Routes</h4>
          <ul className="space-y-2.5">
            {routesCol2.map((r) => (
              <li key={r}>
                <a href="#contact" className="font-body text-sm hover:text-primary hover:pl-1 transition-all">{r}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-footer-foreground/15 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="font-body text-xs text-footer-foreground/60">
          © 2026 Urbania Cabs Bangalore. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link to="/privacy-policy" className="font-body text-xs text-footer-foreground/60 hover:text-primary transition-colors">Privacy Policy</Link>
          <Link to="/terms-of-service" className="font-body text-xs text-footer-foreground/60 hover:text-primary transition-colors">Terms of Service</Link>
        </div>
      </div>
    </div>

    {/* Floating action buttons */}
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a
        href="#home"
        className="w-12 h-12 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform border border-border"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5 text-foreground" />
      </a>
      <a
        href="tel:+919632345415"
        className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="Call us"
      >
        <Phone className="w-6 h-6 text-primary-foreground" />
      </a>
      <a
        href="https://wa.me/919632345415"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="WhatsApp us"
      >
        <MessageCircle className="w-6 h-6 text-secondary-foreground" />
      </a>
    </div>
  </footer>
);

export default Footer;
