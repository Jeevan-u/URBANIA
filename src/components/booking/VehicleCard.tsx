import { Briefcase, Check, Snowflake, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Vehicle } from "./bookingUtils";
import luxuryFleet from "@/assets/luxury-fleet.jpg";

interface VehicleCardProps {
  vehicle: Vehicle;
  selected: boolean;
  onSelect: () => void;
}

/**
 * Fleet card. Only verified data from the business fleet list is shown.
 * A single existing fleet photograph is reused as a representative image.
 */
const VehicleCard = ({ vehicle, selected, onSelect }: VehicleCardProps) => {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-card overflow-hidden premium-shadow transition-all flex flex-col",
        selected ? "border-primary ring-2 ring-primary/25" : "border-border"
      )}
    >
      <div className="relative h-36 bg-muted">
        <img
          src={luxuryFleet}
          alt={`${vehicle.name} - representative fleet image`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <span className="absolute top-2 left-2 rounded-full bg-foreground/75 px-2 py-0.5 font-body text-[10px] font-semibold uppercase tracking-wide text-background">
          Representative image
        </span>
        <span className="absolute top-2 right-2 rounded-full bg-card/90 px-2 py-0.5 font-body text-[10px] font-semibold text-foreground">
          {vehicle.category}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-heading text-lg text-foreground leading-tight">{vehicle.name}</h3>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-body text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Users className="w-3.5 h-3.5" /> {vehicle.seats}
          </span>
          {vehicle.ac && (
            <span className="inline-flex items-center gap-1">
              <Snowflake className="w-3.5 h-3.5" /> AC
            </span>
          )}
          {vehicle.luggage && (
            <span className="inline-flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5" /> {vehicle.luggage}
            </span>
          )}
        </div>

        <p className="mt-3 font-body text-sm font-semibold text-primary">{vehicle.price}</p>

        <button
          type="button"
          onClick={onSelect}
          aria-pressed={selected}
          className={cn(
            "mt-3 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-body text-sm font-semibold transition-colors",
            selected
              ? "bg-primary text-primary-foreground"
              : "border border-border bg-muted/50 text-foreground hover:bg-muted"
          )}
        >
          {selected ? (
            <>
              <Check className="w-4 h-4" /> Selected
            </>
          ) : (
            "Select Vehicle"
          )}
        </button>
      </div>
    </div>
  );
};

export default VehicleCard;
