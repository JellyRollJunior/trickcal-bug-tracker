const Spinner = ({
  className = 'h-5 w-5 border-2',
}: {
  className?: string;
}) => (
  <div role="status" aria-label="Loading" className={`${className} spinner`} />
);

export { Spinner };
