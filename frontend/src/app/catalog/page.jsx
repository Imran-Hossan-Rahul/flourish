"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { fetchApi } from "@/lib/api";
import { useCartStore } from "@/store/cartStore";

export default function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchApi("/products");
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
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
    alert("Added to cart!"); // In a real app we would use a toast notification
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      
      {/* Header */}
      <div className="bg-secondary/30 py-20 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl md:text-5xl text-primary font-bold mb-4"
          >
            The Floral Collection
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-foreground/70 max-w-2xl mx-auto"
          >
            Curated arrangements for every occasion. Each piece is crafted by our artisans using the freshest, globally sourced blooms.
          </motion.p>
        </div>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-4 mt-16">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-foreground/50">
            No products available right now.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <motion.div 
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col bg-white dark:bg-foreground/5 border border-border/50 rounded-2xl overflow-hidden hover:shadow-xl transition-all"
              >
                {/* Image Placeholder if local image not found - Next.js handles relative /images */}
                <div className="w-full aspect-square bg-secondary/50 relative overflow-hidden flex items-center justify-center">
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
                      className="p-3 bg-secondary rounded-full text-primary hover:bg-primary hover:text-white transition-colors"
                      title="Add to Cart"
                    >
                      <ShoppingBag className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
