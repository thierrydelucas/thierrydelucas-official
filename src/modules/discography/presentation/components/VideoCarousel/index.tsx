"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type MouseEvent,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/src/shared/presentation/utils/cn";
import type { YoutubeVideo } from "@/src/modules/discography/infrastructure/services/getYoutubePlaylistVideos";
import VideoCarouselItem from "@/src/modules/discography/presentation/components/VideoCarouselItem";

type VideoCarouselProps = {
  videos: YoutubeVideo[];
  onSelect: (videoId: string) => void;
};

const SCROLL_EDGE_PX = 2;
const DRAG_THRESHOLD_PX = 10;
const INERTIA_FRICTION = 0.95;
const INERTIA_STOP_VELOCITY = 0.02;

type DragState = {
  pointerId: number | null;
  startX: number;
  startScrollLeft: number;
  hasDragged: boolean;
  lastX: number;
  lastTime: number;
  velocity: number;
};

function getScrollStep(track: HTMLDivElement): number {
  const item = track.querySelector<HTMLElement>("[data-carousel-item]");
  const itemWidth =
    item?.getBoundingClientRect().width ?? track.clientWidth * 0.4;
  const gap =
    Number.parseFloat(
      getComputedStyle(track).columnGap || getComputedStyle(track).gap,
    ) || 16;

  return itemWidth + gap;
}

