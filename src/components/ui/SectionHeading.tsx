import React from "react";
import SeeAllLink from "@/components/ui/SeeAllLink";
import { cn } from "@/utils/helpers";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  viewAllLink?: string;
  viewAllText?: string;
  action?: React.ReactNode;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  badge,
  viewAllLink,
  viewAllText = "View all",
  action,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex items-start sm:items-end justify-between gap-3 mb-5 pb-3 border-b border-border/80 select-none", className)}>
      <div className="min-w-0 flex-1">
        {badge && (
          <span className="inline-block text-[10px] sm:text-xs font-bold text-brand-primary tracking-wider uppercase mb-1">
            {badge}
          </span>
        )}
        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-content-primary flex items-center gap-2">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm text-content-secondary mt-0.5 line-clamp-1 sm:line-clamp-none">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 pt-1 sm:pt-0">
        {action}
        {viewAllLink && (
          <SeeAllLink
            href={viewAllLink}
            text={viewAllText}
          />
        )}
      </div>
    </div>
  );
}
