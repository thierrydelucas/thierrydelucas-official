"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

export default function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      position="top-center"
      toastOptions={{
        unstyled: true,
        classNames: {
          success: "border-emerald-900/50 bg-emerald-800 text-black",
          error: "border-red-900/50 bg-red-800 text-black",
          icon: "text-white mt-0.5",
          title: "font-medium text-white",
          description: "text-black/65 text-xs mt-0.5",
          toast:
            "flex w-full items-start gap-3 rounded-md border px-4 py-3 font-inter text-sm shadow-lg",
        },
      }}
      {...props}
    />
  );
}
