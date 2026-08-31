export function PageBackground() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          color: "var(--color-brand-300)",
        }}
      />
      <div className="pointer-events-none absolute left-[-10%] top-0 -z-10 size-96 rounded-full bg-brand-300/30 blur-3xl" />
      <div className="pointer-events-none absolute right-[-10%] top-1/4 -z-10 size-96 rounded-full bg-accent-300/30 blur-3xl" />
      <div className="pointer-events-none absolute left-[15%] top-1/2 -z-10 size-96 rounded-full bg-brand-200/25 blur-3xl" />
      <div className="pointer-events-none absolute right-[5%] top-3/4 -z-10 size-96 rounded-full bg-accent-200/25 blur-3xl" />
      <div className="pointer-events-none absolute left-[-10%] bottom-0 -z-10 size-96 rounded-full bg-brand-300/25 blur-3xl" />
    </>
  );
}