import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import srisailamImg from "@/assets/srisailam-premium.jpg";
import yadagiriguttaImg from "@/assets/yadagirigutta-premium.jpg";
import warangalImg from "@/assets/warangal-premium.jpg";
import charminarImg from "@/assets/charminar-premium.jpg";
import tirupatiImg from "@/assets/tirupati-premium.jpg";
import vizagImg from "@/assets/vizag-premium.jpg";
import goaImg from "@/assets/goa-premium.jpg";
import shirdiImg from "@/assets/shirdi-premium.jpg";
import hyderabadImg from "@/assets/hyderabad-city.jpg";

const packages = [
  { title: "Srisailam Jyothirlinga", subtitle: "Sacred Pilgrimage", image: srisailamImg, featured: true },
  { title: "Yadagirigutta Temple", subtitle: "Spiritual Retreat", image: yadagiriguttaImg },
  { title: "Warangal Heritage", subtitle: "Kakatiya Glory", image: warangalImg },
  { title: "Hyderabad City Tour", subtitle: "Nizam's Legacy", image: charminarImg, featured: true },
  { title: "Tirupati Balaji", subtitle: "Divine Darshan", image: tirupatiImg },
  { title: "Vizag & Araku Valley", subtitle: "Nature Escape", image: vizagImg, featured: true },
  { title: "Goa Beach Trip", subtitle: "Tropical Paradise", image: goaImg },
  { title: "Shirdi Sai Baba", subtitle: "Holy Pilgrimage", image: shirdiImg },
  { title: "Hyderabad Grandeur", subtitle: "Explore the City", image: hyderabadImg },
];

const TourPackages = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="packages" className="section-padding bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-body text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3 block">
            Popular Destinations
          </span>
          <h2 className="section-title">Tour Packages We Offer</h2>
          <p className="section-subtitle">
            Explore the most sought-after pilgrimage and leisure destinations from Bangalore
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {packages.map((p, i) => (
            <motion.a
              key={p.title}
              href="#contact"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`group relative rounded-2xl overflow-hidden premium-shadow ${
                p.featured ? "sm:row-span-1" : ""
              } h-72`}
            >
              <img
                src={p.image}
                alt={p.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="font-body text-[10px] font-bold uppercase tracking-[0.15em] text-accent mb-1.5 block">
                  {p.subtitle}
                </span>
                <h3 className="font-heading text-xl text-card group-hover:text-accent transition-colors duration-300">
                  {p.title}
                </h3>
                <div className="flex items-center gap-1.5 mt-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <span className="font-body text-xs font-semibold text-primary-foreground">Book Now</span>
                  <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TourPackages;
