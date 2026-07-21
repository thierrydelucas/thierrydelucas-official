import Hero from "@/src/modules/home/presentation/components/Hero";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;

  return (
    <div className={`py-8 text-center text-white `}>
      <Hero locale={locale} />
    </div>
  );
}
