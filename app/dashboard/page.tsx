import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <Navbar />

      <div className="pt-28 pb-20">
        <div className="container-custom">

          <h1 className="text-5xl font-black mb-10">
            My Dashboard
          </h1>

          {/* Profile Card */}
          <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-2">
              Rishikesh Gupta
            </h2>
            <p className="text-gray-500">
              rishikesh@example.com
            </p>
          </div>

          {/* Dashboard Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="p-8 rounded-2xl border">
              <h3 className="text-gray-500 mb-2">
                Orders
              </h3>
              <h2 className="text-4xl font-bold">
                12
              </h2>
            </div>

            <div className="p-8 rounded-2xl border">
              <h3 className="text-gray-500 mb-2">
                Wishlist
              </h3>
              <h2 className="text-4xl font-bold">
                8
              </h2>
            </div>

            <div className="p-8 rounded-2xl border">
              <h3 className="text-gray-500 mb-2">
                Addresses
              </h3>
              <h2 className="text-4xl font-bold">
                2
              </h2>
            </div>

            <div className="p-8 rounded-2xl border">
              <h3 className="text-gray-500 mb-2">
                Reviews
              </h3>
              <h2 className="text-4xl font-bold">
                5
              </h2>
            </div>

          </div>

          {/* Recent Orders */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6">
              Recent Orders
            </h2>

            <div className="border rounded-2xl p-6">
              <p className="font-semibold">
                STEPX Urban Runner
              </p>

              <p className="text-gray-500">
                Order #1024
              </p>

              <p className="text-green-600 font-semibold mt-2">
                Delivered
              </p>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}