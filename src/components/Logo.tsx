export default function Logo({
  className = "",
  showText = true,
}: {
  className?: string;
  showText?: boolean;
}) {
  return (
    <a href="/" className={`flex items-center gap-3 ${className}`} aria-label="IT Legal - Strona główna">
      <svg
        width="42"
        height="42"
        viewBox="0 0 42 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle
          cx="21"
          cy="21"
          r="20"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-text-dark"
        />
        <text
          x="21"
          y="26"
          textAnchor="middle"
          className="text-text-dark"
          fill="currentColor"
          fontSize="18"
          fontWeight="500"
          fontFamily="var(--font-body), system-ui, sans-serif"
        >
          S
        </text>
      </svg>
      {showText && (
        <span className="text-lg font-semibold tracking-widest text-text-dark" style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}>
          IT LEGAL
        </span>
      )}
    </a>
  );
}
