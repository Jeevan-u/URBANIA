import { format, parseISO } from "date-fns";

export type BookingCategory = "outstation" | "rental" | "airport";
export type OutstationTripType = "one-way" | "round-trip";
export type AirportTripType = "from-airport" | "to-airport";
export type FemaleDriver = "yes" | "no";

export interface Stop {
  city: string;
  address: string;
}

export interface BookingFormData {
  category: BookingCategory;

  /* Common */
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  passengers: string;
  specialRequests: string;
  corporate: boolean;
  pickupDate: string;
  pickupTime: string;

  /* Outstation */
  outstationTripType: OutstationTripType;
  pickupCity: string;
  pickupAddress: string;
  dropCity: string;
  dropAddress: string;
  stops: Stop[];
  returnDate: string;

  /* Rental */
  rentalCity: string;
  rentalPickupLocation: string;
  rentalDuration: string;

  /* Airport */
  airportTripType: AirportTripType | "";
  airportTerminal: string;
  airportLocation: string;
  flightDetails: string;
  femaleDriver: FemaleDriver;
}

export interface Vehicle {
  id: string;
  name: string;
  category: string;
  seats: string;
  luggage?: string;
  ac?: boolean;
  price: string;
}

export const GLOBAL_WHATSAPP_NUMBER = "919632345415";
export const AIRPORT_NAME = "Kempegowda International Airport Bengaluru (BLR)";

export const initialBookingForm: BookingFormData = {
  category: "outstation",
  customerName: "",
  customerPhone: "",
  customerEmail: "",
  passengers: "1",
  specialRequests: "",
  corporate: false,
  pickupDate: "",
  pickupTime: "",
  outstationTripType: "one-way",
  pickupCity: "Bangalore",
  pickupAddress: "",
  dropCity: "",
  dropAddress: "",
  stops: [],
  returnDate: "",
  rentalCity: "Bangalore",
  rentalPickupLocation: "",
  rentalDuration: "",
  airportTripType: "",
  airportTerminal: "",
  airportLocation: "",
  flightDetails: "",
  femaleDriver: "no",
};

/**
 * Only vehicles already listed by the business are included.
 * Prices are intentionally not calculated or invented; every card says
 * "Price on Request" until the business supplies confirmed fares.
 */
export const fleet: Vehicle[] = [
  { id: "swift-dzire", name: "Swift Dzire", category: "Sedan", seats: "4 + 1", price: "Price on Request" },
  { id: "toyota-etios", name: "Toyota Etios", category: "Sedan", seats: "4 + 1", price: "Price on Request" },
  { id: "maruti-ertiga", name: "Maruti Ertiga", category: "MUV", seats: "6 + 1", price: "Price on Request" },
  { id: "toyota-innova", name: "Toyota Innova", category: "SUV", seats: "7 + 1", price: "Price on Request" },
  { id: "innova-crysta", name: "Innova Crysta", category: "Premium SUV", seats: "7 + 1", price: "Price on Request" },
  { id: "force-urbania", name: "Force Urbania", category: "Premium Van", seats: "On Request", price: "Price on Request" },
  { id: "tempo-traveller", name: "Tempo Traveller", category: "Mini Bus", seats: "12 - 28", price: "Price on Request" },
  { id: "luxury-bus", name: "Luxury Bus", category: "Coach", seats: "40 +", price: "Price on Request" },
];

export const categoryLabels: Record<BookingCategory, string> = {
  outstation: "Outstation",
  rental: "Rental",
  airport: "Airport Taxi",
};

export const enquiryTypeFor = (data: BookingFormData): string => {
  if (data.corporate) return "Corporate";
  if (data.category === "rental") return "Local";
  if (data.category === "airport") return "Airport";
  return "Outstation";
};

export const tripTypeLabel = (data: BookingFormData): string => {
  if (data.category === "outstation") {
    return data.outstationTripType === "round-trip" ? "Round Trip" : "One Way";
  }
  if (data.category === "rental") {
    return data.rentalDuration.trim() ? `Rental - ${data.rentalDuration.trim()}` : "Rental";
  }
  if (data.airportTripType === "from-airport") return "Airport Pickup";
  if (data.airportTripType === "to-airport") return "Airport Drop";
  return "Airport";
};

export interface RouteSummary {
  pickup: string;
  drop: string;
  stops: string[];
}

export const getRouteSummary = (data: BookingFormData): RouteSummary => {
  if (data.category === "rental") {
    return {
      pickup: [data.rentalCity.trim(), data.rentalPickupLocation.trim()].filter(Boolean).join(", "),
      drop: data.rentalCity.trim() ? `Within ${data.rentalCity.trim()}` : "Within city",
      stops: [],
    };
  }

  if (data.category === "airport") {
    const terminal = data.airportTerminal ? `, ${data.airportTerminal}` : "";
    const airport = `${AIRPORT_NAME}${terminal}`;
    return {
      pickup: data.airportTripType === "to-airport" ? data.airportLocation.trim() : airport,
      drop: data.airportTripType === "to-airport" ? airport : data.airportLocation.trim(),
      stops: [],
    };
  }

  return {
    pickup: [data.pickupCity.trim(), data.pickupAddress.trim()].filter(Boolean).join(", "),
    drop: [data.dropCity.trim(), data.dropAddress.trim()].filter(Boolean).join(", "),
    stops: data.stops
      .map((stop) => [stop.city.trim(), stop.address.trim()].filter(Boolean).join(", "))
      .filter(Boolean),
  };
};

