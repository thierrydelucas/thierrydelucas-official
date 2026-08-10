"use client";
import MobileMenuContent from "../MobileMenuContent";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Drawer,
  DRAWER_ANIMATION_DURATION_MS,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/src/shared/presentation/components/Drawer";

export default function BurgerMenu() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-end md:hidden">
      <Drawer
        open={open}
        onOpenChange={(isOpen) => setOpen(isOpen)}
        shouldScaleBackground={false}
      >
        <DrawerTrigger onClick={() => setOpen(!open)}>
          <div
            data-testid="burger-menu-container"
            className="flex items-center gap-3 p-2 text-lg font-semibold uppercase transition-all duration-500 hover:opacity-70  cursor-pointer"
          >
            <div className="relative w-6 h-3">
              <motion.span
                data-testid="burger-span"
                className="absolute top-0 left-0 w-full h-0.5 bg-gray-50 rounded-full"
                animate={open ? { rotate: 44, y: 5 } : { rotate: 0, y: 0 }}
                transition={{
                  duration: DRAWER_ANIMATION_DURATION_MS / 1000,
                  ease: "easeInOut",
                }}
              />
              <motion.span
                data-testid="burger-span"
                className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-50 rounded-full"
                animate={open ? { rotate: -44, y: -5 } : { rotate: 0, y: 0 }}
                transition={{
                  duration: DRAWER_ANIMATION_DURATION_MS / 1000,
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>
        </DrawerTrigger>
        <DrawerContent
          data-cy="burger-menu-content"
          className="left-0 right-0 w-full max-w-none border-0 bg-[#0B0B0B] shadow-[0px_-1.5px_2px_-1px_rgba(255,255,255,0.2)] md:hidden"
        >
          <DrawerHeader>
            <DrawerTitle></DrawerTitle>
            <MobileMenuContent onButtonClick={() => setOpen(false)} />
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
