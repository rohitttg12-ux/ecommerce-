import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";

import Hero from "@/components/home/Hero";

import FeaturedProducts from "@/components/home/FeaturedProducts";
import BestSellers from "@/components/home/BestSellers";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Newsletter from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <Navbar />

      <Hero />
      <FeaturedProducts />
      <BestSellers />
      <WhyChooseUs />
      <Newsletter />

      <Footer />
    </main>
  );
}