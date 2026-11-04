import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, ShieldCheck, Truck } from "lucide-react";
import Container from "@/components/ui/Container";

export default function PromotionalSection() {
  return (
    <section className="py-8 sm:py-10">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Promo Card 1: Apple & Tech Ecosystem */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 flex flex-col justify-between min-h-[260px] shadow-lg group">
            <div className="absolute right-0 bottom-0 w-2/5 h-full opacity-60 group-hover:scale-105 transition-transform duration-500 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80"
                alt="MacBook Pro Special"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>

            <div className="relative z-10 max-w-xs">
              <div className="inline-flex items-center gap-1.5 bg-brand-primary text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-3">
                <Clock className="w-3 h-3" />
                <span>Limited Stock</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
                Apple M3 Pro Lineup
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                Experience unprecedented computational efficiency with official 1-year warranty.
              </p>
            </div>

            <div className="relative z-10 pt-4">
              <Link
                href="#products"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold bg-white text-slate-900 hover:bg-brand-secondary hover:text-white px-4 py-2 rounded-md transition-colors shadow-sm"
              >
                <span>Shop Apple Devices</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Promo Card 2: Home Audio & Smart Living */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 text-white p-6 sm:p-8 flex flex-col justify-between min-h-[260px] shadow-lg group">
            <div className="absolute right-0 bottom-0 w-2/5 h-full opacity-60 group-hover:scale-105 transition-transform duration-500 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80"
                alt="Smart Living Gear"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>

            <div className="relative z-10 max-w-xs">
              <div className="inline-flex items-center gap-1.5 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-3">
                <ShieldCheck className="w-3 h-3" />
                <span>Authorized Distributor</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
                Smart Home & Acoustics
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                Sony, Bose & JBL audio systems with free doorstep setup in Georgetown.
              </p>
            </div>

            <div className="relative z-10 pt-4">
              <Link
                href="#products"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold bg-emerald-500 text-white hover:bg-emerald-600 px-4 py-2 rounded-md transition-colors shadow-sm"
              >
                <span>Explore Audio Systems</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
