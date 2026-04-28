import * as React from 'react';
import clsx from 'clsx';

type Variant = 'success' | 'warning' | 'verified' | 'neutral';

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: Variant;
  icon?: React.ReactNode;
};

/**
 * Status badge — narrower semantic role than Tag. Use for "Verified usage",
 * "Highly rated", "Flagged" style markers.
 */
const variants: Record<Variant, string> = {
  success: 'bg-[#E8F5EE] text-[#166534]',
  warning: 'bg-[#FEF3C7] text-[#92400E]',
  verified: 'bg-[#E8F5EE] text-[#166534]',
  neutral: 'bg-[var(--color-surface)] text-[var(--color-text)]',
};

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = 'neutral', icon, className, children, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      className={clsx(
        'inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-[var(--radius-sm)]',
        variants[variant],
        className,
      )}
      {...rest}
    >
      {icon}
      {children}
    </span>
  );
});

export default Badge;
