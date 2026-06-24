import type { Booking, Court, PaymentInstruction, Slot, Sport, Venue } from "./types";

export const sports: Sport[] = [
  { id: "sport-futsal", name: "Futsal", slug: "futsal" },
  { id: "sport-badminton", name: "Badminton", slug: "badminton" },
  { id: "sport-basket", name: "Basket", slug: "basket" },
  { id: "sport-tennis", name: "Tenis", slug: "tenis" },
];

export const venues: Venue[] = [
  {
    id: "venue-arena",
    name: "Arena Sport Center",
    slug: "arena-sport-center",
    address: "Jl. Wijaya Kusuma No. 18",
    city: "Jakarta Selatan",
    description:
      "Venue olahraga indoor dengan lapangan futsal, badminton, dan basket. Cocok untuk komunitas, latihan rutin, dan pertandingan santai setelah jam kerja.",
    whatsappNumber: "6281234567890",
    openTime: "08:00",
    closeTime: "23:00",
    sports: ["Futsal", "Badminton", "Basket"],
    facilities: ["Parkir luas", "Ruang tunggu", "Mushola", "Kantin", "Shower"],
  },
];

export const courts: Court[] = [
  {
    id: "court-futsal-1",
    venueId: "venue-arena",
    sportId: "sport-futsal",
    name: "Futsal 1",
    description: "Lapangan indoor rumput sintetis dengan pencahayaan terang.",
    pricePerHour: 180000,
    imageTone: "green",
    isActive: true,
  },
  {
    id: "court-badminton-2",
    venueId: "venue-arena",
    sportId: "sport-badminton",
    name: "Badminton 2",
    description: "Court vinyl nyaman untuk latihan dan sparring komunitas.",
    pricePerHour: 70000,
    imageTone: "lime",
    isActive: true,
  },
  {
    id: "court-basket-indoor",
    venueId: "venue-arena",
    sportId: "sport-basket",
    name: "Basket Indoor",
    description: "Lapangan basket indoor ukuran latihan dengan ring standar.",
    pricePerHour: 220000,
    imageTone: "blue",
    isActive: true,
  },
];

export const slotDates = [
  { label: "Hari ini", value: "2026-06-24" },
  { label: "Besok", value: "2026-06-25" },
  { label: "Jumat", value: "2026-06-26" },
  { label: "Sabtu", value: "2026-06-27" },
];

export const slots: Slot[] = courts.flatMap((court) =>
  slotDates.flatMap((date, dateIndex) => [
    {
      courtId: court.id,
      date: date.value,
      startTime: "08:00",
      endTime: "09:00",
      status: "available",
    },
    {
      courtId: court.id,
      date: date.value,
      startTime: "09:00",
      endTime: "10:00",
      status: dateIndex === 0 && court.id === "court-badminton-2" ? "confirmed" : "available",
    },
    {
      courtId: court.id,
      date: date.value,
      startTime: "16:00",
      endTime: "17:00",
      status: dateIndex === 0 && court.id === "court-basket-indoor" ? "pending" : "available",
    },
    {
      courtId: court.id,
      date: date.value,
      startTime: "19:00",
      endTime: "20:00",
      status: dateIndex === 0 && court.id === "court-futsal-1" ? "confirmed" : "available",
    },
    {
      courtId: court.id,
      date: date.value,
      startTime: "20:00",
      endTime: "21:00",
      status: "available",
    },
  ]),
);

export const paymentInstructions: PaymentInstruction[] = [
  {
    method: "bank_transfer",
    label: "Transfer Bank",
    bankName: "BCA",
    accountNumber: "1234567890",
    accountName: "PT Arena Sport Indonesia",
    instructions: "Transfer sesuai total pembayaran lalu upload bukti pembayaran pada halaman booking.",
  },
  {
    method: "qris",
    label: "QRIS",
    accountName: "Arena Sport Center",
    instructions: "Scan QRIS di kasir venue atau minta gambar QRIS melalui WhatsApp admin.",
  },
  {
    method: "cash",
    label: "Bayar di Tempat",
    instructions: "Konfirmasi ke admin melalui WhatsApp jika ingin membayar langsung di venue.",
  },
];

export const bookings: Booking[] = [
  {
    id: "booking-demo",
    bookingCode: "CV-2026-DEMO",
    venueId: "venue-arena",
    courtId: "court-futsal-1",
    customerName: "Raka Pratama",
    customerPhone: "081234567890",
    bookingDate: "2026-06-25",
    startTime: "20:00",
    endTime: "21:00",
    durationMinutes: 60,
    totalPrice: 180000,
    status: "pending_payment",
    notes: "Contoh booking untuk preview flow publik.",
  },
  {
    id: "booking-verification",
    bookingCode: "CV-2026-A7K9",
    venueId: "venue-arena",
    courtId: "court-badminton-2",
    customerName: "Dina Safitri",
    customerPhone: "081298765432",
    bookingDate: "2026-06-24",
    startTime: "09:00",
    endTime: "10:00",
    durationMinutes: 60,
    totalPrice: 70000,
    status: "waiting_verification",
    notes: "Bukti transfer sudah dikirim via halaman booking.",
  },
  {
    id: "booking-confirmed",
    bookingCode: "CV-2026-B2M4",
    venueId: "venue-arena",
    courtId: "court-futsal-1",
    customerName: "Komunitas Garuda FC",
    customerPhone: "081377788899",
    bookingDate: "2026-06-26",
    startTime: "19:00",
    endTime: "21:00",
    durationMinutes: 120,
    totalPrice: 360000,
    status: "confirmed",
    notes: "Booking rutin Jumat malam.",
  },
  {
    id: "booking-completed",
    bookingCode: "CV-2026-Q9P1",
    venueId: "venue-arena",
    courtId: "court-basket-indoor",
    customerName: "Hoop Society",
    customerPhone: "081344455566",
    bookingDate: "2026-06-23",
    startTime: "16:00",
    endTime: "17:00",
    durationMinutes: 60,
    totalPrice: 220000,
    status: "completed",
    notes: "Selesai tanpa kendala.",
  },
];
