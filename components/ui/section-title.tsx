interface SectionTitleProps {
  children: React.ReactNode;
  more?: string;
}

export function SectionTitle({ children, more }: SectionTitleProps) {
  return (
    <div className="flex items-center gap-2 mb-2.5 font-pixel text-[11px] tracking-[0.05em] uppercase text-ink-1">
      <span
        className="w-2 h-2 flex-shrink-0"
        style={{ background: "var(--accent)", boxShadow: "0 0 calc(8px * var(--px)) var(--accent)" }}
      />
      {children}
      {more && <span className="ml-auto text-[9px] text-ink-3">{more} →</span>}
    </div>
  );
}
