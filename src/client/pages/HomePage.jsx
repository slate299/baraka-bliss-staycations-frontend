// src/client/pages/HomePage.jsx
import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import LiveRegion from "../components/common/LiveRegion";
import { motion } from "framer-motion";
import {
  FaBed,
  FaUsers,
  FaHome,
  FaHeart,
  FaShieldAlt,
  FaStar,
  FaWifi,
  FaClock,
  FaHeadset,
  FaMapMarkerAlt,
} from "react-icons/fa";

// Import images
import heroBg from "../../assets/images/home/hero/hero-bg.jpg";
import logo from "../../assets/images/shared/logo.png";
import useFeaturedApartments from "../hooks/useFeaturedApartments";

const HomePage = () => {
  // Fetch featured apartments
  const { featured: featuredApartments, loading: featuredLoading } =
    useFeaturedApartments(4);

  // Add this helper function here 👇
  const getMediaUrl = (media) => {
    if (!media)
      return "https://placehold.co/400x300/3b82f6/white?text=No+Image";

    if (typeof media === "object" && media.url) {
      return media.url; // Cloudinary URL
    }

    if (typeof media === "string") {
      if (media.startsWith("http")) {
        return media; // Already full URL
      }
      const cleanPath = media.replace(/\\/g, "/");
      return `${process.env.REACT_APP_API_BASE_URL}/${cleanPath}`; // Local path with API base
    }

    return "https://placehold.co/400x300/3b82f6/white?text=No+Image";
  };

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Values data for Why Choose Us
  const whyChooseUs = [
    {
      icon: FaMapMarkerAlt,
      title: "Prime Locations",
      description:
        "Stay in the most desirable neighborhoods across Kenya's top destinations",
      color: "text-client-rose",
      bgColor: "bg-client-rose/10",
    },
    {
      icon: FaHome,
      title: "Luxury Apartments",
      description: "Curated stays with premium amenities and stunning views",
      color: "text-client-green",
      bgColor: "bg-client-green/10",
    },
    {
      icon: FaWifi,
      title: "High-Speed WiFi",
      description:
        "Stay connected with reliable, high-speed internet in every apartment",
      color: "text-client-gold",
      bgColor: "bg-client-gold/10",
    },
    {
      icon: FaShieldAlt,
      title: "Safe & Secure",
      description:
        "24/7 security in gated communities for complete peace of mind",
      color: "text-client-rose",
      bgColor: "bg-client-rose/10",
    },
    {
      icon: FaHeadset,
      title: "24/7 Support",
      description: "Our dedicated team is always available to assist you",
      color: "text-client-green",
      bgColor: "bg-client-green/10",
    },
    {
      icon: FaClock,
      title: "Flexible Check-in",
      description:
        "Convenient check-in times to accommodate your travel schedule",
      color: "text-client-gold",
      bgColor: "bg-client-gold/10",
    },
  ];

  return (
    <div className="min-h-screen bg-client-bg flex flex-col">
      <Navbar />

      {/* Screen reader live region */}
      <LiveRegion message="Welcome to Baraka Bliss Staycations" />

      <main id="main-content" className="flex-1">
        {/* ===== HERO SECTION ===== */}
        <section
          className="relative h-[80vh] min-h-[600px] flex items-center justify-center"
          aria-labelledby="hero-heading"
        >
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{
              backgroundImage: `url(${heroBg})`,
            }}
            role="img"
            aria-label="Luxury apartment with ocean view"
          >
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* Hero Content */}
          <motion.div
            className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <img
                src={logo}
                alt="Baraka Bliss"
                className="h-20 w-auto mx-auto"
                loading="eager"
              />
            </motion.div>

            <motion.h1
              id="hero-heading"
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Baraka Bliss
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl mb-8 text-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Luxury Staycations in Kenya
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Link
                to="/apartments"
                className="inline-block bg-client-green text-white px-8 py-4 rounded-lg
                         text-lg font-semibold
                         hover:bg-client-green/90 transition-all duration-200
                         hover:scale-105 active:scale-95
                         min-h-[44px] min-w-[44px]"
                aria-label="View all apartments"
              >
                Explore Apartments
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* ===== ABOUT BARAKA BLISS SECTION ===== */}
        <motion.section
          className="py-20 bg-client-card"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          aria-labelledby="about-heading"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2
                id="about-heading"
                className="text-3xl md:text-4xl font-bold text-client-text-primary mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Welcome to Baraka Bliss
              </motion.h2>

              <motion.div
                className="w-20 h-1 bg-client-rose mx-auto mb-8"
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              />

              <motion.p
                className="text-client-text-secondary text-lg leading-relaxed mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                At Baraka Bliss, we believe every stay should be a celebration
                of comfort, luxury, and Kenyan hospitality.
              </motion.p>

              <motion.p
                className="text-client-text-secondary text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                From pristine beachfront villas to cozy highland retreats, each
                apartment is carefully selected to provide the perfect blend of
                modern amenities and authentic local charm.
              </motion.p>

              {/* Decorative elements */}
              <motion.div
                className="flex justify-center gap-2 mt-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <span className="w-2 h-2 rounded-full bg-client-rose"></span>
                <span className="w-2 h-2 rounded-full bg-client-green"></span>
                <span className="w-2 h-2 rounded-full bg-client-gold"></span>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* ===== FEATURED APARTMENTS SECTION ===== */}
        <section
          className="py-20 bg-client-bg"
          aria-labelledby="featured-heading"
        >
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2
                id="featured-heading"
                className="text-3xl md:text-4xl font-bold text-client-text-primary mb-4"
              >
                Featured Staycations
              </h2>
              <p className="text-client-text-secondary max-w-2xl mx-auto">
                Hand-picked apartments for your perfect getaway
              </p>
              <div className="w-20 h-1 bg-client-green mx-auto mt-4" />
            </motion.div>

            {featuredLoading ? (
              // Loading skeletons
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className="bg-client-card rounded-xl overflow-hidden animate-pulse"
                  >
                    <div className="h-48 bg-gray-200" />
                    <div className="p-4">
                      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
                      <div className="flex justify-between">
                        <div className="h-5 bg-gray-200 rounded w-20" />
                        <div className="h-5 bg-gray-200 rounded w-24" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredApartments.map((apt, index) => (
                  <motion.div
                    key={apt._id}
                    className="bg-client-card rounded-xl overflow-hidden
                               hover:shadow-xl transition-all duration-300
                               hover:scale-105 cursor-pointer"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    onClick={() =>
                      (window.location.href = `/apartment/${apt._id}`)
                    }
                    role="link"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        window.location.href = `/apartment/${apt._id}`;
                      }
                    }}
                    aria-label={`View details for ${apt.name}`}
                  >
                    {/* Image */}
                    <div className="h-48 overflow-hidden bg-client-bg">
                      {apt.mediaFiles?.length > 0 ? (
                        <img
                          src={getMediaUrl(apt.mediaFiles[0])}
                          alt={apt.name}
                          className="w-full h-full object-cover
               hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://placehold.co/400x300/3b82f6/white?text=No+Image";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-client-bg">
                          <svg
                            className="w-12 h-12 text-client-text-secondary opacity-30 mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="text-sm text-client-text-secondary">
                            No image
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-client-text-primary mb-1 line-clamp-1">
                        {apt.name}
                      </h3>

                      <p className="text-client-text-secondary text-sm mb-2">
                        {apt.city}, {apt.area}
                      </p>

                      <div className="flex items-center gap-3 text-sm text-client-text-secondary mb-3">
                        <span className="flex items-center gap-1">
                          <FaBed className="text-client-rose" />
                          {apt.bedrooms} {apt.bedrooms === 1 ? "bed" : "beds"}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaUsers className="text-client-green" />
                          {apt.maxGuests} guests
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-client-green font-bold text-lg">
                          KES {apt.price.toLocaleString()}
                          <span className="text-sm font-normal text-client-text-secondary">
                            {" "}
                            /night
                          </span>
                        </span>

                        <span className="text-client-rose text-sm font-medium hover:underline">
                          View Details →
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* View All Button */}
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link
                to="/apartments"
                className="inline-block border-2 border-client-green text-client-green
                         px-8 py-3 rounded-lg font-semibold
                         hover:bg-client-green hover:text-white
                         transition-all duration-200
                         min-h-[44px] min-w-[44px]"
                aria-label="View all apartments"
              >
                Browse All Apartments
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ===== WHY CHOOSE US SECTION ===== */}
        <section
          className="py-20 bg-client-card"
          aria-labelledby="why-choose-heading"
        >
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2
                id="why-choose-heading"
                className="text-3xl md:text-4xl font-bold text-client-text-primary mb-4"
              >
                Why Choose Baraka Bliss
              </h2>
              <p className="text-client-text-secondary max-w-2xl mx-auto">
                Experience the difference with our premium services and
                amenities
              </p>
              <div className="w-20 h-1 bg-client-gold mx-auto mt-4" />
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-50px" }}
            >
              {whyChooseUs.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-client-bg rounded-xl p-8 text-center
                             hover:shadow-lg transition-all duration-300
                             hover:scale-105 border border-client-border/50"
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  role="article"
                >
                  <div
                    className={`${item.bgColor} w-20 h-20 rounded-full 
                                   flex items-center justify-center mx-auto mb-6
                                   transition-all duration-300 group-hover:scale-110`}
                  >
                    <item.icon
                      className={`${item.color} text-3xl`}
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-client-text-primary mb-3">
                    {item.title}
                  </h3>
                  <p className="text-client-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ===== CALL TO ACTION SECTION ===== */}
        <section
          className="py-20 bg-client-green"
          aria-labelledby="cta-heading"
        >
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2
                id="cta-heading"
                className="text-3xl md:text-4xl font-bold text-white mb-4"
              >
                Ready for Your Blissful Stay?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Browse our collection of luxury apartments and book your perfect
                getaway today.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/apartments"
                  className="inline-block bg-white text-client-green
                           px-8 py-3 rounded-lg font-semibold
                           hover:bg-gray-100 transition-all duration-200
                           hover:scale-105 active:scale-95
                           min-h-[44px] min-w-[44px]"
                  aria-label="Browse all apartments"
                >
                  Browse Apartments
                </Link>

                <Link
                  to="/contact"
                  className="inline-block border-2 border-white text-white
                           px-8 py-3 rounded-lg font-semibold
                           hover:bg-white hover:text-client-green
                           transition-all duration-200
                           hover:scale-105 active:scale-95
                           min-h-[44px] min-w-[44px]"
                  aria-label="Contact us"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
