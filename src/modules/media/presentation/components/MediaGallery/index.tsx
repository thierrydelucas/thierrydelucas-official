import type { MediaImage } from "@/src/modules/media/presentation/data/mediaImages";
import MediaGalleryItem from "@/src/modules/media/presentation/components/MediaGalleryItem";

type MediaGalleryProps = {
  images: MediaImage[];
};

export default function MediaGallery({ images }: MediaGalleryProps) {
  const leftColumn = images.filter((_, index) => index % 2 === 0);
  const rightColumn = images.filter((_, index) => index % 2 === 1);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
      <div className="flex flex-col gap-4 md:gap-6">
        {leftColumn.map((image, index) => (
          <MediaGalleryItem
            key={image.src.src}
            src={image.src}
            alt={image.alt}
            priority={index < 1}
          />
        ))}
      </div>
      <div className="flex flex-col gap-4 md:gap-6">
        {rightColumn.map((image, index) => (
          <MediaGalleryItem
            key={image.src.src}
            src={image.src}
            alt={image.alt}
            priority={index < 1}
          />
        ))}
      </div>
    </div>
  );
}
