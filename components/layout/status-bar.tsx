export function StatusBar() {
  return (
    <div className="h-11 flex-shrink-0 flex items-center justify-between px-6 font-pixel text-[10px] tracking-[0.04em] text-ink-1 relative z-[5]">
      <span>9:41</span>
      <div className="flex items-center gap-1.5">
        <span>●●●●</span>
        <span style={{ color: "var(--accent)" }}>WIFI</span>
        <span
          className="inline-block h-2"
          style={{
            width: 18,
            background: "var(--accent)",
            boxShadow: "inset 0 0 0 1px #0B1220",
          }}
        />
      </div>
    </div>
  );
}
