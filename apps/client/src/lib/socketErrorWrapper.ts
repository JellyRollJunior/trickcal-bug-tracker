import { handleError } from '@/lib/errorHandler.ts';

const withSocketErrorHandling = <Args extends unknown[], Return>(
  fn: (...args: Args) => Return
) => {
  return (...args: Args): Return | undefined => {
    try {
      return fn(...args);
    } catch (error) {
      handleError(error);
    }
  };
};

export { withSocketErrorHandling }