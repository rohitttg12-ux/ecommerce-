import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="container-custom text-center">
          <p className="uppercase tracking-[0.3em] text-gray-500 mb-4">
            About STEPX
          </p>

          <h1 className="text-5xl md:text-7xl font-black mb-6">
            WALK BEYOND LIMITS
          </h1>

          <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-400 text-lg">
            STEPX creates premium casual footwear for men who want
            comfort, confidence and style in every step.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container-custom grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Our Story
            </h2>

            <p className="text-gray-600 dark:text-gray-400 leading-8">
              STEPX was created to redefine everyday footwear.
              We believe premium shoes should not only look good
              but also provide exceptional comfort and durability.
            </p>
          </div>

          <div className="bg-gray-100 dark:bg-gray-900 rounded-3xl p-10">
            <h3 className="text-2xl font-bold mb-4">
              Our Mission
            </h3>

            <p className="text-gray-600 dark:text-gray-400">
              To deliver premium casual footwear that combines
              modern design, comfort and performance.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

            <div>
              <h2 className="text-4xl font-bold">10K+</h2>
              <p className="text-gray-500">Customers</p>
            </div>

            <div>
              <h2 className="text-4xl font-bold">500+</h2>
              <p className="text-gray-500">Reviews</p>
            </div>

            <div>
              <h2 className="text-4xl font-bold">4.9★</h2>
              <p className="text-gray-500">Rating</p>
            </div>

            <div>
              <h2 className="text-4xl font-bold">100%</h2>
              <p className="text-gray-500">Quality</p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}