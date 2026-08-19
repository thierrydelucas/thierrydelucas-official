import { getYoutubePlaylistVideos } from "@/src/modules/discography/infrastructure/services/getYoutubePlaylistVideos";
import DiscographyContent from "@/src/modules/discography/presentation/components/DiscographyContent";
import { getPageMetadata } from "@/src/shared/infrastructure/seo/buildPageMetadata";
import { videoObjectJsonLd } from "@/src/shared/infrastructure/seo/jsonLd";
import JsonLd from "@/src/shared/presentation/components/JsonLd";

export const revalidate = 60;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return getPageMetadata(locale, "discography");
}

export default async function Discography() {
  const { videos } = await getYoutubePlaylistVideos();
  const videoList = videos ?? [];
  const featured = videoList[0];

  return (
    <>
      {featured ? <JsonLd data={videoObjectJsonLd(featured)} /> : null}
      <DiscographyContent videos={videoList} />
    </>
  );
}
