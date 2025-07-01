import { FaPhoneAlt, FaWhatsapp, FaInstagram, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
      <div className="max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold text-green-800 mb-6">Contact Us</h1>

        <p className="text-gray-700 mb-6">
          Feel free to reach out to us via call, WhatsApp, or Instagram. We’re here to help!
        </p>

        <div className="flex justify-center space-x-6 text-2xl mb-6 text-green-700">
          <a href="tel:+91917411860340" title="Call">
            <FaPhoneAlt />
          </a>
          <a
            href="https://wa.me/91917411860340"
            target="_blank"
            rel="noopener noreferrer"
            title="WhatsApp"
          >
            <FaWhatsapp />
          </a>
          <a
            href="https://www.instagram.com/padpufarms?igsh=MTBjc2h6b2UzY3VoZA=="
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
          >
            <FaInstagram />
          </a>
          <a href="mailto:padpufarms@gmail.com" title="Email">
            <FaEnvelope />
          </a>
        </div>

        <div className="text-gray-800 text-sm">
          <p><strong>Address:</strong></p>
          <p>123 Farm Road, Agricultural District, India</p>
          <p><strong>Phone:</strong> +91 7411860340</p>
          <p><strong>Email:</strong> padpufarms@gmail.com</p>
          <p><strong>Working Hours:</strong> Mon - Sat: 8:00 AM - 6:00 PM</p>
        </div>
      </div>
    </div>
  );
}
