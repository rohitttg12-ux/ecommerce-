import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <Navbar />

      <div className="pt-28 pb-20">
        <div className="container-custom">

          <h1 className="text-5xl font-black mb-10">
            Admin Dashboard
          </h1>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">

            <div className="bg-gray-100 dark:bg-gray-900 p-8 rounded-2xl">
              <h3 className="text-gray-500 mb-2">
                Products
              </h3>
              <h2 className="text-4xl font-bold">
                20
              </h2>
            </div>

            <div className="bg-gray-100 dark:bg-gray-900 p-8 rounded-2xl">
              <h3 className="text-gray-500 mb-2">
                Orders
              </h3>
              <h2 className="text-4xl font-bold">
                120
              </h2>
            </div>

            <div className="bg-gray-100 dark:bg-gray-900 p-8 rounded-2xl">
              <h3 className="text-gray-500 mb-2">
                Customers
              </h3>
              <h2 className="text-4xl font-bold">
                85
              </h2>
            </div>

            <div className="bg-gray-100 dark:bg-gray-900 p-8 rounded-2xl">
              <h3 className="text-gray-500 mb-2">
                Revenue
              </h3>
              <h2 className="text-4xl font-bold">
                ₹2.4L
              </h2>
            </div>

          </div>

          {/* Quick Actions */}
          <h2 className="text-3xl font-bold mb-6">
            Management
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            <Link
              href="/admin/products"
              className="p-8 rounded-2xl border hover:bg-gray-100 dark:hover:bg-gray-900 transition"
            >
              Manage Products
            </Link>

            <Link
              href="/admin/orders"
              className="p-8 rounded-2xl border hover:bg-gray-100 dark:hover:bg-gray-900 transition"
            >
              Manage Orders
            </Link>

            <Link
              href="/admin/customers"
              className="p-8 rounded-2xl border hover:bg-gray-100 dark:hover:bg-gray-900 transition"
            >
              Customers
            </Link>

            <Link
              href="/admin/analytics"
              className="p-8 rounded-2xl border hover:bg-gray-100 dark:hover:bg-gray-900 transition"
            >
              Analytics
            </Link>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}