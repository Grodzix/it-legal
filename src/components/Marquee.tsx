import { specializations } from "@/lib/data";

export default function Marquee() {
  const items = specializations.map(
    (s) => `${s.title} ${s.highlight}`.trim()
  );

  // Render items twice for seamless infinite loop
  return (
    <div
      className="bg-bg-dark/95 backdrop-blur-sm py-4 sm:py-5 overflow-hidden border-y border-white/[0.06] -mt-2 lg:mt-0"
      aria-hidden="true"
    >
      <div className="marquee-track flex">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-8 mx-8 text-white/60 text-sm font-medium uppercase tracking-[0.15em] whitespace-nowrap select-none"
          >
            <span>{item}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary/50 flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
