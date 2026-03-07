export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-xs text-accent uppercase tracking-[3px] mb-8 flex items-center gap-4">
      {children}
      <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
    </div>
  );
}
