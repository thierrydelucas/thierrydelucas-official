"use server";
import React from "react";
import BurgerMenu from "../BurgerMenu";
import WIDTH_DIMENSION from "../../utils/widthDimension";
import Image from "next/image";
import DesktopMenu from "../DesktopMenu";

export default async function Header(): Promise<React.JSX.Element> {
  return (
    <section className="flex p-4 md:px-8 fixed top-0 left-0 right-0 z-50 bg-[#0B0B0B] ">
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
            width={32}
            height={50}
          />
          <div>
            <DesktopMenu />
          </div>
        </div>
      </section>
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 -bottom-6 h-6 backdrop-blur-3xl bg-gray-600/10 md:border-t md:border-gray-100/20"
        style={{
          maskImage: "linear-gradient(to bottom, black, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
        }}
      />
    </section>
  );
}
