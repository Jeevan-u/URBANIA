import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Check, Shield } from "lucide-react";
import luxuryFleet from "@/assets/luxury-fleet.jpg";
import heroImg from "@/assets/hero-premium.jpg";

const highlights = [
  "24/7 Phone & WhatsApp support",
  "Experienced & trained professional drivers",
  "GPS-tracked, sanitized vehicles",
  "Transparent pricing — no hidden charges",
  "Serving since 2015 with 50000+ happy clients",
  "Economy to luxury cab options available",
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-muted/30 overflow-hidden">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden premium-shadow">
              <img src={heroImg} alt="Premium travel" className="w-full h-[350px] md:h-[420px] object-cover" />
            </div>
            <div className="absolute -bottom-8 -right-4 md:right-4 w-48 h-48 rounded-2xl overflow-hidden border-4 border-background shadow-2xl">
              <img src={luxuryFleet} alt="Our fleet" className="w-full h-full object-cover" />
            </div>
            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute top-6 -left-3 md:left-6 bg-card rounded-2xl p-4 shadow-2xl flex items-center gap-3"
            >
              <div className="w-11 h-11 rounded-xl bg-emerald/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-emerald" />
              </div>
              <div>
                <p className="font-body text-sm font-bold text-foreground">Trusted</p>
                <p className="font-body text-xs text-muted-foreground">Since 2015</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="font-body text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3 block">
              Why Choose Us
            </span>
            <h2 className="section-title text-left mb-5">
              Bangalore's Premier<br />Travel Partner
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-8">
              Urbania Cabs is one of the leading travel agencies in Bangalore for outstation cabs. We offer a complete solution for tour packages, airport transfers, city sightseeing, and pilgrimage tours with the highest standards of comfort and safety.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {highlights.map((h) => (
                <div key={h} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-emerald" />
                  </div>
                  <span className="font-body text-sm text-muted-foreground">{h}</span>
                </div>
              ))}
            </div>

            <a href="#contact" className="btn-primary inline-flex items-center gap-2">
              Get a Free Quote <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
