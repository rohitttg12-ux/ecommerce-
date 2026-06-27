"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="pt-32 pb-20">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div>
            <span className="text-sm uppercase tracking-[0.3em] text-gray-500">
              Premium Men's Footwear
            </span>

            <h1 className="text-5xl md:text-7xl font-black leading-none mt-4">
              WALK
              <br />
              BEYOND
              <br />
              LIMITS
            </h1>

            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-lg">
              Premium casual shoes designed for everyday excellence.
              Crafted for comfort, style and confidence.
            </p>

            <div className="flex gap-4 mt-8">
              <button className="btn-primary">
                Shop Now
              </button>

              <button className="btn-secondary">
                Explore Collection
              </button>
            </div>

            <div className="flex gap-10 mt-12">
              <div>
                <h3 className="text-2xl font-bold">10K+</h3>
                <p className="text-sm text-gray-500">Customers</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold">4.9★</h3>
                <p className="text-sm text-gray-500">Rating</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold">500+</h3>
                <p className="text-sm text-gray-500">Reviews</p>
              </div>
            </div>
          </div>

          {/* Right */}
          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            <div className="absolute inset-0 blur-3xl bg-gray-300 dark:bg-gray-700 rounded-full opacity-40" />

            <Image
              src="/images/hero-shoe.png"
              alt="STEPX Hero Shoe"
              width={800}
              height={800}
              priority
              className="relative z-10 object-contain"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}