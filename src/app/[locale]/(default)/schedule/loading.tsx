import SkeletonBone from "@/src/shared/presentation/components/SkeletonBone";

function ScheduleEventSkeleton() {
  return (
    <div className="flex flex-col gap-3 border-b border-white/20 py-8 md:gap-4 md:py-10">
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between md:gap-8">
        <SkeletonBone className="h-9 w-3/4 max-w-xs md:h-14 md:w-2/5" />
        <div className="flex flex-col gap-2 md:items-end">
          <SkeletonBone className="h-4 w-28" />
          <SkeletonBone className="hidden h-4 w-12 md:block" />
        </div>
      </div>
      <SkeletonBone className="h-4 w-full max-w-xl md:h-6" />
      <SkeletonBone className="h-4 w-2/3 max-w-md md:h-5" />
      <SkeletonBone className="h-3.5 w-32 md:h-4" />
    </div>
  );
}

export default function Loading() {
  return (
    <section
      className="flex w-full flex-col px-0 py-10 text-white md:mx-auto md:max-w-3xl md:py-16"
      aria-busy="true"
      aria-label="Loading schedule"
    >
      <div className="flex w-full flex-col gap-10 md:gap-14">
        <div className="flex w-full flex-col items-center gap-3 border-y border-white/10 py-5 md:py-6">
          <SkeletonBone className="h-3 w-40" />
          <SkeletonBone className="h-4 w-28 md:h-5 md:w-32" />
        </div>

        <div className="flex w-full flex-col">
          <ScheduleEventSkeleton />
          <ScheduleEventSkeleton />
          <ScheduleEventSkeleton />
        </div>
      </div>
    </section>
  );
}
