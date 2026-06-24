# desain.md — Courva UI/UX Guideline

## 1. Design Direction

Courva menggunakan gaya desain **modern sporty** dengan karakter visual yang energik, clean, dan profesional. Aplikasi harus terlihat seperti produk SaaS modern untuk booking lapangan olahraga, tetapi tetap mudah digunakan oleh pengguna Indonesia.

Nuansa utama:

- Modern
- Sporty
- Energetic
- Clean
- Mobile-friendly
- Premium tetapi tidak kaku
- Cocok untuk showcase portofolio full-stack

Arah visual utama Courva adalah **dark sporty SaaS** dengan aksen **hijau neon**.

---

## 2. Brand Personality

Courva harus terasa:

- Cepat
- Aktif
- Praktis
- Terpercaya
- Muda
- Rapi
- Profesional
- Tidak terlalu formal

Contoh tone copywriting:

- "Booking lapangan tanpa chat admin bolak-balik."
- "Pilih venue, cek slot, langsung booking."
- "Kelola jadwal lapangan dalam satu dashboard."
- "Biar admin fokus operasional, bukan balas chat terus."

---

## 3. Color Palette

## 3.1 Primary Palette

| Token | Warna | Hex | Penggunaan |
|---|---|---|---|
| Primary Neon | Neon Green | `#39FF88` | CTA, highlight, active state |
| Primary Dark | Deep Black | `#070A0F` | Background utama |
| Surface Dark | Charcoal | `#101820` | Card, navbar, sidebar |
| Surface Soft | Dark Slate | `#17212B` | Panel, table, input |
| Border Subtle | Slate Border | `#27313D` | Border card/input |
| Text Primary | Soft White | `#F8FAFC` | Teks utama |
| Text Secondary | Cool Gray | `#A7B0BC` | Deskripsi |
| Muted Text | Muted Gray | `#6B7280` | Metadata, placeholder |

## 3.2 Accent Palette

| Token | Warna | Hex | Penggunaan |
|---|---|---|---|
| Lime Glow | Lime | `#B6FF4D` | Gradient dan badge |
| Sport Blue | Electric Blue | `#4DA3FF` | Info state |
| Warning | Amber | `#FACC15` | Pending payment |
| Danger | Red | `#FF4D6D` | Cancelled/rejected |
| Success | Green | `#22C55E` | Confirmed/completed |

## 3.3 Background Gradient

Gunakan gradient gelap dengan glow hijau neon.

Contoh:

```css
background:
  radial-gradient(circle at top right, rgba(57, 255, 136, 0.18), transparent 28%),
  radial-gradient(circle at bottom left, rgba(77, 163, 255, 0.12), transparent 24%),
  #070A0F;
```

## 3.4 Status Colors

| Status | Warna | Hex |
|---|---|---|
| Pending Payment | Amber | `#FACC15` |
| Waiting Verification | Blue | `#4DA3FF` |
| Confirmed | Green | `#22C55E` |
| Completed | Neutral Green | `#16A34A` |
| Cancelled | Red | `#FF4D6D` |
| Expired | Gray | `#6B7280` |

---

## 4. Typography

## 4.1 Font Recommendation

Gunakan font sans-serif modern.

Rekomendasi:

- **Inter**
- **Geist**
- **Plus Jakarta Sans**

Untuk aplikasi Indonesia dengan nuansa modern, rekomendasi utama:

```txt
Plus Jakarta Sans
```

## 4.2 Type Scale

| Elemen | Ukuran | Weight |
|---|---|---|
| Hero Title | 48–64px | 700/800 |
| Page Title | 32–40px | 700 |
| Section Title | 28–36px | 700 |
| Card Title | 18–22px | 600/700 |
| Body | 14–16px | 400/500 |
| Caption | 12–13px | 400/500 |
| Button | 14–16px | 600 |

## 4.3 Text Style

- Gunakan heading pendek dan kuat.
- Hindari paragraf terlalu panjang.
- Gunakan copy yang langsung menjelaskan manfaat.
- Gunakan angka/statistik dummy pada dashboard agar terlihat hidup.

---

## 5. Layout Principle

## 5.1 Global Layout

- Gunakan max-width `1200px` atau `1280px` untuk landing page.
- Gunakan spacing besar pada landing page agar terlihat premium.
- Dashboard menggunakan layout sidebar + topbar.
- Public venue page menggunakan mobile-first layout.
- Card menggunakan rounded besar dan border tipis.

