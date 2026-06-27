"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";

const checkoutSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().regex(/^\d{10}$/, "Valid 10-digit phone number required"),
  street: z.string().min(5, "Street address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().regex(/^\d{6}$/, "Valid 6-digit pincode required"),
  country: z.string().default("India"),
  orderNotes: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { user, token } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  if (!user || !token) {
    return (
      <main className="min-h-screen bg-white dark:bg-black">
        <Navbar />
        <div className="pt-24 pb-20 container-custom text-center">
          <p className="mb-4">Please log in to checkout</p>
          <Link href="/login" className="btn-primary">
            Go to Login
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-white dark:bg-black">
        <Navbar />
        <div className="pt-24 pb-20 container-custom text-center">
          <p className="mb-4">Your cart is empty</p>
          <Link href="/products" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const totalPrice = getTotalPrice();
  const shippingCost = totalPrice > 500 ? 0 : 50;
  const tax = Math.round(totalPrice * 0.05);
  const finalTotal = totalPrice + shippingCost + tax;

  const onSubmit = async (data: CheckoutFormData) => {
    setLoading(true);
    setError("");

    try {
      const orderData = {
        products: items.map((item) => ({
          product: item.productId,
          quantity: item.quantity,
          price: item.product.discountPrice || item.product.price,
        })),
        shippingAddress: {
          name: data.name,
          phone: data.phone,
          street: data.street,
          city: data.city,
          state: data.state,
          pincode: data.pincode,
          country: data.country,
        },
        orderNotes: data.orderNotes,
      };

      const response = await axios.post("/api/orders", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        clearCart();
        router.push(`/dashboard?orderCreated=true`);
      } else {
        setError(response.data.message || "Order creation failed");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Failed to create order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <Navbar />

      <div className="pt-24 pb-20">
        <div className="container-custom">
          <h1 className="text-heading-lg mb-12">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Checkout Form */}
            <div className="flex items-center gap-4 mb-10">
  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
    1
  </div>

  <div className="h-1 flex-1 bg-black" />

  <div className="w-10 h-10 rounded-full border flex items-center justify-center">
    2
  </div>

  <div className="h-1 flex-1 bg-gray-300" />

  <div className="w-10 h-10 rounded-full border flex items-center justify-center">
    3
  </div>
</div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {error && (
                  <div className="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 p-4 rounded-lg">
                    {error}
                  </div>
                )}
<h2 className="text-2xl font-bold mb-6">
  Shipping Information
</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Full Name
                    </label>
                    <input
                      {...register("name")}
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-5 py-4 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
                    />
                    {errors.name && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Phone Number
                    </label>
                    <input
                      {...register("phone")}
                      type="tel"
                      placeholder="9876543210"
                      className="w-full px-5 py-4 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
                    />
                    {errors.phone && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Street Address
                  </label>
                  <input
                    {...register("street")}
                    type="text"
                    placeholder="123 Main Street"
                    className="w-full px-5 py-4 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
                  />
                  {errors.street && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.street.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      City
                    </label>
                    <input
                      {...register("city")}
                      type="text"
                      placeholder="New Delhi"
                      className="w-full px-5 py-4 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
                    />
                    {errors.city && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.city.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      State
                    </label>
                    <input
                      {...register("state")}
                      type="text"
                      placeholder="Delhi"
                      className="w-full px-5 py-4 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
                    />
                    {errors.state && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.state.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Pincode
                    </label>
                    <input
                      {...register("pincode")}
                      type="text"
                      placeholder="110001"
                      className="w-full px-5 py-4 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
                    />
                    {errors.pincode && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.pincode.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Country
                    </label>
                    <input
                      {...register("country")}
                      type="text"
                      defaultValue="India"
                      className="w-full px-5 py-4 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
                    />
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 mt-8">
  Additional Information
</h2>
                  <label className="block text-sm font-semibold mb-2">
                    Order Notes (Optional)
                  </label>
                  <textarea
                    {...register("orderNotes")}
                    placeholder="Any special instructions..."
                    rows={4}
                    className="w-full px-5 py-4 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
                  />
                </div>
<div className="mb-6 p-4 rounded-2xl bg-green-100 dark:bg-green-900/20">
  <p className="font-semibold text-green-700 dark:text-green-400">
    ✓ Cash on Delivery Available
  </p>

  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
    Pay when your order arrives.
  </p>
</div>
                <button
                  type="submit"
                  disabled={loading}
                 className="w-full py-4 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-bold text-lg hover:opacity-90 transition disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Place Order (COD)"}
                </button>
              </form>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-950 rounded-3xl p-8 h-fit shadow-xl border border-gray-200 dark:border-gray-800 sticky top-24"
            >
              <h3 className="text-heading-sm mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>
                      {item.product.name} x{item.quantity}
                    </span>
                    <span className="font-semibold">
                      ₹
                      {(item.product.discountPrice ||
                        item.product.price) * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pb-6 border-b border-gray-200 dark:border-gray-800">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
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
                  <span>Tax (5%)</span>
                  <span className="font-semibold">₹{tax}</span>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <span className="text-lg font-bold">Total</span>
               <span className="text-4xl font-black">₹{finalTotal}</span>
              </div>

              <p className="text-xs text-gray-600 dark:text-gray-400 mt-4">
                ✓ Cash on Delivery (COD)
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
