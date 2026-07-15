import { getTranslations } from "next-intl/server";

export default async function Home() {
  const message = getTranslations();
  return <div className="text-white"></div>;
}
