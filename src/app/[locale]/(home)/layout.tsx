import Image, { getImageProps } from "next/image";
import BackgroundImage from "@/public/images/image_5.png";
import WIDTH_DIMENSION from "@/src/shared/presentation/utils/widthDimension";

const MOBILE_HERO_SIZES = "(max-width: 767px) 100vw, 0px";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    props: { srcSet },
  } = getImageProps({
    src: BackgroundImage,
    alt: "Thierry de Lucas, concert violinist",
    fill: true,
    sizes: MOBILE_HERO_SIZES,
    quality: 100,
  });

  return (
    <div className={`flex flex-col w-full md:pt-15 items-center`}>
      <link
        rel="preload"
        as="image"
        imageSrcSet={srcSet}
        imageSizes={MOBILE_HERO_SIZES}
        media="(max-width: 767px)"
        fetchPriority="high"
      />
      <section className="relative w-dvw h-[68dvh] sm:h-[88dvh] md:hidden">
        <Image
          src={BackgroundImage}
          alt="Thierry de Lucas, concert violinist"
          fill
          fetchPriority="high"
          loading="eager"
          decoding="sync"
          className="object-cover object-center sm:object-center brightness-85"
          sizes={MOBILE_HERO_SIZES}
          quality={100}
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
