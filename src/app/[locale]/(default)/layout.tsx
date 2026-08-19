import WIDTH_DIMENSION from "@/src/shared/presentation/utils/widthDimension";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 pt-15 flex justify-center px-6 md:px-8">
      <div className={`w-full ${WIDTH_DIMENSION}`}>{children}</div>
    </div>
  );
}
