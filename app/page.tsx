"use client";

import { useEffect, useState } from "react";
import { KamJobLogo } from "@/components/logo";
import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/lib/i18n";
import type { Lang } from "@/lib/translations";
import {
  ArrowRight,
  Zap,
  Shield,
  ShieldCheck,
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
  Menu,
  Wallet,
  Smartphone,
  Send,
} from "lucide-react";

// The landing site is standalone: every CTA routes to the actual candidate app.
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.kamjob.com";
const SIGNUP_URL = `${APP_URL}/signup`;
const LOGIN_URL = `${APP_URL}/login`;
// Employer portal — set NEXT_PUBLIC_EMPLOYER_URL once that app is deployed;
// meanwhile the card points to the FAQ entry explaining employer access.
const EMPLOYER_URL = process.env.NEXT_PUBLIC_EMPLOYER_URL || "#faq";

const FEATURE_ICONS = [
  MousePointerClick,
  ImageIcon,
  Zap,
  Sparkles,
  Target,
  Bell,
];

// Tints rotate green → amber → red so the grid reads as one brand system
// rather than six unrelated cards. `*-text` variants are the AA-safe ones.
const FEATURE_TONES = [
  { bg: "var(--brand-pale)", fg: "var(--brand-text)" },
  { bg: "var(--amber-pale)", fg: "var(--amber-text)" },
  { bg: "var(--red-pale)", fg: "var(--red-text)" },
  { bg: "var(--brand-pale)", fg: "var(--brand-text)" },
  { bg: "var(--amber-pale)", fg: "var(--amber-text)" },
  { bg: "var(--red-pale)", fg: "var(--red-text)" },
];

const TRUST_ICONS = [Wallet, ShieldCheck, Smartphone];

const NAV_LINKS = [
  { href: "#how", key: "howItWorks" },
  { href: "#features", key: "features" },
  { href: "#pricing", key: "pricing" },
  { href: "#faq", key: "faq" },
] as const;

// ── Small building blocks ─────────────────────────────────────────────────────

function Chip({ label, tone }: { label: string; tone: 0 | 1 | 2 }) {
  const t = FEATURE_TONES[tone];
  return (
    <span
      className="px-2 py-0.5 text-[10px] font-semibold rounded-full"
      style={{ backgroundColor: t.bg, color: t.fg }}
    >
      {label}
    </span>
  );
}

/** Eyebrow + title + optional subtitle, centred. Used by every section so the
 *  page has one consistent rhythm instead of ad-hoc heading stacks. */
function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal className="text-center mb-12">
      <p
        className="text-xs font-bold tracking-[0.18em] mb-3"
        style={{ color: "var(--brand-text)" }}
      >
        {eyebrow}
      </p>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed text-pretty">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}

function LangSwitcher() {
  const { lang, setLang, t } = useLanguage();
  const btn = (l: Lang, label: string) => (
    <button
      onClick={() => setLang(l)}
      className="px-2.5 py-1 text-xs font-bold rounded-full btn-press"
      style={
        lang === l
          ? { backgroundColor: "var(--brand-solid)", color: "white" }
          : { color: "var(--muted-foreground)" }
      }
      aria-pressed={lang === l}
    >
      {label}
    </button>
  );
  return (
    <div
      className="flex items-center gap-0.5 rounded-full border border-border p-0.5"
      role="group"
      aria-label={t.nav.langLabel}
    >
      {btn("fr", "FR")}
      {btn("en", "EN")}
    </div>
  );
}

