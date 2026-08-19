import { getTranslations } from "next-intl/server";
import MediaGallery from "@/src/modules/media/presentation/components/MediaGallery";
import { MEDIA_IMAGES } from "@/src/modules/media/presentation/data/mediaImages";
import VisuallyHiddenHeading from "@/src/shared/presentation/components/VisuallyHiddenHeading";

export default async function MediaContent() {
  const t = await getTranslations("nav");

  return (
    <section className="flex w-full flex-col py-10 md:py-14">
      <VisuallyHiddenHeading>{t("media")}</VisuallyHiddenHeading>
      <MediaGallery images={MEDIA_IMAGES} />
    </section>
  );
}
