import { Pencil } from "lucide-react";
import {
  AIRPORT_NAME,
  categoryLabels,
  formatDisplayDate,
  formatTime,
  getRouteSummary,
  tripTypeLabel,
  type BookingFormData,
} from "./bookingUtils";

interface BookingReviewProps {
  data: BookingFormData;
  onEdit: () => void;
}

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-2 border-b border-border last:border-b-0">
    <span className="font-body text-xs font-semibold text-muted-foreground sm:w-44 shrink-0">
      {label}
    </span>
    <span className="font-body text-sm text-foreground break-words">
      {value || "—"}
    </span>
  </div>
);

/** Review of the entered trip details before the customer picks a vehicle. */
const BookingReview = ({ data, onEdit }: BookingReviewProps) => {
  const route = getRouteSummary(data);

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-4">
        <h3 className="font-heading text-xl text-foreground">Review your trip details</h3>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-1.5 font-body text-xs font-semibold text-primary hover:underline"
        >
          <Pencil className="w-3.5 h-3.5" /> Edit details
        </button>
      </div>

      <div className="rounded-2xl border border-border bg-muted/40 p-4 md:p-5">
        <Row label="Booking category" value={categoryLabels[data.category]} />
        <Row label="Trip type" value={tripTypeLabel(data)} />
        <Row label="Customer name" value={data.customerName} />
        <Row label="Mobile number" value={data.customerPhone} />
        {data.customerEmail && <Row label="Email" value={data.customerEmail} />}
        <Row label="Pickup location" value={route.pickup} />
        <Row label="Drop location" value={route.drop} />
        {route.stops.length > 0 && (
          <Row label="Intermediate stops" value={route.stops.join(" | ")} />
        )}
        {data.category === "outstation" && data.outstationTripType === "round-trip" && (
          <Row label="Return date" value={formatDisplayDate(data.returnDate)} />
        )}
        {data.category === "rental" && (
          <Row label="Rental duration" value={data.rentalDuration} />
        )}
        {data.category === "airport" && (
          <>
            <Row label="Airport" value={`${AIRPORT_NAME}${data.airportTerminal ? `, ${data.airportTerminal}` : ""}`} />
            <Row label="Flight details" value={data.flightDetails} />
            <Row
              label="Female driver"
              value={data.femaleDriver === "yes" ? "Yes (subject to availability)" : "No"}
            />
          </>
        )}
        <Row label="Pickup date" value={formatDisplayDate(data.pickupDate)} />
        <Row label="Pickup time" value={formatTime(data.pickupTime)} />
        <Row label="Passengers" value={data.passengers} />
        {data.specialRequests && (
          <Row label="Special requirements" value={data.specialRequests} />
        )}
        {data.corporate && <Row label="Corporate booking" value="Yes" />}
      </div>
    </div>
  );
};

export default BookingReview;
