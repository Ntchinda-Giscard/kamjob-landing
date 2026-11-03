import Image, { type StaticImageData } from "next/image";

/**
 * Device frame for the real app screenshots.
 *
 * Everything inside is sized in container-query units (`cqw`, set on
 * `.phone` in globals.css), so one component renders a 15rem phone in the
 * coach row and a 19rem one in the hero with identical proportions — bezel,
 * radius, island and status bar all scale together.
 *
 * The screenshots in `assets/screens/` were cleaned of their real status bar
 * (and of the dev build's debug button); the frame draws a neutral 9:41 bar
 * on top instead, so every shot reads as the same phone at the same moment.
 */
export function Phone({
  children,
  tone = "dark",
  className = "",
}: {
  /** One or more <Screen> layers. */
  children: React.ReactNode;
  /** Status-bar ink: "dark" on light screens, "light" on the green onboarding. */
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div className={`phone ${className}`} data-tone={tone}>
      <div className="phone-body">
        <div className="phone-screen">
          {children}
          <div className="phone-status" aria-hidden>
            <span>9:41</span>
            <StatusIcons />
          </div>
          <span className="phone-island" aria-hidden />
        </div>
      </div>
    </div>
  );
}

/** A screenshot layer. Layers stack, so several can cross-fade in one frame. */
export function Screen({
  src,
  alt,
  priority = false,
  sizes = "(min-width: 1024px) 320px, 70vw",
  className = "",
  style,
  hidden = false,
}: {
  src: StaticImageData;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  style?: React.CSSProperties;
  /** Hide from assistive tech (inactive or purely decorative layers). */
  hidden?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={hidden ? "" : alt}
      aria-hidden={hidden || undefined}
      fill
      priority={priority}
      sizes={sizes}
      placeholder="blur"
      className={`phone-layer ${className}`}
      style={style}
    />
  );
}

function StatusIcons() {
  return (
    <svg
      viewBox="0 0 68 12"
      className="phone-status-icons"
      fill="currentColor"
      aria-hidden
    >
      {/* Signal */}
      <rect x="0" y="8" width="3" height="4" rx="0.8" />
      <rect x="4.5" y="6" width="3" height="6" rx="0.8" />
      <rect x="9" y="3.5" width="3" height="8.5" rx="0.8" />
      <rect x="13.5" y="1" width="3" height="11" rx="0.8" />
      {/* Wi-Fi */}
      <path d="M29 3.2a10.6 10.6 0 0 1 7.6 3.1l1.3-1.3A12.4 12.4 0 0 0 29 1.4a12.4 12.4 0 0 0-8.9 3.6l1.3 1.3A10.6 10.6 0 0 1 29 3.2Z" />
      <path d="M29 6.6a6.9 6.9 0 0 1 4.9 2l1.3-1.3A8.7 8.7 0 0 0 29 4.8a8.7 8.7 0 0 0-6.2 2.5l1.3 1.3a6.9 6.9 0 0 1 4.9-2Z" />
      <path d="M29 10.1a2 2 0 0 1 1.4.6L29 12.1l-1.4-1.4a2 2 0 0 1 1.4-.6Z" />
      {/* Battery */}
      <rect
        x="42"
        y="1"
        width="22"
        height="10.5"
        rx="3"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="1"
      />
      <rect x="44" y="3" width="18" height="6.5" rx="1.6" />
      <path d="M65.5 4.5v3.5a1.9 1.9 0 0 0 0-3.5Z" fillOpacity="0.45" />
    </svg>
  );
}
