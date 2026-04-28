import * as React from 'react';
import clsx from 'clsx';

type Variant = 'primary' | 'secondary' | 'link';
type Size = 'sm' | 'md' | 'lg';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const base =
  'inline-flex items-center justify-center gap-2 font-semibold cursor-pointer ' +
  'transition-colors duration-150 focus-visible:outline focus-visible:outline-2 ' +
  'focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] ' +
  'disabled:opacity-50 disabled:cursor-not-allowed';

const variants: Record<Variant, string> = {
  primary:
    'bg-[var(--color-primary)] text-white border border-[var(--color-primary)] ' +
    'hover:bg-[var(--color-primary-dark)] hover:border-[var(--color-primary-dark)]',
  secondary:
    'bg-white text-[var(--color-text)] border border-[var(--color-border-strong)] ' +
    'hover:bg-[var(--color-surface)]',
  link:
    'bg-transparent text-[var(--color-link)] border-none p-0 hover:underline',
};

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-sm rounded-[var(--radius-md)]',
  md: 'h-10 px-5 text-[15px] rounded-[var(--radius-md)]',
  lg: 'h-12 px-6 text-base rounded-[var(--radius-md)]',
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    leftIcon,
    rightIcon,
    disabled,
    className,
    children,
    ...rest
  },
  ref,
) {
  // Link variant ignores size sizing/padding
  const sizeCls = variant === 'link' ? '' : sizes[size];

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={clsx(base, variants[variant], sizeCls, className)}
      {...rest}
    >
      {loading && (
        <span
          aria-hidden
          className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
        />
      )}
      {!loading && leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
});

export default Button;
