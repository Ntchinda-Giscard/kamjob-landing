"use client";

/**
 * KamJob landing page — "Ink & Paper", rebuilt after `landing-page-audit.md`.
 *
 * Narrative (the order is the argument, top to bottom):
 *
 *   Hero        The result (land the interview) without the dread, shown on
 *               the real app — with proof right beside the CTA.
 *   Coverage    Two coverage numbers + the live offer ticker, one quiet band.
 *   Problem     Ink slab, red leads: what job hunting here costs today.
 *   Solution    Scroll tour — one sticky phone, four real screens — then three
 *               extras (a swipe row on phones).
 *   Coach       Ink slab: the interview coach, three screens, three steps.
 *   Proof       Testimonials, placed directly before the price.
 *   Pricing     The free plan first, as a real plan; four passes, one
 *               recommended; the reassurances underneath.
 *   FAQ
 *   Close       A deep-green card straddling the paper and the ink footer,
 *               the app's first screen rising out of its bottom edge.
 *   Footer      Employer row, links, legal (components/site-footer).
 *
 * Design system (tokens and utilities in `app/globals.css`):
 *
 *   Type        Bricolage Grotesque (display) / Public Sans (body) /
 *               JetBrains Mono (labels). One token per heading level:
 *               t-hero (h1 + close), t-h2 (every section), t-h3.
 *   Colour      Green means positive and sign-up — it is the only solid
 *               button colour that signs people up. Red means reject / problem
 *               and appears only in the problem section, as in the app.
 *               The tricolour is the signature: masthead rule, wordmark,
 *               footer. Never cycled through content.
 *   Imagery     Real screenshots in a CSS device frame (`components/phone`).
 *   Motion      One orchestrated hero entrance, a 7s swipe loop on the hero
 *               phone, scroll reveals with a stagger. All of it stops under
 *               prefers-reduced-motion.
 *   Mobile      Rows of 3+ peers become swipe rows (`snap-row`), never long
 *               single-column stacks.
 *
 * Landingfolio references this build adapts (not copies):
 *   ProIntro (phone hero; the free plan as a full card), Lindy / Heyo (one
 *   recommended plan, one signal), beehiiv / Lexboost (proof under the hero
 *   CTA), Surge (a featured quote plus smaller ones), Narrative / Nightwatch
 *   (a CTA card across the footer edge).
 */

import { useEffect, useRef, useState } from "react";
import { KamJobLogo } from "@/components/logo";
import { LangSwitcher } from "@/components/lang-switcher";
import { Phone, Screen } from "@/components/phone";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { useLanguage } from "@/lib/i18n";
import { CONTACT_ROUTE, LOGIN_URL, NAV_LINKS, SIGNUP_URL } from "@/lib/site";
import type { Lang } from "@/lib/translations";
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
  ArrowDown,
  ArrowRight,
  CalendarX,
  Check,
  FileText,
  Menu,
  Plus,
  Radar,
  SearchCheck,
  Send,
  ShieldCheck,
  Smartphone,
  X,
  Zap,
} from "lucide-react";

/** One screen per tour step, in the order of `t.tour.items`. */
const TOUR_SHOTS = [shotFeed, shotFeedSkip, shotApplication, shotProfile];
/** One screen per coach step, in the order of `t.coach.steps`. */
const COACH_SHOTS = [shotCoachChoose, shotCoachPrep, shotCoachChat];

const MORE_ICONS = [Zap, FileText, Radar];
const ASSURANCE_ICONS = [Smartphone, CalendarX, ShieldCheck];

const cssVars = (vars: Record<string, string>) => vars as React.CSSProperties;

const pad = (i: number) => String(i + 1).padStart(2, "0");

/** 7 699 in French (narrow no-break space), 7,699 in English. */
const formatPrice = (n: number, lang: Lang) =>
  new Intl.NumberFormat(lang === "fr" ? "fr-FR" : "en-US").format(n);

/** "Premium Mensuel — Recherche complète" → ["Premium Mensuel", "Recherche complète"]. */
const splitPlanName = (name: string) => {
  const [main, ...rest] = name.split(" — ");
  return [main, rest.join(" — ")] as const;
};

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

// ── Small building blocks ────────────────────────────────────────────────────

/** Squared initials, in the mono voice. Not a stock headshot of someone who
 *  does not exist. */
