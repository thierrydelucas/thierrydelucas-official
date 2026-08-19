import { getTranslations } from "next-intl/server";
import type { YoutubeVideo } from "@/src/modules/discography/infrastructure/services/getYoutubePlaylistVideos";
import DiscographyPlayer from "@/src/modules/discography/presentation/components/DiscographyPlayer";
import VideoEmptyState from "@/src/modules/discography/presentation/components/VideoEmptyState";
import VisuallyHiddenHeading from "@/src/shared/presentation/components/VisuallyHiddenHeading";

type DiscographyContentProps = {
  videos: YoutubeVideo[];
};

export default async function DiscographyContent({
  videos,
}: DiscographyContentProps) {
  const t = await getTranslations();

  return (
    <section className="flex w-full flex-col py-10 text-white md:py-16">
      <VisuallyHiddenHeading>{t("nav.discography")}</VisuallyHiddenHeading>
      {videos.length === 0 ? (
        <VideoEmptyState message={t("discography.empty")} />
      ) : (
        <DiscographyPlayer videos={videos} />
      )}
    </section>
  );
}
