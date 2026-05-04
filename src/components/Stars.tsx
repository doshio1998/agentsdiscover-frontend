import { Star } from 'lucide-react';

export default function Stars({
  rating,
  size = 16,
  showValue = false,
}: {
  rating: number;
  size?: number;
  showValue?: boolean;
}) {
  const full = Math.round(rating);
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="inline-flex">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star
            key={i}
            size={size}
            className={
              i < full
                ? 'fill-[var(--color-accent)] text-[var(--color-accent)]'
                : 'fill-transparent text-gray-300'
            }
            strokeWidth={1.5}
          />
        ))}
      </span>
      {showValue && (
        <span className="text-sm font-semibold text-foreground">{rating.toFixed(1)}</span>
      )}
    </span>
  );
}
