import { motion } from "framer-motion";
import { ArrowRight, Shield, Clock, Star } from "lucide-react";
import heroPremium from "@/assets/hero-premium.jpg";

const badges = [
  { icon: Shield, text: "Safe & Reliable" },
  { icon: Clock, text: "24/7 Available" },
  { icon: Star, text: "4.8★ Rated" },
];

const HeroSection = () => (
  <section id="home" className="relative h-[90vh] md:h-screen overflow-hidden">
    <img
      src={heroPremium}
      alt="Luxury SUV on scenic mountain highway at sunset"
      className="absolute inset-0 w-full h-full object-cover"
    />
    {/* Premium gradient overlay */}
    <div className="absolute inset-0" style={{
      background: "linear-gradient(135deg, hsla(220,30%,8%,0.75) 0%, hsla(220,30%,8%,0.4) 50%, hsla(20,90%,48%,0.15) 100%)"
    }} />

    <div className="relative z-10 flex flex-col justify-center h-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full px-4 py-1.5 mb-6"
        >
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="font-body text-xs font-semibold text-primary-foreground tracking-wide uppercase">
            Bangalore's Trusted Travel Partner
          </span>
        </motion.div>

        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-card leading-[1.1] mb-6">
          Your Journey,{" "}
          <span className="italic text-accent">Our Passion</span>
        </h1>

        <p className="font-body text-base md:text-lg text-card/80 max-w-xl mb-8 leading-relaxed">
          Premium outstation cab services from Bangalore. Experience comfort, safety, and reliability with our well-maintained fleet and experienced drivers.
        </p>

        <div className="flex flex-wrap gap-4 mb-10">
          <a href="#contact" className="btn-primary flex items-center gap-2">
            Book Your Ride <ArrowRight className="w-4 h-4" />
          </a>
          <a href="https://wa.me/919632345415" target="_blank" rel="noopener noreferrer" className="btn-outline-light">
            WhatsApp Us
          </a>
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-wrap gap-6"
        >
          {badges.map((b) => (
            <div key={b.text} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-card/10 backdrop-blur-sm flex items-center justify-center">
                <b.icon className="w-4 h-4 text-accent" />
              </div>
              <span className="font-body text-xs font-medium text-card/70">{b.text}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>

    {/* Bottom gradient fade */}
    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
  </section>
);

export default HeroSection;
