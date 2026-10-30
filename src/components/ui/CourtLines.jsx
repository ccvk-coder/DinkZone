import { cn } from '../../utils/classNames';
function CourtLines({ className }) {
  return (
    <svg
      viewBox="0 0 440 200"
      fill="none"
      className={cn('pointer-events-none', className)}
      aria-hidden
    >
      <rect x="1" y="1" width="438" height="198" stroke="currentColor" strokeWidth="2" />
      <line
        x1="220"
        y1="1"
        x2="220"
        y2="199"
        stroke="currentColor"
        strokeWidth="3"
        strokeDasharray="2 4"
      />
      <line x1="150" y1="1" x2="150" y2="199" stroke="currentColor" strokeWidth="2" />
      <line x1="290" y1="1" x2="290" y2="199" stroke="currentColor" strokeWidth="2" />
      <line x1="1" y1="100" x2="150" y2="100" stroke="currentColor" strokeWidth="2" />
      <line x1="290" y1="100" x2="439" y2="100" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
export { CourtLines };
