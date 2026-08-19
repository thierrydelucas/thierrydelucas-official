import ContactContent from "@/src/modules/contact/presentation/components/ContactContent";
import { getPageMetadata } from "@/src/shared/infrastructure/seo/buildPageMetadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return getPageMetadata(locale, "contact");
}

export default async function Contact() {
  return <ContactContent />;
}
