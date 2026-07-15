import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IIconData {
  id: number;
  icon: string;
  link: string;
  image: string;
}

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

export default function Footer(): React.JSX.Element {
  const ICON_DATA: IIconData[] = [
    {
      id: 1,
      icon: "facebook",
      link: "https://www.facebook.com/thierry.delucasneves",
      image: "/icons/icon-facebook.svg",
    },
    {
      id: 2,
      icon: "instagram",
      link: "https://www.instagram.com/thierrydelucas",
      image: "/icons/icon-instagram.svg",
    },
    {
      id: 3,
      icon: "facebook",
      link: "https://www.facebook.com/thierrydelucas",
      image: "/icons/icon-spotify.svg",
    },
  ];
  return (
    <section
      data-cy="footer"
      className="flex flex-col gap-4 w-full py-6 px-8 items-center justify-center border-t border-gray-50/15"
    >
      <div data-cy="footer-social-links" className="flex items-center gap-6">
        {ICON_DATA.map(({ id, icon, link, image }) => (
          <Link
            key={id}
            data-cy={`footer-social-link-${id}`}
            href={link}
            target="_blank"
            className="cursor-pointer"
            title={icon}
          >
            <Image
              src={image}
              alt={icon}
              width={24}
              height={24}
              className="hover:scale-125 transition-all duration-350 ease-in-out"
            />
          </Link>
        ))}
      </div>

      <address
        data-cy="footer-contact-email"
        className="text-white opacity-80 not-italic cursor-default font-inter text-[12px] font-normal tracking-[2%]"
      >
        thierrydelucas.violin@gmail.com
      </address>

      <p
        data-cy="footer-copyright"
        className="text-white opacity-60 font-inter text-[8px] md:text-[10px] font-normal tracking-[2%]"
      >
        © 2026 Thierry de Lucas. All rights reserved.
      </p>
    </section>
  );
}
