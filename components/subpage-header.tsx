"use client";

import { ArrowLeft } from "lucide-react";
import { KamJobLogo } from "@/components/logo";
import { LangSwitcher } from "@/components/lang-switcher";

/**
 * Reduced header for the pages around the landing page (legal, contact):
 * a reading context, not a funnel, so it carries the wordmark, a way home and
 * the language switch — no section nav, no sign-up button.
 */
export function SubpageHeader({ backLabel }: { backLabel: string }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md">
      <span aria-hidden className="tricolor block h-[3px] w-full" />
      <div
        className="border-b border-border"
        style={{
          backgroundColor: "color-mix(in srgb, var(--paper) 88%, transparent)",
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <a href="/" aria-label="KamJob">
            <KamJobLogo size="small" />
          </a>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="hidden items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              {backLabel}
            </a>
            <LangSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