/** Converts a 24-hour "HH:mm" input into "hh:mm AM/PM". */
export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(":").map(Number);
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return "";
  const suffix = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  return `${String(hour12).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${suffix}`;
};

export const formatDisplayDate = (value: string): string => {
  if (!value) return "";
  try {
    return format(parseISO(value), "PPP");
  } catch {
    return value;
  }
};

/** Local-date ISO string, avoiding a UTC rollover. */
export const todayISO = (): string => {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
};

const BOOKING_SEQ_KEY = "urbania_booking_seq";
const BOOKING_SEQ_START = 1355;

/** Returns the next enquiry ID in the SKY-00001355 format. */
export const nextBookingId = (): string => {
  let seq = BOOKING_SEQ_START;
  try {
    const stored = Number(localStorage.getItem(BOOKING_SEQ_KEY));
    if (Number.isFinite(stored) && stored >= BOOKING_SEQ_START) seq = stored;
    localStorage.setItem(BOOKING_SEQ_KEY, String(seq + 1));
  } catch {
    // localStorage unavailable - fall back to the starting sequence
  }
  return `SKY-${String(seq).padStart(8, "0")}`;
};

export const normalisePhone = (phone: string): string => {
  let digits = phone.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return digits;
};

export const validateBooking = (data: BookingFormData): string[] => {
  const errors: string[] = [];

  if (!data.customerName.trim()) errors.push("Please enter your full name.");
  if (normalisePhone(data.customerPhone).length !== 10) {
    errors.push("Please enter a valid 10-digit mobile number.");
  }
  if (!data.pickupDate) {
    errors.push("Please select the pickup date.");
  } else if (data.pickupDate < todayISO()) {
    errors.push("Pickup date cannot be in the past.");
  }
  if (!data.pickupTime) errors.push("Please select the pickup time.");
  if (!data.passengers) errors.push("Please select the number of passengers.");

  if (data.category === "outstation") {
    if (!data.pickupCity.trim()) errors.push("Please enter the pickup city.");
    if (!data.pickupAddress.trim()) errors.push("Please enter the complete pickup address.");
    if (!data.dropCity.trim()) errors.push("Please enter the destination city.");
    if (!data.dropAddress.trim()) errors.push("Please enter the complete drop address.");

    if (data.outstationTripType === "round-trip") {
      if (!data.returnDate) {
        errors.push("Please select the return date for the round trip.");
      } else if (data.pickupDate && data.returnDate < data.pickupDate) {
        errors.push("Return date cannot be before the pickup date.");
      }
    }

    data.stops.forEach((stop, index) => {
      const hasAnyValue = stop.city.trim() || stop.address.trim();
      if (hasAnyValue && !stop.city.trim()) {
        errors.push(`Please enter the city for intermediate stop ${index + 1}.`);
      }
    });
  }

  if (data.category === "rental") {
    if (!data.rentalCity.trim()) errors.push("Please enter the city.");
    if (!data.rentalPickupLocation.trim()) errors.push("Please enter the pickup location.");
    if (!data.rentalDuration.trim()) errors.push("Please enter the required rental duration.");
  }

  if (data.category === "airport") {
    if (!data.airportTripType) errors.push("Please select the airport trip type.");
    if (!data.airportTerminal) errors.push("Please select the airport terminal.");
    if (!data.airportLocation.trim()) {
      errors.push(
        data.airportTripType === "to-airport"
          ? "Please enter the pickup location."
          : "Please enter the drop location."
      );
    }
  }

  return errors;
};

export const buildEnquiryMessage = (
  data: BookingFormData,
  vehicle: Vehicle,
  bookingId: string
): string => {
  const route = getRouteSummary(data);
  const enquiryType = enquiryTypeFor(data);

  const lines = [
    `---- ${enquiryType} New Enquery: ----`,
    `Booking ID: '${bookingId}'`,
    `Phone: '${data.customerPhone.trim()}'`,
    `Service: '${enquiryType}'`,
    `Booking Category: '${categoryLabels[data.category]}'`,
    `Trip Type: '${tripTypeLabel(data)}'`,
    `Customer Name: '${data.customerName.trim()}'`,
    `Pickup Location: '${route.pickup}'`,
    `Drop Location: '${route.drop}'`,
    `Intermediate Stops: '${route.stops.length ? route.stops.join(" | ") : "None"}'`,
    `Travel Date: '${data.pickupDate}'`,
    `Travel Time: '${formatTime(data.pickupTime)}'`,
  ];

  if (data.category === "outstation" && data.outstationTripType === "round-trip") {
    lines.push(`Return Date: '${data.returnDate}'`);
  }

  lines.push(
    `Passengers: '${data.passengers}'`,
    `Selected Vehicle: '${vehicle.name}'`,
    `Fare: '${vehicle.price}'`,
    `Special Requirements: '${data.specialRequests.trim() || "None"}'`
  );

  if (data.category === "rental") {
    lines.push(
      `Rental City: '${data.rentalCity.trim()}'`,
      `Rental Duration: '${data.rentalDuration.trim()}'`
    );
  }

  if (data.category === "airport") {
    lines.push(
      `Airport Terminal: '${data.airportTerminal}'`,
      `Flight Details: '${data.flightDetails.trim() || "Not provided"}'`,
      `Female Driver Preference: '${
        data.femaleDriver === "yes" ? "Yes (subject to availability)" : "No"
      }'`
    );
  }

  if (data.corporate) lines.push(`Corporate Booking: 'Yes'`);

  return lines.join("\n");
};
