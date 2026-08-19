import type { Metadata } from "next";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import Button from "@/src/shared/presentation/components/Button";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("notFound");

  return {
    title: t("title"),
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function NotFound() {
  const locale = await getLocale();
  const t = await getTranslations("notFound");

  return (
    <section className="flex min-h-[60dvh] w-full flex-col items-center justify-center gap-4 px-6 py-24 text-center text-white md:py-32">
      <h1 className="font-cormorant text-4xl font-normal leading-tight tracking-wide text-neutral-100 md:text-5xl">
        {t("title")}
      </h1>
      <p className="max-w-md font-cormorant text-[16px] italic text-gray-400 md:text-lg">
        {t("description")}
      </p>
      <Link href={`/${locale}/home`} className="mt-6">
        <Button title={t("backHome")} />
      </Link>
    </section>
  );
}
