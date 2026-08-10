import { getTranslations } from "next-intl/server";
import type { StaticImageData } from "next/image";
import BiographySection, {
  type BiographyDesktopTextAlign,
  type BiographyMobileLayout,
} from "@/src/modules/biography/presentation/components/BiographySection";
import image01 from "@/public/images/image_26.jpg";
import image02 from "@/public/images/image_12.jpg";
import image03 from "@/public/images/image_4.png";
import image04 from "@/public/images/image_13.jpg";
import image05 from "@/public/images/image_3.jpg";
import image06 from "@/public/images/image_23.jpg";

const SECTIONS: {
  id: "01" | "02" | "03" | "04" | "05" | "06";
  image: StaticImageData;
  imageLeft: boolean;
  mobileLayout: BiographyMobileLayout;
  desktopTextAlign?: BiographyDesktopTextAlign;
}[] = [
  { id: "01", image: image04, imageLeft: true, mobileLayout: "default" },
  { id: "02", image: image02, imageLeft: false, mobileLayout: "text-first", desktopTextAlign: "end" },
  { id: "03", image: image03, imageLeft: true, mobileLayout: "image-between" },
  { id: "04", image: image01, imageLeft: false, mobileLayout: "text-first", desktopTextAlign: "end" },
  { id: "05", image: image05, imageLeft: true, mobileLayout: "default", desktopTextAlign: "center" },
  { id: "06", image: image06, imageLeft: false, mobileLayout: "text-first", desktopTextAlign: "center" },
];

export default async function BiographyContent() {
  const t = await getTranslations("biography.sections");

  return (
    <div className="flex w-full flex-col gap-16 py-10 text-white md:gap-24 md:py-14">
      {SECTIONS.map((section) => (
        <BiographySection
          key={section.id}
          number={section.id}
          title={t(`${section.id}.title`)}
          paragraphs={[t(`${section.id}.p1`), t(`${section.id}.p2`)]}
          image={section.image}
          imageAlt={`Thierry de Lucas — ${section.id}`}
          imageLeft={section.imageLeft}
          mobileLayout={section.mobileLayout}
          desktopTextAlign={section.desktopTextAlign}
        />
      ))}
    </div>
  );
}
