import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Courva - Booking Lapangan Tanpa Chat Bolak-balik",
  description:
    "Courva membantu pemilik venue olahraga mengelola jadwal, booking, dan pembayaran manual dalam satu dashboard modern.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased">{children}</body>
    </html>
  );
}
