import Link from "next/link";
import Image from "next/image";
import mark from "../../public/brand/mark-512.png";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="bg-soft-grid">
      <div className="container-site flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <Image src={mark} alt="" className="h-20 w-20" sizes="80px" />
        <p className="eyebrow mt-8">Error 404</p>
        <h1 className="h-page mt-4 max-w-2xl">This page took a different career path.</h1>
        <p className="lead mt-5 max-w-xl">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back on track.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn-primary">Back to Home</Link>
          <Link href="/programs" className="btn-secondary">Explore Programs</Link>
        </div>
      </div>
    </section>
  );
}
