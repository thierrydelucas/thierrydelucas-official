import { getTranslations } from "next-intl/server";

export default async function Media() {
  const message = getTranslations();
  return (
    <div className="pt-4 text-white flex flex-col  w-full ">TESTE Media</div>
  );
}
