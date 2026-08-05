import { cn } from "@/src/shared/presentation/utils/cn";

type ButtonProps = {
  title: string;
  variant?: "outline" | "solid";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
};

const VARIANT_CLASS = {
  outline: "border border-white text-white/90 hover:opacity-60",
  solid: "border border-white bg-white text-black hover:opacity-80",
} as const;

export default function Button({
  title,
  variant = "outline",
  type = "button",
  disabled = false,
  isLoading = false,
  className,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-2.5 rounded-full px-10 py-2.5 font-inter text-sm font-medium tracking-wide transition-opacity cursor-pointer",
        VARIANT_CLASS[variant],
        disabled && "cursor-not-allowed",
        disabled && "opacity-25 hover:opacity-25",
        className,
      )}
    >
      {isLoading && (
        <svg
          className="size-3.5 animate-spin text-black"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="8"
            cy="8"
            r="6"
            stroke="currentColor"
            strokeOpacity="0.2"
            strokeWidth="1.5"
          />
          <path
            d="M14 8a6 6 0 0 0-6-6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )}
      {title}
    </button>
  );
}
