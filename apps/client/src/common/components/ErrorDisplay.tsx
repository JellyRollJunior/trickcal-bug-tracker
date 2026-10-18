import kommyShocked from '@/assets/icons/kommy-shocked.png';

import { BaseError } from '@trickcal-bug-tracker/shared';
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';

type ErrorDisplayProps = {
  title: string;
  message: string;
};

const ErrorDisplay = ({ title, message }: ErrorDisplayProps) => {
  return (
    <div className="w-full px-3 py-50">
      <div className="flex w-full flex-col items-center">
        <img src={kommyShocked} className="size-32" />
        <h1 className="text-hero mt-3 text-center text-4xl font-bold lg:text-7xl">
          {title}
        </h1>
        <p className="text-secondary mt-3 max-w-xl text-center font-medium sm:text-lg md:text-xl">
          {message}
        </p>
        <Link className="button-special mt-6" to={'/boards'}>
          Return to home page
        </Link>
      </div>
    </div>
  );
};

const ErrorDisplayContainer = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <ErrorDisplay
        title={'Error ' + error.status}
        message={error.statusText}
      />
    );
  }

  if (error instanceof BaseError) {
    return <ErrorDisplay title={error.name} message={error.message} />;
  }

  console.error(error);
  return (
    <ErrorDisplay
      title="Something went wrong"
      message="Unknown error. Please return to home page."
    />
  );
};

export { ErrorDisplayContainer as ErrorDisplay };
