export function KamJobLogo({ className = '', size = 'default' }: { className?: string; size?: 'small' | 'default' | 'large' }) {
  const sizeClasses = {
    small: 'text-xl',
    default: 'text-3xl',
    large: 'text-4xl',
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <h1 className={`font-bold tracking-tight ${sizeClasses[size]}`}>
        <span style={{ color: '#34A853' }}>K</span>
        <span style={{ color: '#EA4335' }}>a</span>
        <span style={{ color: '#FBBC05' }}>m</span>
        <span style={{ color: '#34A853' }}>J</span>
        <span style={{ color: '#EA4335' }}>o</span>
        <span style={{ color: '#FBBC05' }}>b</span>
      </h1>
      {size !== 'small' && (
        <p className="text-muted-foreground text-sm mt-0.5">Ton emploi au Cameroun</p>
      )}
    </div>
  )
}