// A miniature of the real swipe card, drawn in pure CSS for the hero mockup.
function PhoneMockup() {
  const { t } = useLanguage();
  return (
    <div className="relative mx-auto w-[280px] animate-float">
      {/* Glow puddle so the phone sits on the page instead of floating flat. */}
      <div
        aria-hidden
        className="absolute -inset-8 -z-10 rounded-full blur-3xl"
        style={{ backgroundColor: "var(--brand-glow)" }}
      />

      <div
        className="relative rounded-[2.5rem] border-8 border-foreground/90 bg-background shadow-2xl overflow-hidden"
        role="img"
        aria-label={t.mockup.alt}
      >
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-5 bg-foreground/90 rounded-full z-20" />
        <div className="pt-10 pb-6 px-4">
          <div className="relative bg-card rounded-2xl shadow-xl overflow-hidden border border-border">
            <div
              className="h-1"
              style={{
                background:
                  "linear-gradient(135deg, var(--brand-solid) 0%, var(--amber-solid) 50%, var(--red-solid) 100%)",
              }}
            />

            <div
              className="absolute top-6 right-3 px-2.5 py-1 rounded-lg rotate-12 z-10"
              style={{ backgroundColor: "var(--brand-solid)" }}
            >
              <span className="text-white font-bold text-xs tracking-wide">
                {t.mockup.stamp}
              </span>
            </div>

            <div className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px]"
                  style={{
                    backgroundColor: "var(--brand-pale)",
                    color: "var(--brand-text)",
                  }}
                >
                  ST
                </div>
                <span className="font-semibold text-foreground text-sm">
                  ST Digital
                </span>
                <BadgeCheck
                  className="w-4 h-4"
                  style={{ color: "var(--brand-solid)" }}
                />
              </div>
              <p className="text-sm font-bold text-foreground mb-2">
                Head of Business Desk
              </p>
              <div className="flex gap-1 mb-2">
                <Chip label="CDI" tone={0} />
                <Chip label="Douala" tone={1} />
                <Chip label="Bac+5" tone={2} />
              </div>
              <div
                className="rounded-lg h-28 mb-2 flex flex-col items-center justify-center text-white"
                style={{
                  background:
                    "linear-gradient(160deg, #1a3e72 0%, #10294e 100%)",
                }}
              >
                <p className="text-[10px] tracking-[0.2em] opacity-80">
                  {t.mockup.hiringTop}
                </p>
                <p className="font-extrabold text-lg leading-tight">
                  {t.mockup.hiringMain}
                </p>
                <p className="text-[9px] mt-1 opacity-70">
                  {t.mockup.hiringSub}
                </p>
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
              style={{ color: "var(--red-solid)" }}
            >
              <X className="w-5 h-5" strokeWidth={3} />
            </span>
            <span
              className="w-11 h-11 rounded-full shadow-md flex items-center justify-center text-white"
              style={{ backgroundColor: "var(--brand-solid)" }}
            >
              <Check className="w-5 h-5" strokeWidth={3} />
            </span>
          </div>
        </div>
      </div>

      {/* Outcome card — shows what a swipe actually produces, which is the
          part the headline can only claim. */}
      <div
        aria-hidden
        className="absolute -right-6 sm:-right-12 bottom-24 w-[190px] rounded-2xl bg-card border border-border p-3 shadow-lift animate-pop-in"
        style={{ animationDelay: "700ms" }}
      >
        <div className="flex items-start gap-2.5">
          <span
            className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center"
            style={{
              backgroundColor: "var(--brand-pale)",
              color: "var(--brand-text)",
            }}
          >
            <Send className="w-4 h-4" />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-bold text-foreground leading-tight">
              {t.mockup.toast}
            </p>
            <p className="text-[10px] text-muted-foreground leading-snug mt-0.5">
              {t.mockup.toastSub}
            </p>
          </div>
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
  id,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
  id: string;
}) {
  return (
    <div
      className="bg-card border border-border rounded-2xl overflow-hidden transition-colors"
      style={open ? { borderColor: "var(--brand-solid)" } : undefined}
    >
      <h3>
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between gap-4 p-5 text-left font-semibold text-foreground hover:bg-secondary/50 transition-colors"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-button`}
        >
          {q}
          <ChevronDown
            className="w-5 h-5 shrink-0 transition-transform duration-300 text-muted-foreground"
            style={{
              transform: open ? "rotate(180deg)" : undefined,
              color: open ? "var(--brand-text)" : undefined,
            }}
            aria-hidden
          />
        </button>
      </h3>
      {/* 0fr → 1fr grid trick: animates height without measuring it. */}
      <div
        className="collapse-grid"
        data-open={open}
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-button`}
      >
        <div>
          <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

/** Bottom bar that appears once the hero CTA has scrolled away. Mobile is the
 *  dominant surface here, and a CTA off-screen is a CTA that does not convert. */
function StickyMobileCta() {
  const { t } = useLanguage();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-50 border-t border-border bg-background/95 backdrop-blur-md px-4 py-3 flex items-center justify-between gap-3 transition-transform duration-300"
      style={{
        transform: shown ? "none" : "translateY(110%)",
        paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))",
      }}
      aria-hidden={!shown}
    >
      <p className="text-sm font-semibold text-foreground">
        {t.stickyCta.label}
      </p>
      <a
        href={SIGNUP_URL}
        tabIndex={shown ? undefined : -1}
        className="btn-brand btn-press px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap"
      >
        {t.stickyCta.button}
      </a>
    </div>
  );
}

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [menuOpen, setMenuOpen] = useState(false);

  // Escape closes the mobile menu — expected of anything that overlays content.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <div className="min-h-screen bg-background overflow-x-clip">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-full focus:bg-card focus:border focus:border-border focus:shadow-lift focus:text-sm focus:font-semibold"
      >
        {t.nav.skipToContent}
      </a>

      {/* Sticky header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between gap-4">
          <a href="#main" aria-label="KamJob">
            <KamJobLogo size="small" />
          </a>

          <nav
            className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground"
            aria-label="Principal"
          >
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="hover:text-foreground transition-colors"
              >
                {t.nav[l.key]}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium border border-border text-muted-foreground">
              <span aria-hidden>🇨🇲</span> {t.nav.country}
            </span>
            <LangSwitcher />
            <a
              href={LOGIN_URL}
              className="hidden sm:block px-4 py-2 text-sm font-medium text-foreground rounded-full hover:bg-secondary btn-press"
            >
              {t.nav.login}
            </a>
            <a
              href={SIGNUP_URL}
              className="btn-brand btn-press px-4 py-2 text-sm font-semibold rounded-full"
            >
              {t.nav.signup}
            </a>
            <button
              className="md:hidden p-2 -mr-1 rounded-full hover:bg-secondary btn-press text-foreground"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
            >
              {menuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav — before this, section links were simply unreachable
            below the md breakpoint. */}
        <nav
          id="mobile-nav"
          className="md:hidden collapse-grid border-t border-border"
          data-open={menuOpen}
          aria-label="Principal (mobile)"
        >
          <div>
            <ul className="px-5 py-3 space-y-1">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-2.5 text-sm font-medium text-foreground"
                  >
                    {t.nav[l.key]}
                  </a>
                </li>
              ))}
              <li className="sm:hidden">
                <a
                  href={LOGIN_URL}
                  className="block py-2.5 text-sm font-medium text-muted-foreground"
                >
                  {t.nav.login}
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <main id="main">
        {/* Hero */}
        <section className="relative">
          <div
            aria-hidden
            className="dot-grid pointer-events-none absolute inset-0 -z-10"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-20 right-0 w-[28rem] h-[28rem] rounded-full blur-3xl -z-10"
            style={{ backgroundColor: "var(--brand-glow)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute top-40 -left-24 w-80 h-80 rounded-full blur-3xl -z-10"
            style={{ backgroundColor: "var(--amber-glow)" }}
          />

          <div className="max-w-6xl mx-auto px-5 pt-16 pb-12 grid lg:grid-cols-[1.05fr_1fr] gap-14 items-center">
            <Reveal className="text-center lg:text-left">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border"
                style={{
                  backgroundColor: "var(--brand-pale)",
                  color: "var(--brand-text)",
                  borderColor: "var(--brand-pale)",
                }}
              >
                <Sparkles className="w-3.5 h-3.5" aria-hidden />
                {t.hero.badge}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.05] tracking-tight text-balance mb-6">
                {t.hero.title}{" "}
                <span style={{ color: "var(--brand-solid)" }}>
                  {t.hero.titleAccent}
                </span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 text-pretty max-w-xl mx-auto lg:mx-0">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <a
                  href={SIGNUP_URL}
                  className="btn-brand btn-press inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-semibold group"
                >
                  {t.hero.ctaPrimary}
                  <ArrowRight
                    className="w-5 h-5 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </a>
                <a
                  href={LOGIN_URL}
                  className="btn-press inline-flex items-center justify-center px-7 py-4 rounded-full font-semibold border border-border text-foreground bg-card hover:border-foreground/30 hover:bg-secondary"
                >
                  {t.hero.ctaSecondary}
                </a>
              </div>

              {/* Reassurance line, split into ticked chips — the same promises
                  the copy already made, just harder to skim past. */}
              <ul className="flex flex-wrap gap-x-5 gap-y-2 justify-center lg:justify-start mt-7">
                {t.hero.note.split("·").map((claim) => (
                  <li
                    key={claim}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground"
                  >
                    <Check
                      className="w-3.5 h-3.5 shrink-0"
                      strokeWidth={3}
                      style={{ color: "var(--brand-solid)" }}
                      aria-hidden
                    />
                    {claim.trim()}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120}>
              <PhoneMockup />
            </Reveal>
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-6xl mx-auto px-5 pb-14">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {t.hero.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 70}>
                <div className="bg-card border border-border rounded-2xl p-5 text-center h-full card-lift">
                  <p
                    className="text-3xl font-extrabold tracking-tight"
                    style={{ color: "var(--brand-solid)" }}
                  >
                    {s.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-snug">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Offers ticker */}
        <section
          className="border-y border-border bg-card/50"
          aria-label={t.ticker.label}
        >
          <div className="py-7">
            <p className="text-sm font-medium text-muted-foreground text-center mb-5 px-5">
              {t.ticker.label}
            </p>
            <div className="marquee-viewport">
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
                        className="flex items-center gap-2 mx-4 px-4 py-2 rounded-full border border-border bg-card text-sm font-medium text-foreground whitespace-nowrap"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: "var(--brand-solid)" }}
                        />
                        {item}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="max-w-6xl mx-auto px-5 py-20 scroll-mt-20">
          <SectionHeading
            eyebrow={t.how.eyebrow}
            title={t.how.title}
            subtitle={t.how.subtitle}
          />
          <ol className="relative grid sm:grid-cols-3 gap-10 sm:gap-6">
            {/* Rail connecting the three numbered steps on wide screens. */}
            <div
              aria-hidden
              className="hidden sm:block absolute top-7 left-[16.6%] right-[16.6%] h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent, var(--border) 15%, var(--border) 85%, transparent)",
              }}
            />
            {t.how.steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 110}>
                <div className="text-center px-2">
                  <div
                    className="relative w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center text-white font-extrabold text-xl shadow-brand"
                    style={{ backgroundColor: "var(--brand-solid)" }}
                  >
                    {i + 1}
                  </div>
                  <h3 className="font-bold text-foreground mb-2 text-lg">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {s.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* Candidate / Employer spaces */}
        <section className="max-w-6xl mx-auto px-5 pb-20">
          <SectionHeading eyebrow={t.spaces.eyebrow} title={t.spaces.title} />
          <div className="grid md:grid-cols-2 gap-5">
            <Reveal>
              <div className="bg-card border border-border rounded-3xl p-8 shadow-card card-lift flex flex-col h-full">
                <p
                  className="text-xs font-bold tracking-[0.15em] mb-4"
                  style={{ color: "var(--brand-text)" }}
                >
                  {t.spaces.candidateLabel}
                </p>
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{
                    backgroundColor: "var(--brand-pale)",
                    color: "var(--brand-text)",
                  }}
                >
                  <User className="w-6 h-6" aria-hidden />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2 tracking-tight">
                  {t.spaces.candidateTitle}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {t.spaces.candidateText}
                </p>
                <ul className="space-y-3 mb-8 flex-1">
                  {t.spaces.candidateChecks.map((c) => (
                    <li
                      key={c}
                      className="flex gap-2.5 text-sm text-muted-foreground"
                    >
                      <Check
                        className="w-4 h-4 shrink-0 mt-0.5"
                        strokeWidth={3}
                        style={{ color: "var(--brand-solid)" }}
                        aria-hidden
                      />
                      {c}
                    </li>
                  ))}
                </ul>
                <a
                  href={SIGNUP_URL}
                  className="btn-brand btn-press inline-flex items-center justify-center gap-2 py-3.5 rounded-full font-semibold group"
                >
                  {t.spaces.candidateCta}
                  <ArrowRight
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </a>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="bg-card border border-border rounded-3xl p-8 shadow-card card-lift flex flex-col h-full">
                <p
                  className="text-xs font-bold tracking-[0.15em] mb-4"
                  style={{ color: "var(--amber-text)" }}
                >
                  {t.spaces.employerLabel}
                </p>
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{
                    backgroundColor: "var(--amber-pale)",
                    color: "var(--amber-text)",
                  }}
                >
                  <Briefcase className="w-6 h-6" aria-hidden />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2 tracking-tight">
                  {t.spaces.employerTitle}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {t.spaces.employerText}
                </p>
                <ul className="space-y-3 mb-8 flex-1">
                  {t.spaces.employerChecks.map((c) => (
                    <li
                      key={c}
                      className="flex gap-2.5 text-sm text-muted-foreground"
                    >
                      <Check
                        className="w-4 h-4 shrink-0 mt-0.5"
                        strokeWidth={3}
                        style={{ color: "var(--brand-solid)" }}
                        aria-hidden
                      />
                      {c}
                    </li>
                  ))}
                </ul>
                <a
                  href={EMPLOYER_URL}
                  className="btn-press inline-flex items-center justify-center gap-2 py-3.5 rounded-full font-semibold border-2 hover:bg-brand-pale group"
                  style={{
                    borderColor: "var(--brand-solid)",
                    color: "var(--brand-text)",
                  }}
                >
                  {t.spaces.employerCta}
                  <ArrowRight
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="border-y border-border bg-card/50 scroll-mt-20"
        >
          <div className="max-w-6xl mx-auto px-5 py-20">
            <SectionHeading
              eyebrow={t.features.eyebrow}
              title={t.features.title}
              subtitle={t.features.subtitle}
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {t.features.items.map((f, i) => {
                const Icon = FEATURE_ICONS[i];
                const tone = FEATURE_TONES[i];
                return (
                  <Reveal key={f.title} delay={(i % 3) * 90}>
                    <div className="bg-card rounded-2xl p-6 border border-border shadow-card card-lift h-full">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                        style={{ backgroundColor: tone.bg, color: tone.fg }}
                      >
                        <Icon className="w-5 h-5" aria-hidden />
                      </div>
                      <h3 className="font-bold text-foreground mb-2">
                        {f.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {f.text}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Trust */}
        <section className="max-w-6xl mx-auto px-5 py-20">
          <SectionHeading eyebrow="" title={t.trust.title} />
          <div className="grid sm:grid-cols-3 gap-4">
            {t.trust.items.map((item, i) => {
              const Icon = TRUST_ICONS[i];
              return (
                <Reveal key={item.title} delay={i * 90}>
                  <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-card card-lift">
                    <Icon
                      className="w-6 h-6 mb-4"
                      style={{ color: "var(--brand-solid)" }}
                      aria-hidden
                    />
                    <h3 className="font-bold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Pricing */}
        <section
          id="pricing"
          className="border-y border-border bg-card/50 scroll-mt-20"
        >
          <div className="max-w-6xl mx-auto px-5 py-20">
            <SectionHeading
              eyebrow={t.pricing.eyebrow}
              title={t.pricing.title}
              subtitle={t.pricing.subtitle}
            />
            <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto items-start">
              {t.pricing.plans.map((p, i) => {
                const highlight = i === 2;
                return (
                  <Reveal key={p.name} delay={i * 90}>
                    <div
                      className={`relative bg-card rounded-3xl p-6 border shadow-card flex flex-col h-full ${
                        highlight
                          ? "sm:-mt-3 sm:pb-8 shadow-lift"
                          : "border-border card-lift"
                      }`}
                      style={
                        highlight
                          ? {
                              borderColor: "var(--amber-solid)",
                              borderWidth: 2,
                            }
                          : undefined
                      }
                    >
                      {highlight && (
                        <span
                          className="self-start text-[10px] font-bold px-2.5 py-1 rounded-full mb-3 tracking-wide"
                          style={{
                            backgroundColor: "var(--amber-solid)",
                            color: "var(--on-amber)",
                          }}
                        >
                          {t.pricing.highlight}
                        </span>
                      )}
                      <h3 className="font-bold text-foreground">{p.name}</h3>
                      <p className="mt-3 mb-5 flex items-baseline gap-1.5 flex-wrap">
                        <span className="text-4xl font-extrabold text-foreground tracking-tight">
                          {p.price}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {t.pricing.perPeriod} · {p.period}
                        </span>
                      </p>
                      <ul className="space-y-2.5 mb-7 flex-1">
                        {p.features.map((f) => (
                          <li
                            key={f}
                            className="flex gap-2.5 text-sm text-muted-foreground"
                          >
                            <Check
                              className="w-4 h-4 shrink-0 mt-0.5"
                              strokeWidth={3}
                              style={{ color: "var(--brand-solid)" }}
                              aria-hidden
                            />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <a
                        href={SIGNUP_URL}
                        className={`btn-press text-center py-3 rounded-full font-semibold text-sm ${
                          highlight ? "btn-brand" : ""
                        }`}
                        style={
                          highlight
                            ? undefined
                            : {
                                backgroundColor: "var(--brand-pale)",
                                color: "var(--brand-text)",
                              }
                        }
                        aria-label={`${t.pricing.cta} — ${p.name}`}
                      >
                        {t.pricing.cta}
                      </a>
                    </div>
                  </Reveal>
                );
              })}
            </div>
            <p className="text-center text-xs text-muted-foreground mt-8">
              {t.pricing.freeNote}
            </p>
          </div>
        </section>

        {/* Testimonials */}
        <section className="max-w-6xl mx-auto px-5 py-20">
          <SectionHeading
            eyebrow={t.testimonials.eyebrow}
            title={t.testimonials.title}
          />
          <div className="grid sm:grid-cols-3 gap-4">
            {t.testimonials.items.map((tm, i) => (
              <Reveal as="figure" key={tm.name} delay={i * 90}>
                <div className="bg-card rounded-2xl p-6 border border-border shadow-card card-lift h-full flex flex-col">
                  <Quote
                    className="w-7 h-7 mb-4 shrink-0"
                    style={{ color: "var(--brand-solid)" }}
                    aria-hidden
                  />
                  <blockquote className="text-sm text-foreground leading-relaxed mb-6 flex-1">
                    « {tm.quote} »
                  </blockquote>
                  <figcaption className="flex items-center gap-3">
                    {/* Initials avatar — a face-shaped anchor for the quote
                        without inventing a stock photo of a real person. */}
                    <span
                      className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                      style={{
                        backgroundColor: "var(--brand-pale)",
                        color: "var(--brand-text)",
                      }}
                      aria-hidden
                    >
                      {initialsOf(tm.name)}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-foreground">
                        {tm.name}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {tm.role}
                      </span>
                    </span>
                  </figcaption>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          className="border-t border-border bg-card/50 scroll-mt-20"
        >
          <div className="max-w-3xl mx-auto px-5 py-20">
            <SectionHeading
              eyebrow={t.faq.eyebrow}
              title={t.faq.title}
              subtitle={t.faq.subtitle}
            />
            <div className="space-y-3">
              {t.faq.items.map((item, i) => (
                <FaqItem
                  key={item.q}
                  id={`faq-${i}`}
                  q={item.q}
                  a={item.a}
                  open={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Employers */}
        <section className="max-w-6xl mx-auto px-5 pt-20">
          <Reveal>
            <div
              className="relative overflow-hidden rounded-3xl p-8 sm:p-12 text-white flex flex-col sm:flex-row items-center gap-8"
              style={{
                background:
                  "linear-gradient(135deg, var(--brand-solid), #1E8E3E)",
              }}
            >
              <div
                aria-hidden
                className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-white/10 blur-2xl"
              />
              <div className="relative flex-1 text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">
                  {t.employers.title}
                </h2>
                <p className="text-white/90 leading-relaxed max-w-2xl">
                  {t.employers.text}
                </p>
                <a
                  href={EMPLOYER_URL}
                  className="btn-press inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-white font-semibold text-sm group"
                  style={{ color: "var(--brand-hover)" }}
                >
                  {t.spaces.employerCta}
                  <ArrowRight
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </a>
              </div>
              <div className="relative w-20 h-20 rounded-3xl bg-white/15 flex items-center justify-center shrink-0">
                <Briefcase className="w-9 h-9" aria-hidden />
              </div>
            </div>
          </Reveal>
        </section>

        {/* Final CTA */}
        <section className="max-w-3xl mx-auto px-5 py-20 text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4 tracking-tight text-balance">
              {t.finalCta.title}
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed text-pretty">
              {t.finalCta.subtitle}
            </p>
            <a
              href={SIGNUP_URL}
              className="btn-brand btn-press inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold group"
            >
              {t.finalCta.button}
              <ArrowRight
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </a>
            <p className="text-xs text-muted-foreground mt-5">{t.hero.note}</p>
          </Reveal>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50">
        <div className="max-w-6xl mx-auto px-5 py-14">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <KamJobLogo size="default" tagline={t.footer.tagline} />
              <p className="mt-5 max-w-xs text-sm text-muted-foreground flex items-start gap-2">
                <Shield className="w-4 h-4 shrink-0 mt-0.5" aria-hidden />
                {t.footer.disclaimer}
              </p>
            </div>

            <nav aria-label={t.footer.product}>
              <p className="text-sm font-semibold text-foreground mb-3">
                {t.footer.product}
              </p>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="hover:text-foreground transition-colors"
                    >
                      {t.nav[l.key]}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label={t.footer.company}>
              <p className="text-sm font-semibold text-foreground mb-3">
                {t.footer.company}
              </p>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li>
                  <a
                    href={SIGNUP_URL}
                    className="hover:text-foreground transition-colors"
                  >
                    {t.nav.signup}
                  </a>
                </li>
                <li>
                  <a
                    href={LOGIN_URL}
                    className="hover:text-foreground transition-colors"
                  >
                    {t.nav.login}
                  </a>
                </li>
                <li>
                  <a
                    href={EMPLOYER_URL}
                    className="hover:text-foreground transition-colors"
                  >
                    {t.footer.employerLink}
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-12 pt-8 border-t border-border">
            {t.footer.copyright}
          </p>
        </div>
        {/* Clears the sticky mobile CTA bar. */}
        <div className="md:hidden h-20" aria-hidden />
      </footer>

      <StickyMobileCta />
    </div>
  );
}