## 5.2 Border Radius

| Komponen | Radius |
|---|---|
| Button | `rounded-xl` |
| Card | `rounded-2xl` |
| Input | `rounded-xl` |
| Modal/Dialog | `rounded-2xl` |
| Image Card | `rounded-3xl` |

## 5.3 Shadow & Glow

Gunakan glow hijau neon secara selektif.

Contoh penggunaan:

- CTA utama
- Active menu
- Highlight card
- Selected slot

Jangan berlebihan agar UI tetap profesional.

---

## 6. Component Guideline

## 6.1 Button

### Primary Button

Untuk aksi utama.

Style:

- Background hijau neon
- Text hitam
- Rounded-xl
- Font-semibold
- Hover lebih terang
- Shadow/glow halus

Contoh label:

- Mulai Sekarang
- Booking Lapangan
- Tambah Venue
- Konfirmasi Booking

### Secondary Button

Untuk aksi pendukung.

Style:

- Background dark surface
- Border slate
- Text soft white
- Hover border neon

Contoh label:

- Lihat Demo
- Hubungi Admin
- Detail Booking

### Danger Button

Untuk pembatalan.

Style:

- Background dark red atau outline red
- Text red/white
- Hover red lebih kuat

---

## 6.2 Card

Card digunakan untuk:

- Feature card
- Venue card
- Court card
- Summary card
- Dashboard statistic
- Booking detail

Style card:

- Background `#101820`
- Border `#27313D`
- Rounded-2xl
- Padding 20–24px
- Shadow soft
- Hover border neon untuk card interaktif

---

## 6.3 Input & Form

Input digunakan untuk form booking, login, venue, lapangan, dan pembayaran.

Style:

- Background `#17212B`
- Border `#27313D`
- Text soft white
- Placeholder muted gray
- Focus border neon green
- Focus ring hijau neon transparan

Field wajib:

- Label jelas
- Error message di bawah input
- Helper text jika perlu

---

## 6.4 Badge

Badge digunakan untuk status booking, jenis olahraga, status aktif/nonaktif, dan metode pembayaran.

Contoh badge:

- Futsal
- Badminton
- Pending Payment
- Confirmed
- QRIS
- Transfer Bank
- Active

Style:

- Rounded-full
- Padding horizontal 10–12px
- Font size 12px
- Warna sesuai konteks

---

## 6.5 Table

Table digunakan di dashboard admin.

Style:

- Header gelap sedikit lebih terang
- Row hover subtle
- Border horizontal tipis
- Status menggunakan badge
- Action menggunakan dropdown/menu button

Kolom booking:

- Kode booking
- Customer
- Venue
- Lapangan
- Tanggal
- Jam
- Total
- Status
- Aksi

---

## 6.6 Calendar & Slot Picker

Slot picker adalah komponen penting Courva.

### Date Picker

- Menampilkan tanggal dengan highlight neon untuk tanggal terpilih.
- Disable tanggal yang tidak valid.

### Slot Button

State slot:

- Available: border slate, hover neon.
- Selected: background neon, text black.
- Unavailable: disabled, opacity rendah.
- Pending: amber outline.
- Confirmed: disabled.

Contoh label slot:

```txt
08:00 - 09:00
09:00 - 10:00
10:00 - 11:00
```

---

## 7. Page Design

## 7.1 Landing Page

### Tujuan

Landing page utama ditujukan kepada pemilik venue olahraga.

### Struktur

1. Navbar
2. Hero section
3. Problem section
4. Solution section
5. Feature section
6. How it works
7. Dashboard preview
8. Use case olahraga
9. CTA section
10. FAQ
11. Footer

### Hero Section

Headline:

```txt
Booking lapangan tanpa chat admin bolak-balik.
```

Subheadline:

```txt
Courva membantu pemilik venue mengelola jadwal, booking, dan pembayaran manual dalam satu dashboard modern.
```

CTA:

- Mulai Kelola Venue
- Lihat Demo

Visual:

- Mockup dashboard
- Card booking floating
- Glow hijau neon
- Background sport grid abstract

### Problem Section

Masalah:

- Admin terlalu sering cek jadwal manual.
- Customer harus tanya slot lewat WhatsApp.
- Booking rawan bentrok.
- Bukti pembayaran tercecer di chat.

### Solution Section

Solusi:

- Jadwal online.
- Booking publik tanpa login.
- Verifikasi pembayaran manual.
- Dashboard tenant.
- Link WhatsApp tetap tersedia.

