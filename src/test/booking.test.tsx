import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import BookingForm from "@/components/BookingForm";

const FILL = "2030-01-15";

const installLocalStorage = () => {
  const store: Record<string, string> = {};
  Object.defineProperty(window, "localStorage", {
    configurable: true,
    value: {
      getItem: (key: string) => (key in store ? store[key] : null),
      setItem: (key: string, value: string) => {
        store[key] = String(value);
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        Object.keys(store).forEach((key) => delete store[key]);
      },
      key: (index: number) => Object.keys(store)[index] ?? null,
      get length() {
        return Object.keys(store).length;
      },
    },
  });
};

const fillCommon = () => {
  fireEvent.change(screen.getByLabelText(/Pickup Date/), { target: { value: FILL } });
  fireEvent.change(screen.getByLabelText(/Pickup Time/), { target: { value: "09:30" } });
  fireEvent.change(screen.getByLabelText(/Full Name/), { target: { value: "Test User" } });
  fireEvent.change(screen.getByLabelText(/Mobile Number/), { target: { value: "9876543210" } });
};

const fillOutstation = () => {
  fireEvent.change(screen.getByLabelText(/Pickup Address/), { target: { value: "12 MG Road" } });
  fireEvent.change(screen.getByLabelText(/Destination City/), { target: { value: "Mysore" } });
  fireEvent.change(screen.getByLabelText(/Complete Drop Address/), { target: { value: "Zoo Main Road" } });
};

const fillOutstationTrip = () => {
  fillOutstation();
  fillCommon();
};

const pickFirstVehicle = () => {
  fireEvent.click(screen.getAllByRole("button", { name: "Select Vehicle" })[0]);
};

const sendEnquiry = () => {
  fireEvent.click(screen.getByRole("button", { name: /Send Enquiry on WhatsApp/ }));
};

const lastOpenUrl = (spy: ReturnType<typeof vi.spyOn>): string => {
  const calls = spy.mock.calls as unknown as [string, string][];
  return calls[calls.length - 1][0];
};

