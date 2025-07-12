import { useEffect, useState } from "react";
import axios from "axios";
import backgroundVideo from "../assets/video/product.mp4";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [orderForm, setOrderForm] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const API = "https://api-padpu-farms-backend.onrender.com/api";

  useEffect(() => {
    axios.get(`${API}/admin/products`).then((res) => setProducts(res.data))
    .catch(console.error)
    .finally(() => setLoadingProducts(false)
  );
  }, []);

  useEffect(() => {
    document.body.style.overflow = showForm ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [showForm]);

  const handleBuyClick = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setShowForm(true);
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(orderForm.phone)) {
      alert("❌ Please enter a valid 10-digit Indian phone number.");
      return;
    }

    const pincodeRegex = /^[1-9][0-9]{5}$/;
    if (!pincodeRegex.test(orderForm.pincode)) {
      alert("❌ Please enter a valid 6-digit Indian pincode.");
      return;
    }

    const total = quantity * selectedProduct.price;

    const orderData = {
      ...orderForm,
      productId: selectedProduct._id,
      productName: selectedProduct.name,
      quantity,
      price: selectedProduct.price,
      totalAmount: total,
      status: "Pending",
    };

    try {
      await axios.post(`${API}/orders`, orderData);
      alert("✅Order placed! You’ll be contacted soon via WhatsApp.");
      setShowForm(false);
      setOrderForm({ name: "", phone: "", address: "", pincode: "" });
      // WhatsApp message
      const message = `🛒 *New Order - ${selectedProduct.name}*

    *Customer Details:*
    👤 Name: ${orderForm.name}
    📞 Phone: ${orderForm.phone}
    🏠 Address: ${orderForm.address}
    📮 Pincode: ${orderForm.pincode}

    *Order Details:*
    🧴 Product: ${selectedProduct.name}
    📦 Quantity: ${quantity}
    💰 Price per unit: ₹${selectedProduct.price}
    🧾 Total: ₹${total}

    Please confirm the order! ✅`;

      const encodedMessage = encodeURIComponent(message);
      const adminPhoneNumber = "916366076182"; // Replace with actual admin number
      const whatsappLink = `https://wa.me/${adminPhoneNumber}?text=${encodedMessage}`;

      window.open(whatsappLink, "_blank");

    } catch (error) {
      alert("❌ Failed to place order. Please try again later.");
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* Fixed Background Video */}
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

      {/* Scrollable Content */}
      <div className="relative z-10">
        <h1 className="text-3xl font-bold text-center text-green-800 mb-6 pt-8">
          Our Honey & Natural Products
        </h1>
        {loadingProducts ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-600 border-solid"></div>
          </div>
        ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 pb-16">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white p-4 rounded shadow-md flex flex-col items-center"
              data-aos="zoom-in"
            >
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-32 h-32 object-cover rounded mb-2"
                />
              )}
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600 text-sm">{product.description}</p>
              <p className="text-green-700 font-bold">
                ₹{product.price} ({product.quantityLabel})
              </p>
              <p className="text-sm text-gray-500">In stock: {product.stock}</p>

              {product.stock > 0 ? (
                <button
                  onClick={() => handleBuyClick(product)}
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  Buy
                </button>
              ) : (
                <p className="text-red-500 font-semibold mt-4">Out of Stock</p>
              )}
            </div>
          ))}
        </div>
        )}
      </div>

      {/* Order Form Modal */}
      {showForm && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <form
            onSubmit={handleOrderSubmit}
            className="bg-white p-6 rounded shadow-md w-full max-w-md"
          >
            <h2 className="text-xl font-bold mb-4">
              Order {selectedProduct.name}
            </h2>

            <label className="block mb-2">Quantity</label>
            <input
              type="number"
              min="1"
              max={selectedProduct.stock}
              value={quantity}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (!isNaN(val)) setQuantity(val);
              }}
              className="w-full mb-4 border p-2 rounded"
              required
            />

            <label className="block mb-2">Name</label>
            <input
              type="text"
              className="w-full mb-4 border p-2 rounded"
              value={orderForm.name}
              onChange={(e) =>
                setOrderForm({ ...orderForm, name: e.target.value })
              }
              required
            />

            <label className="block mb-2">Phone</label>
            <input
              type="tel"
              className="w-full mb-4 border p-2 rounded"
              value={orderForm.phone}
              onChange={(e) =>
                setOrderForm({ ...orderForm, phone: e.target.value })
              }
              required
            />

            <label className="block mb-2">Address</label>
            <textarea
              rows="3"
              className="w-full mb-4 border p-2 rounded"
              value={orderForm.address}
              onChange={(e) =>
                setOrderForm({ ...orderForm, address: e.target.value })
              }
              required
            />

            <label className="block mb-2">Pincode</label>
            <input
              type="text"
              className="w-full mb-4 border p-2 rounded"
              value={orderForm.pincode}
              onChange={(e) =>
                setOrderForm({ ...orderForm, pincode: e.target.value })
              }
              required
            />

            <p className="mb-4 font-semibold">
              Total: ₹{selectedProduct.price * quantity}
            </p>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Order via WhatsApp
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
