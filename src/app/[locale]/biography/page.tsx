import { getTranslations } from "next-intl/server";

export default async function Biography() {
  const message = getTranslations();
  return <div className="pt-4 text-white flex flex-col  w-full ">TESTE BIO</div>;
}
