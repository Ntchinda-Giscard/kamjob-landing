"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ChevronDown, Printer, Scale } from "lucide-react";
import { KamJobLogo } from "@/components/logo";
import { LangSwitcher } from "@/components/lang-switcher";
import { SiteFooter } from "@/components/site-footer";
import { useLanguage } from "@/lib/i18n";
import { legal, type LegalBlock, type LegalDocKey } from "@/lib/legal";
import { LEGAL_ROUTES } from "@/lib/site";

/** Renders the block list of a single article. */
function Blocks({ blocks }: { blocks: readonly LegalBlock[] }) {
  const { lang } = useLanguage();
  const ui = legal[lang].ui;

  return (
    <>
      {blocks.map((block, i) => {
        switch (block.kind) {
          case "p":
            return (
              <p key={i} className="text-pretty leading-relaxed">
                {block.text}
              </p>
            );

          case "list":
            return (
              <ul key={i} className="space-y-2.5">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3 leading-relaxed">
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: "var(--brand-solid)" }}
                    />
                    <span className="text-pretty">{item}</span>
                  </li>
                ))}
              </ul>
            );

          case "defs":
            return (
              <dl key={i} className="space-y-4">
                {block.items.map((item, j) => (
                  <div
                    key={j}
                    className="border-l-2 pl-4"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <dt className="font-semibold text-foreground">
                      {item.term}
                    </dt>
                    <dd className="mt-1 leading-relaxed text-pretty">
                      {item.text}
                    </dd>
                  </div>
                ))}
              </dl>
            );

          case "note":
            return (
              <p
                key={i}
                className="rounded-lg p-4 leading-relaxed text-pretty"
                style={{
                  backgroundColor: "var(--brand-pale)",
                  color: "var(--brand-text)",
                }}
              >
                {block.text}
              </p>
            );

          case "warn":
            return (
              <p
                key={i}
                className="rounded-lg p-4 font-medium leading-relaxed text-pretty"
                style={{
                  backgroundColor: "var(--amber-pale)",
                  color: "var(--amber-text)",
                }}
              >
                {block.text}
              </p>
            );

          case "table":
            return (
              <figure key={i} className="space-y-2">
                <figcaption className="text-sm font-semibold text-foreground">
                  {block.caption}
                </figcaption>
                {/* Legal tables are wide by nature: the wrapper scrolls rather
                    than the page, and is focusable so it scrolls by keyboard. */}
                <div
                  className="overflow-x-auto rounded-lg border border-border"
                  tabIndex={0}
                  role="region"
                  aria-label={`${block.caption} — ${ui.tableScrollHint}`}
                >
                  <table className="w-full min-w-[38rem] border-collapse text-sm">
                    <thead>
                      <tr className="bg-secondary text-left">
                        {block.head.map((cell) => (
                          <th
                            key={cell}
                            scope="col"
                            className="px-4 py-3 font-semibold text-foreground align-top"
                          >
                            {cell}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, j) => (
                        <tr key={j} className="border-t border-border">
                          {row.map((cell, k) => (
                            <td
                              key={k}
                              className="px-4 py-3 align-top leading-relaxed"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </figure>
            );
        }
      })}
    </>
  );
}

/**
 * Renders one legal document (terms or privacy policy) from `lib/legal.ts`.
 *
 * Both documents share this layout so the two pages read as one body of rules:
 * a sticky table of contents on wide screens, numbered articles with stable
 * anchor ids, and the site footer underneath.
 */
export function LegalDocument({ doc }: { doc: LegalDocKey }) {
  const { lang } = useLanguage();
  const ui = legal[lang].ui;
  const document = legal[lang][doc];
  const other = doc === "terms" ? "privacy" : "terms";
  const otherDoc = legal[lang][other];

  // The index is a sidebar on wide screens and a collapsed summary on phones,
  // where nineteen articles would otherwise push the text off the first screen.
  // Starts open so a no-JS visitor and crawlers still get the whole index.
  const [tocOpen, setTocOpen] = useState(true);
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const apply = () => setTocOpen(wide.matches);
    apply();
    wide.addEventListener("change", apply);
    return () => wide.removeEventListener("change", apply);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Reduced header: the legal pages are a reading context, not a funnel. */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between gap-4">
          <a href="/" aria-label="KamJob">
            <KamJobLogo size="small" />
          </a>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden />
              {ui.backHome}
            </a>
            <LangSwitcher />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 py-12 sm:py-16">
        <div className="max-w-3xl">
          <p
            className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em]"
            style={{ color: "var(--brand-text)" }}
          >
            <Scale className="w-4 h-4" aria-hidden />
            {document.label.toUpperCase()}
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight text-balance">
            {document.title}
          </h1>
          <p className="mt-4 text-muted-foreground leading-relaxed text-pretty">
            {document.subtitle}
          </p>
          <div
            className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-
          muted-foreground"
          >
            <span>
              {ui.updated} : {document.updated}
            </span>
            <span aria-hidden>·</span>
            <span>
              {ui.version} {document.version}
            </span>
          </div>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
          {/* Table of contents — sticky beside the text on wide screens, a
              plain index above it on narrow ones. */}
          <nav
            aria-label={ui.toc}
            className="lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto rounded-lg border border-border p-4 lg:border-0 lg:p-0"
          >
            <details
              open={tocOpen}
              onToggle={(e) => setTocOpen(e.currentTarget.open)}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-sm font-semibold text-foreground [&::-webkit-details-marker]:hidden lg:mb-3 lg:cursor-default">
                {ui.toc}
                <ChevronDown
                  className="w-4 h-4 shrink-0 transition-transform lg:hidden"
                  style={{ transform: tocOpen ? "rotate(180deg)" : "none" }}
                  aria-hidden
                />
              </summary>
              <ol className="mt-3 space-y-2 text-sm text-muted-foreground lg:mt-0">
                {document.sections.map((section, i) => (
                  <li key={section.id} className="flex gap-2">
                    <span aria-hidden className="tabular-nums shrink-0">
                      {i + 1}.
                    </span>
                    <a
                      href={`#${section.id}`}
                      className="hover:text-foreground transition-colors"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </details>

            <div className="mt-8 hidden lg:block space-y-3 border-t border-border pt-6">
              <p className="text-sm font-semibold text-foreground">
                {ui.alsoRead}
              </p>
              <a
                href={LEGAL_ROUTES[other]}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {otherDoc.label}
              </a>
              <button
                type="button"
                onClick={() => window.print()}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Printer className="w-4 h-4" aria-hidden />
                {ui.print}
              </button>
            </div>
          </nav>

          <div className="min-w-0 space-y-12">
            {document.sections.map((section, i) => (
              <section
                key={section.id}
                id={section.id}
                // Sticky header would otherwise cover the heading a deep link
                // lands on.
                className="scroll-mt-24"
                aria-labelledby={`${section.id}-title`}
              >
                <h2
                  id={`${section.id}-title`}
                  className="text-xl sm:text-2xl font-bold text-foreground tracking-tight text-balance"
                >
                  <span
                    aria-hidden
                    className="tabular-nums mr-2"
                    style={{ color: "var(--brand-text)" }}
                  >
                    {i + 1}.
                  </span>
                  {section.title}
                </h2>
                <div className="mt-5 space-y-5 text-muted-foreground">
                  <Blocks blocks={section.blocks} />
                </div>
              </section>
            ))}

            <p className="border-t border-border pt-8 text-sm text-muted-foreground italic text-pretty">
              {document.note}
            </p>

            <a
              href={LEGAL_ROUTES[other]}
              className="lg:hidden inline-flex items-center gap-2 text-sm font-semibold"
              style={{ color: "var(--brand-text)" }}
            >
              {otherDoc.label}
            </a>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
