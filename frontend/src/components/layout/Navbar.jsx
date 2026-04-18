"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, UserCircle, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";

export default function Navbar() {
  const cartItems = useCartStore((state) => state.cartItems);
  const user = useAuthStore((state) => state.user);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — only render theme-dependent UI after mount
  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Mobile menu */}
        <div className="lg:hidden flex items-center">
          <button className="p-2 -ml-2 text-foreground/80 hover:text-foreground">
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Logo */}
        <div className="flex items-center justify-center lg:justify-start">
          <Link href="/" className="font-serif text-2xl font-bold tracking-wider text-primary">
            FLOURISH
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
          <Link href="/catalog" className="text-foreground/80 hover:text-primary transition-colors">
            Shop Catalog
          </Link>
          <Link href="/events" className="text-foreground/80 hover:text-primary transition-colors">
            Events & Weddings
          </Link>
          <Link href="/about" className="text-foreground/80 hover:text-primary transition-colors">
            Our Story
          </Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full text-foreground/80 hover:text-primary hover:bg-primary/10 transition-all"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          )}

          <Link href={user ? "/profile" : "/login"} className="text-foreground/80 hover:text-primary transition-colors">
            <UserCircle className="w-6 h-6" />
          </Link>
          <Link href="/cart" className="relative text-foreground/80 hover:text-primary transition-colors">
            <ShoppingCart className="w-6 h-6" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
