import { getLocale } from "next-intl/server";
import Hero from "@/src/modules/home/presentation/components/Hero";

export default async function Home() {
  const locale = await getLocale();

  return (
    <div className={`py-8 text-center text-white `}>
      <Hero locale={locale} />
    </div>
  );
}
