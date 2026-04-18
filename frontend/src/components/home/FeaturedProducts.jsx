"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { fetchApi } from "@/lib/api";
import { useCartStore } from "@/store/cartStore";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchApi("/products");
        // Just take the first 4 for featured
        setProducts(data.slice(0, 4));
      } catch (err) {
        console.error("Failed to fetch featured products:", err);
      } finally {
        setIsLoading(false);
      }
    };
    getProducts();
  }, []);

  const handleAddToCart = (product) => {
    addItem({
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      qty: 1
    });
    alert("Added to cart!");
  };

  if (isLoading) return null;

  return (
    <section className="py-24 bg-secondary/10">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-xl">
            <span className="text-primary font-semibold tracking-widest uppercase text-sm mb-2 block">
              Curated For You
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
              Signature Collections
            </h2>
          </div>
          <Link 
            href="/catalog" 
            className="flex items-center gap-2 text-primary font-medium hover:text-primary/70 transition-colors mt-6 md:mt-0"
          >
            View Full Catalog
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div 
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col bg-white dark:bg-foreground/5 border border-border/50 rounded-2xl overflow-hidden hover:shadow-xl transition-all"
            >
              <div className="w-full aspect-[4/5] bg-secondary/50 relative overflow-hidden flex items-center justify-center">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              
              <div className="p-5 flex flex-col flex-grow">
                <span className="text-xs font-semibold text-primary/70 uppercase tracking-wider mb-2">
                  {product.category}
                </span>
                <h3 className="font-serif text-xl font-medium text-foreground mb-2">
                  {product.name}
                </h3>
                <div className="mt-auto pt-4 flex items-center justify-between">
                  <span className="text-lg font-medium text-foreground">
                    ${product.price.toFixed(2)}
                  </span>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="p-3 bg-secondary rounded-full text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer"
                    title="Add to Cart"
                  >
                    <ShoppingBag className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
