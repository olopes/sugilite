import { cn } from "@/lib/utils";
import { forwardRef, ComponentProps, ReactNode } from "react";


const PictureBox = forwardRef<HTMLDivElement, ComponentProps<"div"> & { children: ReactNode }>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "drop-shadow-md border cursor-pointer rounded-xl w-40 h-40 transition-all overflow-hidden mb-4 hover:mb-0 hover:w-44 hover:h-44 hover:drop-shadow-xl",
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
