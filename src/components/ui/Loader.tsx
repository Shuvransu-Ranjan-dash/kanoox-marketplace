import React from "react";
import { cn } from "@/utils/helpers";

interface LoaderProps {
  className?: string;
}

export function Skeleton({ className }: LoaderProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-gray-200 rounded-md",
        className
      )}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-surface border border-border rounded-lg p-4 flex flex-col space-y-3">
      <Skeleton className="w-full aspect-square rounded-md" />
      <Skeleton className="w-1/3 h-4" />
      <Skeleton className="w-3/4 h-5" />
      <div className="flex items-center space-x-2">
        <Skeleton className="w-1/2 h-6" />
        <Skeleton className="w-1/4 h-4" />
      </div>
      <Skeleton className="w-full h-9 rounded-md mt-2" />
    </div>
  );
}

export default function Loader({ className }: LoaderProps) {
  return (
    <div className={cn("flex items-center justify-center p-8", className)}>
      <div className="w-8 h-8 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin" />
    </div>
  );
}