---

## 7.2 Public Venue Page

### Tujuan

Customer dapat melihat venue dan booking lapangan tanpa login.

### Struktur

1. Venue hero
2. Venue information
3. Sport filter
4. Court list
5. Date picker
6. Slot picker
7. Booking CTA
8. WhatsApp contact

### Mobile Layout

Urutan mobile:

1. Foto venue
2. Nama venue
3. Alamat dan jam buka
4. Filter olahraga
5. Daftar lapangan
6. Pilih tanggal
7. Pilih slot
8. Ringkasan harga
9. Tombol booking

---

## 7.3 Booking Form Page

### Tujuan

Customer mengisi data dan mengonfirmasi booking.

### Struktur

1. Booking summary card
2. Customer form
3. Notes field
4. Total price
5. Confirmation checkbox
6. Confirm booking button

### Field Form

- Nama customer
- Nomor WhatsApp
- Catatan opsional

### UI Notes

- Nomor WhatsApp gunakan placeholder Indonesia, contoh `08xxxxxxxxxx`.
- Total harga tampil sticky pada mobile.
- Setelah berhasil, arahkan ke halaman detail booking.

---

## 7.4 Booking Detail Page

### Tujuan

Customer melihat status booking dan instruksi pembayaran.

### Struktur

1. Status booking badge
2. Kode booking
3. Detail venue dan lapangan
4. Jadwal booking
5. Total pembayaran
6. Instruksi pembayaran
7. Upload bukti pembayaran
8. Tombol WhatsApp admin

### Status Section

Gunakan pesan yang mudah dipahami:

- Pending Payment: "Booking berhasil dibuat. Silakan lakukan pembayaran."
- Waiting Verification: "Bukti pembayaran sedang dicek admin."
- Confirmed: "Booking kamu sudah dikonfirmasi."
- Cancelled: "Booking ini dibatalkan."
- Expired: "Booking ini sudah kedaluwarsa."

---

## 7.5 Admin Dashboard

### Layout

- Sidebar kiri
- Topbar
- Content area
- Cards grid
- Table/list

### Sidebar Menu

- Dashboard
- Venue
- Lapangan
- Jadwal
- Booking
- Pembayaran
- Laporan
- Pengaturan

### Dashboard Cards

- Booking Hari Ini
- Menunggu Pembayaran
- Menunggu Verifikasi
- Booking Confirmed
- Estimasi Pendapatan
- Lapangan Aktif

### Visual Style

- Dark background
- Card dark surface
- Icon line style
- Accent hijau neon untuk data penting
- Chart sederhana untuk pendapatan/booking

---

## 7.6 Venue Management Page

### Komponen

- Header page
- Button tambah venue
- Venue card/list
- Search input
- Status filter
- Empty state

### Empty State

Text:

```txt
Belum ada venue.
Tambahkan venue pertama agar customer bisa mulai booking.
```

CTA:

```txt
Tambah Venue
```

---

## 7.7 Court Management Page

### Komponen

- Table/card list lapangan
- Filter venue
- Filter olahraga
- Status aktif/nonaktif
- Button tambah lapangan

### Court Card

Informasi:

- Foto lapangan
- Nama lapangan
- Jenis olahraga
- Harga per jam
- Status aktif
- Venue
- Action menu

---

## 7.8 Schedule Management Page

### Komponen

- Venue selector
- Court selector
- Day selector
- Time range input
- Slot duration input
- Blocked slot management
- Preview slot

### UX Notes

Admin harus mudah memahami kapan lapangan tersedia dan kapan ditutup.

---

## 7.9 Booking Management Page

### Komponen

- Search booking code/customer
- Filter tanggal
- Filter venue
- Filter lapangan
- Filter status
- Booking table
- Detail drawer/modal

### Detail Booking

Informasi:

- Customer
- WhatsApp
- Venue
- Lapangan
- Tanggal
- Jam
- Total
- Status
- Bukti pembayaran
- Tombol approve/reject
- Tombol WhatsApp customer

---

## 7.10 Payment Instruction Page

### Komponen

- List metode pembayaran
- Form tambah/edit metode
- Upload QRIS
- Toggle aktif/nonaktif

### Payment Method Card

Informasi:

- Bank/QRIS/Cash
- Nomor rekening
- Nama penerima
- Status aktif
- Action edit

---

## 8. Navigation

## 8.1 Public Navigation

Navbar landing page:

