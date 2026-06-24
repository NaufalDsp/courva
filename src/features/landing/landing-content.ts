export const navItems = [
  { label: "Fitur", href: "#fitur" },
  { label: "Cara Kerja", href: "#cara-kerja" },
  { label: "Use Case", href: "#use-case" },
  { label: "FAQ", href: "#faq" },
];

export const heroStats = [
  { label: "Booking hari ini", value: "42" },
  { label: "Slot aktif", value: "186" },
  { label: "Estimasi bulan ini", value: "Rp28,4jt" },
];

export const problems = [
  "Admin terlalu sering cek jadwal manual.",
  "Customer harus tanya slot lewat WhatsApp.",
  "Booking rawan bentrok pada jam yang sama.",
  "Bukti pembayaran tercecer di banyak chat.",
];

export const solutions = [
  "Jadwal online yang mudah dicek customer.",
  "Booking publik tanpa customer login.",
  "Status pembayaran manual lebih rapi.",
  "Dashboard tenant untuk pantau operasional.",
];

export const features = [
  {
    title: "Booking publik tanpa login",
    description:
      "Customer memilih venue, lapangan, tanggal, dan slot dari halaman publik yang ringkas.",
    icon: "CalendarCheck",
  },
  {
    title: "Slot anti bentrok",
    description:
      "Slot yang sudah pending, menunggu verifikasi, atau confirmed tidak bisa dipilih lagi.",
    icon: "ShieldCheck",
  },
  {
    title: "Pembayaran manual tertata",
    description:
      "Instruksi transfer, QRIS, upload bukti, dan verifikasi admin berada dalam satu alur.",
    icon: "WalletCards",
  },
  {
    title: "Dashboard tenant",
    description:
      "Pemilik venue bisa melihat booking, lapangan aktif, pembayaran, dan estimasi pendapatan.",
    icon: "LayoutDashboard",
  },
  {
    title: "Multi-olahraga",
    description:
      "Satu venue dapat mengelola futsal, badminton, basket, tenis, padel, dan lainnya.",
    icon: "Dumbbell",
  },
  {
    title: "WhatsApp tetap tersedia",
    description:
      "Komunikasi cepat tetap bisa dilakukan melalui link WhatsApp dengan template pesan.",
    icon: "MessageCircle",
  },
];

export const steps = [
  {
    title: "Atur venue dan lapangan",
    description: "Admin membuat venue, menambahkan lapangan, jenis olahraga, harga, dan jam aktif.",
  },
  {
    title: "Customer cek slot",
    description: "Customer membuka halaman venue, memilih tanggal, lalu melihat slot yang tersedia.",
  },
  {
    title: "Booking dan bayar manual",
    description: "Booking dibuat dengan kode unik, lalu customer mengikuti instruksi pembayaran.",
  },
  {
    title: "Admin verifikasi",
    description: "Admin mengecek bukti pembayaran dan mengubah status booking menjadi confirmed.",
  },
];

export const sports = [
  "Futsal",
  "Badminton",
  "Mini Soccer",
  "Basket",
  "Tenis",
  "Padel",
  "Voli",
  "Multi-sport Venue",
];

export const bookingPreviewRows = [
  {
    label: "Pilih venue",
    value: "Arena Sport Center",
    note: "Jakarta Selatan",
    status: "confirmed",
  },
  {
    label: "Pilih lapangan",
    value: "Futsal 1",
    note: "Indoor · Rumput sintetis",
    status: "confirmed",
  },
  {
    label: "Pilih slot",
    value: "19:00 - 20:00",
    note: "Tersedia hari ini",
    status: "waiting_verification",
  },
] as const;

export const adminPreviewRows = [
  {
    code: "CV-2026-A7K9",
    customer: "Raka Pratama",
    court: "Futsal 1",
    time: "19:00 - 20:00",
    total: "Rp180.000",
    status: "waiting_verification",
  },
  {
    code: "CV-2026-B2M4",
    customer: "Dina Safitri",
    court: "Badminton 2",
    time: "08:00 - 10:00",
    total: "Rp140.000",
    status: "confirmed",
  },
  {
    code: "CV-2026-Q9P1",
    customer: "Komunitas Hoop",
    court: "Basket Indoor",
    time: "16:00 - 17:00",
    total: "Rp220.000",
    status: "pending_payment",
  },
] as const;

export const faqs = [
  {
    question: "Apakah customer perlu login untuk booking?",
    answer:
      "Tidak. Customer cukup membuka halaman venue, memilih slot, mengisi nama dan nomor WhatsApp, lalu mengikuti instruksi pembayaran.",
  },
  {
    question: "Apakah Courva memakai payment gateway?",
    answer:
      "Untuk MVP, pembayaran dibuat manual melalui transfer bank, QRIS, atau bayar di tempat. Admin tetap bisa memverifikasi bukti pembayaran dari dashboard.",
  },
  {
    question: "Apakah bisa untuk lebih dari satu venue?",
    answer:
      "Bisa. Konsep Courva mendukung tenant yang memiliki banyak venue dan banyak lapangan di setiap venue.",
  },
  {
    question: "Apakah WhatsApp masih digunakan?",
    answer:
      "Ya. Courva merapikan booking dan pembayaran, sementara WhatsApp tetap tersedia untuk komunikasi cepat admin dan customer.",
  },
];
