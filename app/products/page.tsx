"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ChevronDown } from "lucide-react";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { Product } from "@/types";
import axios from "axios";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const demoProducts = [
  {
    _id: "1",
    name: "STEPX Urban Runner",
    slug: "urban-runner",
    description: "Premium casual shoe",
    price: 2999,
    discountPrice: 2499,
    images: ["/images/shoe-1.jpg"],
    sizes: ["7", "8", "9"],
    colors: ["Black"],
    stock: 10,
    featured: true,
    bestSeller: true,
    category: "casual",
    rating: 4.8,
    reviewCount: 124,
    createdAt: "",
    updatedAt: "",
  },
  {
    _id: "2",
    name: "STEPX Street Elite",
    slug: "street-elite",
    description: "Premium casual shoe",
    price: 3499,
    discountPrice: 2999,
    images: ["/images/shoe-2.jpg"],
    sizes: ["7", "8", "9"],
    colors: ["Black"],
    stock: 10,
    featured: true,
    bestSeller: true,
    category: "casual",
    rating: 4.9,
    reviewCount: 210,
    createdAt: "",
    updatedAt: "",
  },
  {
    _id: "3",
    name: "STEPX Motion X",
    slug: "motion-x",
    description: "Premium casual shoe",
    price: 3999,
    discountPrice: 3499,
    images: ["/images/shoe-3.jpg"],
    sizes: ["7", "8", "9"],
    colors: ["Black"],
    stock: 10,
    featured: true,
    bestSeller: true,
    category: "casual",
    rating: 4.7,
    reviewCount: 90,
    createdAt: "",
    updatedAt: "",
  },
  {
    _id: "4",
    name: "STEPX Black Edition",
    slug: "black-edition",
    description: "Premium casual shoe",
    price: 4499,
    discountPrice: 3999,
    images: ["/images/shoe-4.jpg"],
    sizes: ["7", "8", "9"],
    colors: ["Black"],
    stock: 10,
    featured: true,
    bestSeller: true,
    category: "casual",
    rating: 5,
    reviewCount: 300,
    createdAt: "",
    updatedAt: "",
  },
];
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("-createdAt");
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
  const fetchProducts = async () => {
    setLoading(true);

    try {
      const params = new URLSearchParams({
        sort,
        limit: "12",
        page: page.toString(),
      });

      if (search) params.append("search", search);
      if (minPrice) params.append("minPrice", minPrice);
      if (maxPrice) params.append("maxPrice", maxPrice);

      const response = await axios.get(`/api/products?${params}`);

      const apiProducts = response.data.data || [];

      if (apiProducts.length > 0) {
        setProducts(apiProducts);
      } else {
        setProducts(demoProducts);
      }

      setTotalPages(response.data.pagination?.pages || 1);
    } catch (error) {
      console.error("Error fetching products:", error);

      setProducts(demoProducts);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, [sort, search, minPrice, maxPrice, page]);
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <Navbar />

      <div className="pt-24 pb-20">
        <div className="container-custom">
          <h1 className="text-heading-lg mb-12">Our Products</h1>

          {/* Controls */}
          <div className="mb-8 space-y-4">
            {/* Search */}
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />

            {/* Filters and Sort */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Price Range */}
              <input
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
              <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />

              {/* Sort */}
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setPage(1);
                }}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              >
                <option value="-createdAt">Newest</option>
                <option value="-bestSeller">Popular</option>
                <option value="price">Price: Low to High</option>
                <option value="-price">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="text-center py-20">
              <p>Loading products...</p>
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  {page > 1 && (
                    <button
                      onClick={() => setPage(page - 1)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                    >
                      Previous
                    </button>
                  )}
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setPage(i + 1)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        page === i + 1
                          ? "bg-black text-white dark:bg-white dark:text-black"
                          : "border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  {page < totalPages && (
                    <button
                      onClick={() => setPage(page + 1)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                    >
                      Next
                    </button>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-600 dark:text-gray-400">
                No products found. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`}>
      <motion.div
        whileHover={{ y: -5 }}
        className="group cursor-pointer"
      >
        <div className="aspect-square bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden mb-4 relative">
          <Image
 src={product.images?.[0] || "/images/shoe-1.jpg"}
  alt="STEPX Shoe"
  fill
  className="object-contain group-hover:scale-110 transition-transform duration-500"
/>
        </div>
        <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center justify-between mb-2">
          <div className="flex gap-2">
            {product.discountPrice > 0 ? (
              <>
                <span className="font-bold">₹{product.discountPrice}</span>
                <span className="text-sm text-gray-500 line-through">
                  ₹{product.price}
                </span>
              </>
            ) : (
              <span className="font-bold">₹{product.price}</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {product.reviewCount} reviews
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