- Fitur
- Cara Kerja
- Use Case
- FAQ
- Login
- Mulai Sekarang

## 8.2 Admin Navigation

Sidebar dashboard:

- Dashboard
- Venue
- Lapangan
- Jadwal
- Booking
- Pembayaran
- Laporan
- Pengaturan

---

## 9. Icon Style

Gunakan icon line style agar modern.

Rekomendasi icon library:

- Lucide React

Contoh icon:

- Calendar
- Clock
- MapPin
- Dumbbell
- Wallet
- CreditCard
- QrCode
- Users
- Activity
- BarChart
- Settings
- MessageCircle
- CheckCircle
- XCircle

---

## 10. Motion & Interaction

Gunakan animasi ringan, bukan berlebihan.

Rekomendasi:

- Fade in pada section landing page.
- Hover lift pada card.
- Smooth transition pada button.
- Loading skeleton pada table.
- Toast notification setelah aksi berhasil.
- Drawer untuk detail booking.

Durasi animasi:

```txt
150ms - 250ms
```

---

## 11. Responsive Guideline

## 11.1 Mobile

Prioritas utama karena pengguna Indonesia banyak memakai HP.

Aturan:

- CTA harus mudah dijangkau.
- Form tidak terlalu panjang.
- Booking summary dapat dibuat sticky di bawah.
- Table dashboard diganti card list jika perlu.
- Sidebar admin menjadi drawer/hamburger.

## 11.2 Tablet

- Gunakan 2-column layout untuk card.
- Dashboard tetap nyaman dengan sidebar compact.

## 11.3 Desktop

- Gunakan full dashboard layout.
- Table lebih lengkap.
- Preview booking bisa side-by-side.

---

## 12. Empty State

Gunakan empty state yang jelas dan membantu.

Contoh:

### Belum ada booking

```txt
Belum ada booking masuk.
Booking customer akan muncul di sini setelah mereka memilih slot dari halaman publik venue.
```

### Belum ada lapangan

```txt
Belum ada lapangan.
Tambahkan lapangan pertama agar jadwal booking bisa digunakan.
```

### Belum ada metode pembayaran

```txt
Belum ada instruksi pembayaran.
Tambahkan rekening bank atau QRIS agar customer tahu cara membayar.
```

---

## 13. Error State

Error message harus jelas dan tidak teknis.

Contoh:

- "Slot ini sudah dibooking. Silakan pilih jam lain."
- "Nomor WhatsApp wajib diisi."
- "Bukti pembayaran gagal diunggah. Coba lagi."
- "Data venue tidak ditemukan."
- "Kamu tidak memiliki akses ke data ini."

---

## 14. Loading State

Gunakan loading state yang rapi:

- Skeleton card untuk venue/court.
- Skeleton table untuk dashboard.
- Spinner kecil pada button submit.
- Disable button saat proses submit.

Contoh button loading:

```txt
Memproses booking...
Mengunggah bukti...
Menyimpan perubahan...
```

---

## 15. Recommended Components from shadcn/ui

Komponen yang cocok digunakan:

- Button
- Card
- Badge
- Input
- Textarea
- Select
- Dialog
- Drawer
- Sheet
- Tabs
- Table
- Dropdown Menu
- Calendar
- Popover
- Toast/Sonner
- Avatar
- Separator
- Form
- Alert
- Skeleton

---

## 16. Design Tokens

Contoh token Tailwind:

```ts
const colors = {
  background: "#070A0F",
  surface: "#101820",
  surfaceSoft: "#17212B",
  border: "#27313D",
  primary: "#39FF88",
  primarySoft: "#B6FF4D",
  textPrimary: "#F8FAFC",
  textSecondary: "#A7B0BC",
  muted: "#6B7280",
  danger: "#FF4D6D",
  warning: "#FACC15",
  success: "#22C55E",
  info: "#4DA3FF",
}
```

---

## 17. UI Quality Checklist

Sebelum aplikasi dianggap selesai secara visual:

- Landing page memiliki hero yang kuat.
- CTA utama terlihat jelas.
- Public venue page nyaman di mobile.
- Booking flow tidak membingungkan.
- Dashboard admin terlihat seperti SaaS modern.
- Semua status booking memiliki warna berbeda.
- Form memiliki validasi dan error message.
- Empty state tidak kosong begitu saja.
- Komponen konsisten.
- Warna hijau neon tidak digunakan berlebihan.
- Kontras teks tetap nyaman dibaca.
- Semua halaman utama responsive.
