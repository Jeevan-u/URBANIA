import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import outstationImg from "@/assets/outstation-premium.jpg";
import airportImg from "@/assets/airport-premium.jpg";
import sightseeingImg from "@/assets/charminar-premium.jpg";
import srisailamImg from "@/assets/srisailam-premium.jpg";

const services = [
  {
    title: "Outstation Taxi",
    description: "Comfortable long-distance rides to any destination across India with experienced drivers and well-maintained vehicles.",
    image: outstationImg,
    tag: "Most Popular",
  },
  {
    title: "Airport Transfers",
    description: "Timely and hassle-free airport pickups and drops available 24/7 at Kempegowda International Airport.",
    image: airportImg,
    tag: "24/7",
  },
  {
    title: "City Sightseeing",
    description: "Explore Bangalore's iconic landmarks — Vidhana Soudha, Lalbagh, Cubbon Park, ISKCON Temple and more with our guided tours.",
    image: sightseeingImg,
    tag: "Half & Full Day",
  },
  {
    title: "Srisailam Packages",
    description: "Sacred pilgrimage to Mallikarjuna Jyothirlinga with comfortable travel, hotel assistance and guided darshan.",
    image: srisailamImg,
    tag: "Pilgrimage",
  },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative bg-card rounded-2xl overflow-hidden premium-shadow hover:shadow-2xl transition-all duration-500"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-4 left-4">
          <span className="font-body text-[10px] font-bold uppercase tracking-wider bg-primary text-primary-foreground px-3 py-1 rounded-full">
            {service.tag}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-heading text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
          {service.title}
        </h3>
        <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
          {service.description}
        </p>
        <a
          href="#contact"
          className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-primary hover:gap-3 transition-all duration-300"
        >
          Explore <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
};

const CabServices = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-body text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3 block">
            What We Offer
          </span>
          <h2 className="section-title">Premium Cab Services</h2>
          <p className="section-subtitle">
            From city tours to cross-country pilgrimages, we deliver exceptional travel experiences
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CabServices;
