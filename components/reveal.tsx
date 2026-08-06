"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fades + lifts its children in the first time they scroll into view.
 *
 * The hidden start state lives behind a `.js-reveal` class that this module
 * puts on <html> at runtime, so a visitor without JS (or a crawler) sees the
 * fully rendered page rather than a blank one. `prefers-reduced-motion` is
 * handled in CSS.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  /** Stagger, in ms, for items revealed as a group. */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "figure";
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("js-reveal");

    const node = ref.current;
    if (!node) return;

    // Already in view on load (the hero) — skip the observer round-trip.
    if (node.getBoundingClientRect().top < window.innerHeight) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
