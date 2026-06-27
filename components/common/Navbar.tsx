"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, Search, User } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";

export function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { getTotalItems } = useCartStore();
  const { user, logout, isAuthenticated } = useAuthStore();
  const cartItems = getTotalItems();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white dark:bg-black shadow-lg"
          : "bg-white/80 dark:bg-black/80 backdrop-blur"
      }`}
    >
      <div className="container-custom flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tighter hover:opacity-70 transition-opacity"
        >
          STEPX
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium hover:opacity-70 transition-opacity"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors">
            <Search size={20} />
          </button>

          <Link
            href="/cart"
            className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
          >
            <ShoppingCart size={20} />
            {cartItems > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems}
              </span>
            )}
          </Link>

          {isAuthenticated && user ? (
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => router.push("/dashboard")}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
              >
                <User size={20} />
              </button>
              {user.role === "admin" && (
                <Link
                  href="/admin"
                  className="text-xs font-medium px-3 py-1 bg-black text-white dark:bg-white dark:text-black rounded hover:opacity-80 transition-opacity"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="text-xs font-medium px-3 py-1 border border-black hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black transition-colors rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/login"
                className="text-xs font-medium px-3 py-1 border border-black hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black transition-colors rounded"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-xs font-medium px-3 py-1 bg-black text-white dark:bg-white dark:text-black rounded hover:opacity-80 transition-opacity"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
          <div className="container-custom py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 hover:text-gray-600 dark:hover:text-gray-400"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <hr className="my-2 border-gray-200 dark:border-gray-800" />
            {isAuthenticated && user ? (
              <>
                <Link
                  href="/dashboard"
                  className="block py-2 hover:text-gray-600 dark:hover:text-gray-400"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    className="block py-2 hover:text-gray-600 dark:hover:text-gray-400"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left py-2 hover:text-gray-600 dark:hover:text-gray-400"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block py-2 hover:text-gray-600 dark:hover:text-gray-400"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block py-2 hover:text-gray-600 dark:hover:text-gray-400"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
