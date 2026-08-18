import MediaGalleryItem from "@/src/modules/media/presentation/components/MediaGalleryItem";
import type { MediaImage } from "@/src/modules/media/presentation/data/mediaImages";

type MediaGalleryProps = {
  images: MediaImage[];
};

function splitByShortestColumn(images: MediaImage[]) {
  const leftColumn: MediaImage[] = [];
  const rightColumn: MediaImage[] = [];
  let leftHeight = 0;
  let rightHeight = 0;

  for (const image of images) {
    const ratio = image.src.height / image.src.width;

    if (leftHeight <= rightHeight) {
      leftColumn.push(image);
      leftHeight += ratio;
    } else {
      rightColumn.push(image);
      rightHeight += ratio;
    }
  }

  return { leftColumn, rightColumn };
}

export default function MediaGallery({ images }: MediaGalleryProps) {
  const { leftColumn, rightColumn } = splitByShortestColumn(images);

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
