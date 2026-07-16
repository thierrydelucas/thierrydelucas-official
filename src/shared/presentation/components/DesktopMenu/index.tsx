"use client";

import MenuNav from "../MenuNav";
import Switcher from "../Switcher";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function DesktopMenu() {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <div className="relative flex items-center">
      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="burger-menu-content"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute right-full top-1/2 -translate-y-1/2 flex items-center md:gap-14 lg:gap-14 md:pr-6 lg:pr-8"
          >
            <nav className="flex items-center gap-2">
              <MenuNav />
            </nav>

            <div>
              <Switcher />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        data-testid="burger-menu-trigger"
        onClick={() => setOpen((prev) => !prev)}
        className={`text-[16px] transition-all duration-300 cursor-pointer font-cormorant font-semibold mb-[2px] text-white tracking-[2%] hover:opacity-100 ${
          open ? "opacity-25" : "opacity-100"
        }`}
      >
        Menu
      </button>
    </div>
  );
}
