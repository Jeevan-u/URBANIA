import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Car, Users, MapPin, CalendarDays } from "lucide-react";

const stats = [
  { icon: Car, value: 21, suffix: "+", label: "Fleet of Cars" },
  { icon: Users, value: 20000, suffix: "+", label: "Happy Customers" },
  { icon: MapPin, value: 42, suffix: "+", label: "Outstation Routes" },
  { icon: CalendarDays, value: 16, suffix: "+", label: "Years in Business" },
];

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {target >= 1000 ? `${(count / 1000).toFixed(count >= target ? 0 : 1)}k` : count}
      {count >= target ? suffix : ""}
    </span>
  );
};

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-20 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-stats" />
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "radial-gradient(circle at 20% 50%, hsl(var(--primary)) 0%, transparent 50%), radial-gradient(circle at 80% 50%, hsl(var(--accent)) 0%, transparent 50%)"
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="font-body text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3 block">
            Our Track Record
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-stats-foreground">
            Achievements We're Proud Of
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-stats-foreground/10 flex items-center justify-center">
                <s.icon className="w-7 h-7 text-accent" />
              </div>
              <div className="font-heading text-4xl md:text-5xl font-bold text-stats-foreground mb-2">
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <p className="font-body text-sm text-stats-foreground/60">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