describe("BookingForm", () => {
  let openSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.restoreAllMocks();
    installLocalStorage();
    window.localStorage.clear();
    openSpy = vi.spyOn(window, "open").mockReturnValue(null);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows the three category tabs and switches conditional fields", () => {
    render(<BookingForm />);

    expect(screen.getByRole("tab", { name: "Outstation" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByLabelText(/Complete Pickup Address/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("tab", { name: "Rental" }));
    expect(screen.getByRole("tab", { name: "Rental" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByLabelText(/Rental Duration/)).toBeInTheDocument();
    expect(screen.queryByLabelText(/Destination City/)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("tab", { name: "Airport Taxi" }));
    expect(screen.getByLabelText(/Airport Terminal/)).toBeInTheDocument();
    expect(screen.getByRole("radiogroup", { name: "Airport trip type" })).toBeInTheDocument();
    expect(screen.queryByLabelText(/Rental Duration/)).not.toBeInTheDocument();
  });

  it("shows the return date only for round trips and validates it", () => {
    render(<BookingForm />);

    expect(screen.queryByLabelText(/Return Date/)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("radio", { name: "Round Trip" }));
    expect(screen.getByLabelText(/Return Date/)).toBeInTheDocument();

    fillOutstationTrip();
    fireEvent.click(screen.getByRole("button", { name: /Review Details/ }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Please select the return date for the round trip."
    );
    expect(screen.queryByText("Review your trip details")).not.toBeInTheDocument();
  });

  it("rejects a return date before the pickup date", () => {
    render(<BookingForm />);
    fireEvent.click(screen.getByRole("radio", { name: "Round Trip" }));
    fillOutstationTrip();
    fireEvent.change(screen.getByLabelText(/Return Date/), { target: { value: "2030-01-14" } });
    fireEvent.click(screen.getByRole("button", { name: /Review Details/ }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Return date cannot be before the pickup date."
    );
  });

  it("validates required outstation fields", () => {
    render(<BookingForm />);
    fireEvent.click(screen.getByRole("button", { name: /Review Details/ }));

    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Please enter your full name.");
    expect(alert).toHaveTextContent("Please enter a valid 10-digit mobile number.");
    expect(alert).toHaveTextContent("Please select the pickup date.");
    expect(alert).toHaveTextContent("Please enter the complete pickup address.");
    expect(alert).toHaveTextContent("Please enter the destination city.");
  });

  it("completes an outstation enquiry with vehicle and fare summary", () => {
    render(<BookingForm />);
    fillOutstationTrip();
    fireEvent.click(screen.getByRole("button", { name: /Review Details/ }));

    expect(screen.getByText("Review your trip details")).toBeInTheDocument();
    expect(screen.getByText("Bangalore, 12 MG Road")).toBeInTheDocument();
    expect(screen.getByText("Mysore, Zoo Main Road")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Continue to Vehicles/ }));
    expect(screen.getByText("Choose your vehicle")).toBeInTheDocument();

    pickFirstVehicle();
    fireEvent.click(screen.getByRole("button", { name: /Continue to Fare Summary/ }));

    expect(screen.getByText("Fare summary")).toBeInTheDocument();
    expect(screen.getByText("Swift Dzire (Sedan)")).toBeInTheDocument();
    expect(screen.getByText("Distance")).toBeInTheDocument();
    expect(screen.getAllByText("Price on Request").length).toBeGreaterThan(0);
    expect(screen.getByText("Estimated total")).toBeInTheDocument();

    sendEnquiry();
    expect(openSpy).toHaveBeenCalledTimes(1);

    const url = lastOpenUrl(openSpy);
    expect(url.startsWith("https://wa.me/919632345415?text=")).toBe(true);
    const message = decodeURIComponent(url.split("text=")[1]);

    expect(message).toContain("---- Outstation New Enquery: ----");
    expect(message).toContain("Booking ID: 'SKY-");
    expect(message).toContain("Phone: '9876543210'");
    expect(message).toContain("Service: 'Outstation'");
    expect(message).toContain("Booking Category: 'Outstation'");
    expect(message).toContain("Trip Type: 'One Way'");
    expect(message).toContain("Customer Name: 'Test User'");
    expect(message).toContain("Pickup Location: 'Bangalore, 12 MG Road'");
    expect(message).toContain("Drop Location: 'Mysore, Zoo Main Road'");
    expect(message).toContain("Intermediate Stops: 'None'");
    expect(message).toContain("Travel Date: '2030-01-15'");
    expect(message).toContain("Travel Time: '09:30 AM'");
    expect(message).toContain("Passengers: '1'");
    expect(message).toContain("Selected Vehicle: 'Swift Dzire'");
    expect(message).toContain("Fare: 'Price on Request'");
    expect(message).toContain("Special Requirements: 'None'");
  });

  it("includes intermediate stops and the return date for a round trip", () => {
    render(<BookingForm />);
    fireEvent.click(screen.getByRole("radio", { name: "Round Trip" }));

    fireEvent.click(screen.getByRole("button", { name: "Add Stop" }));
    fireEvent.change(screen.getByLabelText("Stop 1 city"), { target: { value: "Mandya" } });
    fireEvent.change(screen.getByLabelText("Stop 1 address"), { target: { value: "Bus Stand" } });

    fillOutstationTrip();
    fireEvent.change(screen.getByLabelText(/Return Date/), { target: { value: "2030-01-17" } });
    fireEvent.change(screen.getByLabelText(/Additional Trip Instructions/), {
      target: { value: "Need luggage carrier" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Review Details/ }));
    fireEvent.click(screen.getByRole("button", { name: /Continue to Vehicles/ }));
    pickFirstVehicle();
    fireEvent.click(screen.getByRole("button", { name: /Continue to Fare Summary/ }));
    sendEnquiry();

    const message = decodeURIComponent(lastOpenUrl(openSpy).split("text=")[1]);
    expect(message).toContain("Trip Type: 'Round Trip'");
    expect(message).toContain("Intermediate Stops: 'Mandya, Bus Stand'");
    expect(message).toContain("Return Date: '2030-01-17'");
    expect(message).toContain("Special Requirements: 'Need luggage carrier'");
  });

  it("completes a rental enquiry mapped to the Local enquiry type", () => {
    render(<BookingForm />);
    fireEvent.click(screen.getByRole("tab", { name: "Rental" }));

    fireEvent.change(screen.getByLabelText(/^City \*/), { target: { value: "Bangalore" } });
    fireEvent.change(screen.getByLabelText(/Pickup Location/), {
      target: { value: "Indiranagar" },
    });
    fireEvent.change(screen.getByLabelText(/Rental Duration/), { target: { value: "8 hours" } });
    fillCommon();

    fireEvent.click(screen.getByRole("button", { name: /Review Details/ }));
    expect(screen.getByText("Rental - 8 hours")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Continue to Vehicles/ }));
    pickFirstVehicle();
    fireEvent.click(screen.getByRole("button", { name: /Continue to Fare Summary/ }));
    sendEnquiry();

    const message = decodeURIComponent(lastOpenUrl(openSpy).split("text=")[1]);
    expect(message).toContain("---- Local New Enquery: ----");
    expect(message).toContain("Service: 'Local'");
    expect(message).toContain("Booking Category: 'Rental'");
    expect(message).toContain("Trip Type: 'Rental - 8 hours'");
    expect(message).toContain("Pickup Location: 'Bangalore, Indiranagar'");
    expect(message).toContain("Rental City: 'Bangalore'");
    expect(message).toContain("Rental Duration: '8 hours'");
  });

  it("completes an airport enquiry with terminal, flight and driver preference", () => {
    render(<BookingForm />);
    fireEvent.click(screen.getByRole("tab", { name: "Airport Taxi" }));

    fireEvent.click(screen.getByRole("radio", { name: "Drop to Airport" }));
    fireEvent.change(screen.getByLabelText(/Airport Terminal/), { target: { value: "Terminal 2" } });
    fireEvent.change(screen.getByLabelText(/Pickup Location/), {
      target: { value: "Jayanagar, Bengaluru" },
    });
    fireEvent.change(screen.getByLabelText(/Flight Arrival/), {
      target: { value: "IndiGo 6E 234" },
    });
    const driverGroup = screen.getByRole("radiogroup", { name: "Female driver preference" });
    fireEvent.click(within(driverGroup).getByRole("radio", { name: "Yes" }));

    fillCommon();
    fireEvent.click(screen.getByRole("button", { name: /Review Details/ }));
    fireEvent.click(screen.getByRole("button", { name: /Continue to Vehicles/ }));
    pickFirstVehicle();
    fireEvent.click(screen.getByRole("button", { name: /Continue to Fare Summary/ }));
    sendEnquiry();

    const message = decodeURIComponent(lastOpenUrl(openSpy).split("text=")[1]);
    expect(message).toContain("---- Airport New Enquery: ----");
    expect(message).toContain("Service: 'Airport'");
    expect(message).toContain("Booking Category: 'Airport Taxi'");
    expect(message).toContain("Trip Type: 'Airport Drop'");
    expect(message).toContain("Pickup Location: 'Jayanagar, Bengaluru'");
    expect(message).toContain(
      "Drop Location: 'Kempegowda International Airport Bengaluru (BLR), Terminal 2'"
    );
    expect(message).toContain("Airport Terminal: 'Terminal 2'");
    expect(message).toContain("Flight Details: 'IndiGo 6E 234'");
    expect(message).toContain(
      "Female Driver Preference: 'Yes (subject to availability)'"
    );
  });

  it("sends a Corporate enquiry when the corporate option is ticked", () => {
    render(<BookingForm />);
    fillOutstationTrip();
    fireEvent.click(screen.getByLabelText(/Corporate booking/));
    fireEvent.click(screen.getByRole("button", { name: /Review Details/ }));
    fireEvent.click(screen.getByRole("button", { name: /Continue to Vehicles/ }));
    pickFirstVehicle();
    fireEvent.click(screen.getByRole("button", { name: /Continue to Fare Summary/ }));
    sendEnquiry();

    const message = decodeURIComponent(lastOpenUrl(openSpy).split("text=")[1]);
    expect(message).toContain("---- Corporate New Enquery: ----");
    expect(message).toContain("Service: 'Corporate'");
    expect(message).toContain("Corporate Booking: 'Yes'");
  });

  it("blocks continuing to fare summary without a selected vehicle", () => {
    render(<BookingForm />);
    fillOutstationTrip();
    fireEvent.click(screen.getByRole("button", { name: /Review Details/ }));
    fireEvent.click(screen.getByRole("button", { name: /Continue to Vehicles/ }));
    fireEvent.click(screen.getByRole("button", { name: /Continue to Fare Summary/ }));

    expect(screen.queryByText("Fare summary")).not.toBeInTheDocument();
    expect(openSpy).not.toHaveBeenCalled();
  });
});
