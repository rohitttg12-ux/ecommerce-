import { Truck, ShieldCheck, RefreshCcw, Star } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Truck size={32} />,
      title: "Free Shipping",
      desc: "Free delivery on all orders above ₹1999",
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Premium Quality",
      desc: "High quality materials and craftsmanship",
    },
    {
      icon: <RefreshCcw size={32} />,
      title: "Easy Returns",
      desc: "7 day hassle-free return policy",
    },
    {
      icon: <Star size={32} />,
      title: "Top Rated",
      desc: "Trusted by thousands of customers",
    },
  ];

  return (
    <section className="py-20">
      <div className="container-custom">
        <h2 className="text-4xl font-bold text-center mb-12">
          Why Choose STEPX
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 text-center"
            >
              <div className="flex justify-center mb-4">
                {item.icon}
              </div>

              <h3 className="font-bold text-lg mb-2">
                {item.title}
              </h3>

              <p className="text-gray-500">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}