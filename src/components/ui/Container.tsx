import React from "react";
import { cn } from "@/utils/helpers";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  fluid?: boolean;
}

export default function Container({
  children,
  className,
  fluid = false,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14",
        fluid ? "max-w-none" : "max-w-[1440px] 2xl:max-w-[1560px]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
