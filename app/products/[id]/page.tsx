"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Heart, ShoppingCart, ChevronUp, ChevronDown } from "lucide-react";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { Product } from "@/types";
import { useCartStore } from "@/store/useCartStore";
import axios from "axios";

export default function ProductDetailsPage() {
  const params = useParams();
  const slug = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCartStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${slug}`);
        setProduct(response.data.data);
        if (response.data.data.sizes.length > 0) {
          setSelectedSize(response.data.data.sizes[0]);
        }
        if (response.data.data.colors.length > 0) {
          setSelectedColor(response.data.data.colors[0]);
        }

        const relatedRes = await axios.get(
          `/api/products?category=${response.data.data.category}&limit=4`
        );
        setRelated(
          relatedRes.data.data.filter((p: Product) => p._id !== response.data.data._id)
        );
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchProduct();
  }, [slug]);

  const handleAddToCart = () => {
    if (!product || !selectedSize || !selectedColor) {
      alert("Please select size and color");
      return;
    }
    addToCart(product, quantity, selectedSize, selectedColor);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white dark:bg-black">
        <Navbar />
        <div className="pt-24 pb-20 container-custom">
          <p>Loading product...</p>
        </div>
        <Footer />
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-white dark:bg-black">
        <Navbar />
        <div className="pt-24 pb-20 container-custom">
          <p>Product not found.</p>
        </div>
        <Footer />
      </main>
    );
  }

  const discountPercentage =
    product.discountPrice > 0
      ? Math.round(
          ((product.price - product.discountPrice) / product.price) * 100
        )
      : 0;

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <Navbar />

      <div className="pt-24 pb-20">
        <div className="container-custom">
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/products">Products</Link>
            <span>/</span>
            <span className="text-black dark:text-white">{product.name}</span>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            {/* Product Image */}
           <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
>
  <div className="bg-gray-100 dark:bg-gray-900 rounded-lg h-96 flex items-center justify-center">
    <Image
      src={product.images?.[0] || "/images/shoe-1.jpg"}
      alt={product.name}
      width={700}
      height={700}
      className="object-contain hover:scale-110 transition-transform duration-500"
    />
  </div>

  <div className="flex gap-3 mt-4 justify-center">
    {product.images?.map((img, index) => (
      <div
        key={index}
        className="w-20 h-20 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden relative border"
      >
        <Image
          src={img}
          alt={`Thumbnail ${index}`}
          fill
          className="object-contain p-2"
        />
      </div>
    ))}
  </div>
</motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-heading-lg mb-2">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < Math.round(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6 flex items-center gap-4">
                {product.discountPrice > 0 ? (
                  <>
                    <span className="text-3xl font-bold">
                      ₹{product.discountPrice}
                    </span>
                    <span className="text-xl text-gray-500 line-through">
                      ₹{product.price}
                    </span>
                    {discountPercentage > 0 && (
                      <span className="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 px-3 py-1 rounded-full text-sm font-semibold">
                        {discountPercentage}% OFF
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-3xl font-bold">₹{product.price}</span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {product.description}
              </p>

              {/* Sizes */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Size</label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        selectedSize === size
                          ? "bg-black text-white dark:bg-white dark:text-black"
                          : "border border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Color</label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        selectedColor === color
                          ? "bg-black text-white dark:bg-white dark:text-black"
                          : "border border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">
                  Quantity
                </label>
                <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900"
                  >
                    <ChevronDown size={16} />
                  </button>
                  <span className="px-4 py-2 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900"
                  >
                    <ChevronUp size={16} />
                  </button>
                </div>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {product.stock > 0 ? (
                  <p className="text-green-600 dark:text-green-400 font-semibold">
                    In Stock ({product.stock} available)
                  </p>
                ) : (
                  <p className="text-red-600 dark:text-red-400 font-semibold">
                    Out of Stock
                  </p>
                )}
              </div>
<h1 className="text-red-500 text-5xl mb-4">
  TEST123
</h1>
              {/* Buttons */}
              <div className="grid grid-cols-2 gap-4 mb-8">
  <button
    onClick={handleAddToCart}
    disabled={product.stock === 0}
    className="btn-primary"
  >
    Add To Cart
  </button>

  <button className="btn-secondary">
    Buy Now
  </button>
</div>

              {/* Info */}
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p>✓ Free shipping on orders above ₹500</p>
                <p>✓ 30-day return policy</p>
                <p>✓ 1-year warranty</p>
              </div>
            </motion.div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <section>
              <h2 className="text-heading-md mb-6">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map((relatedProduct) => (
                  <Link
                    key={relatedProduct._id}
                    href={`/products/${relatedProduct.slug}`}
                  >
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="group cursor-pointer"
                    >
                      <div className="aspect-square bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden mb-4 relative">
  <Image
    src={relatedProduct.images?.[0] || "/images/shoe-1.jpg"}
    alt={relatedProduct.name}
    fill
    className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
  />
</div>
                      <h3 className="font-semibold mb-2 line-clamp-2">
                        {relatedProduct.name}
                      </h3>
                      <div className="flex gap-2">
                        {relatedProduct.discountPrice > 0 ? (
                          <>
                            <span className="font-bold">
                              ₹{relatedProduct.discountPrice}
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                              ₹{relatedProduct.price}
                            </span>
                          </>
                        ) : (
                          <span className="font-bold">₹{relatedProduct.price}</span>
                        )}
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
