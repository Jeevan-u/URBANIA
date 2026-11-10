import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    location: "Bengaluru",
    text: "Excellent service! Booked a cab to Srisailam and the driver was very professional. The car was clean and comfortable. Highly recommended!",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    location: "Whitefield",
    text: "We used Urbania Cabs Bangalore for our Tirupati trip. The booking process was smooth and the driver was on time. Best cab service in Bangalore!",
    rating: 5,
  },
  {
    name: "Akhil",
    location: "Koramangala",
    text: "Very affordable and reliable. Used their airport transfer service multiple times. Always punctual and the vehicles are always in great condition.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-muted/30" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-body text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3 block">
            Client Reviews
          </span>
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">Trusted by thousands of happy travelers across Bangalore</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-card rounded-2xl p-7 border border-border hover:border-primary/20 premium-shadow hover:shadow-2xl transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6 italic">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-heading text-sm text-primary">{t.name[0]}</span>
                </div>
                <div>
                  <p className="font-body text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="font-body text-xs text-muted-foreground">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
