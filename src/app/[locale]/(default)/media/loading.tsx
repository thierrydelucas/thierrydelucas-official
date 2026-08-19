import SkeletonBone from "@/src/shared/presentation/components/SkeletonBone";

export default function Loading() {
  return (
    <section
      className="flex w-full flex-col py-10 md:py-14"
      aria-busy="true"
      aria-label="Loading media"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <div className="flex flex-col gap-4 md:gap-6">
          <SkeletonBone className="aspect-[3/4] w-full" />
          <SkeletonBone className="aspect-[4/3] w-full" />
          <SkeletonBone className="aspect-[3/4] w-full" />
        </div>
        <div className="flex flex-col gap-4 md:gap-6">
          <SkeletonBone className="aspect-[4/3] w-full" />
          <SkeletonBone className="aspect-[3/4] w-full" />
          <SkeletonBone className="aspect-[4/3] w-full" />
        </div>
      </div>
    </section>
  );
}
