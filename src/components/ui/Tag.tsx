import * as React from 'react';
import clsx from 'clsx';

type TagProps = React.HTMLAttributes<HTMLSpanElement> & {
  /** Optional leading icon (Lucide). */
  icon?: React.ReactNode;
};

/**
 * Neutral pill-style tag, used for category labels, agent_type chips,
 * filter chips, etc. Always grey surface — *not* a brand-color element.
 */
const Tag = React.forwardRef<HTMLSpanElement, TagProps>(function Tag(
  { icon, className, children, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      className={clsx(
        'inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium ' +
          'bg-[var(--color-surface)] text-[var(--color-text)] rounded-[var(--radius-sm)]',
        className,
      )}
      {...rest}
    >
      {icon}
      {children}
    </span>
  );
});

export default Tag;
