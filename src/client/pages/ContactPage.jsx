// src/client/pages/ContactPage.jsx
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import LiveRegion from "../components/common/LiveRegion";
import { motion } from "framer-motion";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaWhatsapp,
} from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

const ContactPage = () => {
  // WhatsApp number
  const whatsappNumber = "254715835385"; // Format: country code + number without +
  const whatsappDisplay = "0.7.1.5.8.3.5.3.8.5";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  // Pre-filled message
  const defaultMessage = "Hello! I'm interested in booking a staycation.";
  const whatsappUrlWithMessage = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen bg-client-bg flex flex-col">
      <Navbar />

      <LiveRegion message="Contact Us page - Chat with us on WhatsApp" />

      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <section className="bg-client-green py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Chat With Us
            </motion.h1>
            <motion.p
              className="text-white/90 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Quickest response via WhatsApp - we're here 24/7!
            </motion.p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Contact Information */}
              <motion.div
                className="bg-client-card rounded-xl shadow-sm p-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-semibold text-client-text-primary mb-6">
                  Get in Touch
                </h2>

                {/* WhatsApp (Primary) */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-client-green/10 p-3 rounded-lg">
                    <FaWhatsapp className="text-client-green text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-client-text-primary">
                      WhatsApp (Quickest Response)
                    </h3>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-client-green hover:underline text-lg font-medium"
                    >
                      {whatsappDisplay}
                    </a>
                    <p className="text-client-text-secondary text-sm mt-1">
                      DM to book - 24/7
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-client-rose/10 p-3 rounded-lg">
                    <FaPhone className="text-client-rose text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-client-text-primary">
                      Phone
                    </h3>
                    <p className="text-client-text-secondary text-lg">
                      +254 715 835 385
                    </p>
                    <p className="text-client-text-secondary text-sm">
                      Open 24/7
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-client-gold/10 p-3 rounded-lg">
                    <FaEnvelope className="text-client-gold text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-client-text-primary">
                      Email
                    </h3>
                    <p className="text-client-text-secondary">
                      hello@barakabliss.com
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-client-rose/10 p-3 rounded-lg">
                    <FaMapMarkerAlt className="text-client-rose text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-client-text-primary">
                      Based in
                    </h3>
                    <p className="text-client-text-secondary">Nairobi, Kenya</p>
                    <p className="text-client-text-secondary text-sm italic">
                      No physical office - book via DM
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-client-green/10 p-3 rounded-lg">
                    <FaClock className="text-client-green text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-client-text-primary">
                      Business Hours
                    </h3>
                    <p className="text-client-text-secondary text-lg">
                      Open 24/7
                    </p>
                    <p className="text-client-text-secondary text-sm">
                      Always available!
                    </p>
                  </div>
                </div>

                {/* TikTok Link */}
                <div className="pt-6 mt-4 border-t border-client-border">
                  <a
                    href="https://www.tiktok.com/@baraka.bliss.staycations"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-client-text-primary hover:text-client-rose transition-colors"
                  >
                    <SiTiktok className="text-3xl" />
                    <span className="text-lg">@baraka.bliss.staycations</span>
                  </a>
                </div>
              </motion.div>

              {/* WhatsApp CTA Card */}
              <motion.div
                className="bg-gradient-to-br from-client-green to-client-green/80 rounded-xl shadow-lg p-8 flex flex-col items-center justify-center text-white"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <FaWhatsapp className="text-7xl mb-4" />
                <h3 className="text-2xl font-bold mb-2 text-center">
                  Chat with Us on WhatsApp
                </h3>
                <p className="text-center mb-6 text-white/90">
                  Quickest response!
                  <br />
                  We're here 24/7 to help with your booking.
                </p>
                <a
                  href={whatsappUrlWithMessage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-client-green px-8 py-4 rounded-lg
                           font-semibold text-lg
                           hover:bg-gray-100 transition-all duration-200
                           hover:scale-105 active:scale-95
                           flex items-center gap-3
                           min-h-[44px]"
                >
                  <FaWhatsapp size={24} />
                  Send WhatsApp Message
                </a>
                <p className="text-sm mt-4 text-white/80">
                  Chat directly with us!
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Simple CTA Section */}
        <section className="pb-16">
          <div className="container mx-auto px-4 text-center">
            <p className="text-client-text-secondary">
              Prefer to browse first?{" "}
              <a
                href="/apartments"
                className="text-client-green hover:underline font-medium"
              >
                View our apartments
              </a>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
