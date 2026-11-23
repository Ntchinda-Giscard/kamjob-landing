import { Reveal } from "@/components/reveal";

/**
 * Section marker: a short accent rule + mono eyebrow, then the title, with the
 * subtitle set beside it on wide screens rather than stacked under it.
 *
 * Every section title uses the one `t-h2` token, so the page has a single
 * heading level instead of a size per section. The rule is a single accent
 * colour — brand green, or red for the problem section, where red means what
 * it means in the app (reject). The tricolour stays out of section headings:
 * it is reserved for the masthead, the wordmark and the footer.
 *
 * `align="center"` is kept for the standalone contact page.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "start",
  tone = "paper",
  accent = "brand",
  /** The contact page uses this as its h1. */
  level = 2,
  className = "",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "start" | "center";
  tone?: "paper" | "ink";
  accent?: "brand" | "red";
  level?: 1 | 2;
  className?: string;
}) {
  const centered = align === "center";
  const onInk = tone === "ink";
  const muted = onInk ? "var(--slab-muted)" : "var(--muted-foreground)";
  const rule =
    accent === "red"
      ? "var(--red-solid)"
      : onInk
        ? "var(--brand-on-ink)"
        : "var(--brand-solid)";
  const Heading = level === 1 ? "h1" : "h2";

  return (
    <Reveal
      className={`mb-12 sm:mb-14 ${centered ? "text-center" : ""} ${className}`}
    >
      <div
        className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}
      >
        <span
          aria-hidden
          className="h-[3px] w-8 shrink-0 rounded-full"
          style={{ backgroundColor: rule }}
        />
        <span className="eyebrow" style={{ color: muted }}>
          {eyebrow}
        </span>
      </div>

      <div
        className={
          centered
            ? "mt-5"
            : "mt-5 grid gap-x-12 gap-y-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-end"
        }
      >
        <Heading
          className="display t-h2 text-balance font-extrabold"
          style={onInk ? { color: "var(--slab-fg)" } : undefined}
        >
          {title}
        </Heading>
        {subtitle && (
          <p
            className={`max-w-xl text-pretty leading-relaxed ${
              centered ? "mx-auto mt-4" : "lg:pb-2"
            }`}
            style={{ color: muted }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </Reveal>
  );
}
