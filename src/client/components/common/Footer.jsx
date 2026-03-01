// src/client/components/common/Footer.jsx
import { Link } from "react-router-dom";
import { FaWhatsapp, FaTiktok } from "react-icons/fa";
import { SiWhatsapp } from "react-icons/si";
import logo from "../../../assets/images/shared/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Format WhatsApp number (remove dots for link, keep display with dots)
  const whatsappNumber = "0715835385";
  const whatsappDisplay = "0.7.1.5.8.3.5.3.8.5";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <footer
      className="bg-client-card border-t border-client-border"
      aria-label="Site footer"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Baraka Bliss" className="h-8 w-auto" />
              <span className="text-xl font-bold text-client-green">
                Baraka Bliss
              </span>
            </Link>
            <p className="text-client-text-secondary text-sm">
              Luxury staycations in Kenya, bringing you the perfect blend of
              comfort, elegance, and authentic Kenyan hospitality.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-client-text-primary font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-client-text-secondary hover:text-client-green 
                             transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/apartments"
                  className="text-client-text-secondary hover:text-client-green 
                             transition-colors text-sm"
                >
                  Apartments
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-client-text-secondary hover:text-client-green 
                             transition-colors text-sm"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-client-text-primary font-semibold mb-4">
              Contact Us
            </h3>
            <ul className="space-y-2 text-sm text-client-text-secondary">
              <li>📍 Nairobi, Kenya</li>
              <li>
                <span className="font-medium">📱 DM to book:</span>{" "}
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-client-green hover:underline"
                >
                  {whatsappDisplay}
                </a>
              </li>
              <li>📞 +254 715 835 385</li>
              <li>🕒 Open 24/7</li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-client-text-primary font-semibold mb-4">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@baraka.bliss.staycations"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-client-rose/10 p-3 rounded-full text-client-rose
                           hover:bg-client-rose hover:text-white
                           transition-all duration-200 hover:scale-110
                           min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Follow us on TikTok"
              >
                <FaTiktok size={20} />
              </a>

              {/* WhatsApp */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-client-green/10 p-3 rounded-full text-client-green
                           hover:bg-client-green hover:text-white
                           transition-all duration-200 hover:scale-110
                           min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Contact us on WhatsApp"
              >
                <FaWhatsapp size={20} />
              </a>
            </div>

            {/* WhatsApp contact note */}
            <p className="text-xs text-client-text-secondary mt-4">
              ⚡ Quickest response via WhatsApp DM
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-client-border mt-8 pt-8 text-center">
          <p className="text-client-text-secondary text-sm">
            &copy; {currentYear} Baraka Bliss Staycations. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
