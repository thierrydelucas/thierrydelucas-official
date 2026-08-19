import BiographyContent from "@/src/modules/biography/presentation/components/BiographyContent";
import { getPageMetadata } from "@/src/shared/infrastructure/seo/buildPageMetadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return getPageMetadata(locale, "biography");
}

export default async function Biography() {
  return <BiographyContent />;
}
