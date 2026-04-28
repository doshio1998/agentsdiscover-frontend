import * as React from 'react';
import clsx from 'clsx';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
  /** Optional left adornment, e.g. a search icon. */
  leftAdornment?: React.ReactNode;
  /** Optional right adornment, e.g. a clear button. */
  rightAdornment?: React.ReactNode;
};

const base =
  'w-full text-[15px] text-[var(--color-text)] placeholder:text-[var(--color-text-faint)] ' +
  'bg-white border rounded-[var(--radius-md)] transition-colors duration-150 ' +
  'focus:outline-none focus:border-[var(--color-primary)] ' +
  'focus:shadow-[0_0_0_3px_rgba(211,35,35,0.15)] ' +
  'disabled:bg-[var(--color-surface)] disabled:cursor-not-allowed disabled:text-[var(--color-text-muted)]';

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { invalid, leftAdornment, rightAdornment, className, ...rest },
  ref,
) {
  const borderCls = invalid
    ? 'border-[var(--color-primary)]'
    : 'border-[var(--color-border-strong)]';

  if (!leftAdornment && !rightAdornment) {
    return (
      <input
        ref={ref}
        aria-invalid={invalid || undefined}
        className={clsx(base, borderCls, 'h-10 px-3.5', className)}
        {...rest}
      />
    );
  }

  // With adornments: input loses its border, the wrapper carries it instead.
  return (
    <div
      className={clsx(
        'flex items-center bg-white border rounded-[var(--radius-md)] transition-colors duration-150 ' +
          'focus-within:border-[var(--color-primary)] focus-within:shadow-[0_0_0_3px_rgba(211,35,35,0.15)] ' +
          'h-10',
        borderCls,
        className,
      )}
    >
      {leftAdornment && (
        <span className="pl-3 text-[var(--color-text-muted)] flex items-center">{leftAdornment}</span>
      )}
      <input
        ref={ref}
        aria-invalid={invalid || undefined}
        className="flex-1 h-full px-3 text-[15px] bg-transparent border-none outline-none placeholder:text-[var(--color-text-faint)]"
        {...rest}
      />
      {rightAdornment && (
        <span className="pr-3 text-[var(--color-text-muted)] flex items-center">{rightAdornment}</span>
      )}
    </div>
  );
});

export default Input;
