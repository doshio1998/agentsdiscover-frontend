import * as React from 'react';
import clsx from 'clsx';

type Size = 'sm' | 'md' | 'lg';

type StarRatingProps = {
  /** 0..5, half-stars supported (e.g. 4.2). */
  value: number;
  size?: Size;
  /** When provided, renders the count next to the stars: "4.2 (312)" */
  count?: number;
  /** Hide numeric value next to stars. Default false. */
  hideValue?: boolean;
  className?: string;
};

const sizes: Record<Size, { star: string; text: string; gap: string }> = {
  sm: { star: 'w-3.5 h-3.5', text: 'text-xs', gap: 'gap-1' },
  md: { star: 'w-[18px] h-[18px]', text: 'text-sm', gap: 'gap-1.5' },
  lg: { star: 'w-6 h-6', text: 'text-base', gap: 'gap-2' },
};

/**
 * Yelp-style five-star rating. Renders five SVG stars and uses an
 * absolutely-positioned overlay clipped to (value/5) width to paint
 * the filled portion in `--color-rating`. Half-star fractions are
 * therefore exact, not stepped.
 *
 * Always exposes the numeric value via `aria-label` for screen readers.
 */
const StarRating: React.FC<StarRatingProps> = ({
  value,
  size = 'md',
  count,
  hideValue = false,
  className,
}) => {
  const clamped = Math.max(0, Math.min(5, value));
  const fillPct = (clamped / 5) * 100;
  const sz = sizes[size];

  const Star = ({ filled }: { filled: boolean }) => (
    <svg
      viewBox="0 0 24 24"
      className={clsx(sz.star, 'shrink-0')}
      fill={filled ? 'var(--color-rating)' : '#E5E5E5'}
      aria-hidden="true"
    >
      <path d="M12 2.5l2.92 6.51 7.08.74-5.3 4.86 1.5 7.14L12 17.97 5.8 21.75l1.5-7.14L2 9.75l7.08-.74L12 2.5z" />
    </svg>
  );

  return (
    <span
      className={clsx('inline-flex items-center', sz.gap, className)}
      role="img"
      aria-label={`${clamped.toFixed(1)} out of 5 stars${count !== undefined ? `, ${count} reviews` : ''}`}
    >
      <span className="relative inline-flex" aria-hidden>
        {/* Empty layer */}
        <span className="inline-flex">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} filled={false} />
          ))}
        </span>
        {/* Filled overlay, clipped */}
        <span
          className="absolute inset-0 inline-flex overflow-hidden"
          style={{ width: `${fillPct}%` }}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} filled={true} />
          ))}
        </span>
      </span>
      {!hideValue && (
        <span className={clsx('font-semibold text-[var(--color-text)]', sz.text)}>
          {clamped.toFixed(1)}
        </span>
      )}
      {count !== undefined && (
        <span className={clsx('text-[var(--color-text-muted)]', sz.text)}>
          ({count.toLocaleString()})
        </span>
      )}
    </span>
  );
};

export default StarRating;
