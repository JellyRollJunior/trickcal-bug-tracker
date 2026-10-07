const LandingPage = () => {
  return (
    <div className="flex h-full min-h-0 w-full flex-col items-center justify-center gap-2 overflow-y-auto">
      <section className="block-container-primary max-w-lg p-1 text-center">
        <h2 className="block-primary-title p-1 text-3xl font-bold">
          Track every idea/bug fix
        </h2>
        <p className="block-primary mt-1 px-8 py-5 text-lg font-semibold">
          The visual task board built for QAs & developers.
          <br /> Organize bugs, features, and improvements with a simple Kanban
          workflow Supiki deruji bazeyo!
        </p>
      </section>
    </div>
  );
};

export { LandingPage };
