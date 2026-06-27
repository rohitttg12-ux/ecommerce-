export default function Newsletter() {
  return (
    <section className="py-20 bg-black text-white">
      <div className="container-custom text-center">
        <h2 className="text-4xl font-bold mb-4">
          Join STEPX Community
        </h2>

        <p className="text-gray-400 mb-8">
          Get exclusive offers, new arrivals and special discounts.
        </p>

        <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg text-black"
          />

          <button className="bg-white text-black px-6 py-3 rounded-lg font-semibold">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}