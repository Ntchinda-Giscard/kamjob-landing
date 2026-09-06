"use client";

/**
 * KamJob landing page — "Ink & Paper".
 *
 * Design decisions this file assumes (tokens and utilities live in
 * `app/globals.css`):
 *
 *   Direction   Editorial poster. Warm paper carries the reading copy;
 *               full-bleed ink slabs punctuate it. Every section changes
 *               shape — indexed rule, ink data bar, ticker, outlined
 *               numerals, split feature bento, hairline row, tickets,
 *               staggered quotes, two-column FAQ — so no two read as the
 *               same template stamped twice.
 *   Type        Bricolage Grotesque (display) / Public Sans (body) /
 *               JetBrains Mono (eyebrows, data, tickers).
 *   Colour      Cameroon tricolour used structurally — rules, spines,
 *               markers, outlined numerals — never as pastel icon tiles.
 *   Motion      One orchestrated hero entrance (headline lines wipe up from
 *               their own clip boxes), then scroll-reveals with a stagger.
 *   Layout      Asymmetric by default. Centred axes are reserved for the
 *               two moments that earn them: the contact panel and the close.
 */

import { useEffect, useState } from "react";
import { KamJobLogo } from "@/components/logo";
import { LangSwitcher } from "@/components/lang-switcher";
import { ContactSection } from "@/components/contact-section";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { useLanguage } from "@/lib/i18n";
import { EMPLOYER_URL, LOGIN_URL, NAV_LINKS, SIGNUP_URL } from "@/lib/site";
import {
  ArrowRight,
  ArrowUpRight,
  Zap,
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
  Plus,
  User,
  Menu,
  Wallet,
  Smartphone,
  Send,
} from "lucide-react";

const FEATURE_ICONS = [
  MousePointerClick,
  ImageIcon,
  Zap,
  Sparkles,
  Target,
  Bell,
];

const TRUST_ICONS = [Wallet, ShieldCheck, Smartphone];

/** Flag order. Cycled for card spines and outlined numerals so the palette
 *  reads as one rotating system instead of six unrelated accent colours. */
const FLAG = ["var(--brand-solid)", "var(--red-solid)", "var(--gold-solid)"];
const flagAt = (i: number) => FLAG[i % 3];

const cssVars = (vars: Record<string, string>) => vars as React.CSSProperties;

// ── Small building blocks ─────────────────────────────────────────────────────

/** Squared-off mono tag. The old pill-shaped pastel chip was the single most
 *  template-looking element in the mockup. */
function MetaTag({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="mono rounded-[3px] border px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider"
      style={{ borderColor: color, color }}
    >
      {label}
    </span>
  );
}

/**
 * The hero visual: a fanned deck of job cards rather than a phone chrome.
 * The product *is* a deck you swipe, so showing the deck says more than a
 * bezel and a notch — and it sidesteps the stock device mockup entirely.
 */
