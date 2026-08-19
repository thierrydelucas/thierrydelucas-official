import Hero from "@/src/modules/home/presentation/components/Hero";
import JsonLd from "@/src/shared/presentation/components/JsonLd";
import { getLocale, getTranslations } from "next-intl/server";
import { getPageMetadata } from "@/src/shared/infrastructure/seo/buildPageMetadata";
import { webPageJsonLd } from "@/src/shared/infrastructure/seo/jsonLd";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return getPageMetadata(locale, "home");
}

export default async function Home() {
  const locale = await getLocale();
  const t = await getTranslations("seo.home");

  return (
    <div className={`py-8 text-center text-white `}>
      <JsonLd data={webPageJsonLd(locale, "home", t("title"))} />
      <Hero locale={locale} />
    </div>
  );
}
