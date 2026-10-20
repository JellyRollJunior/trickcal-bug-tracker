import { ErrorDisplay } from '@/common/components/ErrorDisplay.tsx';
import { DefaultLayout } from '@/layout/DefaultLayout.tsx';

const ErrorLayout = () => {
  return (
    <DefaultLayout>
      <ErrorDisplay />
    </DefaultLayout>
  );
};

export { ErrorLayout };
