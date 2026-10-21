import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/brand/logo-horizontal.png";

/** Official OunCatalyst horizontal lockup — supplied artwork, only trimmed and resized. */
export function Logo({ className = "h-9 w-auto sm:h-10", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Link href="/" className="inline-flex shrink-0 items-center rounded-md" aria-label="OunCatalyst — home">
      <Image src={logo} alt="OunCatalyst" className={className} priority={priority} sizes="200px" />
    </Link>
  );
}
