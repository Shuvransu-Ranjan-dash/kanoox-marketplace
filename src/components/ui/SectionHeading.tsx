import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
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
  viewAllText = "View All",
  action,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-3 border-b border-border/80 gap-3", className)}>
      <div>
        {badge && (
          <span className="inline-block text-xs font-semibold text-brand-primary tracking-wider uppercase mb-1">
            {badge}
          </span>
        )}
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-content-primary flex items-center gap-2">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-content-secondary mt-1">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {action}
        {viewAllLink && (
          <Link
            href={viewAllLink}
            className="inline-flex items-center text-sm font-semibold text-brand-primary hover:text-brand-hover hover:underline transition-colors group"
          >
            {viewAllText}
            <ChevronRight className="w-4 h-4 ml-0.5 transform group-hover:translate-x-0.5 transition-transform" />
          </Link>
        )}
      </div>
    </div>
  );
}
