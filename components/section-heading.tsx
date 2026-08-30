import { Reveal } from "@/components/reveal";

/** Eyebrow + title + optional subtitle, centred. Used by every section so the
 *  page has one consistent rhythm instead of ad-hoc heading stacks. */
export function SectionHeading({
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
