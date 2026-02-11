"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main id="main" className="min-h-screen bg-bg-light flex items-center justify-center px-5">
      <div className="text-center max-w-md">
        <p className="text-8xl font-bold text-primary/20 font-heading mb-4">
          500
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-text-dark mb-4">
          Coś poszło nie tak
        </h1>
        <p className="text-text-medium mb-8">
          Wystąpił nieoczekiwany błąd. Spróbuj odświeżyć stronę.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25 cursor-pointer"
          >
            Spróbuj ponownie
          </button>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-primary font-semibold px-8 py-3.5 rounded-xl border border-primary/20 hover:bg-primary/5 transition-colors"
          >
            Strona główna
          </a>
        </div>
      </div>
    </main>
  );
}
