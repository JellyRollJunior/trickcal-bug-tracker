import { Spinner } from '@/common/components/Spinner.tsx';
import type { ReactNode } from 'react';

type SpinnerButtonProps = {
  title: string;
  isDisabled: boolean;
  isLoading: boolean;
  className?: string;
  children?: ReactNode
};
const SpinnerButton = ({
  title,
  isDisabled,
  isLoading,
  className = 'button-confirm',
  children,
}: SpinnerButtonProps) => {
  return (
    <button
      className={`${className} flex items-center gap-1`}
      disabled={isDisabled}
    >
      {isLoading && <Spinner />}
      {children}
      {title}
    </button>
  );
};

export { SpinnerButton };
