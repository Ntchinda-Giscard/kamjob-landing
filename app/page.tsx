"use client";

/**
 * KamJob landing page — "Ink & Paper", built around the real app.
 *
 * Narrative (the order is the argument, top to bottom):
 *
 *   Hero        The end result (land the interview) without the thing people
 *               dread (writing emails, redoing CVs), shown on the actual app.
 *   Proof       Stats bar, live-offer ticker, testimonials.
 *   Problem     Ink slab: what job hunting here costs today.
 *   Solution    Scroll tour — one sticky phone, four real screens, each a
 *               feature + its benefit. Then three extras.
 *   Coach       Ink slab: the interview coach, three screens, three steps.
 *   How         Three steps, nothing more.
 *   Pricing · Trust · FAQ · Employers · Contact
 *   Close       Benefit headline + CTA, with the app's first screen rising
 *               out of the bottom edge.
 *
 * Design decisions this file assumes (tokens and utilities live in
 * `app/globals.css`):
 *
 *   Type        Bricolage Grotesque (display) / Public Sans (body) /
 *               JetBrains Mono (eyebrows, data, tickers).
 *   Colour      Cameroon tricolour used structurally — rules, spines,
 *               markers, outlined numerals. Red leads only in the problem
 *               section, where it means what it means in the app: reject.
 *   Imagery     Real screenshots in a CSS device frame (`components/phone`),
 *               never illustrations of the product.
 *   Motion      One orchestrated hero entrance, a 7s swipe loop on the hero
 *               phone, scroll reveals with a stagger. All of it stops under
 *               prefers-reduced-motion.
 */

import { useEffect, useRef, useState } from "react";
import { KamJobLogo } from "@/components/logo";
import { LangSwitcher } from "@/components/lang-switcher";
import { ContactSection } from "@/components/contact-section";
import { Phone, Screen } from "@/components/phone";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { useLanguage } from "@/lib/i18n";
import { EMPLOYER_URL, LOGIN_URL, NAV_LINKS, SIGNUP_URL } from "@/lib/site";
import shotFeed from "@/assets/screens/feed.webp";
import shotFeedApply from "@/assets/screens/feed-apply.webp";
import shotFeedSkip from "@/assets/screens/feed-skip.webp";
import shotApplication from "@/assets/screens/application.webp";
import shotProfile from "@/assets/screens/profile.webp";
import shotCoachChoose from "@/assets/screens/coach-choose.webp";
import shotCoachPrep from "@/assets/screens/coach-prep.webp";
import shotCoachChat from "@/assets/screens/coach-chat.webp";
import shotOnboarding from "@/assets/screens/onboarding.webp";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  FileText,
  Menu,
  Plus,
  Radar,
  SearchCheck,
  Send,
  ShieldCheck,
  Smartphone,
  Wallet,
  X,
  Zap,
} from "lucide-react";

/** One screen per tour step, in the order of `t.tour.items`. */
const TOUR_SHOTS = [shotFeed, shotFeedSkip, shotApplication, shotProfile];
/** One screen per coach step, in the order of `t.coach.steps`. */
const COACH_SHOTS = [shotCoachChoose, shotCoachPrep, shotCoachChat];

const MORE_ICONS = [Zap, FileText, Radar];
const TRUST_ICONS = [Wallet, ShieldCheck, Smartphone];

/** Flag order. Cycled for rules and outlined numerals so the palette reads
 *  as one rotating system instead of several unrelated accent colours.
 *  `-solid` fills shapes; `-text` / `-on-ink` are the AA-safe text variants. */
const FLAG = ["var(--brand-solid)", "var(--red-solid)", "var(--gold-solid)"];
const FLAG_TEXT = ["var(--brand-text)", "var(--red-text)", "var(--gold-text)"];
const FLAG_ON_INK = [
  "var(--brand-on-ink)",
  "var(--red-on-ink)",
  "var(--gold-on-ink)",
];
const flagAt = (i: number) => FLAG[i % 3];

const cssVars = (vars: Record<string, string>) => vars as React.CSSProperties;

const pad = (i: number) => String(i + 1).padStart(2, "0");

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

// ── Hero visual ──────────────────────────────────────────────────────────────

/**
 * Two real screens. In front, the feed: the resting card cross-fades to the
 * same card swiped to "Postuler" and the confirmation toast lands — the whole
 * product in one 7-second loop. Behind it, tilted the other way, the tracking
 * screen: what that swipe turns into.
 */
