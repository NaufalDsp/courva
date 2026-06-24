export type BookingStatus =
  | "pending_payment"
  | "waiting_verification"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "expired";

export type Sport = {
  id: string;
  name: string;
  slug: string;
};

export type Venue = {
  id: string;
  name: string;
  slug: string;
  address: string;
  city: string;
  description: string;
  whatsappNumber: string;
  openTime: string;
  closeTime: string;
  sports: string[];
  facilities: string[];
};

export type Court = {
  id: string;
  venueId: string;
  sportId: string;
  name: string;
  description: string;
  pricePerHour: number;
  imageTone: "green" | "blue" | "lime";
  isActive: boolean;
};

export type Slot = {
  courtId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "available" | "pending" | "confirmed" | "unavailable";
};

export type PaymentInstruction = {
  method: "bank_transfer" | "qris" | "cash";
  label: string;
  accountName?: string;
  accountNumber?: string;
  bankName?: string;
  instructions: string;
};

export type Booking = {
  id: string;
  bookingCode: string;
  venueId: string;
  courtId: string;
  customerName: string;
  customerPhone: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  totalPrice: number;
  status: BookingStatus;
  notes?: string;
};
