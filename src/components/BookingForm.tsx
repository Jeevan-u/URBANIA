import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CalendarIcon, Car, Users, MapPin, Send } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const destinations = [
  "Mysore & Coorg",
  "Ooty & Kodaikanal",
  "Wayanad Weekend",
  "Hampi Heritage",
  "Tirupati Balaji",
  "Srisailam Jyothirlinga",
  "Yadagirigutta Temple",
  "Hyderabad City Tour",
  "Goa Beach Trip",
  "Custom Destination",
];

const vehicles = [
  { value: "swift-dzire", label: "Swift Dzire (4 Seater)", icon: "🚗" },
  { value: "toyota-etios", label: "Toyota Etios (4 Seater)", icon: "🚙" },
  { value: "innova", label: "Toyota Innova (7 Seater)", icon: "🚐" },
  { value: "innova-crysta", label: "Innova Crysta (7 Seater)", icon: "🚐" },
  { value: "tempo-traveller", label: "Tempo Traveller (12-26 Seater)", icon: "🚌" },
  { value: "luxury-bus", label: "Luxury Bus (40+ Seater)", icon: "🚌" },
];

const BookingForm = () => {
  const [form, setForm] = useState({
    customer_name: "",
    customer_phone: "",
    customer_email: "",
    destination: "",
    vehicle_type: "",
    passengers: "1",
    pickup_location: "",
    special_requests: "",
  });
  const [travelDate, setTravelDate] = useState<Date>();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.customer_name.trim() || !form.customer_phone.trim() || !form.destination) {
      toast({ title: "Missing fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }

    const text = encodeURIComponent(
      `🚗 New Booking Request\nName: ${form.customer_name.trim()}\nPhone: ${form.customer_phone.trim()}\nDestination: ${form.destination}\nDate: ${travelDate ? format(travelDate, "PPP") : "Flexible"}\nVehicle: ${form.vehicle_type || "Any"}\nPassengers: ${form.passengers}\nPickup: ${form.pickup_location || "TBD"}\nNotes: ${form.special_requests || "None"}`
    );

    toast({
      title: "Booking request ready ✅",
      description: "Send it on WhatsApp and our team will confirm within 30 minutes.",
    });
    window.open(`https://wa.me/919632345415?text=${text}`, "_blank");

    setForm({
      customer_name: "", customer_phone: "", customer_email: "",
      destination: "", vehicle_type: "", passengers: "1",
      pickup_location: "", special_requests: "",
    });
    setTravelDate(undefined);
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-border bg-muted/50 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all";

  return (
    <section id="booking" className="section-padding bg-muted/30" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="font-body text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3 block">
            Easy Booking
          </span>
          <h2 className="section-title">Book Your Tour Package</h2>
          <p className="section-subtitle">
            Choose your destination, pick a date, select your vehicle — we handle the rest!
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card rounded-3xl p-8 md:p-10 border border-border premium-shadow"
        >
          {/* Row 1: Name & Phone */}
          <div className="grid sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="font-body text-xs font-semibold text-foreground mb-1.5 block">
                Full Name *
              </label>
              <input
                name="customer_name"
                value={form.customer_name}
                onChange={handleChange}
                required
                maxLength={100}
                className={inputClass}
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="font-body text-xs font-semibold text-foreground mb-1.5 block">
                Phone Number *
              </label>
              <input
                name="customer_phone"
                value={form.customer_phone}
                onChange={handleChange}
                required
                maxLength={15}
                className={inputClass}
                placeholder="+91 96323 45415"
              />
            </div>
          </div>

          {/* Row 2: Email & Destination */}
          <div className="grid sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="font-body text-xs font-semibold text-foreground mb-1.5 block">
                Email Address
              </label>
              <input
                name="customer_email"
                type="email"
                value={form.customer_email}
                onChange={handleChange}
                maxLength={255}
                className={inputClass}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="font-body text-xs font-semibold text-foreground mb-1.5 block">
                <MapPin className="w-3.5 h-3.5 inline mr-1" />
                Destination *
              </label>
              <Select value={form.destination} onValueChange={(v) => setForm({ ...form, destination: v })}>
                <SelectTrigger className="w-full h-12 rounded-xl border-border bg-muted/50 font-body text-sm">
                  <SelectValue placeholder="Choose destination" />
                </SelectTrigger>
                <SelectContent>
                  {destinations.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 3: Date, Vehicle, Passengers */}
          <div className="grid sm:grid-cols-3 gap-5 mb-5">
            <div>
              <label className="font-body text-xs font-semibold text-foreground mb-1.5 block">
                <CalendarIcon className="w-3.5 h-3.5 inline mr-1" />
                Travel Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-12 justify-start text-left font-normal rounded-xl border-border bg-muted/50 font-body text-sm",
                      !travelDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {travelDate ? format(travelDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={travelDate}
                    onSelect={setTravelDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <label className="font-body text-xs font-semibold text-foreground mb-1.5 block">
                <Car className="w-3.5 h-3.5 inline mr-1" />
                Vehicle Type
              </label>
              <Select value={form.vehicle_type} onValueChange={(v) => setForm({ ...form, vehicle_type: v })}>
                <SelectTrigger className="w-full h-12 rounded-xl border-border bg-muted/50 font-body text-sm">
                  <SelectValue placeholder="Select vehicle" />
                </SelectTrigger>
                <SelectContent>
                  {vehicles.map((v) => (
                    <SelectItem key={v.value} value={v.value}>
                      {v.icon} {v.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="font-body text-xs font-semibold text-foreground mb-1.5 block">
                <Users className="w-3.5 h-3.5 inline mr-1" />
                Passengers
              </label>
              <Select value={form.passengers} onValueChange={(v) => setForm({ ...form, passengers: v })}>
                <SelectTrigger className="w-full h-12 rounded-xl border-border bg-muted/50 font-body text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 50 }, (_, i) => i + 1).map((n) => (
                    <SelectItem key={n} value={String(n)}>{n} {n === 1 ? "passenger" : "passengers"}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 4: Pickup & Notes */}
          <div className="grid sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="font-body text-xs font-semibold text-foreground mb-1.5 block">
                Pickup Location
              </label>
              <input
                name="pickup_location"
                value={form.pickup_location}
                onChange={handleChange}
                maxLength={200}
                className={inputClass}
                placeholder="Hotel name or address"
              />
            </div>
            <div>
              <label className="font-body text-xs font-semibold text-foreground mb-1.5 block">
                Special Requests
              </label>
              <input
                name="special_requests"
                value={form.special_requests}
                onChange={handleChange}
                maxLength={500}
                className={inputClass}
                placeholder="AC preference, stops, etc."
              />
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="btn-primary w-full h-14 text-base flex items-center justify-center gap-2 rounded-xl"
          >
            <Send className="w-5 h-5" /> Book Now via WhatsApp
          </Button>

          <p className="text-center font-body text-xs text-muted-foreground mt-4">
            Your booking will be confirmed within 30 minutes. No advance payment required!
          </p>
        </motion.form>
      </div>
    </section>
  );
};

export default BookingForm;
