"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { fetchApi } from "@/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const data = await fetchApi('/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      
      login(data, data.token);
      router.push("/catalog");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-background px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-foreground/5 p-8 rounded-2xl shadow-xl border border-border"
      >
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-primary mb-2">Welcome Back</h1>
          <p className="text-foreground/60">Sign in to your Flourish account</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-3 rounded-lg bg-input border border-transparent focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-3 rounded-lg bg-input border border-transparent focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-70 mt-2"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-foreground/60 mt-8">
          Don't have an account?{" "}
          <Link href="/register" className="text-primary font-medium hover:underline">
            Register here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
