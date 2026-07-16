"use client";
import Link from "next/link";
import { DRAWER_ANIMATION_DURATION_MS } from "@/src/shared/presentation/components/Drawer";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

type Props = {
  onButtonClick?: () => void;
};

export default function MenuNav({ onButtonClick }: Props) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const splittedPath = pathname.split("/");
  const path = splittedPath[splittedPath.length - 1];
  const message = useTranslations();

  const LINKS = useMemo(
    () => [
      {
        id: 1,
        name: message("nav.home"),
        href: `/${locale}/home`,
        originalName: "home",
      },
      {
        id: 2,
        name: message("nav.biography"),
        href: `/${locale}/biography`,
        originalName: "biography",
      },
      {
        id: 3,
        name: message("nav.schedule"),
        href: `/${locale}/schedule`,
        originalName: "schedule",
      },
      {
        id: 4,
        name: message("nav.discography"),
        href: `/${locale}/discography`,
        originalName: "discography",
      },
      {
        id: 5,
        name: message("nav.media"),
        href: `/${locale}/media`,
        originalName: "media",
      },
      {
        id: 6,
        name: message("nav.contact"),
        href: `/${locale}/contact`,
        originalName: "contact",
      },
    ],
    [locale, message],
  );
  return (
    <section className="flex flex-col gap-4 p-4 md:p-0 lg:gap-8 md:flex-row">
      {LINKS.map(({ id, name, href, originalName }) => (
        <Link
          href={href}
          key={id}
          onClick={(event) => {
            event.preventDefault();
            onButtonClick?.();
            window.setTimeout(() => {
              router.push(href);
            }, DRAWER_ANIMATION_DURATION_MS);
          }}
          className={`text-white font-playfair text-xl md:text-[18px] lg:text-2xl text-center ${path.toUpperCase() !== originalName.toUpperCase() && "opacity-50"} md:hover:opacity-100 transition-all duration-300 ease-in-out`}
        >
          {name}
        </Link>
      ))}
    </section>
  );
}
