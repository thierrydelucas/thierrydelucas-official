import MediaContent from "@/src/modules/media/presentation/components/MediaContent";
import { getPageMetadata } from "@/src/shared/infrastructure/seo/buildPageMetadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return getPageMetadata(locale, "media");
}

export default function Media() {
  return <MediaContent />;
}
