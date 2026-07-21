import Image from "next/image";
import BackgroundImage from "@/public/images/image_5.jpeg";
import WIDTH_DIMENSION from "@/src/shared/presentation/utils/widthDimension";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col w-full md:pt-[60px] items-center`}>
      <section className="relative w-full h-[68dvh] sm:h-[88dvh] md:hidden">
        <Image
          src={BackgroundImage}
          alt="thierry's image"
          fill
          priority
          className="object-cover object-center sm:object-center  brightness-85"
          sizes="100vw"
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
