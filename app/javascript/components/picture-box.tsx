import { cn } from "@/lib/utils";
import { forwardRef, ComponentProps, ReactNode } from "react";


const PictureBox = forwardRef<HTMLDivElement, ComponentProps<"div"> & { children: ReactNode }>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "cursor-pointer w-fulltransition-all max-h-40 overflow-hidden",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
PictureBox.displayName = "PictureBox"

export { PictureBox };
