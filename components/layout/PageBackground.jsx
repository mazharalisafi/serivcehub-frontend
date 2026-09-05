export function PageBackground({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-teal-800 to-slate-900 text-white relative overflow-hidden">
      {/* Decorative Gradient Orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}