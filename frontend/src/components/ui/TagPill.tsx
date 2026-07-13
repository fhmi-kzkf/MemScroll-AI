export default function TagPill({ children, isAccent = false }: { children: React.ReactNode, isAccent?: boolean }) {
  const baseClasses = "rounded-[1440px] px-3 py-2 text-[12px] uppercase font-normal inline-flex items-center justify-center";
  const colorClasses = isAccent 
    ? "bg-signal-yellow text-ink-black border-none" 
    : "bg-transparent text-ink-black border border-ash";

  return (
    <span className={`${baseClasses} ${colorClasses}`}>
      {children}
    </span>
  );
}
