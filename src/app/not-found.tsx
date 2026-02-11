import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="min-h-screen bg-bg-light flex items-center justify-center px-5">
      <div className="text-center max-w-md">
        <p className="text-8xl font-bold text-primary/20 font-heading mb-4">
          404
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-text-dark mb-4">
          Strona nie została znaleziona
        </h1>
        <p className="text-text-medium mb-8">
          Strona, której szukasz, nie istnieje lub została przeniesiona.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Wróć na stronę główną
        </Link>
      </div>
    </main>
  );
}
