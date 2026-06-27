"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { useCartStore } from "@/store/useCartStore";

export default function CartPage() {
  const router = useRouter();
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } =
    useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const totalPrice = getTotalPrice();
  const shippingCost = totalPrice > 500 ? 0 : 50;
  const tax = Math.round(totalPrice * 0.05);
  const finalTotal = totalPrice + shippingCost + tax;

  const handleCheckout = () => {
    if (items.length === 0) {
      alert("Your cart is empty");
      return;
    }
    router.push("/checkout");
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <Navbar />

      <div className="pt-24 pb-20">
        <div className="container-custom">
          <h1 className="text-heading-lg mb-12">Shopping Cart</h1>

          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <ShoppingBag size={64} className="mx-auto mb-4 opacity-50" />
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                Your cart is empty
              </p>
              <Link href="/products" className="btn-primary">
                Continue Shopping
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="space-y-4 mb-6">
                  {items.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="border border-gray-200 dark:border-gray-800 rounded-2xl p-6 flex gap-6 shadow-sm hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-950"
                    >
                      <div className="w-24 h-24 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden relative">
  <Image
    src={item.product.images?.[0] || "/images/shoe-1.jpg"}
    alt={item.product.name}
    fill
    className="object-contain p-2"
  />
</div>

                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">{item.product.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          Size: {item.size} | Color: {item.color}
                        </p>
                        <p className="font-bold">
                          ₹
                          {item.product.discountPrice ||
                            item.product.price}
                        </p>
                      </div>

                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() =>
                            removeFromCart(
                              item.productId,
                              item.size,
                              item.color
                            )
                          }
                          className="text-red-600 hover:text-red-700 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>

                        <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                Math.max(1, item.quantity - 1),
                                item.size,
                                item.color
                              )
                            }
                            className="w-10 h-10 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                          >
                            −
                          </button>
                          <span className="px-3 py-1">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.quantity + 1,
                                item.size,
                                item.color
                              )
                            }
                            className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-900"
                          >
                            +
                          </button>
                        </div>

                        <p className="font-semibold">
                          ₹
                          {(item.product.discountPrice ||
                            item.product.price) * item.quantity}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="text-right">
                  <button
                    onClick={() => clearCart()}
                    className="text-red-600 hover:text-red-700 text-sm font-semibold transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-950 rounded-3xl p-8 h-fit shadow-lg border border-gray-200 dark:border-gray-800 sticky top-24"
              >
                <h3 className="text-heading-sm mb-6">Order Summary</h3>

                <div className="space-y-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Subtotal
                    </span>
                    <span className="font-semibold">₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Shipping
                    </span>
                    <span className="font-semibold">
                      {shippingCost === 0 ? (
                        <span className="text-green-600 dark:text-green-400">
                          FREE
                        </span>
                      ) : (
                        `₹${shippingCost}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Tax</span>
                    <span className="font-semibold">₹{tax}</span>
                  </div>
                </div>

                <div className="flex justify-between mb-6">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-bold">₹{finalTotal}</span>
                </div>
<div className="mb-6 p-4 rounded-xl bg-green-100 dark:bg-green-900/20">
  <p className="text-green-700 dark:text-green-400 text-sm font-semibold">
    ✓ Free delivery on orders above ₹500
  </p>
</div>
                <button
                  onClick={handleCheckout}
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                  <ArrowRight size={18} />
                </button>

                <Link
                  href="/products"
                  className="block text-center mt-4 text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  Continue Shopping
                </Link>
              </motion.div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
