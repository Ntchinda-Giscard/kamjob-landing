const SIZE_CLASSES = {
  small: 'text-xl',
  default: 'text-3xl',
  large: 'text-4xl',
} as const

export function KamJobLogo({
  className = '',
  size = 'small',
  tagline,
}: {
  className?: string
  size?: keyof typeof SIZE_CLASSES
  /** Rendered under the wordmark; omit for the header/footer lockup. */
  tagline?: string
}) {
  return (
    <div className={`flex flex-col ${className}`}>
      {/* A <span>, not a heading: the logo appears in both the header and the
          footer, and only the hero should own the page's h1. */}
      <span
        className={`font-bold tracking-tight leading-none ${SIZE_CLASSES[size]}`}
        aria-label="KamJob"
        role="img"
      >
        <span aria-hidden style={{ color: 'var(--brand-solid)' }}>K</span>
        <span aria-hidden style={{ color: 'var(--red-solid)' }}>a</span>
        <span aria-hidden style={{ color: 'var(--amber-solid)' }}>m</span>
        <span aria-hidden style={{ color: 'var(--brand-solid)' }}>J</span>
        <span aria-hidden style={{ color: 'var(--red-solid)' }}>o</span>
        <span aria-hidden style={{ color: 'var(--amber-solid)' }}>b</span>
      </span>
      {tagline && (
        <span className="text-muted-foreground text-sm mt-1">{tagline}</span>
      )}
    </div>
  )
}
