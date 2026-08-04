import Image, { type StaticImageData } from "next/image";
import { cn } from "@/src/shared/presentation/utils/cn";

export type BiographyMobileLayout = "default" | "text-first" | "image-between";
export type BiographyDesktopTextAlign = "start" | "center" | "end";

type BiographySectionProps = {
  number: string;
  title: string;
  paragraphs: string[];
  image: StaticImageData;
  imageAlt: string;
  imageLeft: boolean;
  mobileLayout?: BiographyMobileLayout;
  desktopTextAlign?: BiographyDesktopTextAlign;
};

const DESKTOP_TEXT_ALIGN_CLASS: Record<BiographyDesktopTextAlign, string> = {
  start: "md:items-start",
  center: "md:items-center",
  end: "md:items-end",
};

export default function BiographySection({
  number,
  title,
  paragraphs,
  image,
  imageAlt,
  imageLeft,
  mobileLayout = "default",
  desktopTextAlign = "start",
}: BiographySectionProps) {
  const isTextFirst = mobileLayout === "text-first";
  const isImageBetween = mobileLayout === "image-between";

  return (
    <section className="flex w-full flex-col gap-6 md:gap-8">
      <div className="flex flex-col">
        <span
          aria-hidden
          className=" font-inter text-[140px] leading-none text-neutral-500 opacity-15 md:text-[200px] font-thin tracking-tighter"
        >
          {number}
        </span>
        <h4 className="font-cormorant -mt-18 text-[34px] md:text-[64px] font-light uppercase text-zinc-100 [-webkit-text-stroke:0.6px_#0B0B0B] md:-mt-28 tracking-tight">
          {title}
        </h4>
      </div>

      <div
        className={cn(
          "flex flex-col gap-6 md:gap-10",
          DESKTOP_TEXT_ALIGN_CLASS[desktopTextAlign],
          imageLeft ? "md:flex-row" : "md:flex-row-reverse",
        )}
      >
        <div
          className={cn(
            "relative w-full shrink-0 md:w-[42%] after:pointer-events-none after:absolute after:inset-0 after:shadow-[inset_0_0_0_1px_#1E1E1E]",
            isTextFirst && "order-2 md:order-none",
            isImageBetween && "order-2 md:order-none",
          )}
        >
          <Image
            src={image}
            alt={imageAlt}
            className="h-auto w-full object-cover"
            sizes="(max-width: 768px) 100vw, 42vw"
            placeholder="blur"
          />
        </div>

        <div
          className={cn(
            isImageBetween
              ? "contents md:flex md:flex-1 md:flex-col md:gap-4 md:text-left"
              : "flex flex-1 flex-col gap-4 text-left",
            isTextFirst && "order-1 md:order-0",
          )}
        >
          {paragraphs.map((paragraph, index) => (
            <p
              key={`${number}-p-${index}`}
              className={cn(
                "font-inter text-base text-neutral-300 md:text-lg leading-[180%] md:leading-[190%]",
                isImageBetween && (index === 0 ? "order-1 md:order-0" : "order-3 md:order-0"),
              )}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
