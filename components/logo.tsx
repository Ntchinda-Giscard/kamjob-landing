const SIZE_CLASSES = {
  small: 'text-[1.35rem]',
  default: 'text-3xl',
  large: 'text-4xl',
} as const

/**
 * Wordmark. The previous lockup alternated all six letters through green /
 * red / gold, which read as the Google logo rather than as a Cameroonian one.
 * Here the tricolour is a *rule* under the word — the same structural device
 * the page uses for section markers and card spines — and the split is the
 * only place colour touches the letterforms: Kam (ink) + Job (green).
 */
export function KamJobLogo({
  className = '',
  size = 'small',
  tagline,
  /** Set on the ink slab (footer), where the ink half has to become paper. */
  onDark = false,
}: {
  className?: string
  size?: keyof typeof SIZE_CLASSES
  /** Rendered under the wordmark; omit for the header lockup. */
  tagline?: string
  onDark?: boolean
}) {
  return (
    <div className={`flex flex-col ${className}`}>
      {/* A <span>, not a heading: the logo appears in the header and the
          footer, and only the hero should own the page's h1. */}
      <span
        className={`display inline-flex flex-col font-extrabold leading-none ${SIZE_CLASSES[size]}`}
        aria-label="KamJob"
        role="img"
      >
        <span aria-hidden className="tracking-[-0.05em]">
          <span style={{ color: onDark ? 'var(--slab-fg)' : 'var(--foreground)' }}>
            Kam
          </span>
          <span
            style={{ color: onDark ? 'var(--brand-on-ink)' : 'var(--brand-text)' }}
          >
            Job
          </span>
        </span>
        <span
          aria-hidden
          className="tricolor mt-[0.22em] h-[0.13em] w-full rounded-full"
        />
      </span>
      {tagline && (
        <span
          className="mt-2.5 text-sm"
          style={{ color: onDark ? 'var(--slab-muted)' : 'var(--muted-foreground)' }}
        >
          {tagline}
        </span>
      )}
    </div>
  )
}
