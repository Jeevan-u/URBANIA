import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import luxuryFleet from "@/assets/luxury-fleet.jpg";
import { Check } from "lucide-react";

const fleet = [
  { name: "Swift DZire", seats: "4+1", type: "Sedan", price: "₹12/km" },
  { name: "Toyota Etios", seats: "4+1", type: "Sedan", price: "₹13/km" },
  { name: "Maruti Ertiga", seats: "6+1", type: "MUV", price: "₹15/km" },
  { name: "Toyota Innova", seats: "7+1", type: "MUV", price: "₹18/km" },
  { name: "Innova Crysta", seats: "7+1", type: "Premium", price: "₹20/km" },
  { name: "Tempo Traveller", seats: "12-28", type: "Mini Bus", price: "₹26/km" },
];

const features = [
  "Well-maintained & sanitized vehicles",
  "Experienced & trained drivers",
  "GPS-tracked for your safety",
  "24/7 roadside assistance",
];

const FleetSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="fleet" className="section-padding bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-body text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3 block">
            Our Vehicles
          </span>
          <h2 className="section-title">Premium Fleet at Your Service</h2>
          <p className="section-subtitle">Choose from our range of well-maintained vehicles for every occasion</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Fleet image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden premium-shadow">
              <img src={luxuryFleet} alt="Toyota Innova Crysta luxury fleet" className="w-full h-[400px] object-cover" />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -right-4 md:right-8 bg-card rounded-2xl p-5 shadow-2xl border border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="text-lg">🚗</span>
                </div>
                <div>
                  <p className="font-heading text-2xl text-foreground">21+</p>
                  <p className="font-body text-xs text-muted-foreground">Fleet Cars</p>
                </div>
              </div>
              <div className="space-y-1.5">
                {features.map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald" />
                    <span className="font-body text-xs text-muted-foreground">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Fleet list */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-3"
          >
            {fleet.map((v, i) => (
              <motion.div
                key={v.name}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                className="flex items-center justify-between bg-card rounded-xl p-4 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <span className="text-xl">🚘</span>
                  </div>
                  <div>
                    <h4 className="font-body text-sm font-semibold text-foreground">{v.name}</h4>
                    <p className="font-body text-xs text-muted-foreground">{v.type} · {v.seats} Seats</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-body text-sm font-bold text-primary">{v.price}</span>
                  <p className="font-body text-[10px] text-muted-foreground">Starting</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FleetSection;
