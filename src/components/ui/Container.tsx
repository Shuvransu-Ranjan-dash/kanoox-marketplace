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
        "w-full mx-auto px-4 sm:px-6 lg:px-8",
        fluid ? "max-w-none" : "max-w-[1280px]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
