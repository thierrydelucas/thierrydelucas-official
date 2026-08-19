import SkeletonBone from "@/src/shared/presentation/components/SkeletonBone";

export default function Loading() {
  return (
    <section
      className="md:flex md:w-full md:items-center md:justify-between py-8"
      aria-busy="true"
      aria-label="Loading home"
    >
      <div className="mr-10 hidden md:block">
        <SkeletonBone className="aspect-1073/1600 w-155" />
      </div>
      <div className="flex flex-col items-center text-center">
        <div className="flex flex-col items-center gap-2">
          <SkeletonBone className="h-10 w-64 md:h-12 md:w-80" />
          <SkeletonBone className="h-4 w-40 md:h-5 md:w-48" />
        </div>
        <SkeletonBone className="mt-10 h-11 w-36 rounded-full" />
        <div className="mt-14 hidden items-center gap-5 md:flex">
          <SkeletonBone className="size-6 rounded-full" />
          <SkeletonBone className="size-6 rounded-full" />
          <SkeletonBone className="size-6 rounded-full" />
          <SkeletonBone className="size-6 rounded-full" />
        </div>
      </div>
    </section>
  );
}
