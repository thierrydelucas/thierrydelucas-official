import Image from "next/image";
import BackgroundImage from "@/public/images/image_5.png";
import WIDTH_DIMENSION from "@/src/shared/presentation/utils/widthDimension";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col w-full md:pt-15 items-center`}>
      <section className="relative w-dvw h-[68dvh] sm:h-[88dvh] md:hidden">
        <Image
          src={BackgroundImage}
          alt="thierry's image"
          fill
          priority
          className="object-cover object-center sm:object-center brightness-85"
          sizes="(max-width: 767px) 100vw, 0px"
          quality={100}
          unoptimized
        />
      </section>

      <div
        className={`w-full ${WIDTH_DIMENSION} px-8 [@media(min-width:1086px)]:p-0`}
      >
        {children}
      </div>
    </div>
  );
}
