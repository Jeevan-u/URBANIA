import { AlertCircle } from "lucide-react";
import {
  categoryLabels,
  formatDisplayDate,
  formatTime,
  getRouteSummary,
  tripTypeLabel,
  type BookingFormData,
  type Vehicle,
} from "./bookingUtils";

interface FareSummaryProps {
  data: BookingFormData;
  vehicle: Vehicle;
}

const Line = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-start justify-between gap-4 py-2 border-b border-border last:border-b-0">
    <span className="font-body text-sm text-muted-foreground">{label}</span>
    <span className="font-body text-sm font-medium text-foreground text-right break-words max-w-[60%]">
      {value}
    </span>
  </div>
);

/**
 * Fare summary. No price or distance is calculated unless the business has
 * supplied confirmed data, so both are shown as pending confirmation.
 */
const FareSummary = ({ data, vehicle }: FareSummaryProps) => {
  const route = getRouteSummary(data);

  return (
    <div className="rounded-2xl border border-border bg-muted/40 p-4 md:p-5">
      <h3 className="font-heading text-xl text-foreground mb-3">Fare summary</h3>

      <Line label="Selected vehicle" value={`${vehicle.name} (${vehicle.category})`} />
      <Line label="Booking category" value={categoryLabels[data.category]} />
      <Line label="Journey type" value={tripTypeLabel(data)} />
      <Line label="Pickup" value={route.pickup || "—"} />
      <Line label="Destination" value={route.drop || "—"} />
      {route.stops.length > 0 && (
        <Line label="Intermediate stops" value={route.stops.join(" | ")} />
      )}
      <Line label="Travel date" value={formatDisplayDate(data.pickupDate)} />
      <Line label="Travel time" value={formatTime(data.pickupTime)} />
      {data.category === "outstation" && data.outstationTripType === "round-trip" && (
        <Line label="Return date" value={formatDisplayDate(data.returnDate)} />
      )}
      <Line label="Distance" value="To be confirmed by our team" />
      <Line label="Applicable charges" value="Price on Request" />

      <div className="mt-3 flex items-start justify-between gap-4 rounded-xl bg-card border border-border px-4 py-3">
        <span className="font-body text-sm font-semibold text-foreground">Estimated total</span>
        <span className="font-heading text-lg text-primary">Price on Request</span>
      </div>

      <p className="mt-3 flex items-start gap-2 font-body text-xs text-muted-foreground">
        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
        This is an enquiry. Our team will confirm the final fare and vehicle availability on
        WhatsApp. No online payment is collected on this website.
      </p>
    </div>
  );
};

export default FareSummary;
