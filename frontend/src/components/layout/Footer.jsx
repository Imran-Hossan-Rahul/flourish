"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#121f18] text-white/80 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 border-b border-white/10 pb-16">
          
          <div className="lg:col-span-1">
            <Link href="/" className="font-serif text-3xl font-bold tracking-wider text-white mb-6 inline-block">
              FLOURISH
            </Link>
            <p className="mb-6 leading-relaxed">
              Bespoke floral arrangements and event management crafting unforgettable moments wrapped in natural beauty.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-serif font-bold text-lg mb-6">Explore</h4>
            <ul className="space-y-4">
              <li><Link href="/catalog" className="hover:text-white transition-colors">Shop Catalog</Link></li>
              <li><Link href="/events" className="hover:text-white transition-colors">Event Services</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Get in Touch</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif font-bold text-lg mb-6">Customer Care</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Returns & Refunds</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif font-bold text-lg mb-6">Newsletter</h4>
            <p className="mb-4">Subscribe to receive exclusive offers and floral inspiration directly to your inbox.</p>
            <form className="flex w-full" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-white/10 px-4 py-3 rounded-l-lg outline-none focus:bg-white/20 text-white placeholder-white/40"
              />
              <button type="submit" className="bg-primary px-4 py-3 rounded-r-lg font-medium text-white hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </form>
          </div>

        </div>

        <div className="text-center text-sm text-white/50">
          <p>&copy; {new Date().getFullYear()} Flourish Event Planning and Decor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
