"use client";

import { useState } from "react";
import { KamJobLogo } from "@/components/logo";
import { useLanguage } from "@/lib/i18n";
import type { Lang } from "@/lib/translations";
import {
  ArrowRight,
  Zap,
  Shield,
  Sparkles,
  Target,
  Bell,
  ImageIcon,
  Check,
  X,
  BadgeCheck,
  Briefcase,
  MousePointerClick,
  ChevronDown,
  Quote,
  User,
} from "lucide-react";

// The landing site is standalone: every CTA routes to the actual candidate app.
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.kamjob.com";
const SIGNUP_URL = `${APP_URL}/signup`;
const LOGIN_URL = `${APP_URL}/login`;
// Employer portal — set NEXT_PUBLIC_EMPLOYER_URL once that app is deployed;
// meanwhile the card points to the FAQ entry explaining employer access.
const EMPLOYER_URL = process.env.NEXT_PUBLIC_EMPLOYER_URL || "#faq";

// Brand palette (same as the app screens).
const GREEN = "#34A853";
const GREEN_PALE = "#E6F4EA";
const RED = "#EA4335";
const RED_PALE = "#FCE8E6";
const YELLOW = "#FBBC05";
const YELLOW_PALE = "#FEF7E0";

const FEATURE_ICONS = [
  MousePointerClick,
  ImageIcon,
  Zap,
  Sparkles,
  Target,
  Bell,
];
const FEATURE_COLORS = [
  { bg: GREEN_PALE, color: GREEN },
  { bg: YELLOW_PALE, color: "#B8860B" },
  { bg: RED_PALE, color: RED },
  { bg: GREEN_PALE, color: GREEN },
  { bg: YELLOW_PALE, color: "#B8860B" },
  { bg: RED_PALE, color: RED },
];

// ── Small building blocks ─────────────────────────────────────────────────────

function Chip({
  label,
  bg,
  color,
}: {
  label: string;
  bg: string;
  color: string;
}) {
  return (
    <span
      className="px-2 py-0.5 text-[10px] font-medium rounded-full"
      style={{ backgroundColor: bg, color }}
    >
      {label}
    </span>
  );
}

function LangSwitcher() {
  const { lang, setLang } = useLanguage();
  const btn = (l: Lang, label: string) => (
    <button
      onClick={() => setLang(l)}
      className="px-2.5 py-1 text-xs font-bold rounded-full transition-colors"
      style={
        lang === l
          ? { backgroundColor: GREEN, color: "white" }
          : { color: "var(--muted-foreground)" }
      }
      aria-pressed={lang === l}
    >
      {label}
    </button>
  );
  return (
    <div className="flex items-center gap-0.5 rounded-full border border-border p-0.5">
      {btn("fr", "FR")}
      {btn("en", "EN")}
    </div>
  );
}

// A miniature of the real swipe card, drawn in pure CSS for the hero mockup.
function PhoneMockup() {
  const { t } = useLanguage();
  return (
    <div className="relative mx-auto w-[280px] rounded-[2.5rem] border-8 border-foreground/90 bg-background shadow-2xl overflow-hidden">
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-5 bg-foreground/90 rounded-full z-20" />
      <div className="pt-10 pb-6 px-4">
        <div className="relative bg-card rounded-2xl shadow-xl overflow-hidden border border-border">
          <div
            className="h-1"
            style={{
              background: `linear-gradient(135deg, ${GREEN} 0%, ${YELLOW} 50%, ${RED} 100%)`,
            }}
          />

          <div
            className="absolute top-6 right-3 px-2.5 py-1 rounded-lg rotate-12 z-10"
            style={{ backgroundColor: GREEN }}
          >
            <span className="text-white font-bold text-xs tracking-wide">
              {t.mockup.stamp}
            </span>
          </div>

          <div className="p-3">
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px]"
                style={{ backgroundColor: GREEN_PALE, color: GREEN }}
              >
                ST
              </div>
              <span className="font-semibold text-foreground text-sm">
                ST Digital
              </span>
              <BadgeCheck
                className="w-4 h-4"
                style={{ color: GREEN, fill: GREEN_PALE }}
              />
            </div>
            <p className="text-sm font-bold text-foreground mb-2">
              Head of Business Desk
            </p>
            <div className="flex gap-1 mb-2">
              <Chip label="CDI" bg={GREEN_PALE} color={GREEN} />
              <Chip label="Douala" bg={YELLOW_PALE} color="#B8860B" />
              <Chip label="Bac+5" bg={RED_PALE} color={RED} />
            </div>
            <div
              className="rounded-lg h-28 mb-2 flex flex-col items-center justify-center text-white"
              style={{
                background: "linear-gradient(160deg, #1a3e72 0%, #10294e 100%)",
              }}
            >
              <p className="text-[10px] tracking-[0.2em] opacity-80">
                {t.mockup.hiringTop}
              </p>
              <p className="font-extrabold text-lg leading-tight">
                {t.mockup.hiringMain}
              </p>
              <p className="text-[9px] mt-1 opacity-70">{t.mockup.hiringSub}</p>
            </div>
            <div className="space-y-1.5">
              <div className="h-1.5 rounded bg-secondary w-full" />
              <div className="h-1.5 rounded bg-secondary w-4/5" />
              <div className="h-1.5 rounded bg-secondary w-3/5" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 mt-4">
          <span
            className="w-11 h-11 rounded-full bg-card border border-border shadow-md flex items-center justify-center"
            style={{ color: RED }}
          >
            <X className="w-5 h-5" strokeWidth={3} />
          </span>
          <span
            className="w-11 h-11 rounded-full shadow-md flex items-center justify-center text-white"
            style={{ backgroundColor: GREEN }}
          >
            <Check className="w-5 h-5" strokeWidth={3} />
          </span>
        </div>
      </div>
    </div>
  );
}

function FaqItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
        aria-expanded={open}
      >
        <span className="font-semibold text-foreground">{q}</span>
        <ChevronDown
          className="w-5 h-5 shrink-0 transition-transform text-muted-foreground"
          style={{
            transform: open ? "rotate(180deg)" : undefined,
            color: open ? GREEN : undefined,
          }}
        />
      </button>
      {open && (
        <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
          {a}
        </p>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background overflow-x-clip">
      {/* Sticky header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between gap-4">
          <KamJobLogo size="small" />
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a
              href="#features"
              className="hover:text-foreground transition-colors"
            >
              {t.nav.features}
            </a>
            <a
              href="#pricing"
              className="hover:text-foreground transition-colors"
            >
              {t.nav.pricing}
            </a>
            <a href="#faq" className="hover:text-foreground transition-colors">
              {t.nav.faq}
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium border border-border text-muted-foreground">
              🇨🇲 {t.nav.country}
            </span>
            <LangSwitcher />
            <a
              href={LOGIN_URL}
              className="hidden sm:block px-4 py-2 text-sm font-medium text-foreground rounded-full hover:bg-secondary transition-colors"
            >
              {t.nav.login}
            </a>
            <a
              href={SIGNUP_URL}
              className="px-4 py-2 text-sm font-semibold text-white rounded-full"
              style={{ backgroundColor: GREEN }}
            >
              {t.nav.signup}
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative max-w-6xl mx-auto px-5 pt-12 pb-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* decorative glows */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-10 -right-16 w-72 h-72 rounded-full blur-3xl"
          style={{ backgroundColor: "rgba(52,168,83,0.12)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 -left-20 w-64 h-64 rounded-full blur-3xl"
          style={{ backgroundColor: "rgba(251,188,5,0.10)" }}
        />
        <div className="text-center lg:text-left">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold mb-5"
            style={{ backgroundColor: GREEN_PALE, color: GREEN }}
          >
            {/* <Sparkles className="w-3.5 h-3.5" /> */}
            {t.hero.badge}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground leading-tight text-balance mb-5">
            {t.hero.title}{" "}
            <span style={{ color: GREEN }}>{t.hero.titleAccent}</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8 text-pretty">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <a
              href={SIGNUP_URL}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white shadow-lg"
              style={{ backgroundColor: GREEN }}
            >
              {t.hero.ctaPrimary} <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href={LOGIN_URL}
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full font-semibold border border-border text-foreground bg-card"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>
          <p className="text-xs text-muted-foreground mt-4">{t.hero.note}</p>
        </div>
        <PhoneMockup />
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-5 pb-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {t.hero.stats.map((s) => (
            <div
              key={s.label}
              className="bg-card border border-border rounded-2xl p-4 text-center"
            >
              <p className="text-2xl font-extrabold" style={{ color: GREEN }}>
                {s.value}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Offers ticker */}
      <section className="border-y border-border bg-card/50 overflow-hidden">
        <div className="py-6">
          <p className="text-sm font-medium text-muted-foreground text-center mb-4 px-5">
            {t.ticker.label}
          </p>
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className="flex shrink-0"
                aria-hidden={copy === 1}
              >
                {t.ticker.items.map((item) => (
                  <span
                    key={`${copy}-${item}`}
                    className="flex items-center gap-2 mx-6 text-sm font-medium text-foreground whitespace-nowrap"
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: GREEN }}
                    />
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-5 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-10">
          {t.how.title}
        </h2>
        <div className="flex flex-col sm:flex-row gap-8">
          {t.how.steps.map((s, i) => (
            <div key={s.title} className="flex-1 text-center px-4">
              <div
                className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: GREEN }}
              >
                {i + 1}
              </div>
              <h3 className="font-semibold text-foreground mb-1">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Candidate / Employer spaces */}
      <section className="max-w-6xl mx-auto px-5 pb-16 grid md:grid-cols-2 gap-5">
        <div className="bg-card border border-border rounded-3xl p-7 shadow-sm flex flex-col">
          <p
            className="text-xs font-bold tracking-wider mb-3"
            style={{ color: GREEN }}
          >
            {t.spaces.candidateLabel}
          </p>
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
            style={{ backgroundColor: GREEN_PALE, color: GREEN }}
          >
            <User className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {t.spaces.candidateTitle}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-5">
            {t.spaces.candidateText}
          </p>
          <ul className="space-y-2.5 mb-7 flex-1">
            {t.spaces.candidateChecks.map((c) => (
              <li key={c} className="flex gap-2 text-sm text-muted-foreground">
                <Check
                  className="w-4 h-4 shrink-0 mt-0.5"
                  style={{ color: GREEN }}
                />
                {c}
              </li>
            ))}
          </ul>
          <a
            href={SIGNUP_URL}
            className="inline-flex items-center justify-center gap-2 py-3 rounded-full font-semibold text-white"
            style={{ backgroundColor: GREEN }}
          >
            {t.spaces.candidateCta} <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="bg-card border border-border rounded-3xl p-7 shadow-sm flex flex-col">
          <p
            className="text-xs font-bold tracking-wider mb-3"
            style={{ color: "#B8860B" }}
          >
            {t.spaces.employerLabel}
          </p>
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
            style={{ backgroundColor: YELLOW_PALE, color: "#B8860B" }}
          >
            <Briefcase className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {t.spaces.employerTitle}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-5">
            {t.spaces.employerText}
          </p>
          <ul className="space-y-2.5 mb-7 flex-1">
            {t.spaces.employerChecks.map((c) => (
              <li key={c} className="flex gap-2 text-sm text-muted-foreground">
                <Check
                  className="w-4 h-4 shrink-0 mt-0.5"
                  style={{ color: GREEN }}
                />
                {c}
              </li>
            ))}
          </ul>
          <a
            href={EMPLOYER_URL}
            className="inline-flex items-center justify-center gap-2 py-3 rounded-full font-semibold border-2"
            style={{ borderColor: GREEN, color: GREEN }}
          >
            {t.spaces.employerCta} <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="border-y border-border bg-card/50 scroll-mt-16"
      >
        <div className="max-w-6xl mx-auto px-5 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-3">
            {t.features.title}
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
            {t.features.subtitle}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.features.items.map((f, i) => {
              const Icon = FEATURE_ICONS[i];
              const c = FEATURE_COLORS[i];
              return (
                <div
                  key={f.title}
                  className="bg-card rounded-2xl p-5 border border-border shadow-sm"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                    style={{ backgroundColor: c.bg, color: c.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {f.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {f.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="max-w-6xl mx-auto px-5 py-16 scroll-mt-16"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-3">
          {t.pricing.title}
        </h2>
        <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
          {t.pricing.subtitle}
        </p>
        <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {t.pricing.plans.map((p, i) => {
            const highlight = i === 2;
            return (
              <div
                key={p.name}
                className={`bg-card rounded-2xl p-6 border shadow-sm flex flex-col ${highlight ? "" : "border-border"}`}
                style={
                  highlight
                    ? { borderColor: YELLOW, borderWidth: 2 }
                    : undefined
                }
              >
                {highlight && (
                  <span
                    className="self-start text-[10px] font-bold px-2 py-1 rounded-full mb-2 text-white"
                    style={{ backgroundColor: YELLOW }}
                  >
                    {t.pricing.highlight}
                  </span>
                )}
                <h3 className="font-bold text-foreground">{p.name}</h3>
                <p className="mt-2 mb-4">
                  <span className="text-3xl font-extrabold text-foreground">
                    {p.price}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {" "}
                    {t.pricing.perPeriod} · {p.period}
                  </span>
                </p>
                <ul className="space-y-2 mb-6 flex-1">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className="flex gap-2 text-sm text-muted-foreground"
                    >
                      <Check
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: GREEN }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={SIGNUP_URL}
                  className="text-center py-2.5 rounded-full font-semibold text-sm"
                  style={
                    highlight
                      ? { backgroundColor: GREEN, color: "white" }
                      : { backgroundColor: GREEN_PALE, color: GREEN }
                  }
                >
                  {t.pricing.cta}
                </a>
              </div>
            );
          })}
        </div>
        <p className="text-center text-xs text-muted-foreground mt-6">
          {t.pricing.freeNote}
        </p>
      </section>

      {/* Testimonials */}
      <section className="border-y border-border bg-card/50">
        <div className="max-w-6xl mx-auto px-5 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-10">
            {t.testimonials.title}
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {t.testimonials.items.map((tm) => (
              <figure
                key={tm.name}
                className="bg-card rounded-2xl p-6 border border-border shadow-sm"
              >
                <Quote
                  className="w-6 h-6 mb-3"
                  style={{ color: GREEN, fill: GREEN_PALE }}
                />
                <blockquote className="text-sm text-foreground leading-relaxed mb-4">
                  « {tm.quote} »
                </blockquote>
                <figcaption>
                  <p className="text-sm font-semibold text-foreground">
                    {tm.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{tm.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-3xl mx-auto px-5 py-16 scroll-mt-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-3">
          {t.faq.title}
        </h2>
        <p className="text-muted-foreground text-center mb-10">
          {t.faq.subtitle}
        </p>
        <div className="space-y-3">
          {t.faq.items.map((item, i) => (
            <FaqItem
              key={item.q}
              q={item.q}
              a={item.a}
              open={openFaq === i}
              onToggle={() => setOpenFaq(openFaq === i ? null : i)}
            />
          ))}
        </div>
      </section>

      {/* Employers */}
      <section className="max-w-6xl mx-auto px-5 pb-16">
        <div
          className="rounded-3xl p-8 sm:p-12 text-white flex flex-col sm:flex-row items-center gap-8"
          style={{ background: `linear-gradient(135deg, ${GREEN}, #1E8E3E)` }}
        >
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              {t.employers.title}
            </h2>
            <p className="text-white/90 leading-relaxed">{t.employers.text}</p>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
            <Briefcase className="w-8 h-8" />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-6xl mx-auto px-5 pb-16 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
          {t.finalCta.title}
        </h2>
        <a
          href={SIGNUP_URL}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white shadow-lg"
          style={{ backgroundColor: GREEN }}
        >
          {t.finalCta.button} <ArrowRight className="w-5 h-5" />
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-5 py-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-8">
            <div className="text-center sm:text-left">
              <KamJobLogo size="small" />
              <p className="text-sm text-muted-foreground mt-1">
                {t.footer.tagline}
              </p>
            </div>
            <nav className="text-center sm:text-left">
              <p className="text-sm font-semibold text-foreground mb-2">
                {t.footer.product}
              </p>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#features"
                    className="hover:text-foreground transition-colors"
                  >
                    {t.nav.features}
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="hover:text-foreground transition-colors"
                  >
                    {t.nav.pricing}
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="hover:text-foreground transition-colors"
                  >
                    {t.nav.faq}
                  </a>
                </li>
                <li>
                  <a
                    href={SIGNUP_URL}
                    className="hover:text-foreground transition-colors"
                  >
                    {t.nav.signup}
                  </a>
                </li>
              </ul>
            </nav>
            <p className="max-w-xs text-sm text-muted-foreground flex items-start gap-1.5 text-center sm:text-left">
              <Shield className="w-4 h-4 shrink-0 mt-0.5" />{" "}
              {t.footer.disclaimer}
            </p>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-8">
            {t.footer.copyright}
          </p>
        </div>
      </footer>
    </div>
  );
}
