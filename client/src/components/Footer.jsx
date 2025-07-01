import { FaPhoneAlt, FaWhatsapp, FaInstagram, FaEnvelope } from "react-icons/fa";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🌾</span>
              <span className="text-xl font-bold">Padpu Farms</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Trusted in honey production and sustainable farming. Explore our organic products and natural training solutions.
            </p>
            <div className="flex space-x-4 text-2xl">
              <a href="tel:+917411860340" className="text-gray-400 hover:text-white" title="Call">
                <FaPhoneAlt />
              </a>
              <a
                href="https://wa.me/917411860340"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
                title="WhatsApp"
              >
                <FaWhatsapp />
              </a>
              <a
                href="https://www.instagram.com/padpufarms?igsh=MTBjc2h6b2UzY3VoZA=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
                title="Instagram"
              >
                <FaInstagram />
              </a>
              <a href="mailto:padpufarms@gmail.com" className="text-gray-400 hover:text-white" title="Gmail">
                <FaEnvelope />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 lg:col-start-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <span className="mt-1">📍</span>
                <p className="text-gray-300 text-sm">123 Farm Road, Agricultural District, India</p>
              </div>
              <div className="flex items-center space-x-2">
                <span>📞</span>
                <p className="text-gray-300 text-sm">+91 74118 60340</p>
              </div>
              <div className="flex items-center space-x-2">
                <span>✉️</span>
                <p className="text-gray-300 text-sm">padpufarms@gmail.com</p>
              </div>
              <div className="flex items-center space-x-2">
                <span>🕒</span>
                <p className="text-gray-300 text-sm">Mon - Sat: 8:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm text-gray-400">
          &copy; Shobhi | {currentYear} Padpu Farms. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

