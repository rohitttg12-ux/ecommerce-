"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const featuredProducts = [
  {
    id: 1,
    name: "STEPX Urban Runner",
    price: 2499,
    image: "/images/shoe-1.jpg",
  },
  {
    id: 2,
    name: "STEPX Street Elite",
    price: 2999,
    image: "/images/shoe-2.jpg",
  },
  {
    id: 3,
    name: "STEPX Motion X",
    price: 3499,
    image: "/images/shoe-3.jpg",
  },
  {
    id: 4,
    name: "STEPX Black Edition",
    price: 3999,
    image: "/images/shoe-4.jpg",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-4xl font-bold">
            Featured Collection
          </h2>

          <Link
            href="/products"
            className="text-sm font-semibold hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="relative aspect-square bg-gray-100 dark:bg-gray-900 rounded-2xl overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <h3 className="mt-4 font-semibold text-lg">
                {product.name}
              </h3>

              <p className="font-bold mt-1">
                ₹{product.price}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}