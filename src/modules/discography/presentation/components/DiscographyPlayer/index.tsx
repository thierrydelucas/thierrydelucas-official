"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { YoutubeVideo } from "@/src/modules/discography/infrastructure/services/getYoutubePlaylistVideos";
import FeaturedVideo from "@/src/modules/discography/presentation/components/FeaturedVideo";
import VideoCarousel from "@/src/modules/discography/presentation/components/VideoCarousel";

type DiscographyPlayerProps = {
  videos: YoutubeVideo[];
};

export default function DiscographyPlayer({ videos }: DiscographyPlayerProps) {
  const [selectedId, setSelectedId] = useState(videos[0]?.id ?? "");

  const featured = useMemo(
    () => videos.find((video) => video.id === selectedId) ?? videos[0],
    [selectedId, videos],
  );

  const carouselVideos = useMemo(() => {
    if (!featured) {
      return [];
    }

    return videos.filter((video) => video.id !== featured.id);
  }, [featured, videos]);

  function handleSelect(videoId: string) {
    setSelectedId(videoId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (!featured) {
    return null;
  }

  return (
    <div className="flex w-full flex-col gap-10 md:gap-14">
      <AnimatePresence mode="wait">
        <motion.div
          key={featured.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          <FeaturedVideo video={featured} />
        </motion.div>
      </AnimatePresence>

      {carouselVideos.length > 0 ? (
        <VideoCarousel videos={carouselVideos} onSelect={handleSelect} />
      ) : null}
    </div>
  );
}
