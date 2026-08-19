import SkeletonBone from "@/src/shared/presentation/components/SkeletonBone";

export default function Loading() {
  return (
    <section
      className="flex w-full flex-col gap-10 px-6 py-10 md:mx-auto md:max-w-3xl md:gap-14 md:px-8 md:py-16"
      aria-busy="true"
      aria-label="Loading contact"
    >
      <header className="flex flex-col items-start gap-3 md:items-center">
        <SkeletonBone className="h-10 w-48 md:h-12 md:w-64" />
        <SkeletonBone className="h-4 w-64 max-w-md md:h-5" />
      </header>

      <div className="flex w-full flex-col gap-10 md:grid md:grid-cols-2 md:gap-x-16 md:gap-y-12">
        <SkeletonBone className="h-12 w-full" />
        <SkeletonBone className="h-12 w-full" />
        <SkeletonBone className="h-32 w-full md:col-span-2" />
      </div>

      <div className="flex justify-center pt-2 md:pt-4">
        <SkeletonBone className="h-11 w-full max-w-sm rounded-full md:w-60" />
      </div>
    </section>
  );
}
