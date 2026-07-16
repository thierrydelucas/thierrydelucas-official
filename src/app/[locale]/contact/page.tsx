import { getTranslations } from "next-intl/server";

export default async function Contact() {
  const message = getTranslations();
  return <div className="pt-4 text-white flex flex-col  w-full ">TESTE contato</div>;
}