function Initials({
  name,
  size = "md",
  ring = false,
}: {
  name: string;
  size?: "sm" | "md";
  /** Separates overlapping avatars in a stack. */
  ring?: boolean;
}) {
  return (
    <span
      aria-hidden
      className={`mono flex shrink-0 items-center justify-center rounded-[5px] font-bold ${
        size === "sm" ? "h-8 w-8 text-[11px]" : "h-9 w-9 text-[11px]"
      }`}
      style={{
        backgroundColor: "var(--slab)",
        color: "var(--slab-fg)",
        boxShadow: ring ? "0 0 0 2px var(--paper)" : undefined,
      }}
    >
      {initialsOf(name)}
    </span>
  );
}

/** The reassurance line, split so it cannot be skimmed past. */
function ClaimList({
  note,
  tone = "paper",
  className = "",
}: {
  note: string;
  tone?: "paper" | "brand";
  className?: string;
}) {
  const onBrand = tone === "brand";
  return (
    <ul className={`mono flex flex-wrap gap-x-6 gap-y-2.5 ${className}`}>
      {note.split("·").map((claim) => (
        <li
          key={claim}
          className="flex items-center gap-2 text-[11px] uppercase tracking-wider"
          style={{
            color: onBrand ? "var(--on-brand-muted)" : "var(--muted-foreground)",
          }}
        >
          <Check
            className="h-3 w-3"
            strokeWidth={3}
            style={{
              color: onBrand ? "var(--on-brand)" : "var(--brand-solid)",
            }}
            aria-hidden
          />
          {claim.trim()}
        </li>
      ))}
    </ul>
  );
}

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
          className="group flex w-full items-start justify-between gap-6 py-5 text-left"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-button`}
        >
          <span
            className="display text-lg font-bold leading-snug transition-colors group-hover:text-[var(--brand-text)]"
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
      className="slab fixed inset-x-0 bottom-0 z-50 flex items-center justify-between gap-3 border-t px-4 py-3 transition-transform duration-300 md:hidden"
      style={{
        borderColor: "var(--slab-border)",
        transform: shown ? "none" : "translateY(110%)",
        paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))",
      }}
      aria-hidden={!shown}
    >
      <p
        className="mono text-[11px] uppercase tracking-widest"
        style={{ color: "var(--slab-muted)" }}
      >
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
    <div className="relative mx-auto w-full max-w-[23rem] pb-4 sm:max-w-[26rem]">
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
            sizes="(min-width: 1024px) 220px, 50vw"
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
            sizes="(min-width: 1024px) 270px, 62vw"
          />
          <Screen
            src={shotFeedApply}
            alt=""
            hidden
            priority
            className="swap-loop"
            sizes="(min-width: 1024px) 270px, 62vw"
          />
        </Phone>
      </div>

      {/* The result of the swipe, timed to the swipe frame. Parked low over
          the tab bar so it never hides the app's own "Postuler" button. */}
      <div
        aria-hidden
        className="toast-loop slab absolute bottom-0 right-0 w-[13rem] rounded-xl p-3 shadow-[var(--shadow-lift)]"
      >
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
              className="mt-0.5 text-[11px] leading-snug"
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
                        className="mono flex items-center gap-3 py-1.5 text-left text-[11px] font-bold uppercase tracking-[0.16em] transition-colors hover:text-foreground"
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
                              ? "var(--brand-solid)"
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
                    style={{ color: "var(--brand-text)" }}
                  >
                    <span>{pad(i)}</span>
                    <span
                      aria-hidden
                      className="h-[3px] w-8 rounded-full"
                      style={{ backgroundColor: "var(--brand-solid)" }}
                    />
                    <span>{item.kicker}</span>
                  </p>
                  <h3 className="display t-h3 mt-5 text-balance font-extrabold">
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

        {/* Three extras that have no screen of their own. A swipe row on
            phones instead of three stacked cards. */}
        <div className="pb-20 pt-10 sm:pb-24 lg:pt-6">
          <Reveal className="mb-6 flex items-center gap-3">
            <span
              aria-hidden
              className="h-[3px] w-8 shrink-0 rounded-full"
              style={{ backgroundColor: "var(--brand-solid)" }}
            />
            <h3 className="eyebrow" style={{ color: "var(--muted-foreground)" }}>
              {t.tour.moreTitle}
            </h3>
          </Reveal>
          <ul className="snap-row -mx-5 flex gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0">
            {t.tour.more.map((m, i) => {
              const Icon = MORE_ICONS[i];
              return (
                <li key={m.title} className="w-[78%] shrink-0 sm:w-auto">
                  <Reveal delay={i * 90} className="h-full">
                    <div
                      className="card-lift h-full rounded-2xl border p-6"
                      style={{
                        borderColor: "var(--border)",
                        backgroundColor: "var(--paper-raised)",
                      }}
                    >
                      <span
                        className="flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{ backgroundColor: "var(--brand-pale)" }}
                      >
                        <Icon
                          className="h-5 w-5"
                          strokeWidth={1.75}
                          style={{ color: "var(--brand-text)" }}
                          aria-hidden
                        />
                      </span>
                      <h4 className="display mt-5 text-xl font-bold">
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
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ── Pricing ──────────────────────────────────────────────────────────────────

/**
 * The free plan is the product's main offer, so it is a full card — first,
 * on ink, with the page's green sign-up button. The four passes sit beside it
 * on equal-height cards with their CTAs pinned to the bottom; only the
 * recommended pass is lifted, by one signal (a brand border carrying its
 * label).
 */
function Pricing() {
  const { t, lang } = useLanguage();
  const p = t.pricing;

  return (
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
          eyebrow={p.eyebrow}
          title={p.title}
          subtitle={p.subtitle}
        />

        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,2fr)]">
          <Reveal className="h-full">
            <div className="slab flex h-full flex-col rounded-2xl p-7 sm:p-8">
              <h3 className="eyebrow" style={{ color: "var(--slab-muted)" }}>
                {p.free.name}
              </h3>
              <p className="mt-4 flex flex-wrap items-baseline gap-x-2">
                <span className="display text-6xl font-extrabold leading-none">
                  0
                </span>
                <span
                  className="mono text-[11px] uppercase tracking-wider"
                  style={{ color: "var(--slab-muted)" }}
                >
                  {p.currency} · {p.free.period}
                </span>
              </p>
              <ul className="mt-7 flex-1 space-y-3">
                {p.free.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-sm leading-snug">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0"
                      strokeWidth={3}
                      style={{ color: "var(--brand-on-ink)" }}
                      aria-hidden
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={SIGNUP_URL}
                className="btn btn-brand group mt-8 w-full px-6 py-3.5"
              >
                {p.free.cta}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </a>
            </div>
          </Reveal>

          <ul
            aria-label={p.passesTitle}
            className="snap-row -mx-5 flex gap-4 overflow-x-auto px-5 pb-2 pt-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0"
          >
            {p.plans.map((plan, i) => {
              const [main, sub] = splitPlanName(plan.name);
              const rec = plan.recommended;
              return (
                <li key={plan.name} className="w-[82%] shrink-0 sm:w-auto">
                  <Reveal delay={i * 80} className="h-full">
                    <div
                      className={`relative flex h-full flex-col rounded-2xl p-6 ${
                        rec ? "border-2" : "card-lift border"
                      }`}
                      style={{
                        borderColor: rec
                          ? "var(--brand-solid)"
                          : "var(--border)",
                        backgroundColor: "var(--paper-raised)",
                      }}
                    >
                      {rec && (
                        <span
                          className="mono absolute -top-3 left-5 rounded-[4px] px-2 py-1 text-[11px] font-bold tracking-widest"
                          style={{
                            backgroundColor: "var(--brand-solid)",
                            color: "#ffffff",
                          }}
                        >
                          {p.recommended}
                        </span>
                      )}

                      {/* Name on one line, the nickname (or an empty line)
                          under it, so every price starts at the same height. */}
                      <h3 className="display text-xl font-bold leading-tight">
                        {main}
                      </h3>
                      <p
                        className="mt-1 min-h-[1.25rem] text-sm"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        {sub}
                      </p>

                      <p className="mt-5 flex flex-wrap items-baseline gap-x-2">
                        <span className="display text-4xl font-extrabold leading-none tracking-tight">
                          {formatPrice(plan.price, lang)}
                        </span>
                        <span
                          className="mono text-[11px] uppercase tracking-wider"
                          style={{ color: "var(--muted-foreground)" }}
                        >
                          {p.currency} · {plan.period}
                        </span>
                      </p>

                      <ul
                        className="mt-5 flex-1 space-y-2.5 border-t pt-5"
                        style={{ borderColor: "var(--border)" }}
                      >
                        {plan.features.map((f) => (
                          <li
                            key={f}
                            className="flex gap-2.5 text-sm leading-snug"
                            style={{ color: "var(--muted-foreground)" }}
                          >
                            <Check
                              className="mt-0.5 h-3.5 w-3.5 shrink-0"
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
                        className={`btn mt-6 py-3 text-sm ${
                          rec ? "btn-ink" : "btn-paper"
                        }`}
                        aria-label={`${p.cta} — ${plan.name}`}
                      >
                        {p.cta}
                      </a>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>

        <Reveal>
          <ul
            className="mt-10 grid gap-x-8 gap-y-4 border-t pt-7 sm:grid-cols-3"
            style={{ borderColor: "var(--border-strong)" }}
          >
            {p.assurances.map((a, i) => {
              const Icon = ASSURANCE_ICONS[i];
              return (
                <li key={a} className="flex items-start gap-3 text-sm">
                  <Icon
                    className="mt-0.5 h-4 w-4 shrink-0"
                    strokeWidth={1.75}
                    style={{ color: "var(--brand-text)" }}
                    aria-hidden
                  />
                  {a}
                </li>
              );
            })}
          </ul>
          <p
            className="mono mt-5 text-[11px] uppercase tracking-wider"
            style={{ color: "var(--muted-foreground)" }}
          >
            {p.fairUse}
          </p>
        </Reveal>
      </div>
    </section>
  );
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

  const [featured, ...quotes] = t.testimonials.items;

  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-full focus:border focus:border-border focus:bg-card focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:shadow-[var(--shadow-lift)]"
      >
        {t.nav.skipToContent}
      </a>

      {/* Sticky header. The tricolour caps the page like a masthead rule —
          one of the three places the signature appears. */}
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
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setMenuOpen(false)}
                      tabIndex={menuOpen ? undefined : -1}
                      className="display block py-2.5 text-lg font-bold"
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

          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-14 pt-10 sm:pt-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-10 lg:pb-20 lg:pt-16">
            <div>
              <div
                className="rise-in flex items-center gap-3"
                style={{ animationDelay: "0ms" }}
              >
                <span
                  aria-hidden
                  className="h-[3px] w-8 shrink-0 rounded-full"
                  style={{ backgroundColor: "var(--brand-solid)" }}
                />
                <span
                  className="eyebrow"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {t.hero.badge}
                </span>
              </div>

              {/* Each sentence wipes up from its own clip box and, from lg up,
                  sits on one line: two lines in all. */}
              <h1 className="display t-hero mt-6 font-extrabold">
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
                className="rise-in mt-7 max-w-xl text-pretty text-lg leading-relaxed"
                style={{
                  color: "var(--muted-foreground)",
                  animationDelay: "520ms",
                }}
              >
                {t.hero.subtitle}
              </p>

              {/* One primary button; the secondary action is a text link. */}
              <div
                className="rise-in mt-9 flex flex-col items-start gap-x-7 gap-y-4 sm:flex-row sm:items-center"
                style={{ animationDelay: "660ms" }}
              >
                <a
                  href={SIGNUP_URL}
                  className="btn btn-brand group w-full px-7 py-4 sm:w-auto"
                >
                  {t.hero.ctaPrimary}
                  <ArrowRight
                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </a>
                <a
                  href="#features"
                  className="link-rule group inline-flex items-center gap-2 py-2 text-sm font-semibold"
                >
                  {t.hero.ctaSecondary}
                  <ArrowDown
                    className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
                    aria-hidden
                  />
                </a>
              </div>

              <div className="rise-in" style={{ animationDelay: "760ms" }}>
                <ClaimList note={t.hero.note} className="mt-7" />
              </div>

              {/* Proof at the decision point, not in a block further down. */}
              <figure
                className="rise-in mt-8 flex max-w-lg items-center gap-4 border-t pt-6"
                style={{
                  borderColor: "var(--border)",
                  animationDelay: "860ms",
                }}
              >
                <span className="flex shrink-0 pl-2" aria-hidden>
                  {t.testimonials.items.map((tm) => (
                    <span key={tm.name} className="-ml-2">
                      <Initials name={tm.name} size="sm" ring />
                    </span>
                  ))}
                </span>
                <div className="min-w-0">
                  <blockquote className="text-sm font-semibold leading-snug">
                    «&nbsp;{t.hero.proof.quote}&nbsp;»
                  </blockquote>
                  <figcaption
                    className="mt-1 text-xs"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {t.hero.proof.author}
                  </figcaption>
                </div>
              </figure>
            </div>

            <Reveal delay={140}>
              <HeroPhones />
            </Reveal>
          </div>
        </section>

        {/* ── Coverage · two numbers + the live offer ticker ──────────────── */}
        <section
          className="border-y"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--paper-sunk)",
          }}
          aria-label={t.ticker.label}
        >
          <div className="mx-auto grid max-w-6xl items-center gap-y-5 py-6 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-x-10">
            <ul className="flex gap-8 px-5 lg:pr-0">
              {t.ticker.stats.map((s) => (
                <li key={s.label} className="flex items-center gap-3">
                  <span className="display text-4xl font-extrabold leading-none">
                    {s.value}
                  </span>
                  <span
                    className="mono max-w-[7rem] text-[11px] uppercase leading-snug tracking-wider"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {s.label}
                  </span>
                </li>
              ))}
            </ul>
            <div className="min-w-0">
              <p
                className="eyebrow mb-3 px-5 lg:px-6"
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
                      {t.ticker.items.map((item) => (
                        <span
                          key={`${copy}-${item}`}
                          className="mono flex items-center gap-3 whitespace-nowrap px-6 text-sm font-medium"
                        >
                          <span
                            aria-hidden
                            className="h-1.5 w-1.5 rotate-45"
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
                    aria-hidden
                    className="h-[3px] w-8 shrink-0 rounded-full"
                    style={{ backgroundColor: "var(--red-solid)" }}
                  />
                  <span
                    className="eyebrow"
                    style={{ color: "var(--slab-muted)" }}
                  >
                    {t.problem.eyebrow}
                  </span>
                </div>
                <h2 className="display t-h2 mt-5 text-balance font-extrabold">
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
                        <h3 className="display text-xl font-bold">
                          {item.title}
                        </h3>
                        <p
                          className="mt-2 max-w-xl text-sm leading-relaxed sm:text-base"
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
                <p className="display t-h3 mt-4 max-w-4xl text-balance font-extrabold">
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
          <div
            aria-hidden
            className="pointer-events-none absolute -left-32 top-1/3 h-[28rem] w-[28rem] rounded-full blur-3xl"
            style={{ backgroundColor: "var(--brand-glow)" }}
          />
          <div className="relative mx-auto max-w-6xl px-5 py-20 sm:py-28">
            <SectionHeading
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
                          WebkitTextStroke: "1.5px var(--brand-on-ink)",
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

        {/* ── Proof · testimonials, directly before the price ─────────────
            One featured quote at display size, two smaller beside it (a
            swipe row on phones). */}
        <section className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
          <SectionHeading
            eyebrow={t.testimonials.eyebrow}
            title={t.testimonials.title}
          />
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
            <Reveal as="figure" className="h-full">
              <div
                className="relative flex h-full flex-col justify-between rounded-2xl border p-7 sm:p-10"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--paper-raised)",
                }}
              >
                <span
                  aria-hidden
                  className="display block text-7xl font-extrabold leading-[0.6]"
                  style={{ color: "var(--brand-solid)" }}
                >
                  &ldquo;
                </span>
                <blockquote className="display t-h3 mt-6 text-pretty font-bold">
                  {featured.quote}
                </blockquote>
                <figcaption
                  className="mt-10 flex items-center gap-3 border-t pt-6"
                  style={{ borderColor: "var(--border)" }}
                >
                  <Initials name={featured.name} />
                  <span>
                    <span className="block text-sm font-semibold">
                      {featured.name}
                    </span>
                    <span
                      className="mono block text-[11px] uppercase tracking-wider"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {featured.role}
                    </span>
                  </span>
                </figcaption>
              </div>
            </Reveal>

            <ul className="snap-row -mx-5 flex gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-1 lg:gap-5">
              {quotes.map((tm, i) => (
                <li key={tm.name} className="w-[85%] shrink-0 sm:w-auto">
                  <Reveal as="figure" delay={(i + 1) * 110} className="h-full">
                    <div
                      className="card-lift flex h-full flex-col rounded-2xl border p-6 sm:p-7"
                      style={{
                        borderColor: "var(--border)",
                        backgroundColor: "var(--paper-raised)",
                      }}
                    >
                      <blockquote className="flex-1 text-base leading-relaxed">
                        {tm.quote}
                      </blockquote>
                      <figcaption
                        className="mt-6 flex items-center gap-3 border-t pt-5"
                        style={{ borderColor: "var(--border)" }}
                      >
                        <Initials name={tm.name} />
                        <span>
                          <span className="block text-sm font-semibold">
                            {tm.name}
                          </span>
                          <span
                            className="mono block text-[11px] uppercase tracking-wider"
                            style={{ color: "var(--muted-foreground)" }}
                          >
                            {tm.role}
                          </span>
                        </span>
                      </figcaption>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Pricing ─────────────────────────────────────────────────────── */}
        <Pricing />

        {/* ── FAQ · two-column, heading sticky ────────────────────────────── */}
        <section id="faq" className="scroll-mt-24">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:py-24 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="h-[3px] w-8 shrink-0 rounded-full"
                  style={{ backgroundColor: "var(--brand-solid)" }}
                />
                <span
                  className="eyebrow"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {t.faq.eyebrow}
                </span>
              </div>
              <h2 className="display t-h2 mt-5 text-balance font-extrabold">
                {t.faq.title}
              </h2>
              <p
                className="mt-4 max-w-sm leading-relaxed"
                style={{ color: "var(--muted-foreground)" }}
              >
                {t.faq.subtitle}
              </p>
              <p className="mt-6 text-sm">
                <span style={{ color: "var(--muted-foreground)" }}>
                  {t.faq.more}
                </span>{" "}
                <a
                  href={CONTACT_ROUTE}
                  className="font-semibold underline decoration-[1.5px] underline-offset-4 transition-colors hover:text-[var(--brand-text)]"
                >
                  {t.faq.moreLink}
                </a>
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

        {/* ── The close ───────────────────────────────────────────────────────
            One deep-green card, straddling the paper and the ink footer: the
            page's only large green surface, so the last ask is the sign-up
            colour itself. The app's first screen rises out of its bottom
            edge — the last thing on the page is the first thing in the app. */}
        <section
          className="relative"
          style={{
            background:
              "linear-gradient(to bottom, var(--paper) 0 55%, var(--slab) 55% 100%)",
          }}
        >
          <div className="mx-auto max-w-6xl px-5 pt-8 sm:pt-12">
            <Reveal>
              <div
                className="relative overflow-hidden rounded-[1.75rem] px-6 pt-12 sm:px-12 sm:pt-14 lg:px-16"
                style={{
                  backgroundColor: "var(--brand-deep)",
                  color: "var(--on-brand)",
                }}
              >
                <span
                  aria-hidden
                  className="grid-paper-ink pointer-events-none absolute inset-0 opacity-70"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full blur-3xl"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                />

                <div className="relative grid items-end gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
                  <div className="pb-12 sm:pb-14">
                    <h2 className="display t-hero text-balance font-extrabold">
                      {t.finalCta.title}
                    </h2>
                    <p
                      className="mt-6 max-w-lg text-pretty text-lg leading-relaxed"
                      style={{ color: "var(--on-brand-muted)" }}
                    >
                      {t.finalCta.subtitle}
                    </p>
                    <a
                      href={SIGNUP_URL}
                      className="btn btn-on-brand group mt-9 w-full px-9 py-[1.125rem] text-lg sm:w-auto"
                    >
                      {t.finalCta.button}
                      <ArrowRight
                        className="h-5 w-5 transition-transform group-hover:translate-x-1"
                        aria-hidden
                      />
                    </a>
                    <ClaimList note={t.hero.note} tone="brand" className="mt-7" />
                  </div>

                  {/* Clipped by its own box, so the phone rises out of the
                      card's bottom edge. */}
                  <div className="mx-auto h-[17rem] w-[15rem] overflow-hidden sm:h-[20rem] sm:w-[17rem] lg:mr-0">
                    <Phone tone="light">
                      <Screen
                        src={shotOnboarding}
                        alt={t.finalCta.phoneAlt}
                        sizes="272px"
                      />
                    </Phone>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter stickyCtaSpacer />

      <StickyMobileCta />
    </div>
  );
}
