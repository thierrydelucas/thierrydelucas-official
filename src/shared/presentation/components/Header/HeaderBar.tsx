"use client";

import BurgerMenu from "../BurgerMenu";
import DesktopMenu from "../DesktopMenu";
import WIDTH_DIMENSION from "../../utils/widthDimension";
import { cn } from "../../utils/cn";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function HeaderBar() {
  const pathname = usePathname();
  const isHomePage = /\/home\/?$/.test(pathname);

  return (
    <section
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex px-4 py-5 md:px-8",
        isHomePage ? "bg-transparent md:bg-[#0B0B0B]" : "bg-[#0B0B0B]",
      )}
    >
      <div className="block md:hidden">
        <BurgerMenu />
      </div>

      <section className="hidden md:flex items-center justify-center md:w-full">
        <div
          className={`w-full ${WIDTH_DIMENSION} flex items-center justify-between`}
        >
          <Image
            src="/images/logo.png"
            alt="Thierry de Lucas"
            width={48}
            height={42}
            className="h-8 w-auto"
          />
          <div>
            <DesktopMenu />
          </div>
        </div>
      </section>
      <div
        aria-hidden
        className="hidden md:block md:absolute pointer-events-none left-0 right-0 -bottom-6 h-6 backdrop-blur-3xl md:bg-gray-600/10 md:border-t md:border-gray-100/20"
        style={{
          maskImage: "linear-gradient(to bottom, black, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
        }}
      />
    </section>
  );
}
