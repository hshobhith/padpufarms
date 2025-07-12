import { FaPhoneAlt, FaWhatsapp, FaInstagram, FaEnvelope } from "react-icons/fa";
import backgroundVideo from "../assets/video/product.mp4"; // ✅ Adjust path if needed

export default function Contact() {
  return (
    <div className="relative min-h-screen w-full">
      {/* ✅ Fixed Background Video */}
      <div className="fixed inset-0 z-[-1] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* ✅ Foreground Content with Overlay */}
      <div className="flex items-center justify-center px-4 py-10 min-h-screen">
        <div className="max-w-xl w-full text-center bg-white/10 backdrop-blur-s p-6 rounded-xl shadow-xl">
          <h1 className="text-3xl font-bold text-green-800 mb-6">Contact Us</h1>

          <p className="text-gray-800 font-bold mb-6">
            Feel free to reach out to us via call, WhatsApp, or Instagram. We’re here to help!
          </p>

          <div className="flex justify-center space-x-6 text-2xl mb-6 text-blue-400">
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

          <div className="text-gray-900 font-bold text-sm mb-6">
            <p><strong>Address:</strong></p>
            <p>Padpu Farms Amaramudnuru Village Pailar Post Sullia Taluk Dakshina Kannada Dist Karnataka 574248</p>
            <br />
            <p><strong>Phone:</strong> +91 7411860340</p>
            <p><strong>Email:</strong> padpufarms@gmail.com</p>
            <p><strong>Working Hours:</strong> Mon - Sat: 8:00 AM - 6:00 PM</p>
          </div>

          {/* ✅ Google Map Embed */}
          <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg">
            <iframe
              title="Padpu Farms Location"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              src="https://www.google.com/maps?q=Kukkujadka-Pailar+Rd,+Karnataka,+India&output=embed"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
