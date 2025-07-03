import { useEffect, useState } from "react";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [orderForm, setOrderForm] = useState({ name: "", phone: "", address: "", pincode: "" });
  const [showForm, setShowForm] = useState(false);

  const API = "https://api-padpu-farms-backend.onrender.com/api";

  useEffect(() => {
    axios.get(`${API}/admin/products`).then((res) => setProducts(res.data));
  }, []);

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

    await axios.post(`${API}/orders`, orderData);
    alert("✅ Order placed! Admin will contact you soon.");
    setShowForm(false);
    setOrderForm({ name: "", phone: "", address: "", pincode: "" });
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-green-800 mb-6">Our Honey & Natural Products</h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {products.map((product) => (
          <div key={product._id} className="bg-white p-4 rounded shadow-md flex flex-col items-center" data-aos="zoom-in">
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-32 h-32 object-cover rounded mb-2"
              />
            )}
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-green-700 font-bold">₹{product.price} ({product.quantityLabel})</p>
            <p className="text-sm text-gray-500">In stock: {product.stock}</p>
            <button
              onClick={() => handleBuyClick(product)}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Buy
            </button>
          </div>
        ))}
      </div>

      {showForm && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form
            onSubmit={handleOrderSubmit}
            className="bg-white p-6 rounded shadow-md w-full max-w-md"
          >
            <h2 className="text-xl font-bold mb-4">Order {selectedProduct.name}</h2>

            <label className="block mb-2">Quantity</label>
            <input
              type="number"
              min="1"
              max={selectedProduct.stock}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-full mb-4 border p-2 rounded"
              required
            />

            <label className="block mb-2">Name</label>
            <input
              type="text"
              className="w-full mb-4 border p-2 rounded"
              value={orderForm.name}
              onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
              required
            />

            <label className="block mb-2">Phone</label>
            <input
              type="tel"
              className="w-full mb-4 border p-2 rounded"
              value={orderForm.phone}
              onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
              required
            />

            <label className="block mb-2">Address</label>
            <textarea
              rows="3"
              className="w-full mb-4 border p-2 rounded"
              value={orderForm.address}
              onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
              required
            />

            <label className="block mb-2">Pincode</label>
            <input
              type="text"
              className="w-full mb-4 border p-2 rounded"
              value={orderForm.pincode}
              onChange={(e) => setOrderForm({ ...orderForm, pincode: e.target.value })}
              required
            />

            <p className="mb-4 font-semibold">Total: ₹{selectedProduct.price * quantity}</p>

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
                Place Order
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
