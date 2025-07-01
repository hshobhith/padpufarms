import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import backgroundVideo from "../assets/video/video.mp4";

// Auto-import all images from gallery folder
function importAll(r) {
  return r.keys().map(r);
}
const galleryImages = importAll(require.context("../assets/gallery", false, /\.(png|jpe?g|svg)$/));

export default function Home() {
  const [products, setProducts] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/products").then((res) => {
      setProducts(res.data.slice(0, 4));
    });
    axios.get("http://localhost:5000/api/admin/trainings").then((res) => {
      setTrainings(res.data.slice(0, 2));
    });
    axios.get("http://localhost:5000/api/faqs").then((res) => {
      setFaqs(res.data.slice(0, 2)); // show only 2 FAQs
    });
  }, []);

  return (
    <div className="relative w-full min-h-screen">
      {/* Hero Video Section */}
      <div className="relative w-full h-screen overflow-hidden m-0 p-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
        >
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="flex flex-col items-center justify-center h-full bg-black bg-opacity-40 text-white text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Padpu Farms</h1>
          <p className="text-lg md:text-2xl max-w-2xl">
            Leading the way in organic honey production and sustainable bee farming. Learn, cultivate, and grow with us.
          </p>
        </div>
      </div>

      {/* Products Section */}
      <div className="py-12 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-green-800">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white p-4 rounded shadow hover:shadow-md transition">
              {product.imageUrl && (
                <img
                  src={`http://localhost:5000${product.imageUrl}`}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded"
                />
              )}
              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-1">₹{product.price}</p>
              <Link to="/products" className="text-green-600 hover:underline text-sm">
                View More
              </Link>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link to="/products" className="text-white bg-green-700 hover:bg-green-800 px-4 py-2 rounded">
            View All Products
          </Link>
        </div>
      </div>

      {/* Trainings Section */}
      {trainings.length > 0 && (
        <div className="py-12 px-4 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-green-800">Upcoming Trainings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trainings.map((training) => (
              <div key={training._id} className="bg-white p-4 rounded shadow hover:shadow-md transition">
                <h3 className="text-lg font-semibold">{training.title}</h3>
                <p className="text-sm text-gray-600">{training.description}</p>
                {training.date && <p className="text-sm mt-2">📅 {training.date}</p>}
                {training.time && <p className="text-sm">🕒 {training.time}</p>}
                <Link to="/training" className="text-green-600 hover:underline text-sm block mt-2">
                  Register Now
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link to="/training" className="text-white bg-green-700 hover:bg-green-800 px-4 py-2 rounded">
              View All Trainings
            </Link>
          </div>
        </div>
      )}

      {/* Gallery Section */}
      <div className="py-12 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-green-800">Gallery</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {galleryImages.slice(0, 8).map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Gallery ${index + 1}`}
              className="rounded shadow-md object-cover w-full h-40 hover:scale-105 transition-transform"
            />
          ))}
        </div>
        <div className="text-center mt-6">
          <Link to="/gallery" className="text-white bg-green-700 hover:bg-green-800 px-4 py-2 rounded">
            View Full Gallery
          </Link>
        </div>

         {/* FAQs Section */}
      {faqs.length > 0 && (
        <div className="py-12 px-4 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-green-800">Customer Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold text-lg text-green-700">Q: {faq.question}</h3>
                <p className="text-gray-800 mt-2">A: {faq.answer}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link to="/faqs" className="text-white bg-green-700 hover:bg-green-800 px-4 py-2 rounded">
              View All FAQs
            </Link>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
