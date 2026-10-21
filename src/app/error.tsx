"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorBoundary({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error.digest ?? error.message);
  }, [error]);

  return (
    <section className="bg-soft-grid">
      <div className="container-site flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <p className="eyebrow">Something went wrong</p>
        <h1 className="h-page mt-4 max-w-2xl">We hit an unexpected problem.</h1>
        <p className="lead mt-5 max-w-xl">Please try again. If it keeps happening, you can reach us through the contact page.</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={reset} className="btn-primary">Try again</button>
          <Link href="/contact" className="btn-secondary">Contact us</Link>
        </div>
      </div>
    </section>
  );
}
