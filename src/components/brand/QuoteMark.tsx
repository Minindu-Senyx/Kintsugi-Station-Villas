/* The gold opening quote mark shared by every quote on the site (guest reviews, team quotes). */
export function QuoteMark({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`block font-serif leading-none text-[#c3a876] ${className}`}>
      &ldquo;
    </span>
  );
}
