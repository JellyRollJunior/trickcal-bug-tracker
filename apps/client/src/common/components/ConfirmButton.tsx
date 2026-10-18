import { Spinner } from '@/common/components/Spinner.tsx';

type ConfirmbuttonProps = {
  title: string;
  isDisabled: boolean;
  isLoading: boolean;
};
const ConfirmButton = ({
  title,
  isDisabled,
  isLoading,
}: ConfirmbuttonProps) => {
  return (
    <button className="button-confirm flex gap-1 items-center" disabled={isDisabled}>
      {isLoading && <Spinner />}
      {title}
    </button>
  );
};

export { ConfirmButton };
