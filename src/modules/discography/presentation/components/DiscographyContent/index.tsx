import { getTranslations } from "next-intl/server";
import type { YoutubeVideo } from "@/src/modules/discography/infrastructure/services/getYoutubePlaylistVideos";
import DiscographyPlayer from "@/src/modules/discography/presentation/components/DiscographyPlayer";
import VideoEmptyState from "@/src/modules/discography/presentation/components/VideoEmptyState";

type DiscographyContentProps = {
  videos: YoutubeVideo[];
};

export default async function DiscographyContent({
  videos,
}: DiscographyContentProps) {
  const t = await getTranslations("discography");

  return (
    <section className="flex w-full flex-col py-10 text-white md:py-16">
      {videos.length === 0 ? (
        <VideoEmptyState message={t("empty")} />
      ) : (
        <DiscographyPlayer videos={videos} />
      )}
    </section>
  );
}
