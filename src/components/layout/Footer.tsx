"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Truck, 
  ShieldCheck, 
  Headphones, 
  CreditCard, 
  Mail, 
  CheckCircle2,
  Facebook,
  Instagram,
  Twitter,
  Youtube
} from "lucide-react";
import navigationData from "@/data/navigation.json";
import Container from "@/components/ui/Container";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { footer } = navigationData;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 mt-16 border-t border-slate-800">
      {/* 1. Value Proposition Pillars */}
      <div className="border-b border-slate-800 py-8 bg-slate-950/40">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center space-x-4 p-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
              <div className="w-12 h-12 rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-secondary flex-shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Fast Local Delivery</h4>
                <p className="text-xs text-slate-400 mt-0.5">Prompt delivery across Guyana</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">100% Genuine Brands</h4>
                <p className="text-xs text-slate-400 mt-0.5">Official manufacturer warranty</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 flex-shrink-0">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">24/7 Friendly Support</h4>
                <p className="text-xs text-slate-400 mt-0.5">Direct phone & chat assistance</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Secure Checkout</h4>
                <p className="text-xs text-slate-400 mt-0.5">Cards, Mobile Money & COD</p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* 2. Main Footer Navigation & Newsletter */}
      <div className="py-12">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Intro & Newsletter */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 rounded-lg bg-brand-primary flex items-center justify-center text-white font-black text-lg">
                  K
                </div>
                <span className="text-2xl font-black tracking-tight text-white">
                  Kanoo<span className="text-brand-secondary">X</span>
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                {footer.about}
              </p>

              {/* Newsletter subscription form */}
              <div className="pt-2">
                <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-2">
                  Subscribe for Exclusive Deals & Discounts
                </h5>
                {subscribed ? (
                  <div className="flex items-center space-x-2 text-emerald-400 text-xs bg-emerald-950/30 p-2.5 rounded border border-emerald-900">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Thank you for subscribing to KanooX deals!</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex max-w-sm">
                    <div className="relative flex-1">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full pl-9 pr-3 py-2 text-xs bg-slate-800 border border-slate-700 text-white rounded-l-md focus:outline-none focus:border-brand-primary placeholder-slate-400"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs font-bold text-white bg-brand-primary hover:bg-brand-hover rounded-r-md transition-colors whitespace-nowrap"
                    >
                      Subscribe
                    </button>
                  </form>
                )}
              </div>

              {/* Social icons */}
              <div className="flex items-center space-x-3 pt-2">
                <a href="#facebook" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-brand-primary transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#instagram" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-brand-primary transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#twitter" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-brand-primary transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#youtube" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-brand-primary transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Dynamic Link Columns */}
            {footer.columns.map((col, idx) => (
              <div key={idx} className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                  {col.title}
                </h4>
                <ul className="space-y-2 text-xs text-slate-400">
                  {col.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <Link
                        href={link.href}
                        className="hover:text-white hover:underline transition-colors block py-0.5"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* 3. Bottom Legal & Payment Badges */}
      <div className="border-t border-slate-800 py-6 bg-slate-950 text-xs text-slate-500">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} KanooX Marketplace Inc. All rights reserved.</p>

            <div className="flex items-center gap-3">
              <span className="text-[11px] text-slate-400">Accepted Payments:</span>
              <div className="flex items-center gap-2">
                <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px] font-bold">VISA</span>
                <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px] font-bold">MASTERCARD</span>
                <span className="bg-slate-800 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold">MMG</span>
                <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px] font-bold">CASH ON DELIVERY</span>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
