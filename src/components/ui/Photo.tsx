import Image from "next/image";
import { images, type ImageKey } from "@/lib/images";

type Props = {
  image: ImageKey;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Adds the brand's coloured petal accents around the frame. */
  accents?: boolean;
  aspect?: string;
};

export function Photo({ image, className = "", sizes = "(min-width: 1024px) 50vw, 100vw", priority, accents, aspect = "aspect-[4/3]" }: Props) {
  const img = images[image];
  return (
    <div className={`relative ${className}`}>
      {accents ? (
        <>
          <span aria-hidden="true" className="absolute -top-4 -right-4 h-24 w-24 rounded-[1.75rem_2.5rem_1.75rem_0.75rem] bg-magenta/90 sm:-top-6 sm:-right-6 sm:h-32 sm:w-32" />
          <span aria-hidden="true" className="absolute -bottom-5 -left-5 h-20 w-20 rounded-[2.5rem_0.75rem_2.5rem_1.75rem] bg-teal sm:-bottom-7 sm:-left-7 sm:h-28 sm:w-28" />
          <span aria-hidden="true" className="absolute -right-3 -bottom-3 h-14 w-14 rounded-2xl bg-sun sm:h-16 sm:w-16" />
        </>
      ) : null}
      <div className={`relative overflow-hidden rounded-[1.75rem] bg-soft shadow-[var(--shadow-lift)] ${aspect}`}>
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          className="object-cover"
        />
      </div>
    </div>
  );
}
