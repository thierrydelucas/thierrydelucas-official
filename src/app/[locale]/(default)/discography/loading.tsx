import SkeletonBone from "@/src/shared/presentation/components/SkeletonBone";

export default function Loading() {
  return (
    <section
      className="flex w-full flex-col py-10 text-white md:py-16"
      aria-busy="true"
      aria-label="Loading discography"
    >
      <div className="flex w-full flex-col gap-8 md:gap-10">
        <SkeletonBone className="aspect-video w-full rounded-2xl md:rounded-3xl" />
        <div className="flex flex-col gap-3">
          <SkeletonBone className="h-8 w-3/4 max-w-xl md:h-10" />
          <SkeletonBone className="h-4 w-16" />
          <SkeletonBone className="h-4 w-full max-w-2xl" />
          <SkeletonBone className="h-4 w-2/3 max-w-lg" />
        </div>
        <div className="flex gap-4 overflow-hidden">
          <SkeletonBone className="aspect-video w-[72%] shrink-0 rounded-3xl sm:w-[48%] md:w-[38%]" />
          <SkeletonBone className="aspect-video w-[72%] shrink-0 rounded-3xl sm:w-[48%] md:w-[38%]" />
          <SkeletonBone className="aspect-video w-[72%] shrink-0 rounded-3xl sm:w-[48%] md:w-[38%]" />
        </div>
      </div>
    </section>
  );
}