export default function VideoCarousel({
  videos,
  onSelect,
}: VideoCarouselProps) {
  const t = useTranslations("discography.carousel");
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState>({
    pointerId: null,
    startX: 0,
    startScrollLeft: 0,
    hasDragged: false,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
  });
  const inertiaFrameRef = useRef<number | null>(null);
  const scrollFrameRef = useRef<number | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [pageCount, setPageCount] = useState(1);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = track;
    const maxScroll = Math.max(0, scrollWidth - clientWidth);
    const step = getScrollStep(track);
    const pages =
      maxScroll <= SCROLL_EDGE_PX ? 1 : Math.ceil(maxScroll / step) + 1;

    setCanScrollPrev(scrollLeft > SCROLL_EDGE_PX);
    setCanScrollNext(scrollLeft < maxScroll - SCROLL_EDGE_PX);
    setPageCount(pages);
  }, []);

  const scheduleScrollStateUpdate = useCallback(() => {
    if (scrollFrameRef.current != null) {
      return;
    }

    scrollFrameRef.current = window.requestAnimationFrame(() => {
      scrollFrameRef.current = null;
      updateScrollState();
    });
  }, [updateScrollState]);

  function stopInertia() {
    if (inertiaFrameRef.current == null) {
      return;
    }

    window.cancelAnimationFrame(inertiaFrameRef.current);
    inertiaFrameRef.current = null;
  }

  function startInertia(track: HTMLDivElement, initialVelocity: number) {
    stopInertia();

    let velocity = initialVelocity;

    const tick = () => {
      velocity *= INERTIA_FRICTION;
      track.scrollLeft -= velocity * 16;

      if (Math.abs(velocity) > INERTIA_STOP_VELOCITY) {
        inertiaFrameRef.current = window.requestAnimationFrame(tick);
        return;
      }

      inertiaFrameRef.current = null;
    };

    inertiaFrameRef.current = window.requestAnimationFrame(tick);
  }

  useEffect(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    track.scrollTo({ left: 0 });
    updateScrollState();

    const observer = new ResizeObserver(scheduleScrollStateUpdate);
    observer.observe(track);
    track.addEventListener("scroll", scheduleScrollStateUpdate, {
      passive: true,
    });

    return () => {
      observer.disconnect();
      track.removeEventListener("scroll", scheduleScrollStateUpdate);
      stopInertia();

      if (scrollFrameRef.current != null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, [scheduleScrollStateUpdate, updateScrollState, videos]);

  function scrollByPage(direction: -1 | 1) {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    stopInertia();
    track.scrollBy({
      left: direction * getScrollStep(track),
      behavior: "smooth",
    });
  }

  function goToPage(pageIndex: number) {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    stopInertia();
    track.scrollTo({
      left: pageIndex * getScrollStep(track),
      behavior: "smooth",
    });
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    stopInertia();
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: track.scrollLeft,
      hasDragged: false,
      lastX: event.clientX,
      lastTime: performance.now(),
      velocity: 0,
    };
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;

    if (drag.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - drag.startX;

    if (event.pointerType === "touch") {
      if (Math.abs(deltaX) >= DRAG_THRESHOLD_PX) {
        drag.hasDragged = true;
      }
      return;
    }

    const track = trackRef.current;

    if (!track) {
      return;
    }
    const now = performance.now();
    const elapsed = now - drag.lastTime;

    if (elapsed > 0) {
      drag.velocity = (event.clientX - drag.lastX) / elapsed;
    }

    drag.lastX = event.clientX;
    drag.lastTime = now;

    if (!drag.hasDragged && Math.abs(deltaX) < DRAG_THRESHOLD_PX) {
      return;
    }

    if (!drag.hasDragged) {
      drag.hasDragged = true;
      track.setPointerCapture(event.pointerId);
      track.classList.add("cursor-grabbing");
      track.classList.remove("cursor-grab");
    }

    track.scrollLeft = drag.startScrollLeft - deltaX;
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;

    if (drag.pointerId !== event.pointerId) {
      return;
    }

    const track = trackRef.current;
    const scrolled =
      track != null &&
      Math.abs(track.scrollLeft - drag.startScrollLeft) > DRAG_THRESHOLD_PX;
    const pointerMoved =
      Math.abs(event.clientX - drag.startX) > DRAG_THRESHOLD_PX;
    const wasDragging = drag.hasDragged || scrolled || pointerMoved;

    drag.pointerId = null;
    track?.classList.add("cursor-grab");
    track?.classList.remove("cursor-grabbing");

    if (track?.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId);
    }

    if (wasDragging) {
      if (track && drag.hasDragged && event.pointerType !== "touch") {
        startInertia(track, drag.velocity);
      }
      return;
    }

    const item = (event.target as HTMLElement | null)?.closest(
      "[data-video-id]",
    );
    const videoId = item?.getAttribute("data-video-id");

    if (videoId) {
      onSelect(videoId);
    }
  }

  function handleClickCapture(event: MouseEvent<HTMLDivElement>) {
    if (!dragRef.current.hasDragged) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    dragRef.current.hasDragged = false;
  }

  const showControls = canScrollPrev || canScrollNext || pageCount > 1;

  return (
    <div className="flex w-full flex-col gap-5 md:gap-6">
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onClickCapture={handleClickCapture}
        className="scrollbar-site flex cursor-grab touch-pan-x gap-4 overflow-x-auto overscroll-x-contain pb-2 select-none md:gap-5"
      >
        {videos.map((video, index) => (
          <VideoCarouselItem
            key={video.id}
            video={video}
            priority={index === 0}
          />
        ))}
      </div>

      {showControls ? (
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => scrollByPage(-1)}
              disabled={!canScrollPrev}
              aria-label={t("previous")}
              className={cn(
                "flex size-9 items-center justify-center rounded-full border transition-colors md:size-11",
                canScrollPrev
                  ? "cursor-pointer border-white/40 text-white hover:border-white hover:bg-white/5"
                  : "cursor-not-allowed border-white/15 text-white/25",
              )}
            >
              <ChevronLeft className="size-4 md:size-5" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => scrollByPage(1)}
              disabled={!canScrollNext}
              aria-label={t("next")}
              className={cn(
                "flex size-9 items-center justify-center rounded-full border transition-colors md:size-11",
                canScrollNext
                  ? "cursor-pointer border-white/40 text-white hover:border-white hover:bg-white/5"
                  : "cursor-not-allowed border-white/15 text-white/25",
              )}
            >
              <ChevronRight className="size-4 md:size-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
