import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type DotsProps = {
  className?: string;
} & ComponentPropsWithoutRef<"span">;

export function Dots({ className, ...rest }: DotsProps) {
  return (
    <span className={cn("cursor-pointer", className)} {...rest}>
      &#8942;
    </span>
  );
}
