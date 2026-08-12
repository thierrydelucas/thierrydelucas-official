import type { YoutubeVideo } from "@/src/modules/discography/infrastructure/services/getYoutubePlaylistVideos";

type FeaturedVideoProps = {
  video: YoutubeVideo;
};

export default function FeaturedVideo({ video }: FeaturedVideoProps) {
  return (
    <article className="flex w-full flex-col gap-5 md:gap-6">
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black md:rounded-3xl">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.id}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>

      <div className="flex flex-col gap-3 md:gap-4">
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <h2 className="font-cormorant text-[22px] font-medium leading-[120%] tracking-[0.04em] text-white md:text-[32px] md:leading-[110%] md:tracking-[0.08em]">
            {video.title}
          </h2>
          <span className="inline-flex w-fit shrink-0 items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 font-inter text-[11px] font-medium tracking-wide text-white/80 md:text-[13px]">
            {video.durationLabel}
          </span>
        </div>

        {video.description ? (
          <p className="scrollbar-site max-h-32 overflow-y-auto whitespace-pre-line font-inter text-sm font-medium leading-[150%] tracking-normal text-white/85 md:max-h-48 md:text-base">
            {video.description}
          </p>
        ) : null}
      </div>
    </article>
  );
}
