import Button from "@/src/shared/presentation/components/Button";
import Link from "next/link";
import Image from "next/image";
import BackgroundImage from "@/public/images/image_5.png";
import SocialMediaContainer from "@/src/shared/presentation/components/SocialMediaContainer";
import { useTranslations } from "next-intl";

interface HeroProps {
  locale: string;
}

export default function Hero({ locale }: HeroProps) {
  const message = useTranslations();
  return (
    <section className="md:flex md:items-center md:justify-between md:w-full">
      <section className="hidden md:block mr-10">
        <Image
          src={BackgroundImage}
          alt="Thierry de Lucas, concert violinist"
          className="h-auto w-155 brightness-85"
          sizes="(min-width: 768px) 620px, 0px"
          quality={100}
          loading="eager"
        />
      </section>
      <div className="flex flex-col items-center text-center ">
        <div className="flex flex-col gap-2">
          <h1 className="font-cormorant text-4xl xl:text-5xl text-neutral-100 font-normal leading-tight tracking-wide md:text-5xl">
            Thierry de Lucas
          </h1>
          <p className="font-cormorant text-[16px] italic text-gray-400 md:text-lg">
            {message("home.subtitle")}
          </p>
        </div>

        <Link href={`/${locale}/biography`} className="mt-10">
          <Button title={message("nav.biography")} />
        </Link>

        <section className="hidden md:flex flex-col gap-6 mt-14 items-center">
          <SocialMediaContainer />
        </section>
      </div>
    </section>
  );
}
