"use client";

import { useId, useState, type ChangeEvent, type FocusEvent } from "react";
import { cn } from "@/src/shared/presentation/utils/cn";

type TextFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onBlur: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  multiline?: boolean;
  disabled?: boolean;
  type?: "text" | "email";
  className?: string;
};

export default function TextField({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  multiline = false,
  disabled = false,
  type = "text",
  className,
}: TextFieldProps) {
  const id = useId();
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;
  const floated = focused || hasValue;

  const handleBlur = (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFocused(false);
    onBlur(event);
  };

  const controlClassName = cn(
    "w-full bg-transparent px-3 font-inter text-base text-white outline-none",
    "placeholder:text-transparent",
    "disabled:cursor-not-allowed disabled:opacity-50",
    multiline ? "scrollbar-site h-32 resize-none pb-4 pt-5" : "h-14 pb-2 pt-4",
  );

  return (
    <div className={cn("relative w-full", className)}>
      <div
        className={cn(
          "relative rounded-sm transition-colors",
          error
            ? "border border-red-400"
            : focused
              ? "border border-white"
              : "border border-[#D9D9D9]",
        )}
      >
        {multiline ? (
          <textarea
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={handleBlur}
            disabled={disabled}
            placeholder=" "
            rows={4}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
            className={controlClassName}
            maxLength={1000}
          />
        ) : (
          <input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={handleBlur}
            disabled={disabled}
            placeholder=" "
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
            className={controlClassName}
          />
        )}

        <label
          htmlFor={id}
          className={cn(
            "pointer-events-none absolute left-3 font-inter transition-all duration-200 ease-out",
            floated
              ? cn(
                  "-top-2 z-10 bg-[#0B0B0B] px-1 text-xs tracking-[0.08em]",
                  error
                    ? "text-red-400"
                    : focused
                      ? "text-white"
                      : "text-[#D9D9D9]",
                )
              : "top-3.5 text-base tracking-[0.06em] text-white",
          )}
        >
          {label}
        </label>
      </div>

      <p
        id={`${id}-error`}
        role={error ? "alert" : undefined}
        className="mt-1.5 min-h-4 font-inter text-xs text-red-400"
      >
        {error ?? "\u00A0"}
      </p>
    </div>
  );
}
