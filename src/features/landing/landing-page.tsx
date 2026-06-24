"use client";

import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
  Dumbbell,
  LayoutDashboard,
  Menu,
  MessageCircle,
  ShieldCheck,
  WalletCards,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { DashboardPreviewCard } from "@/features/landing/dashboard-preview-card";
import {
  faqs,
  features,
  navItems,
  problems,
  solutions,
  sports,
  steps,
} from "@/features/landing/landing-content";

const iconMap = {
  CalendarCheck,
  ShieldCheck,
  WalletCards,
  LayoutDashboard,
  Dumbbell,
  MessageCircle,
};

export function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="min-h-screen overflow-hidden bg-background text-text-primary">
      <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 px-5 backdrop-blur-xl sm:px-6 lg:px-8">
        <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-3" aria-label="Courva home">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-background shadow-[0_0_24px_rgba(57,255,136,0.28)]">
              <Zap className="h-5 w-5 fill-background" />
            </span>
            <span className="text-xl font-extrabold tracking-normal">Courva</span>
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-text-secondary transition hover:text-primary"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <ButtonLink href="/dashboard" variant="ghost" size="sm">
              Dashboard
            </ButtonLink>
            <ButtonLink href="/register" size="sm">
              Mulai Sekarang
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>

          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-text-primary lg:hidden"
            aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
            onClick={() => setIsMenuOpen((value) => !value)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {isMenuOpen && (
          <div className="mx-auto max-w-7xl border-t border-border py-4 lg:hidden">
            <div className="grid gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-3 py-3 text-sm font-semibold text-text-secondary hover:bg-surface hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                <ButtonLink href="/dashboard" variant="secondary">
                  Dashboard
                </ButtonLink>
                <ButtonLink href="/register">
                  Mulai Sekarang
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            </div>
          </div>
        )}
      </header>

      <section className="relative px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="absolute left-1/2 top-16 -z-0 h-80 w-[48rem] -translate-x-1/2 rounded-full bg-primary/12 blur-3xl" />
        <div className="absolute left-1/2 top-36 -z-0 h-56 w-[34rem] -translate-x-1/2 rounded-full bg-info/10 blur-3xl" />
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
            <Badge className="mb-6">Platform booking lapangan olahraga untuk Indonesia</Badge>
            <h1 className="text-5xl font-extrabold leading-tight tracking-normal text-text-primary sm:text-6xl lg:text-7xl">
              Temukan jadwal terbaik, booking lapangan lebih cepat.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-text-secondary sm:text-xl">
              Courva mempertemukan customer dengan venue olahraga melalui halaman booking yang
              jelas, cepat, dan mobile-friendly. Cek lapangan, pilih slot, konfirmasi jadwal, lalu
              ikuti instruksi pembayaran dalam satu alur.
            </p>

            <div className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
              <ButtonLink href="/register" size="lg">
                Mulai Kelola Venue
                <ArrowRight className="h-5 w-5" />
              </ButtonLink>
              <ButtonLink href="#fitur" variant="secondary" size="lg">
                Pelajari Courva
              </ButtonLink>
            </div>

            <div className="mt-9 grid w-full max-w-3xl gap-3 sm:grid-cols-3">
              {["Cek slot online", "Booking tanpa login", "Pembayaran manual jelas"].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-surface/70 px-4 py-3 text-sm text-text-secondary"
                >
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section
        eyebrow="Masalah booking manual"
        title="WhatsApp bagus untuk ngobrol, bukan untuk jadi sistem booking."
        description="Courva dibuat untuk venue yang ingin tetap praktis, tetapi tidak lagi bergantung pada catatan manual yang rawan bentrok."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {problems.map((problem) => (
            <Card key={problem} className="flex items-start gap-4 transition hover:border-danger/50">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-danger" />
              <p className="text-text-secondary">{problem}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        title="Satu alur rapi dari cek venue sampai booking selesai."
        description="Landing ini memperkenalkan Courva sebagai tempat customer memahami cara booking lapangan dan pemilik venue melihat manfaat pengelolaan jadwal online."
        className="pt-0"
      >
        <div className="grid gap-4 md:grid-cols-2">
          {solutions.map((solution) => (
            <Card key={solution} className="flex items-start gap-4 transition hover:border-primary/50">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p className="text-text-secondary">{solution}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        id="fitur"
        eyebrow="Fitur utama"
        title="Semua yang dibutuhkan untuk mulai menerima booking online."
        description="Fase MVP Courva fokus pada flow yang paling penting: jadwal, booking, pembayaran manual, dan operasional tenant."
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];

            return (
              <Card
                key={feature.title}
                className="group transition duration-200 hover:-translate-y-1 hover:border-primary/60"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-background">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-text-primary">{feature.title}</h3>
                <p className="mt-3 leading-7 text-text-secondary">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section
        id="cara-kerja"
        eyebrow="Cara kerja"
        title="Dibuat agar admin dan customer sama-sama tidak ribet."
        description="Alurnya pendek, jelas, dan cocok untuk kebiasaan booking venue olahraga di Indonesia."
        className="bg-surface/35"
      >
        <div className="grid gap-5 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Card key={step.title} className="relative overflow-hidden">
              <span className="absolute right-4 top-4 text-5xl font-extrabold text-primary/10">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="relative">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
                  {index + 1}
                </div>
                <h3 className="text-lg font-bold text-text-primary">{step.title}</h3>
                <p className="mt-3 leading-7 text-text-secondary">{step.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        id="dashboard-preview"
        eyebrow="Manfaat untuk venue"
        title="Website publik untuk customer, operasional rapi untuk pemilik venue."
        description="Customer melihat informasi venue dan slot dengan jelas. Setelah booking masuk, pemilik venue punya data yang lebih tertata untuk ditindaklanjuti."
      >
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-4">
            {[
              ["Booking Hari Ini", "42", "Naik 18% dari pekan lalu"],
              ["Menunggu Verifikasi", "7", "Perlu dicek admin"],
              ["Lapangan Aktif", "18", "Di 4 venue aktif"],
            ].map(([label, value, note]) => (
              <Card key={label} className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-text-secondary">{label}</p>
                  <p className="mt-1 text-3xl font-extrabold text-text-primary">{value}</p>
                </div>
                <Badge tone={label === "Menunggu Verifikasi" ? "info" : "primary"}>{note}</Badge>
              </Card>
            ))}
          </div>
          <DashboardPreviewCard />
        </div>
      </Section>

      <Section
        id="use-case"
        eyebrow="Use case olahraga"
        title="Cocok untuk venue multi-olahraga."
        description="Courva dirancang fleksibel untuk berbagai jenis lapangan dan komunitas olahraga."
        className="pt-0"
      >
        <div className="flex flex-wrap gap-3">
          {sports.map((sport) => (
            <Badge key={sport} tone="muted" className="px-4 py-2 text-sm">
              <Dumbbell className="h-4 w-4 text-primary" />
              {sport}
            </Badge>
          ))}
        </div>
      </Section>

      <Section className="py-12">
        <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-primary p-8 text-background shadow-[0_0_60px_rgba(57,255,136,0.22)] lg:p-12">
          <div className="absolute right-8 top-8 h-32 w-32 rounded-full bg-background/10 blur-2xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-normal">Mulai dari landing dulu</p>
              <h2 className="mt-3 max-w-3xl text-3xl font-extrabold tracking-normal sm:text-4xl">
                Tampilkan Courva sebagai produk booking lapangan yang siap berkembang.
              </h2>
              <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-background/75">
                Setelah landing selesai, flow berikutnya bisa masuk ke public venue page, booking
                tanpa login, dan dashboard admin tenant.
              </p>
            </div>
            <ButtonLink
              href="/register"
              variant="secondary"
              size="lg"
              className="border-background/15 bg-background text-text-primary hover:bg-surface"
            >
              Mulai Sekarang
              <ArrowRight className="h-5 w-5" />
            </ButtonLink>
          </div>
        </div>
      </Section>

      <Section
        id="faq"
        eyebrow="FAQ"
        title="Pertanyaan yang sering muncul dari pemilik venue."
        description="Jawaban singkat untuk fase MVP Courva."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {faqs.map((faq) => (
            <Card key={faq.question}>
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-bold text-text-primary">{faq.question}</h3>
                <ChevronDown className="mt-1 h-5 w-5 shrink-0 text-primary" />
              </div>
              <p className="mt-4 leading-7 text-text-secondary">{faq.answer}</p>
            </Card>
          ))}
        </div>
      </Section>

      <footer className="border-t border-border px-5 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-text-secondary md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3 text-text-primary">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-background">
              <Zap className="h-4 w-4 fill-background" />
            </span>
            <span className="font-extrabold">Courva</span>
          </div>
          <p>Platform booking lapangan olahraga untuk venue Indonesia.</p>
          <div className="flex gap-4">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-primary">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
