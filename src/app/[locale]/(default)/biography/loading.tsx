import SkeletonBone from "@/src/shared/presentation/components/SkeletonBone";

function BiographySectionSkeleton({ imageLeft = true }: { imageLeft?: boolean }) {
  return (
    <section className="flex w-full flex-col gap-6 md:gap-8">
      <div className="flex flex-col">
        <SkeletonBone className="h-24 w-32 md:h-36 md:w-44" />
        <SkeletonBone className="-mt-8 h-8 w-48 md:-mt-12 md:h-12 md:w-72" />
      </div>
      <div
        className={`flex flex-col gap-6 md:gap-10 ${imageLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
      >
        <SkeletonBone className="aspect-4/5 w-full shrink-0 md:w-[42%]" />
        <div className="flex flex-1 flex-col gap-4">
          <SkeletonBone className="h-4 w-full" />
          <SkeletonBone className="h-4 w-full" />
          <SkeletonBone className="h-4 w-5/6" />
          <SkeletonBone className="h-4 w-2/3" />
        </div>
      </div>
    </section>
  );
}

export default function Loading() {
  return (
    <div
      className="flex w-full flex-col gap-16 py-10 md:gap-24 md:py-14"
      aria-busy="true"
      aria-label="Loading biography"
    >
      <BiographySectionSkeleton imageLeft />
      <BiographySectionSkeleton imageLeft={false} />
      <BiographySectionSkeleton imageLeft />
    </div>
  );
}
