import { MEDIA_IMAGES } from "@/src/modules/media/presentation/data/mediaImages";
import MediaGallery from "@/src/modules/media/presentation/components/MediaGallery";

export default function MediaContent() {
  return (
    <section className="flex w-full flex-col py-10 md:py-14">
      <MediaGallery images={MEDIA_IMAGES} />
    </section>
  );
}
