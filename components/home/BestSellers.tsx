"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const bestSellers = [
  {
    id: 1,
    name: "STEPX Air Pro",
    price: 4499,
    image: "/images/shoe-1.jpg",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "STEPX Flex Walk",
    price: 3999,
    image: "/images/shoe-2.jpg",
    badge: "Hot",
  },
  {
    id: 3,
    name: "STEPX Street Max",
    price: 3799,
    image: "/images/shoe-3.jpg",
    badge: "Trending",
  },
];

export default function BestSellers() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-950">
      <div className="container-custom">
        <h2 className="text-4xl font-bold mb-10">
          Best Sellers
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {bestSellers.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-black rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="relative aspect-square">
                <span className="absolute top-4 left-4 z-20 bg-black text-white px-3 py-1 text-xs rounded-full">
                  {item.badge}
                </span>

                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain p-6"
                />
              </div>

              <div className="p-6">
                <h3 className="font-semibold text-lg">
                  {item.name}
                </h3>

                <p className="mt-2 font-bold">
                  ₹{item.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}