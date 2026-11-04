import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Tag } from "lucide-react";
import BannerCarousel from "@/components/home/BannerCarousel";
import { getHeroBanners, getPromoBanners } from "@/services/banner.service";
import Container from "@/components/ui/Container";

export default async function HeroSection() {
  const heroBanners = await getHeroBanners();
  const promoBanners = await getPromoBanners();

  const sidePromos = promoBanners.slice(0, 2);

  return (
    <section className="pt-4 sm:pt-6 pb-2">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Main Hero Banner Carousel (3 Columns on Large) */}
          <div className="lg:col-span-3">
            <BannerCarousel banners={heroBanners} />
          </div>

          {/* Right Side Promo Cards (1 Column on Large, 2 cols on Tablet) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {sidePromos.map((promo) => (
              <div
                key={promo.id}
                className={`relative rounded-xl overflow-hidden shadow-card p-5 flex flex-col justify-between h-[175px] sm:h-[200px] lg:h-[228px] bg-gradient-to-br ${promo.bgGradient} text-white group`}
              >
                {/* Background overlay image with blend */}
                <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-40 group-hover:scale-110 group-hover:opacity-50 transition-all duration-500 overflow-hidden">
                  <Image
                    src={promo.image}
                    alt={promo.title}
                    fill
                    className="object-cover object-center"
                    sizes="200px"
                  />
                </div>

                <div className="relative z-10">
                  <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-sm">
                    <Tag className="w-3 h-3" />
                    {promo.badge}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold mt-2 leading-snug max-w-[180px]">
                    {promo.title}
                  </h3>
                  <p className="text-xs text-white/80 line-clamp-1 mt-0.5 max-w-[180px]">
                    {promo.subtitle}
                  </p>
                </div>

                <div className="relative z-10 pt-2">
                  <Link
                    href={promo.ctaLink}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-white/20 hover:bg-white hover:text-slate-900 py-1.5 px-3 rounded transition-all"
                  >
                    <span>{promo.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
