"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LogOut, Package, User, Clock, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { fetchApi } from "@/lib/api";

export default function ProfilePage() {
  const { user, token, logout } = useAuthStore();
  const clearCart = useCartStore((state) => state.clearCart);
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const fetchMyOrders = async () => {
      try {
        const data = await fetchApi('/orders/myorders', { auth: true });
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyOrders();
  }, [user, router]);

  const handleLogout = () => {
    logout();
    clearCart();
    router.push("/login");
  };

  if (!user) return null; // Prevent flash of unauthorized content

  return (
    <div className="min-h-[85vh] bg-background py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Profile Sidebar */}
          <div className="w-full md:w-1/3">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-foreground/5 rounded-3xl p-8 border border-border shadow-sm sticky top-24"
            >
              <div className="flex flex-col items-center text-center pb-8 border-b border-border">
                <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                  <User size={40} />
                </div>
                <h2 className="font-serif text-2xl font-bold text-foreground">{user.name}</h2>
                <p className="text-foreground/60 mt-1">{user.email}</p>
                {user.isAdmin && (
                  <span className="mt-3 px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-semibold uppercase tracking-widest">
                    Admin User
                  </span>
                )}
              </div>

              <div className="mt-8 space-y-4">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors font-medium border border-red-100"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            </motion.div>
          </div>

          {/* Main Content Area (Orders) */}
          <div className="w-full md:w-2/3">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-foreground/5 rounded-3xl p-8 border border-border shadow-sm min-h-[500px]"
            >
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-border">
                <Package className="w-6 h-6 text-primary" />
                <h2 className="font-serif text-2xl font-bold text-foreground">Order History</h2>
              </div>

              {isLoading ? (
                <div className="flex justify-center items-center h-48">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-foreground/50 mb-4">You haven't placed any orders yet.</p>
                  <button onClick={() => router.push('/catalog')} className="text-primary font-medium flex items-center justify-center gap-2 mx-auto hover:underline">
                    Browse the Collection <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order._id} className="border border-border rounded-xl p-6 hover:shadow-md transition-all">
                      <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                        <div>
                          <p className="text-xs text-foreground/50 font-mono mb-1">Order #{order._id}</p>
                          <p className="text-sm font-medium flex items-center gap-2">
                            <Clock className="w-4 h-4 text-primary" />
                            {new Date(order.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric', month: 'long', day: 'numeric'
                            })}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-lg text-primary">${order.totalPrice.toFixed(2)}</p>
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 ${order.isPaid ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                            {order.isPaid ? 'Paid' : 'Pending Payment'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="bg-secondary/20 rounded-lg p-4 mt-4">
                        <ul className="space-y-3">
                          {order.orderItems.map((item, idx) => (
                            <li key={idx} className="flex justify-between text-sm">
                              <span className="text-foreground flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                                {item.name} <span className="text-foreground/50">x{item.qty}</span>
                              </span>
                              <span className="font-medium">${(item.price * item.qty).toFixed(2)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
