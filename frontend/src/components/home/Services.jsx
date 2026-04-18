"use client";
import { motion } from "framer-motion";
import { Sparkles, CalendarHeart, Gift, Leaf } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: <CalendarHeart className="w-8 h-8 text-primary" />,
      title: "Wedding Florals",
      desc: "Transform your special day with our bespoke bridal bouquets and breathtaking venue decorations."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-primary" />,
      title: "Corporate Events",
      desc: "Elevate your professional gatherings with sophisticated, premium floral arrangements."
    },
    {
      icon: <Gift className="w-8 h-8 text-primary" />,
      title: "Bespoke Gifting",
      desc: "Custom-curated floral and chocolate boxes delivered directly to your loved ones."
    },
    {
      icon: <Leaf className="w-8 h-8 text-primary" />,
      title: "Sustainable Sourcing",
      desc: "Earth-friendly practices, using globally sourced, farm-fresh blooms straight to your vase."
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
            Why Choose Flourish?
          </h2>
          <p className="text-foreground/70 text-lg">
            We blend artistic vision with premium execution, guaranteeing every petal perfectly aligns with your expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((svc, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 bg-white dark:bg-foreground/5 border border-border rounded-2xl text-center flex flex-col items-center hover:border-primary/30 hover:shadow-lg transition-all"
            >
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-6">
                {svc.icon}
              </div>
              <h3 className="font-serif text-xl font-bold mb-3">{svc.title}</h3>
              <p className="text-foreground/70">{svc.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
