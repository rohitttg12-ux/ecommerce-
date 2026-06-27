import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="container-custom text-center">
          <p className="uppercase tracking-[0.3em] text-gray-500 mb-4">
            Contact Us
          </p>

          <h1 className="text-5xl md:text-7xl font-black mb-6">
            GET IN TOUCH
          </h1>

          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have questions about STEPX? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-custom grid md:grid-cols-2 gap-12">

          {/* Contact Info */}
          <div className="space-y-8">

            <div className="flex gap-4">
              <Mail size={28} />
              <div>
                <h3 className="font-bold">Email</h3>
                <p className="text-gray-500">
                  info@stepx.com
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Phone size={28} />
              <div>
                <h3 className="font-bold">Phone</h3>
                <p className="text-gray-500">
                  +91 9628113722
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <MapPin size={28} />
              <div>
                <h3 className="font-bold">Address</h3>
                <p className="text-gray-500">
                  New Delhi, India
                </p>
              </div>
            </div>

          </div>

          {/* Form */}
          <div className="space-y-4">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full border rounded-lg p-4 bg-white dark:bg-gray-900"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full border rounded-lg p-4 bg-white dark:bg-gray-900"
            />

            <textarea
              rows={6}
              placeholder="Your Message"
              className="w-full border rounded-lg p-4 bg-white dark:bg-gray-900"
            />

            <button className="btn-primary w-full">
              Send Message
            </button>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}