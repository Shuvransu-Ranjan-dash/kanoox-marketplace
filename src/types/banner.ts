export interface HeroBanner {
  id: string;
  tagline: string;
  title: string;
  highlightText?: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  discountBadge?: string;
  image: string;
  video?: string;
  backgroundColor?: string;
  textColor?: string;
}

export interface PromoBanner {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  bgGradient: string;
}
