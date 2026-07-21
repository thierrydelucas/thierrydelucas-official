import WIDTH_DIMENSION from "@/src/shared/presentation/utils/widthDimension";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-1 pt-[60px] flex justify-center px-6 md:px-8">
      <div className={`w-full ${WIDTH_DIMENSION}`}>{children}</div>
    </main>
  );
}
