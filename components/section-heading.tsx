import { Reveal } from "@/components/reveal";

/**
 * Section marker. Every heading on the old page was the same centred
 * eyebrow → title → subtitle stack, which is what made six different sections
 * read as one repeated template. This one is left-aligned and indexed: a
 * numbered mono eyebrow sitting on the tricolour rule, then the title, with
 * the subtitle set beside it on wide screens rather than stacked under it.
 *
 * `align="center"` stays available for the two places a centred axis is
 * genuinely right (the standalone contact panel and the closing CTA).
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  /** Two-digit section index rendered before the eyebrow, e.g. "03". */
  index,
  align = "start",
  tone = "paper",
  className = "",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  index?: string;
  align?: "start" | "center";
  tone?: "paper" | "ink";
  className?: string;
}) {
  const centered = align === "center";
  const muted = tone === "ink" ? "var(--slab-muted)" : "var(--muted-foreground)";
  const accent = tone === "ink" ? "var(--brand-on-ink)" : "var(--brand-text)";

  return (
    <Reveal
      className={`mb-12 sm:mb-14 ${centered ? "text-center" : ""} ${className}`}
    >
      <div
        className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}
      >
        {index && (
          <span className="mono text-xs font-bold" style={{ color: accent }}>
            {index}
          </span>
        )}
        <span
          aria-hidden
          className="tricolor h-[3px] w-9 shrink-0 rounded-full"
        />
        {eyebrow && (
          <span className="eyebrow" style={{ color: muted }}>
            {eyebrow}
          </span>
        )}
      </div>

      <div
        className={
          centered
            ? "mt-5"
            : "mt-5 grid gap-x-12 gap-y-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-end"
        }
      >
        <h2
          className="display text-balance text-[clamp(2rem,5vw,3.25rem)] font-extrabold"
          style={tone === "ink" ? { color: "var(--slab-fg)" } : undefined}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={`text-pretty leading-relaxed ${
              centered ? "mx-auto mt-4 max-w-2xl" : "lg:pb-2"
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
