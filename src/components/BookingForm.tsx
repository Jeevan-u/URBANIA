import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarIcon,
  Car,
  Check,
  Clock,
  MapPin,
  Plus,
  Send,
  Trash2,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import BookingReview from "@/components/booking/BookingReview";
import FareSummary from "@/components/booking/FareSummary";
import VehicleCard from "@/components/booking/VehicleCard";
import {
  AIRPORT_NAME,
  GLOBAL_WHATSAPP_NUMBER,
  buildEnquiryMessage,
  categoryLabels,
  enquiryTypeFor,
  fleet,
  initialBookingForm,
  nextBookingId,
  todayISO,
  validateBooking,
  type BookingCategory,
  type BookingFormData,
  type Vehicle,
} from "@/components/booking/bookingUtils";

type Step = 1 | 2 | 3 | 4;

const tabs: { id: BookingCategory; label: string }[] = [
  { id: "outstation", label: "Outstation" },
  { id: "rental", label: "Rental" },
  { id: "airport", label: "Airport Taxi" },
];

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-border bg-muted/50 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all";

const labelClass = "font-body text-xs font-semibold text-foreground mb-1.5 block";

const BookingForm = () => {
  const [form, setForm] = useState<BookingFormData>(initialBookingForm);
  const [step, setStep] = useState<Step>(1);
  const [errors, setErrors] = useState<string[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();

  const update = <K extends keyof BookingFormData>(key: K, value: BookingFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateStop = (index: number, key: "city" | "address", value: string) => {
    setForm((prev) => {
      const stops = prev.stops.map((stop, i) => (i === index ? { ...stop, [key]: value } : stop));
      return { ...prev, stops };
    });
  };

  const addStop = () => {
    setForm((prev) => (prev.stops.length >= 4 ? prev : { ...prev, stops: [...prev.stops, { city: "", address: "" }] }));
  };

  const removeStop = (index: number) => {
    setForm((prev) => ({ ...prev, stops: prev.stops.filter((_, i) => i !== index) }));
  };

  const switchCategory = (category: BookingCategory) => {
    setForm((prev) => ({ ...prev, category }));
    setErrors([]);
    setSelectedVehicle(null);
    setStep(1);
  };

  const goToReview = () => {
    const found = validateBooking(form);
    setErrors(found);
    if (found.length > 0) {
      toast({
        title: "Missing or invalid details",
        description: found[0],
        variant: "destructive",
      });
      return;
    }
    setStep(2);
  };

  const goToVehicles = () => {
    setStep(3);
    setSelectedVehicle(null);
  };

  const goToFare = () => {
    if (!selectedVehicle) {
      toast({
        title: "Select a vehicle",
        description: "Please choose a vehicle to continue.",
        variant: "destructive",
      });
      return;
    }
    setStep(4);
  };

  const sendEnquiry = () => {
    if (!selectedVehicle) return;

    const found = validateBooking(form);
    if (found.length > 0) {
      setErrors(found);
      setStep(1);
      toast({
        title: "Please check your details",
        description: found[0],
        variant: "destructive",
      });
      return;
    }

    const bookingId = nextBookingId();
    const text = encodeURIComponent(buildEnquiryMessage(form, selectedVehicle, bookingId));

    toast({
      title: "Enquiry ready ✅",
      description: `Booking ID ${bookingId}. Press Send in WhatsApp to deliver it to our team.`,
    });
    window.open(`https://wa.me/${GLOBAL_WHATSAPP_NUMBER}?text=${text}`, "_blank");
  };

  const stepTitles: Record<Step, string> = {
    1: "Trip details",
    2: "Review locations",
    3: "Select vehicle",
    4: "Fare summary & enquiry",
  };

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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card rounded-3xl p-6 md:p-10 border border-border premium-shadow"
        >
          {/* Booking category tabs */}
          <div
            role="tablist"
            aria-label="Booking category"
            className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-muted/60 border border-border mb-6"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                type="button"
                aria-selected={form.category === tab.id}
                onClick={() => switchCategory(tab.id)}
                className={cn(
                  "rounded-xl px-2 py-2.5 font-body text-xs sm:text-sm font-semibold transition-all",
                  form.category === tab.id
                    ? "bg-primary text-primary-foreground shadow"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Step indicator */}
          <div className="flex items-center justify-between gap-2 mb-6">
            <p className="font-body text-xs font-semibold text-primary">
              Step {step} of 4 · {stepTitles[step]}
            </p>
            <p className="font-body text-[11px] text-muted-foreground hidden sm:block">
              Enquiry type: {enquiryTypeFor(form)}
            </p>
          </div>

          {errors.length > 0 && step === 1 && (
            <div
              role="alert"
              className="mb-5 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3"
            >
              <p className="font-body text-sm font-semibold text-destructive mb-1">
                Please check the following:
              </p>
              <ul className="list-disc pl-5 font-body text-xs text-destructive space-y-0.5">
                {errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {step === 1 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                goToReview();
              }}
              noValidate
            >
              {/* Category specific fields */}
              {form.category === "outstation" && (
                <div className="space-y-5 mb-6">
                  <div>
                    <span className={labelClass}>Trip Type *</span>
                    <div role="radiogroup" aria-label="Outstation trip type" className="grid sm:grid-cols-2 gap-3">
                      {[
                        { id: "one-way", label: "One Way" },
                        { id: "round-trip", label: "Round Trip" },
                      ].map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          role="radio"
                          aria-checked={form.outstationTripType === option.id}
                          onClick={() => update("outstationTripType", option.id as BookingFormData["outstationTripType"])}
                          className={cn(
                            "rounded-xl border px-4 py-3 font-body text-sm font-semibold transition-all",
                            form.outstationTripType === option.id
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border bg-muted/40 text-foreground hover:bg-muted"
                          )}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="pickupCity" className={labelClass}>
                        <MapPin className="w-3.5 h-3.5 inline mr-1" />
                        Pickup City *
                      </label>
                      <input
                        id="pickupCity"
                        value={form.pickupCity}
                        onChange={(e) => update("pickupCity", e.target.value)}
                        maxLength={100}
                        className={inputClass}
                        placeholder="e.g. Bangalore"
                      />
                    </div>
                    <div>
                      <label htmlFor="pickupAddress" className={labelClass}>
                        Complete Pickup Address *
                      </label>
                      <input
                        id="pickupAddress"
                        value={form.pickupAddress}
                        onChange={(e) => update("pickupAddress", e.target.value)}
                        maxLength={200}
                        className={inputClass}
                        placeholder="House / street / area"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="dropCity" className={labelClass}>
                        <MapPin className="w-3.5 h-3.5 inline mr-1" />
                        Destination City *
                      </label>
                      <input
                        id="dropCity"
                        value={form.dropCity}
                        onChange={(e) => update("dropCity", e.target.value)}
                        maxLength={100}
                        className={inputClass}
                        placeholder="e.g. Mysore"
                      />
                    </div>
                    <div>
                      <label htmlFor="dropAddress" className={labelClass}>
                        Complete Drop Address *
                      </label>
                      <input
                        id="dropAddress"
                        value={form.dropAddress}
                        onChange={(e) => update("dropAddress", e.target.value)}
                        maxLength={200}
                        className={inputClass}
                        placeholder="Hotel / landmark / area"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={labelClass}>Intermediate Stops</span>
                      <button
                        type="button"
                        onClick={addStop}
                        disabled={form.stops.length >= 4}
                        className="inline-flex items-center gap-1 font-body text-xs font-semibold text-primary hover:underline disabled:opacity-40 disabled:no-underline"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Stop
                      </button>
                    </div>
                    {form.stops.length === 0 ? (
                      <p className="font-body text-xs text-muted-foreground">
                        No stops added. You can add up to 4 stops along the route.
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {form.stops.map((stop, index) => (
                          <div key={index} className="grid sm:grid-cols-[1fr_1.4fr_auto] gap-2 items-start">
                            <input
                              aria-label={`Stop ${index + 1} city`}
                              value={stop.city}
                              onChange={(e) => updateStop(index, "city", e.target.value)}
                              maxLength={100}
                              className={inputClass}
                              placeholder={`Stop ${index + 1} city`}
                            />
                            <input
                              aria-label={`Stop ${index + 1} address`}
                              value={stop.address}
                              onChange={(e) => updateStop(index, "address", e.target.value)}
                              maxLength={200}
                              className={inputClass}
                              placeholder="Stop address (optional)"
                            />
                            <button
                              type="button"
                              aria-label={`Remove stop ${index + 1}`}
                              onClick={() => removeStop(index)}
                              className="h-12 w-12 inline-flex items-center justify-center rounded-xl border border-border text-muted-foreground hover:text-destructive hover:border-destructive/40"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {form.outstationTripType === "round-trip" && (
                    <div className="sm:max-w-xs">
                      <label htmlFor="returnDate" className={labelClass}>
                        <CalendarIcon className="w-3.5 h-3.5 inline mr-1" />
                        Return Date *
                      </label>
                      <input
                        id="returnDate"
                        type="date"
                        value={form.returnDate}
                        min={form.pickupDate || todayISO()}
                        onChange={(e) => update("returnDate", e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  )}
                </div>
              )}

              {form.category === "rental" && (
                <div className="space-y-5 mb-6">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="rentalCity" className={labelClass}>
                        <MapPin className="w-3.5 h-3.5 inline mr-1" />
                        City *
                      </label>
                      <input
                        id="rentalCity"
                        value={form.rentalCity}
                        onChange={(e) => update("rentalCity", e.target.value)}
                        maxLength={100}
                        className={inputClass}
                        placeholder="e.g. Bangalore"
                      />
                    </div>
                    <div>
                      <label htmlFor="rentalPickupLocation" className={labelClass}>
                        Pickup Location *
                      </label>
                      <input
                        id="rentalPickupLocation"
                        value={form.rentalPickupLocation}
                        onChange={(e) => update("rentalPickupLocation", e.target.value)}
                        maxLength={200}
                        className={inputClass}
                        placeholder="Hotel / home / office address"
                      />
                    </div>
                  </div>
                  <div className="sm:max-w-xs">
                    <label htmlFor="rentalDuration" className={labelClass}>
                      <Clock className="w-3.5 h-3.5 inline mr-1" />
                      Rental Duration *
                    </label>
                    <input
                      id="rentalDuration"
                      value={form.rentalDuration}
                      onChange={(e) => update("rentalDuration", e.target.value)}
                      maxLength={100}
                      className={inputClass}
                      placeholder="e.g. 8 hours / full day"
                    />
                    <p className="font-body text-[11px] text-muted-foreground mt-1.5">
                      Package availability and pricing will be confirmed by our team.
                    </p>
                  </div>
                </div>
              )}

              {form.category === "airport" && (
                <div className="space-y-5 mb-6">
                  <div>
                    <span className={labelClass}>Trip Type *</span>
                    <div role="radiogroup" aria-label="Airport trip type" className="grid sm:grid-cols-2 gap-3">
                      {[
                        { id: "from-airport", label: "Pickup from Airport" },
                        { id: "to-airport", label: "Drop to Airport" },
                      ].map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          role="radio"
                          aria-checked={form.airportTripType === option.id}
                          onClick={() => update("airportTripType", option.id as BookingFormData["airportTripType"])}
                          className={cn(
                            "rounded-xl border px-4 py-3 font-body text-sm font-semibold transition-all",
                            form.airportTripType === option.id
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border bg-muted/40 text-foreground hover:bg-muted"
                          )}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="airportTerminal" className={labelClass}>
                        Airport Terminal *
                      </label>
                      <select
                        id="airportTerminal"
                        value={form.airportTerminal}
                        onChange={(e) => update("airportTerminal", e.target.value)}
                        className={inputClass}
                      >
                        <option value="">Select terminal</option>
                        <option value="Terminal 1">Terminal 1</option>
                        <option value="Terminal 2">Terminal 2</option>
                      </select>
                      <p className="font-body text-[11px] text-muted-foreground mt-1.5">
                        {AIRPORT_NAME}
                      </p>
                    </div>
                    <div>
                      <label htmlFor="airportLocation" className={labelClass}>
                        <MapPin className="w-3.5 h-3.5 inline mr-1" />
                        {form.airportTripType === "to-airport" ? "Pickup Location *" : "Drop Location *"}
                      </label>
                      <input
                        id="airportLocation"
                        value={form.airportLocation}
                        onChange={(e) => update("airportLocation", e.target.value)}
                        maxLength={200}
                        className={inputClass}
                        placeholder="Complete address in Bangalore"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="flightDetails" className={labelClass}>
                      Flight Arrival / Departure Details
                    </label>
                    <input
                      id="flightDetails"
                      value={form.flightDetails}
                      onChange={(e) => update("flightDetails", e.target.value)}
                      maxLength={120}
                      className={inputClass}
                      placeholder="e.g. IndiGo 6E 234, 10:30 AM"
                    />
                  </div>

                  <div>
                    <span className={labelClass}>Female Driver Preference</span>
                    <div role="radiogroup" aria-label="Female driver preference" className="flex gap-3">
                      {[
                        { id: "yes", label: "Yes" },
                        { id: "no", label: "No" },
                      ].map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          role="radio"
                          aria-checked={form.femaleDriver === option.id}
                          onClick={() => update("femaleDriver", option.id as BookingFormData["femaleDriver"])}
                          className={cn(
                            "rounded-xl border px-6 py-2.5 font-body text-sm font-semibold transition-all",
                            form.femaleDriver === option.id
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border bg-muted/40 text-foreground hover:bg-muted"
                          )}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                    <p className="font-body text-[11px] text-muted-foreground mt-1.5">
                      Subject to availability.
                    </p>
                  </div>
                </div>
              )}

              {/* Travel date, time, passengers */}
              <div className="grid sm:grid-cols-3 gap-5 mb-5">
                <div>
                  <label htmlFor="pickupDate" className={labelClass}>
                    <CalendarIcon className="w-3.5 h-3.5 inline mr-1" />
                    Pickup Date *
                  </label>
                  <input
                    id="pickupDate"
                    type="date"
                    value={form.pickupDate}
                    min={todayISO()}
                    onChange={(e) => update("pickupDate", e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="pickupTime" className={labelClass}>
                    <Clock className="w-3.5 h-3.5 inline mr-1" />
                    Pickup Time *
                  </label>
                  <input
                    id="pickupTime"
                    type="time"
                    value={form.pickupTime}
                    onChange={(e) => update("pickupTime", e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="passengers" className={labelClass}>
                    <Users className="w-3.5 h-3.5 inline mr-1" />
                    Passengers *
                  </label>
                  <select
                    id="passengers"
                    value={form.passengers}
                    onChange={(e) => update("passengers", e.target.value)}
                    className={inputClass}
                  >
                    {Array.from({ length: 50 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={String(n)}>
                        {n} {n === 1 ? "passenger" : "passengers"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Customer details */}
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label htmlFor="customerName" className={labelClass}>
                    Full Name *
                  </label>
                  <input
                    id="customerName"
                    value={form.customerName}
                    onChange={(e) => update("customerName", e.target.value)}
                    maxLength={100}
                    className={inputClass}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="customerPhone" className={labelClass}>
                    Mobile Number *
                  </label>
                  <input
                    id="customerPhone"
                    type="tel"
                    inputMode="tel"
                    value={form.customerPhone}
                    onChange={(e) => update("customerPhone", e.target.value)}
                    maxLength={15}
                    className={inputClass}
                    placeholder="10-digit mobile number"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label htmlFor="customerEmail" className={labelClass}>
                    Email Address
                  </label>
                  <input
                    id="customerEmail"
                    type="email"
                    value={form.customerEmail}
                    onChange={(e) => update("customerEmail", e.target.value)}
                    maxLength={255}
                    className={inputClass}
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="specialRequests" className={labelClass}>
                    Additional Trip Instructions
                  </label>
                  <input
                    id="specialRequests"
                    value={form.specialRequests}
                    onChange={(e) => update("specialRequests", e.target.value)}
                    maxLength={500}
                    className={inputClass}
                    placeholder="AC preference, luggage, etc."
                  />
                </div>
              </div>

              <label className="mb-7 flex items-start gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.corporate}
                  onChange={(e) => update("corporate", e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-[hsl(var(--primary))]"
                />
                <span>
                  <span className="block font-body text-sm font-semibold text-foreground">
                    Corporate booking
                  </span>
                  <span className="block font-body text-xs text-muted-foreground">
                    Tick this if the trip is for a company. The enquiry will be sent as a
                    Corporate enquiry.
                  </span>
                </span>
              </label>

              <Button
                type="submit"
                className="btn-primary w-full h-14 text-base flex items-center justify-center gap-2 rounded-xl"
              >
                Review Details <ArrowRight className="w-5 h-5" />
              </Button>
            </form>
          )}

          {step === 2 && (
            <div>
              <BookingReview data={form} onEdit={() => setStep(1)} />
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="h-12 rounded-xl flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Edit details
                </Button>
                <Button
                  type="button"
                  onClick={goToVehicles}
                  className="btn-primary flex-1 h-12 rounded-xl flex items-center justify-center gap-2"
                >
                  <Car className="w-5 h-5" /> Continue to Vehicles
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-heading text-xl text-foreground">Choose your vehicle</h3>
                  <p className="font-body text-xs text-muted-foreground mt-0.5">
                    Availability and final fare are confirmed by our team on WhatsApp.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="font-body text-xs font-semibold text-primary hover:underline shrink-0"
                >
                  Back to review
                </button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {fleet.map((vehicle) => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    selected={selectedVehicle?.id === vehicle.id}
                    onSelect={() => setSelectedVehicle(vehicle)}
                  />
                ))}
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="h-12 rounded-xl flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
                <Button
                  type="button"
                  onClick={goToFare}
                  className="btn-primary flex-1 h-12 rounded-xl flex items-center justify-center gap-2"
                >
                  Continue to Fare Summary <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          )}

          {step === 4 && selectedVehicle && (
            <div>
              <FareSummary data={form} vehicle={selectedVehicle} />

              <div className="mt-5 rounded-2xl border border-border bg-card p-4 md:p-5">
                <h3 className="font-heading text-lg text-foreground mb-3">Enquiry contact</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="finalCustomerName" className={labelClass}>Full Name *</label>
                    <input
                      id="finalCustomerName"
                      value={form.customerName}
                      onChange={(e) => update("customerName", e.target.value)}
                      maxLength={100}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="finalCustomerPhone" className={labelClass}>Mobile Number *</label>
                    <input
                      id="finalCustomerPhone"
                      type="tel"
                      inputMode="tel"
                      value={form.customerPhone}
                      onChange={(e) => update("customerPhone", e.target.value)}
                      maxLength={15}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(3)}
                  className="h-12 rounded-xl flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Change vehicle
                </Button>
                <Button
                  type="button"
                  onClick={sendEnquiry}
                  className="btn-primary flex-1 h-14 text-base rounded-xl flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" /> Send Enquiry on WhatsApp
                </Button>
              </div>

              <p className="text-center font-body text-xs text-muted-foreground mt-4 flex items-center justify-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                WhatsApp opens with your details filled in. Press Send to deliver the enquiry.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default BookingForm;
