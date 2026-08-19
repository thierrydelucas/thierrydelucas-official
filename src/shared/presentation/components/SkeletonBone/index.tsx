import { cn } from "@/src/shared/presentation/utils/cn";

export default function SkeletonBone({ className }: { className?: string }) {
  return (
    <div
      className={cn("animate-pulse rounded-sm bg-white/10", className)}
      aria-hidden
    />
  );
}