function CardDeck() {
  const { t } = useLanguage();

  return (
    <div className="relative mx-auto w-[19rem] max-w-full sm:w-[21rem]">
      {/* Two cards fanned behind the front one: the queue of offers waiting. */}
      <div
        aria-hidden
        className="absolute inset-x-6 top-6 h-full rounded-2xl border"
        style={{
          backgroundColor: "var(--paper-sunk)",
          borderColor: "var(--border)",
          transform: "rotate(6deg)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-3 top-3 h-full rounded-2xl border"
        style={{
          backgroundColor: "var(--paper-raised)",
          borderColor: "var(--border)",
          transform: "rotate(3deg)",
        }}
      />

      <div
        className="animate-float relative"
        style={cssVars({ "--tilt": "-1.5deg" })}
      >
        <div
          className="relative overflow-hidden rounded-2xl border shadow-[var(--shadow-lift)]"
          style={{
            backgroundColor: "var(--paper-raised)",
            borderColor: "var(--border-strong)",
          }}
          role="img"
          aria-label={t.mockup.alt}
        >
          {/* Tricolour spine — the card's edge is where the flag lives. */}
          <span
            aria-hidden
            className="tricolor-y absolute inset-y-0 left-0 w-[5px]"
          />

          {/* Rotated approval stamp, ink on gold, like a wet office stamp. */}
          <span
            className="mono absolute right-3 top-3 z-10 rounded-[3px] px-2 py-1 text-[10px] font-bold uppercase tracking-widest"
            style={{
              backgroundColor: "var(--gold-solid)",
              color: "var(--on-gold)",
              transform: "rotate(8deg)",
            }}
          >
            {t.mockup.stamp}
          </span>

          <div className="py-5 pl-6 pr-4">
            <div className="mb-3 flex items-center gap-2">
              <span
                className="mono flex h-8 w-8 items-center justify-center rounded-[5px] text-[11px] font-bold"
                style={{
                  backgroundColor: "var(--slab)",
                  color: "var(--slab-fg)",
                }}
              >
                ST
              </span>
              <span className="text-sm font-semibold">ST Digital</span>
              <BadgeCheck
                className="h-4 w-4"
                strokeWidth={2}
                style={{ color: "var(--brand-solid)" }}
              />
            </div>

            <p className="display mb-3 text-xl font-bold leading-tight">
              Head of Business Desk
            </p>

            <div className="mb-4 flex flex-wrap gap-1.5">
              <MetaTag label="CDI" color="var(--brand-text)" />
              <MetaTag label="Douala" color="var(--red-text)" />
              <MetaTag label="Bac+5" color="var(--gold-text)" />
            </div>

            {/* The employer's poster — the artefact this market actually
                circulates on WhatsApp, reproduced rather than abstracted. */}
            <div
              className="slab relative mb-4 flex h-32 flex-col items-center justify-center overflow-hidden rounded-lg"
              aria-hidden
            >
              <span className="grid-paper-ink absolute inset-0 opacity-70" />
              <p
                className="mono relative text-[9px] tracking-[0.3em]"
                style={{ color: "var(--brand-on-ink)" }}
              >
                {t.mockup.hiringTop}
              </p>
              <p className="display relative text-2xl font-extrabold leading-none">
                {t.mockup.hiringMain}
              </p>
              <span
                aria-hidden
                className="tricolor relative my-2 h-[3px] w-10 rounded-full"
              />
              <p
                className="relative text-[9px]"
                style={{ color: "var(--slab-muted)" }}
              >
                {t.mockup.hiringSub}
              </p>
            </div>

            <div className="flex items-center justify-center gap-5">
              <span
                className="flex h-11 w-11 items-center justify-center rounded-full border-2"
                style={{
                  borderColor: "var(--red-solid)",
                  color: "var(--red-solid)",
                }}
                aria-hidden
              >
                <X className="h-5 w-5" strokeWidth={3} />
              </span>
              <span
                aria-hidden
                className="h-px flex-1"
                style={{ backgroundColor: "var(--border)" }}
              />
              <span
                className="flex h-14 w-14 items-center justify-center rounded-full text-white"
                style={{
                  backgroundColor: "var(--brand-solid)",
                  boxShadow: "var(--shadow-brand)",
                }}
                aria-hidden
              >
                <Check className="h-6 w-6" strokeWidth={3} />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* What the swipe actually produced. The headline can only claim it. */}
      <div
        aria-hidden
        className="rise-in slab absolute -right-3 bottom-16 w-[13rem] rounded-xl p-3 shadow-[var(--shadow-lift)] sm:-right-10"
        style={{ animationDelay: "1100ms" }}
      >
        <div className="flex items-start gap-2.5">
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
            style={{
              backgroundColor: "var(--brand-solid)",
              color: "#fff",
            }}
          >
            <Send className="h-3.5 w-3.5" />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-bold leading-tight">{t.mockup.toast}</p>
            <p
              className="mt-0.5 text-[10px] leading-snug"
              style={{ color: "var(--slab-muted)" }}
            >
              {t.mockup.toastSub}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/** FAQ row. Hairline-separated rather than boxed, with a rotating plus — the
 *  stack of bordered accordion cards was another repeated-card moment. */
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
    <div className="border-b" style={{ borderColor: "var(--border)" }}>
      <h3>
        <button
          onClick={onToggle}
          className="flex w-full items-start justify-between gap-6 py-5 text-left"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-button`}
        >
          <span
            className="display text-lg font-bold leading-snug transition-colors"
            style={open ? { color: "var(--brand-text)" } : undefined}
          >
            {q}
          </span>
          <span
            aria-hidden
            className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-transform duration-300"
            style={{
              borderColor: open ? "var(--brand-solid)" : "var(--border-strong)",
              color: open ? "var(--brand-text)" : "var(--muted-foreground)",
              transform: open ? "rotate(135deg)" : undefined,
            }}
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
          </span>
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
          <p
            className="max-w-2xl pb-6 pr-10 text-sm leading-relaxed"
            style={{ color: "var(--muted-foreground)" }}
          >
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

/** Bottom bar once the hero CTA has scrolled away. Mobile is the dominant
 *  surface here, and a CTA off-screen is a CTA that does not convert. */
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
      className="slab fixed inset-x-0 bottom-0 z-50 flex items-center justify-between gap-3 px-4 py-3 transition-transform duration-300 md:hidden"
      style={{
        transform: shown ? "none" : "translateY(110%)",
        paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))",
      }}
      aria-hidden={!shown}
    >
      <span aria-hidden className="tricolor absolute inset-x-0 top-0 h-[3px]" />
      <p className="mono text-[11px] uppercase tracking-widest">
        {t.stickyCta.label}
      </p>
      <a
        href={SIGNUP_URL}
        tabIndex={shown ? undefined : -1}
        className="btn btn-brand whitespace-nowrap px-5 py-2.5 text-sm"
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
    <div className="min-h-screen overflow-x-clip bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-full focus:border focus:border-border focus:bg-card focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:shadow-[var(--shadow-lift)]"
      >
        {t.nav.skipToContent}
      </a>

      {/* Sticky header. The tricolour caps the page like a masthead rule. */}
      <header className="sticky top-0 z-50 backdrop-blur-md">
        <span aria-hidden className="tricolor block h-[3px] w-full" />
        <div
          className="border-b"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "color-mix(in srgb, var(--paper) 88%, transparent)",
          }}
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
            <a href="#main" aria-label="KamJob">
              <KamJobLogo size="small" />
            </a>

            <nav
              className="eyebrow hidden items-center gap-6 md:flex lg:gap-7"
              style={{ color: "var(--muted-foreground)" }}
              aria-label="Principal"
            >
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="link-rule transition-colors hover:text-foreground"
                >
                  {t.nav[l.key]}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <span
                className="mono hidden items-center gap-1.5 text-[11px] uppercase tracking-widest lg:inline-flex"
                style={{ color: "var(--muted-foreground)" }}
              >
                <span
                  aria-hidden
                  className="tricolor h-2.5 w-2.5 rounded-[2px]"
                />
                {t.nav.country}
              </span>
              <LangSwitcher />
              <a
                href={LOGIN_URL}
                className="link-rule hidden text-sm font-medium sm:block"
              >
                {t.nav.login}
              </a>
              <a
                href={SIGNUP_URL}
                className="btn btn-brand px-4 py-2 text-sm"
              >
                {t.nav.signup}
              </a>
              <button
                className="btn-press -mr-1 rounded-md p-2 hover:bg-secondary md:hidden"
                onClick={() => setMenuOpen((v) => !v)}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
              >
                {menuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile nav — section links are otherwise unreachable below md. */}
          <nav
            id="mobile-nav"
            className="collapse-grid border-t md:hidden"
            style={{ borderColor: "var(--border)" }}
            data-open={menuOpen}
            aria-label="Principal (mobile)"
          >
            <div>
              <ul className="px-5 py-3">
                {NAV_LINKS.map((l, i) => (
                  <li key={l.href} className="flex items-center gap-3 py-2.5">
                    <span
                      aria-hidden
                      className="mono text-[10px]"
                      style={{ color: flagAt(i) }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <a
                      href={l.href}
                      onClick={() => setMenuOpen(false)}
                      className="display text-lg font-bold"
                    >
                      {t.nav[l.key]}
                    </a>
                  </li>
                ))}
                <li className="sm:hidden">
                  <a
                    href={LOGIN_URL}
                    className="block py-2.5 text-sm font-medium"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {t.nav.login}
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>

      <main id="main">
        {/* ── Hero ────────────────────────────────────────────────────────── */}
        <section className="relative">
          <div
            aria-hidden
            className="grid-paper pointer-events-none absolute inset-0 -z-10"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 right-[-6rem] -z-10 h-[30rem] w-[30rem] rounded-full blur-3xl"
            style={{ backgroundColor: "var(--brand-glow)" }}
          />

          <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-16 pt-14 lg:grid-cols-[1.08fr_minmax(0,0.92fr)] lg:pb-24 lg:pt-20">
            <div>
              <div
                className="rise-in flex items-center gap-3"
                style={{ animationDelay: "0ms" }}
              >
                <span
                  aria-hidden
                  className="tricolor h-[3px] w-9 shrink-0 rounded-full"
                />
                <span
                  className="eyebrow"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {t.hero.badge}
                </span>
              </div>

              {/* Each line wipes up from its own clip box. Both halves are
                  whole translation strings, so the effect is language-safe. */}
              <h1 className="display mt-6 text-[clamp(2.75rem,7.6vw,5rem)] font-extrabold">
                <span
                  className="line-clip"
                  style={cssVars({ "--line-delay": "120ms" })}
                >
                  <span>{t.hero.title}</span>
                </span>
                <span
                  className="line-clip"
                  style={cssVars({ "--line-delay": "280ms" })}
                >
                  <span>
                    <span className="marker">{t.hero.titleAccent}</span>
                  </span>
                </span>
              </h1>

              <p
                className="rise-in mt-7 max-w-xl text-pretty text-[1.0625rem] leading-relaxed"
                style={{
                  color: "var(--muted-foreground)",
                  animationDelay: "520ms",
                }}
              >
                {t.hero.subtitle}
              </p>

              <div
                className="rise-in mt-9 flex flex-col gap-3 sm:flex-row"
                style={{ animationDelay: "660ms" }}
              >
                <a
                  href={SIGNUP_URL}
                  className="btn btn-brand group px-7 py-4"
                >
                  {t.hero.ctaPrimary}
                  <ArrowRight
                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </a>
                <a href={LOGIN_URL} className="btn btn-paper px-7 py-4">
                  {t.hero.ctaSecondary}
                </a>
              </div>

              {/* The reassurance line, split so it cannot be skimmed past. */}
              <ul
                className="rise-in mono mt-8 flex flex-wrap gap-x-6 gap-y-2.5"
                style={{ animationDelay: "780ms" }}
              >
                {t.hero.note.split("·").map((claim, i) => (
                  <li
                    key={claim}
                    className="flex items-center gap-2 text-[11px] uppercase tracking-wider"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: flagAt(i) }}
                    />
                    {claim.trim()}
                  </li>
                ))}
              </ul>
            </div>

            <Reveal delay={140}>
              <CardDeck />
            </Reveal>
          </div>
        </section>

        {/* ── Stats · full-bleed ink data bar ─────────────────────────────── */}
        <section className="slab bleed relative">
          <span aria-hidden className="tricolor absolute inset-x-0 top-0 h-1" />
          <div className="mx-auto max-w-6xl">
            <div
              className="grid grid-cols-2 gap-px sm:grid-cols-4"
              style={{ backgroundColor: "var(--slab-border)" }}
            >
              {t.hero.stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 80}>
                  <div className="slab h-full px-5 py-9 sm:px-6 sm:py-12">
                    <p className="display text-[clamp(2.25rem,5.5vw,3.5rem)] font-extrabold leading-none">
                      {s.value}
                    </p>
                    <p
                      className="mono mt-3 text-[10px] uppercase leading-snug tracking-[0.14em]"
                      style={{ color: "var(--slab-muted)" }}
                    >
                      {s.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Offers ticker ──────────────────────────────────────────────── */}
        <section
          className="border-b"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--paper-sunk)",
          }}
          aria-label={t.ticker.label}
        >
          <div className="py-5">
            <p
              className="eyebrow mb-4 px-5 text-center"
              style={{ color: "var(--muted-foreground)" }}
            >
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
                    {t.ticker.items.map((item, i) => (
                      <span
                        key={`${copy}-${item}`}
                        className="mono flex items-center gap-3 whitespace-nowrap px-6 text-[13px] font-medium"
                      >
                        <span
                          aria-hidden
                          className="h-1.5 w-1.5 rotate-45"
                          style={{ backgroundColor: flagAt(i) }}
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

        {/* ── How it works · outlined numerals ────────────────────────────── */}
        <section id="how" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:py-24">
          <SectionHeading
            index="01"
            eyebrow={t.how.eyebrow}
            title={t.how.title}
            subtitle={t.how.subtitle}
          />
          <ol
            className="grid gap-px sm:grid-cols-3"
            style={{ backgroundColor: "var(--border)" }}
          >
            {t.how.steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 120}>
                <div className="h-full bg-background pb-2 pt-8 sm:px-7 sm:pt-9">
                  <span
                    aria-hidden
                    className="display block text-[4.5rem] font-extrabold leading-[0.8]"
                    style={{
                      color: "transparent",
                      WebkitTextStroke: `1.5px ${flagAt(i)}`,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display mt-6 text-xl font-bold">{s.title}</h3>
                  <p
                    className="mt-3 max-w-sm text-sm leading-relaxed"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {s.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* ── Two spaces ─────────────────────────────────────────────────────
            Deliberately unequal. Candidates are the primary audience, so their
            panel is the ink one and the wider one; employers get a quieter
            paper card. A 50/50 split would have said they matter equally. */}
        <section className="mx-auto max-w-6xl px-5 pb-20 sm:pb-24">
          <SectionHeading
            index="02"
            eyebrow={t.spaces.eyebrow}
            title={t.spaces.title}
          />
          <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
            <Reveal>
              <div className="slab relative flex h-full flex-col overflow-hidden rounded-2xl p-8 sm:p-10">
                <span
                  aria-hidden
                  className="grid-paper-ink absolute inset-0 opacity-60"
                />
                <span
                  aria-hidden
                  className="tricolor-y absolute inset-y-0 left-0 w-1.5"
                />
                <div className="relative flex flex-1 flex-col">
                  <div className="flex items-center gap-3">
                    <User
                      className="h-4 w-4"
                      strokeWidth={2}
                      style={{ color: "var(--brand-on-ink)" }}
                      aria-hidden
                    />
                    <span
                      className="eyebrow"
                      style={{ color: "var(--brand-on-ink)" }}
                    >
                      {t.spaces.candidateLabel}
                    </span>
                  </div>
                  <h3 className="display mt-5 text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold">
                    {t.spaces.candidateTitle}
                  </h3>
                  <p
                    className="mt-4 max-w-md leading-relaxed"
                    style={{ color: "var(--slab-muted)" }}
                  >
                    {t.spaces.candidateText}
                  </p>
                  <ul className="mt-8 flex-1 space-y-0">
                    {t.spaces.candidateChecks.map((c, i) => (
                      <li
                        key={c}
                        className="flex gap-4 border-t py-3.5 text-sm"
                        style={{ borderColor: "var(--slab-border)" }}
                      >
                        <span
                          className="mono shrink-0 text-[10px]"
                          style={{ color: "var(--brand-on-ink)" }}
                          aria-hidden
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span style={{ color: "var(--slab-fg)" }}>{c}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={SIGNUP_URL}
                    className="btn btn-brand group mt-8 w-full py-4 sm:w-auto sm:self-start sm:px-8"
                  >
                    {t.spaces.candidateCta}
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden
                    />
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div
                className="card-lift flex h-full flex-col rounded-2xl border p-8"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--paper-raised)",
                }}
              >
                <div className="flex items-center gap-3">
                  <Briefcase
                    className="h-4 w-4"
                    strokeWidth={2}
                    style={{ color: "var(--gold-text)" }}
                    aria-hidden
                  />
                  <span className="eyebrow" style={{ color: "var(--gold-text)" }}>
                    {t.spaces.employerLabel}
                  </span>
                </div>
                <h3 className="display mt-5 text-2xl font-extrabold">
                  {t.spaces.employerTitle}
                </h3>
                <p
                  className="mt-4 text-sm leading-relaxed"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {t.spaces.employerText}
                </p>
                <ul className="mt-7 flex-1 space-y-0">
                  {t.spaces.employerChecks.map((c) => (
                    <li
                      key={c}
                      className="flex gap-3 border-t py-3 text-sm"
                      style={{
                        borderColor: "var(--border)",
                        color: "var(--muted-foreground)",
                      }}
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0"
                        strokeWidth={3}
                        style={{ color: "var(--gold-solid)" }}
                        aria-hidden
                      />
                      {c}
                    </li>
                  ))}
                </ul>
                <a
                  href={EMPLOYER_URL}
                  className="btn btn-paper group mt-8 py-3.5"
                >
                  {t.spaces.employerCta}
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Features · asymmetric bento ─────────────────────────────────────
            Six equal cards in a 3-column grid was the most template-like block
            on the page. The lead feature — applying in one swipe, the whole
            product — now takes an ink tile twice the height of the rest. */}
        <section
          id="features"
          className="scroll-mt-24 border-y"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--paper-sunk)",
          }}
        >
          <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
            <SectionHeading
              index="03"
              eyebrow={t.features.eyebrow}
              title={t.features.title}
              subtitle={t.features.subtitle}
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
              {t.features.items.map((f, i) => {
                const Icon = FEATURE_ICONS[i];
                const lead = i === 0;
                // Row 1–2: lead tile (3 cols, 2 rows) + two 3-col tiles.
                // Row 3: three 2-col tiles.
                const span = lead
                  ? "lg:col-span-3 lg:row-span-2"
                  : i <= 2
                    ? "lg:col-span-3"
                    : "lg:col-span-2";

                return (
                  <Reveal key={f.title} delay={(i % 3) * 90} className={span}>
                    <div
                      className={`card-lift relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 sm:p-7 ${
                        lead ? "slab justify-end" : ""
                      }`}
                      style={
                        lead
                          ? { borderColor: "var(--slab-border)" }
                          : {
                              borderColor: "var(--border)",
                              backgroundColor: "var(--paper-raised)",
                            }
                      }
                    >
                      {lead && (
                        <span
                          aria-hidden
                          className="grid-paper-ink absolute inset-0 opacity-60"
                        />
                      )}
                      <span
                        aria-hidden
                        className="absolute inset-x-0 top-0 h-[3px]"
                        style={{ backgroundColor: flagAt(i) }}
                      />

                      <div className="relative flex items-start justify-between gap-4">
                        <span
                          className="mono text-[10px] font-bold tracking-widest"
                          style={{
                            color: lead
                              ? "var(--brand-on-ink)"
                              : "var(--muted-foreground)",
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <Icon
                          className={lead ? "h-7 w-7" : "h-5 w-5"}
                          strokeWidth={1.5}
                          style={{
                            color: lead ? "var(--brand-on-ink)" : flagAt(i),
                          }}
                          aria-hidden
                        />
                      </div>

                      {lead && <div className="relative flex-1 min-h-24" />}

                      <h3
                        className={`display relative mt-5 font-bold ${
                          lead ? "text-2xl sm:text-3xl" : "text-lg"
                        }`}
                      >
                        {f.title}
                      </h3>
                      <p
                        className={`relative mt-2.5 leading-relaxed ${
                          lead ? "max-w-sm text-[15px]" : "text-sm"
                        }`}
                        style={{
                          color: lead
                            ? "var(--slab-muted)"
                            : "var(--muted-foreground)",
                        }}
                      >
                        {f.text}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Trust · hairline row, no cards ──────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
          <Reveal className="mb-12 flex items-center gap-3">
            <span
              aria-hidden
              className="tricolor h-[3px] w-9 shrink-0 rounded-full"
            />
            <h2 className="display text-balance text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold">
              {t.trust.title}
            </h2>
          </Reveal>
          <div
            className="grid gap-px sm:grid-cols-3"
            style={{ backgroundColor: "var(--border)" }}
          >
            {t.trust.items.map((item, i) => {
              const Icon = TRUST_ICONS[i];
              return (
                <Reveal key={item.title} delay={i * 100}>
                  <div className="h-full bg-background pb-6 pt-7 sm:px-7">
                    <Icon
                      className="h-6 w-6"
                      strokeWidth={1.5}
                      style={{ color: flagAt(i) }}
                      aria-hidden
                    />
                    <h3 className="display mt-5 text-lg font-bold">
                      {item.title}
                    </h3>
                    <p
                      className="mt-2.5 text-sm leading-relaxed"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {item.text}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ── Pricing · tickets ──────────────────────────────────────────── */}
        <section
          id="pricing"
          className="scroll-mt-24 border-y"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--paper-sunk)",
          }}
        >
          <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
            <SectionHeading
              index="04"
              eyebrow={t.pricing.eyebrow}
              title={t.pricing.title}
              subtitle={t.pricing.subtitle}
            />
            <div className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {t.pricing.plans.map((p, i) => {
                // "Le plus complet" always rides the highest tier.
                const highlight = i === t.pricing.plans.length - 1;
                return (
                  <Reveal key={p.name} delay={i * 90}>
                    <div
                      className={`relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 ${
                        highlight ? "slab lg:-mt-4 lg:pb-9" : "card-lift"
                      }`}
                      style={
                        highlight
                          ? { borderColor: "var(--slab-border)" }
                          : {
                              borderColor: "var(--border)",
                              backgroundColor: "var(--paper-raised)",
                            }
                      }
                    >
                      <span
                        aria-hidden
                        className={
                          highlight
                            ? "tricolor absolute inset-x-0 top-0 h-1"
                            : "absolute inset-x-0 top-0 h-[3px]"
                        }
                        style={
                          highlight
                            ? undefined
                            : { backgroundColor: "var(--border-strong)" }
                        }
                      />

                      {highlight && (
                        <span
                          className="mono mb-4 self-start rounded-[3px] px-2 py-1 text-[9px] font-bold uppercase tracking-widest"
                          style={{
                            backgroundColor: "var(--gold-solid)",
                            color: "var(--on-gold)",
                          }}
                        >
                          {t.pricing.highlight}
                        </span>
                      )}

                      <h3
                        className="eyebrow"
                        style={{
                          color: highlight
                            ? "var(--slab-muted)"
                            : "var(--muted-foreground)",
                        }}
                      >
                        {p.name}
                      </h3>

                      <p className="mb-6 mt-3 flex flex-wrap items-baseline gap-x-1.5">
                        <span className="display text-[2.75rem] font-extrabold leading-none tracking-tight">
                          {p.price}
                        </span>
                        <span
                          className="mono text-[11px] uppercase tracking-wider"
                          style={{
                            color: highlight
                              ? "var(--slab-muted)"
                              : "var(--muted-foreground)",
                          }}
                        >
                          {t.pricing.perPeriod} · {p.period}
                        </span>
                      </p>

                      <ul className="mb-8 flex-1 space-y-2.5">
                        {p.features.map((f) => (
                          <li
                            key={f}
                            className="flex gap-2.5 text-sm leading-snug"
                            style={{
                              color: highlight
                                ? "var(--slab-muted)"
                                : "var(--muted-foreground)",
                            }}
                          >
                            <Check
                              className="mt-0.5 h-3.5 w-3.5 shrink-0"
                              strokeWidth={3}
                              style={{
                                color: highlight
                                  ? "var(--brand-on-ink)"
                                  : "var(--brand-solid)",
                              }}
                              aria-hidden
                            />
                            {f}
                          </li>
                        ))}
                      </ul>

                      <a
                        href={SIGNUP_URL}
                        className={`btn py-3 text-sm ${
                          highlight ? "btn-brand" : "btn-paper"
                        }`}
                        aria-label={`${t.pricing.cta} — ${p.name}`}
                      >
                        {t.pricing.cta}
                      </a>
                    </div>
                  </Reveal>
                );
              })}
            </div>
            <p
              className="mono mt-10 text-center text-[11px] uppercase tracking-wider"
              style={{ color: "var(--muted-foreground)" }}
            >
              {t.pricing.freeNote}
            </p>
          </div>
        </section>

        {/* ── Testimonials · staggered quotes ─────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
          <SectionHeading
            index="05"
            eyebrow={t.testimonials.eyebrow}
            title={t.testimonials.title}
          />
          <div className="grid gap-5 sm:grid-cols-3">
            {t.testimonials.items.map((tm, i) => (
              <Reveal
                as="figure"
                key={tm.name}
                delay={i * 110}
                // Vertical offsets break the row into a composition rather
                // than three identical boxes sitting on one baseline.
                className={i === 1 ? "sm:mt-10" : i === 2 ? "sm:mt-4" : ""}
              >
                <div
                  className="card-lift relative flex h-full flex-col rounded-2xl border p-7"
                  style={{
                    borderColor: "var(--border)",
                    backgroundColor: "var(--paper-raised)",
                  }}
                >
                  <span
                    aria-hidden
                    className="display absolute right-5 top-1 select-none text-6xl font-extrabold leading-none"
                    style={{ color: flagAt(i), opacity: 0.16 }}
                  >
                    &rdquo;
                  </span>
                  <blockquote className="relative flex-1 text-[15px] leading-relaxed">
                    {tm.quote}
                  </blockquote>
                  <figcaption
                    className="mt-7 flex items-center gap-3 border-t pt-5"
                    style={{ borderColor: "var(--border)" }}
                  >
                    {/* Initials, not a stock headshot of a person who does
                        not exist. Squared to match the mono voice. */}
                    <span
                      className="mono flex h-9 w-9 shrink-0 items-center justify-center rounded-[5px] text-[11px] font-bold"
                      style={{
                        backgroundColor: "var(--slab)",
                        color: "var(--slab-fg)",
                      }}
                      aria-hidden
                    >
                      {initialsOf(tm.name)}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold">
                        {tm.name}
                      </span>
                      <span
                        className="mono block text-[10px] uppercase tracking-wider"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        {tm.role}
                      </span>
                    </span>
                  </figcaption>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── FAQ · two-column, heading sticky ────────────────────────────── */}
        <section
          id="faq"
          className="scroll-mt-24 border-t"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--paper-sunk)",
          }}
        >
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:py-24 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <div className="flex items-center gap-3">
                <span
                  className="mono text-xs font-bold"
                  style={{ color: "var(--brand-text)" }}
                >
                  06
                </span>
                <span
                  aria-hidden
                  className="tricolor h-[3px] w-9 shrink-0 rounded-full"
                />
                <span
                  className="eyebrow"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {t.faq.eyebrow}
                </span>
              </div>
              <h2 className="display mt-5 text-balance text-[clamp(2rem,4.5vw,3rem)] font-extrabold">
                {t.faq.title}
              </h2>
              <p
                className="mt-4 max-w-sm leading-relaxed"
                style={{ color: "var(--muted-foreground)" }}
              >
                {t.faq.subtitle}
              </p>
            </Reveal>

            <div
              className="border-t"
              style={{ borderColor: "var(--border)" }}
            >
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

        {/* ── Employers · full-bleed ink ──────────────────────────────────── */}
        <section className="slab bleed relative overflow-hidden py-20 sm:py-24">
          <span aria-hidden className="grid-paper-ink absolute inset-0" />
          <span aria-hidden className="tricolor absolute inset-x-0 top-0 h-1" />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full blur-3xl"
            style={{ backgroundColor: "var(--brand-glow)" }}
          />
          <Reveal className="relative mx-auto max-w-6xl px-5">
            <div className="grid items-end gap-8 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <span
                  className="eyebrow"
                  style={{ color: "var(--gold-on-ink)" }}
                >
                  {t.spaces.employerLabel}
                </span>
                <h2 className="display mt-5 text-balance text-[clamp(2.25rem,6vw,4rem)] font-extrabold">
                  {t.employers.title}
                </h2>
                <p
                  className="mt-5 max-w-2xl text-pretty leading-relaxed"
                  style={{ color: "var(--slab-muted)" }}
                >
                  {t.employers.text}
                </p>
              </div>
              <div className="lg:pb-2">
                <a
                  href={EMPLOYER_URL}
                  className="btn group w-full px-7 py-4 sm:w-auto"
                  style={{
                    backgroundColor: "var(--slab-fg)",
                    color: "var(--slab)",
                  }}
                >
                  {t.spaces.employerCta}
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </a>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── Contact ────────────────────────────────────────────────────── */}
        <ContactSection />

        {/* ── Final CTA · the close ───────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          <span
            aria-hidden
            className="grid-paper pointer-events-none absolute inset-0"
          />
          <Reveal className="relative mx-auto max-w-3xl px-5 py-24 text-center sm:py-28">
            <span
              aria-hidden
              className="tricolor mx-auto mb-8 block h-1 w-16 rounded-full"
            />
            <h2 className="display text-balance text-[clamp(2.25rem,7vw,4.25rem)] font-extrabold">
              {t.finalCta.title}
            </h2>
            <p
              className="mx-auto mt-6 max-w-xl text-pretty leading-relaxed"
              style={{ color: "var(--muted-foreground)" }}
            >
              {t.finalCta.subtitle}
            </p>
            <a
              href={SIGNUP_URL}
              className="btn btn-brand group mt-10 px-10 py-5 text-lg"
            >
              {t.finalCta.button}
              <ArrowRight
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </a>
            <ul className="mono mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
              {t.hero.note.split("·").map((claim, i) => (
                <li
                  key={claim}
                  className="flex items-center gap-2 text-[11px] uppercase tracking-wider"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: flagAt(i) }}
                  />
                  {claim.trim()}
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      </main>

      <SiteFooter stickyCtaSpacer />

      <StickyMobileCta />
    </div>
  );
}
