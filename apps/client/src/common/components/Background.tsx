const Background = ({ opacity = 0.8 }: { opacity?: number }) => (
  <>
    <div className="site-bg fixed inset-0 -z-20" />
    <div
      className={`fixed inset-0 -z-10`}
      style={{ background: `rgba(26, 32, 44, ${opacity})` }}
    />
  </>
);

export { Background };