function HeroPhones() {
  const { t } = useLanguage();

  return (
    <div className="relative mx-auto w-full max-w-[23rem] pb-4 sm:max-w-[27rem]">
      <div
        aria-hidden
        className="absolute right-[3%] top-14 w-[54%]"
        style={{ transform: "rotate(7deg)" }}
      >
        <Phone>
          <Screen
            src={shotApplication}
            alt=""
            hidden
            sizes="(min-width: 1024px) 230px, 50vw"
          />
        </Phone>
      </div>

      <div
        className="animate-float relative w-[66%]"
        style={cssVars({ "--tilt": "-4deg" })}
      >
        <Phone>
          <Screen
            src={shotFeed}
            alt={t.mockup.feedAlt}
            priority
            sizes="(min-width: 1024px) 290px, 62vw"
          />
          <Screen
            src={shotFeedApply}
            alt=""
            hidden
            priority
            className="swap-loop"
            sizes="(min-width: 1024px) 290px, 62vw"
          />
        </Phone>
      </div>

      {/* The result of the swipe, timed to the swipe frame. */}
      <div
        aria-hidden
        className="toast-loop slab absolute bottom-[14%] right-0 w-[13rem] rounded-xl p-3 shadow-[var(--shadow-lift)]"
      >
        <span
          aria-hidden
          className="tricolor absolute inset-x-3 top-0 h-[3px] rounded-b-full"
        />
        <div className="flex items-start gap-2.5">
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: "var(--brand-solid)", color: "#fff" }}
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

// ── Solution: scroll tour ────────────────────────────────────────────────────

/**
 * Feature + benefit + visual, four times. On desktop one phone stays pinned
 * and swaps screens as each block crosses the middle of the viewport; on
 * mobile every block carries its own phone, because a pinned phone would eat
 * the whole screen.
 */
