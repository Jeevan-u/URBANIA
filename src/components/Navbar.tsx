import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Tour Packages", href: "#packages" },
  { label: "Our Fleet", href: "#fleet" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-500 ${
      scrolled ? "bg-card/95 backdrop-blur-xl shadow-lg" : "bg-card shadow-sm"
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 lg:px-16 py-3">
        <a href="#home" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <span className="font-heading text-lg text-primary-foreground">UCB</span>
          </div>
          <div>
            <span className="font-heading text-xl leading-tight block text-foreground">Urbania Cabs</span>
            <span className="font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">Bangalore</span>
          </div>
        </a>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-body text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full rounded-full" />
            </a>
          ))}
          <a
            href="tel:+919632345415"
            className="btn-primary flex items-center gap-2 text-sm !py-2.5 !px-5"
          >
            <Phone className="w-4 h-4" /> Book Now
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-foreground p-2"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-card/98 backdrop-blur-xl border-t border-border px-4 pb-6 pt-2 animate-fade-in-up">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-3 font-body text-sm font-medium text-foreground hover:text-primary transition-colors border-b border-border/50"
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:+919632345415"
            className="btn-primary flex items-center justify-center gap-2 text-sm mt-4"
          >
            <Phone className="w-4 h-4" /> Book Now
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
