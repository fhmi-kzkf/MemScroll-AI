export default function PillButton({ children, onClick, className = "" }: { children: React.ReactNode, onClick?: () => void, className?: string }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-[1440px] bg-ink-black text-bone-white px-6 py-3 text-[16px] font-normal tracking-[-0.018px] leading-[1.4] transition-opacity hover:opacity-90 ${className}`}
    >
      {children}
    </button>
  );
}
