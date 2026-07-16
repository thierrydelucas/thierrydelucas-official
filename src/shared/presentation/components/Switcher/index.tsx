"use client";

import { DRAWER_ANIMATION_DURATION_MS } from "@/src/shared/presentation/components/Drawer";
import { useLocale } from "next-intl";
import {
  Link,
  usePathname,
  useRouter,
} from "@/src/shared/infrastructure/i18n/navigation";
import { cn } from "../../utils/cn";

const LOCALES = [
  { code: "en", label: "EN" },
  { code: "pt", label: "PT" },
] as const;

type Props = {
  onButtonClick?: () => void;
};

export default function Switcher({ onButtonClick }: Props) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      data-cy="locale-switcher"
      className="flex items-center gap-2.5 text-white font-inter text-[12px] md:text-[10px] font-medium tracking-[2%]"
    >
      {LOCALES.map(({ code, label }, index) => (
        <span key={code} className="flex items-center gap-2.5">
          {index > 0 && (
            <span data-cy="locale-switcher-separator" aria-hidden="true">
              ·
            </span>
          )}
          <Link
            href={pathname}
            locale={code}
            data-cy={`locale-switcher-${code}`}
            onClick={(event) => {
              if (locale === code) return;

              event.preventDefault();
              onButtonClick?.();
              window.setTimeout(() => {
                router.replace(pathname, { locale: code });
              }, DRAWER_ANIMATION_DURATION_MS);
            }}
            className={cn(
              locale !== code && "opacity-50",
              "hover:opacity-100 transition-all duration-300 ease-in-out",
            )}
          >
            {label}
          </Link>
        </span>
      ))}
    </div>
  );
}
