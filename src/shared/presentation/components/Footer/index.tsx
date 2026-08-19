import React from "react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import SocialMediaContainer from "../SocialMediaContainer";

/**
 * Reusable Footer component that displays a set of social media icons.
 *
 * This component can be used on any page of the site to show social media icons,
 * redirecting users to the respective external profiles.
 *
 * @component
 * @example
 * <Footer />
 */

export default async function Footer(): Promise<React.JSX.Element> {
  const t = await getTranslations("footer");

  return (
    <section
      data-cy="footer"
      className="flex flex-col gap-1 w-full py-4 px-8 items-center justify-center border-t border-gray-500/10"
    >
      <div className="mb-2.5">
        <SocialMediaContainer />
      </div>

      <div className="flex flex-col items-center text-center text-white font-inter font-normal tracking-[2%] gap-0.5">
        <p data-cy="footer-copyright" className="opacity-75 text-[11px]">
          {t("copyright")}
        </p>
        <p data-cy="footer-credit" className="opacity-50 text-[10px]">
          {t.rich("credit", {
            developer: (chunks) => (
              <Link
                href="https://www.linkedin.com/in/gustavoaraujoleite/"
                target="_blank"
                rel="noopener noreferrer"
                data-cy="footer-developer-link"
                className="underline underline-offset-2 hover:opacity-100"
              >
                {chunks}
              </Link>
            ),
          })}
        </p>
      </div>
    </section>
  );
}
