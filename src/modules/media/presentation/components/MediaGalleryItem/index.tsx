import Image, { type StaticImageData } from "next/image";

type MediaGalleryItemProps = {
  src: StaticImageData;
  alt: string;
  priority?: boolean;
};

export default function MediaGalleryItem({
  src,
  alt,
  priority = false,
}: MediaGalleryItemProps) {
  return (
    <figure className="w-full">
      <Image
        src={src}
        alt={alt}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="h-auto w-full"
        quality={100}
        unoptimized={src.src.endsWith(".png")}
        priority={priority}
      />
    </figure>
  );
}
