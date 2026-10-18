import { Spinner } from '@/common/components/Spinner.tsx';

type SpinnerButtonProps = {
  title: string;
  isDisabled: boolean;
  isLoading: boolean;
  className?: string;
};
const SpinnerButton = ({
  title,
  isDisabled,
  isLoading,
  className = 'button-confirm',
}: SpinnerButtonProps) => {
  return (
    <button
      className={`${className} flex items-center gap-1`}
      disabled={isDisabled}
    >
      {isLoading && <Spinner />}
      {title}
    </button>
  );
};

export { SpinnerButton };
