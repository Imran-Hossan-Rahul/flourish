"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center overflow-hidden bg-background">
      <div className="container mx-auto px-4 h-full z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full pt-16 lg:pt-0">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start gap-6 max-w-xl"
          >
            <span className="text-primary font-semibold tracking-widest uppercase text-sm">
              Premium Floral Designs
            </span>
            <h1 className="text-5xl md:text-7xl font-serif text-foreground leading-tight">
              Elegance in <br/>
              <span className="italic text-primary">Every Petal.</span>
            </h1>
            <p className="text-lg text-foreground/70 leading-relaxed max-w-lg font-sans">
              Discover bespoke floral arrangements crafted with an artisan’s touch. From intimate gatherings to grand events, we turn your vision into an unforgettable botanical experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
              <Link 
                href="/catalog" 
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-medium overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(27,67,50,0.4)]"
              >
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 flex items-center gap-2">
                  Shop Collection
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              
              <Link 
                href="/events" 
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary/20 text-primary font-medium hover:bg-primary/5 transition-colors"
              >
                Book an Event
              </Link>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative w-full aspect-[4/5] lg:aspect-auto lg:h-[80vh] rounded-2xl overflow-hidden shadow-2xl mt-8 lg:mt-0"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent z-10 mix-blend-multiply rounded-2xl" />
            <Image
              src="/images/hero.png"
              alt="Elegant bouquet of blush roses and emerald leaves"
              fill
              className="object-cover rounded-2xl"
              priority
            />
          </motion.div>

        </div>
      </div>
      
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-y-1/3 -translate-x-1/4 pointer-events-none" />
    </section>
  );
}