function FeatureTour() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const steps = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const nodes = steps.current.filter((n): n is HTMLDivElement => !!n);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.step));
          }
        }
      },
      // A thin band across the middle of the viewport: whichever block
      // crosses it owns the phone.
      { rootMargin: "-45% 0px -45% 0px" },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  const goTo = (i: number) =>
    steps.current[i]?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "center",
    });

  return (
    <section id="features" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 pt-20 sm:pt-24">
        <SectionHeading
          index="03"
          eyebrow={t.tour.eyebrow}
          title={t.tour.title}
          subtitle={t.tour.subtitle}
        />

        <div className="lg:grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-14">
          {/* Pinned phone + step rail (desktop only). */}
          <div className="hidden lg:block">
            <div className="sticky top-20 flex h-[calc(100vh-6rem)] items-center justify-center gap-8">
              <ol className="flex flex-col gap-2" aria-label={t.tour.eyebrow}>
                {t.tour.items.map((item, i) => {
                  const on = i === active;
                  return (
                    <li key={item.kicker}>
                      <button
                        type="button"
                        onClick={() => goTo(i)}
                        aria-current={on ? "step" : undefined}
                        className="mono flex items-center gap-3 py-1.5 text-left text-[10px] font-bold uppercase tracking-[0.16em] transition-colors"
                        style={{
                          color: on
                            ? "var(--foreground)"
                            : "var(--muted-foreground)",
                        }}
                      >
                        <span
                          aria-hidden
                          className="h-8 w-[3px] rounded-full transition-colors duration-300"
                          style={{
                            backgroundColor: on
                              ? flagAt(i)
                              : "var(--border-strong)",
                          }}
                        />
                        <span>{pad(i)}</span>
                        <span>{item.kicker}</span>
                      </button>
                    </li>
                  );
                })}
              </ol>

              {/* Sized off the viewport height too, so a short laptop
                  screen still fits the whole device. */}
              <div style={{ width: "min(18.5rem, calc((100vh - 9rem) * 0.45))" }}>
                <Phone>
                  {TOUR_SHOTS.map((src, i) => (
                    <Screen
                      key={src.src}
                      src={src}
                      alt={t.tour.items[i].alt}
                      hidden={i !== active}
                      className="tour-layer"
                      style={{ opacity: i === active ? 1 : 0 }}
                      sizes="296px"
                    />
                  ))}
                </Phone>
              </div>
            </div>
          </div>

          {/* The steps. */}
          <div>
            {t.tour.items.map((item, i) => (
              <div
                key={item.kicker}
                ref={(el) => {
                  steps.current[i] = el;
                }}
                data-step={i}
                className="flex flex-col justify-center py-10 first:pt-0 lg:min-h-[80vh] lg:py-0 lg:first:pt-0"
              >
                <Reveal>
                  <div className="mx-auto mb-10 w-[14rem] sm:w-[15rem] lg:hidden">
                    <Phone>
                      <Screen
                        src={TOUR_SHOTS[i]}
                        alt={item.alt}
                        sizes="240px"
                      />
                    </Phone>
                  </div>

                  <p
                    className="mono flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em]"
                    style={{ color: FLAG_TEXT[i % 3] }}
                  >
                    <span>{pad(i)}</span>
                    <span
                      aria-hidden
                      className="h-[3px] w-8 rounded-full"
                      style={{ backgroundColor: flagAt(i) }}
                    />
                    <span>{item.kicker}</span>
                  </p>
                  <h3 className="display mt-5 text-balance text-[clamp(1.85rem,3.4vw,2.75rem)] font-extrabold">
                    {item.title}
                  </h3>
                  <p
                    className="mt-5 max-w-lg text-pretty leading-relaxed"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {item.text}
                  </p>
                  <ul
                    className="mt-7 max-w-lg border-t"
                    style={{ borderColor: "var(--border)" }}
                  >
                    {item.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 border-b py-3 text-sm"
                        style={{ borderColor: "var(--border)" }}
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0"
                          strokeWidth={3}
                          style={{ color: "var(--brand-solid)" }}
                          aria-hidden
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            ))}
          </div>
        </div>

        {/* Three extras that have no screen of their own. */}
        <div className="pb-20 pt-10 sm:pb-24 lg:pt-6">
          <Reveal className="mb-6 flex items-center gap-3">
            <span
              aria-hidden
              className="tricolor h-[3px] w-9 shrink-0 rounded-full"
            />
            <h3 className="eyebrow" style={{ color: "var(--muted-foreground)" }}>
              {t.tour.moreTitle}
            </h3>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            {t.tour.more.map((m, i) => {
              const Icon = MORE_ICONS[i];
              return (
                <Reveal key={m.title} delay={i * 90}>
                  <div
                    className="card-lift relative h-full overflow-hidden rounded-2xl border p-6"
                    style={{
                      borderColor: "var(--border)",
                      backgroundColor: "var(--paper-raised)",
                    }}
                  >
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-[3px]"
                      style={{ backgroundColor: flagAt(i) }}
                    />
                    <Icon
                      className="h-5 w-5"
                      strokeWidth={1.5}
                      style={{ color: FLAG_TEXT[i % 3] }}
                      aria-hidden
                    />
                    <h4 className="display mt-5 text-lg font-bold">
                      {m.title}
                    </h4>
                    <p
                      className="mt-2.5 text-sm leading-relaxed"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {m.text}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Small building blocks ────────────────────────────────────────────────────

/** FAQ row. Hairline-separated rather than boxed, with a rotating plus. */
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

/** The reassurance line, split so it cannot be skimmed past. */
function ClaimList({
  note,
  className = "",
}: {
  note: string;
  className?: string;
}) {
  return (
    <ul className={`mono flex flex-wrap gap-x-6 gap-y-2.5 ${className}`}>
      {note.split("·").map((claim, i) => (
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

// ── Page ─────────────────────────────────────────────────────────────────────

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
              className="eyebrow hidden items-center gap-7 lg:flex"
              style={{ color: "var(--muted-foreground)" }}
              aria-label="Principal"
            >
              {NAV_LINKS.filter((l) => l.header).map((l) => (
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
                className="mono hidden items-center gap-1.5 text-[11px] uppercase tracking-widest xl:inline-flex"
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
              <a href={SIGNUP_URL} className="btn btn-brand px-4 py-2 text-sm">
                {t.nav.signup}
              </a>
              <button
                className="btn-press -mr-1 rounded-md p-2 hover:bg-secondary lg:hidden"
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

          {/* Mobile nav — section links are otherwise unreachable below lg. */}
          <nav
            id="mobile-nav"
            className="collapse-grid border-t lg:hidden"
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
                      style={{ color: FLAG_TEXT[i % 3] }}
                    >
                      {pad(i)}
                    </span>
                    <a
                      href={l.href}
                      onClick={() => setMenuOpen(false)}
                      tabIndex={menuOpen ? undefined : -1}
                      className="display text-lg font-bold"
                    >
                      {t.nav[l.key]}
                    </a>
                  </li>
                ))}
                <li className="sm:hidden">
                  <a
                    href={LOGIN_URL}
                    tabIndex={menuOpen ? undefined : -1}
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

          <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-16 pt-12 lg:grid-cols-[1.12fr_minmax(0,0.88fr)] lg:pb-20 lg:pt-16">
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
              <h1 className="display mt-6 text-[clamp(2.6rem,6.8vw,4.75rem)] font-extrabold">
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
                <a href={SIGNUP_URL} className="btn btn-brand group px-7 py-4">
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

              <div className="rise-in" style={{ animationDelay: "780ms" }}>
                <ClaimList note={t.hero.note} className="mt-8" />
              </div>
            </div>

            <Reveal delay={140}>
              <HeroPhones />
            </Reveal>
          </div>
        </section>

        {/* ── Proof · full-bleed ink data bar ─────────────────────────────── */}
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

        {/* ── Proof · offers ticker ──────────────────────────────────────── */}
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

        {/* ── Proof · testimonials, staggered ─────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
          <SectionHeading
            index="01"
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

        {/* ── Problem · ink slab, red leads ───────────────────────────────────
            The only section where red is the accent: in the app it is the
            "Ignorer" colour, and here it marks what the visitor is
            leaving behind. */}
        <section className="slab bleed relative overflow-hidden">
          <span aria-hidden className="grid-paper-ink absolute inset-0 opacity-50" />
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-1"
            style={{ backgroundColor: "var(--red-solid)" }}
          />
          <div className="relative mx-auto max-w-6xl px-5 py-20 sm:py-24">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
              <Reveal className="lg:sticky lg:top-28 lg:self-start">
                <div className="flex items-center gap-3">
                  <span
                    className="mono text-xs font-bold"
                    style={{ color: "var(--red-on-ink)" }}
                  >
                    02
                  </span>
                  <span
                    aria-hidden
                    className="h-[3px] w-9 shrink-0 rounded-full"
                    style={{ backgroundColor: "var(--red-solid)" }}
                  />
                  <span
                    className="eyebrow"
                    style={{ color: "var(--slab-muted)" }}
                  >
                    {t.problem.eyebrow}
                  </span>
                </div>
                <h2 className="display mt-5 text-balance text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold">
                  {t.problem.title}
                </h2>
                <p
                  className="mt-5 max-w-md text-pretty leading-relaxed"
                  style={{ color: "var(--slab-muted)" }}
                >
                  {t.problem.subtitle}
                </p>
              </Reveal>

              <ol
                className="border-t"
                style={{ borderColor: "var(--slab-border)" }}
              >
                {t.problem.items.map((item, i) => (
                  <Reveal as="li" key={item.title} delay={i * 90}>
                    <div
                      className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-3 border-b py-6 sm:py-7"
                      style={{ borderColor: "var(--slab-border)" }}
                    >
                      <span
                        aria-hidden
                        className="mono flex items-center gap-1.5 self-start pt-1 text-[11px] font-bold"
                        style={{ color: "var(--red-on-ink)" }}
                      >
                        <X className="h-3 w-3" strokeWidth={3} />
                        {pad(i)}
                      </span>
                      <div>
                        <h3 className="display text-xl font-bold sm:text-[1.375rem]">
                          {item.title}
                        </h3>
                        <p
                          className="mt-2 max-w-xl text-sm leading-relaxed sm:text-[15px]"
                          style={{ color: "var(--slab-muted)" }}
                        >
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>

            <Reveal className="mt-14 sm:mt-16">
              <div
                className="border-l-4 pl-6 sm:pl-8"
                style={{ borderColor: "var(--red-solid)" }}
              >
                <p className="eyebrow" style={{ color: "var(--red-on-ink)" }}>
                  {t.problem.costLabel}
                </p>
                <p className="display mt-4 max-w-4xl text-balance text-[clamp(1.6rem,3.6vw,2.6rem)] font-extrabold">
                  {t.problem.cost}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Solution · scroll tour ─────────────────────────────────────── */}
        <FeatureTour />

        {/* ── Interview coach · ink slab, three screens ──────────────────── */}
        <section
          id="coach"
          className="slab bleed relative scroll-mt-16 overflow-hidden"
        >
          <span aria-hidden className="grid-paper-ink absolute inset-0 opacity-60" />
          <span aria-hidden className="tricolor absolute inset-x-0 top-0 h-1" />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-32 top-1/3 h-[28rem] w-[28rem] rounded-full blur-3xl"
            style={{ backgroundColor: "var(--brand-glow)" }}
          />
          <div className="relative mx-auto max-w-6xl px-5 py-20 sm:py-28">
            <SectionHeading
              index="04"
              tone="ink"
              eyebrow={t.coach.eyebrow}
              title={t.coach.title}
              subtitle={t.coach.subtitle}
            />

            {/* Swipe row on phones, three-up grid from sm. The middle step
                sits lower so the row reads as a sequence, not a lineup. */}
            <ol className="snap-row -mx-5 flex gap-5 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:gap-10">
              {t.coach.steps.map((step, i) => (
                <li key={step.title} className="w-[72%] shrink-0 sm:w-auto">
                  <Reveal delay={i * 120} className={i === 1 ? "sm:mt-14" : ""}>
                    <Phone className="mx-auto w-full max-w-[16rem]">
                      <Screen
                        src={COACH_SHOTS[i]}
                        alt={step.alt}
                        sizes="(min-width: 640px) 256px, 72vw"
                      />
                    </Phone>
                    <div className="mt-8 flex gap-4">
                      <span
                        aria-hidden
                        className="display text-[2.75rem] font-extrabold leading-[0.8]"
                        style={{
                          color: "transparent",
                          WebkitTextStroke: `1.5px ${FLAG_ON_INK[i % 3]}`,
                        }}
                      >
                        {pad(i)}
                      </span>
                      <div>
                        <h3 className="display text-xl font-bold">
                          {step.title}
                        </h3>
                        <p
                          className="mt-2 text-sm leading-relaxed"
                          style={{ color: "var(--slab-muted)" }}
                        >
                          {step.text}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>

            <Reveal className="mt-14 sm:mt-16">
              <div
                className="grid items-center gap-6 border-t pt-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12"
                style={{ borderColor: "var(--slab-border)" }}
              >
                <p
                  className="flex max-w-2xl gap-3 text-sm leading-relaxed"
                  style={{ color: "var(--slab-muted)" }}
                >
                  <SearchCheck
                    className="mt-0.5 h-5 w-5 shrink-0"
                    strokeWidth={1.5}
                    style={{ color: "var(--brand-on-ink)" }}
                    aria-hidden
                  />
                  {t.coach.note}
                </p>
                <a
                  href={SIGNUP_URL}
                  className="btn btn-brand group justify-self-start px-7 py-4"
                >
                  {t.coach.cta}
                  <ArrowRight
                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── How it works · outlined numerals ────────────────────────────── */}
        <section
          id="how"
          className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:py-24"
        >
          <SectionHeading
            index="05"
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
                    {pad(i)}
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
              index="06"
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

                      {/* Two lines reserved: plan names wrap unevenly across
                          both locales, and a ragged price baseline across the
                          row is the first thing the eye catches. */}
                      <h3
                        className="eyebrow leading-relaxed sm:min-h-[2.6em]"
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
                  07
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

            <div className="border-t" style={{ borderColor: "var(--border)" }}>
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
                  {t.employers.label}
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
                  {t.employers.cta}
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

        {/* ── Final CTA · the close ───────────────────────────────────────────
            The app's own first screen rises out of the section's bottom edge:
            the last thing on the page is the first thing in the app. */}
        <section className="relative overflow-hidden">
          <span
            aria-hidden
            className="grid-paper pointer-events-none absolute inset-0"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-40 right-[-8rem] h-[32rem] w-[32rem] rounded-full blur-3xl"
            style={{ backgroundColor: "var(--brand-glow)" }}
          />
          <div className="relative mx-auto grid max-w-6xl items-end gap-14 px-5 pt-24 sm:pt-28 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <Reveal className="lg:pb-28">
              <span
                aria-hidden
                className="tricolor mb-8 block h-1 w-16 rounded-full"
              />
              <h2 className="display text-balance text-[clamp(2.4rem,6.4vw,4.5rem)] font-extrabold">
                {t.finalCta.title}
              </h2>
              <p
                className="mt-6 max-w-xl text-pretty leading-relaxed"
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
              <ClaimList note={t.hero.note} className="mt-8" />
            </Reveal>

            <Reveal delay={140} className="-mb-40 sm:-mb-48">
              <Phone tone="light" className="mx-auto w-[15rem] sm:w-[17rem]">
                <Screen
                  src={shotOnboarding}
                  alt={t.finalCta.phoneAlt}
                  sizes="272px"
                />
              </Phone>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter stickyCtaSpacer />

      <StickyMobileCta />
    </div>
  );
}
