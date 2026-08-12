"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { YoutubeVideo } from "@/src/modules/discography/infrastructure/services/getYoutubePlaylistVideos";

type VideoCarouselItemProps = {
  video: YoutubeVideo;
  priority?: boolean;
};

export default function VideoCarouselItem({
  video,
  priority = false,
}: VideoCarouselItemProps) {
  return (
    <motion.button
      type="button"
      data-carousel-item
      data-video-id={video.id}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex w-[72%] shrink-0 cursor-grab flex-col gap-3 text-left sm:w-[48%] md:w-[38%]"
    >
      <div className="relative aspect-video overflow-hidden rounded-3xl bg-white/5">
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          fill
          draggable={false}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          sizes="(max-width: 640px) 72vw, (max-width: 768px) 48vw, 38vw"
          className="pointer-events-none object-cover"
        />
        <span className="absolute right-2.5 bottom-2.5 rounded-sm bg-black/80 px-1.5 py-0.5 font-inter text-[11px] font-medium tracking-wide text-white md:text-[12px]">
          {video.durationLabel}
        </span>
      </div>
      <p className="line-clamp-2 font-inter text-xs font-medium leading-[140%] tracking-normal text-white md:text-base">
        {video.title}
      </p>
    </motion.button>
  );
}
