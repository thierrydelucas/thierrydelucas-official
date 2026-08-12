import { getYoutubePlaylistVideos } from "@/src/modules/discography/infrastructure/services/getYoutubePlaylistVideos";
import DiscographyContent from "@/src/modules/discography/presentation/components/DiscographyContent";

export const revalidate = 60;

export default async function Discography() {
  const { videos } = await getYoutubePlaylistVideos();

  return <DiscographyContent videos={videos ?? []} />;
}
