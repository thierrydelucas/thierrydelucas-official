import type { ReactNode } from "react";

type VisuallyHiddenHeadingProps = {
  children: ReactNode;
};

export default function VisuallyHiddenHeading({
  children,
}: VisuallyHiddenHeadingProps) {
  return <h1 className="sr-only">{children}</h1>;
}
