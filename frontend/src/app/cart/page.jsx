"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { Trash2, ArrowRight } from "lucide-react";
import { useState } from "react";
import { fetchApi } from "@/lib/api";

export default function CartPage() {
  const { cartItems, removeItem, clearCart } = useCartStore();
  const user = useAuthStore(state => state.user);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [success, setSuccess] = useState(false);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleCheckout = async () => {
    if (!user) {
      alert("Please login first to checkout!");
      return;
    }
    
    setIsCheckingOut(true);
    try {
      const orderData = {
        orderItems: cartItems.map(item => ({
          name: item.name,
          qty: item.qty,
          image: item.image,
          price: item.price,
          product: item.product
        })),
        deliveryMode: "Pickup",
        shippingAddress: { address: "Store", city: "Local", postalCode: "000", country: "BD" },
        paymentMethod: "Cash",
        itemsPrice: total,
        taxPrice: total * 0.1,
        shippingPrice: 0,
        totalPrice: total + (total * 0.1)
      };

      await fetchApi('/orders', {
        method: 'POST',
        auth: true,
        body: JSON.stringify(orderData)
      });
      
      setSuccess(true);
      clearCart();
    } catch (err) {
      alert("Checkout failed: " + err.message);
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <div className="bg-emerald-50 text-emerald-800 p-8 rounded-2xl max-w-lg text-center border border-emerald-200">
          <h2 className="text-3xl font-serif font-bold mb-4">Order Placed!</h2>
          <p className="mb-6 opacity-80">Your beautifully crafted floral order has been received. You can view it in your dashboard.</p>
          <Link href="/catalog" className="inline-flex px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 min-h-[85vh]">
      <h1 className="font-serif text-4xl font-bold text-primary mb-10 text-center">Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-foreground/50 text-lg mb-6">Your floral cart is empty.</p>
          <Link href="/catalog" className="inline-flex px-8 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition">
            Browse Catalog
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                key={item.product} 
                className="flex items-center gap-6 p-4 bg-white dark:bg-foreground/5 rounded-2xl border border-border shadow-sm"
              >
                <div className="w-24 h-24 bg-secondary rounded-xl overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-serif font-medium text-lg">{item.name}</h3>
                  <p className="text-primary font-semibold mt-1">${item.price.toFixed(2)}</p>
                </div>
                <button 
                  onClick={() => removeItem(item.product)}
                  className="p-3 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-secondary/30 p-8 rounded-3xl border border-border sticky top-24">
              <h2 className="font-serif text-2xl font-bold mb-6 border-b border-border pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-foreground/70">Subtotal</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70">Taxes (10%)</span>
                  <span className="font-medium">${(total * 0.1).toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-4 text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">${(total * 1.1).toFixed(2)}</span>
                </div>
              </div>

              {!user ? (
                <div className="text-center p-4 bg-primary/5 rounded-xl border border-primary/10">
                  <p className="text-sm mb-3 text-primary">Log in to complete your order</p>
                  <Link href="/login" className="block w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium text-center hover:bg-primary/90">
                    Sign In to Checkout
                  </Link>
                </div>
              ) : (
                <button 
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full py-4 bg-primary text-primary-foreground rounded-xl text-lg font-semibold flex justify-center items-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-75"
                >
                  {isCheckingOut ? "Processing..." : "Place Order"}
                  {!isCheckingOut && <ArrowRight className="w-5 h-5" />}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
