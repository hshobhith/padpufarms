import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // for arrow icons

export default function AdminRequests() {
  const [orders, setOrders] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [showOrders, setShowOrders] = useState(false);
  const [showRegistrations, setShowRegistrations] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    const [orderRes, registerRes] = await Promise.all([
      axios.get("https://api-padpu-farms-backend.onrender.com/api/orders"),
      axios.get("https://api-padpu-farms-backend.onrender.com/api/training-registrations"),
    ]);
    setOrders(
  orderRes.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
);

setRegistrations(
  registerRes.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
);
  };

  const handleStatusChange = async (id, newStatus) => {
    await axios.put(`https://api-padpu-farms-backend.onrender.com/api/orders/${id}`, { status: newStatus });
    fetchData();
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition duration-200"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-6">Orders & Training Requests</h1>

      {/* Product Orders */}
      <section className="mb-8">
        <div
          className="flex items-center justify-between cursor-pointer mb-4"
          onClick={() => setShowOrders(!showOrders)}
        >
          <h2 className="text-xl font-semibold">🛒 Product Orders</h2>
          {showOrders ? (
            <FaChevronUp className="text-gray-600" />
          ) : (
            <FaChevronDown className="text-gray-600" />
          )}
        </div>

        {showOrders && (
          orders.length === 0 ? (
            <p className="text-gray-500">No orders yet.</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order._id} className="p-4 bg-white rounded shadow space-y-1">
                  <p><strong>Name:</strong> {order.name}</p>
                  <p><strong>Phone:</strong> {order.phone}</p>
                  <p><strong>Product:</strong> {order.productName}</p>
                  <p><strong>Qty:</strong> {order.quantity}</p>
                  <p><strong>Total:</strong> ₹{order.totalAmount}</p>
                  <p><strong>Address:</strong> {order.address}, {order.pincode}</p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="border p-1 rounded"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Canceled">Canceled</option>
                    </select>
                  </p>
                </div>
              ))}
            </div>
          )
        )}
      </section>

      {/* Training Registrations */}
      <section>
        <div
          className="flex items-center justify-between cursor-pointer mb-4"
          onClick={() => setShowRegistrations(!showRegistrations)}
        >
          <h2 className="text-xl font-semibold">🎓 Training Registrations</h2>
          {showRegistrations ? (
            <FaChevronUp className="text-gray-600" />
          ) : (
            <FaChevronDown className="text-gray-600" />
          )}
        </div>

        {showRegistrations && (
          registrations.length === 0 ? (
            <p className="text-gray-500">No training registrations yet.</p>
          ) : (
            <div className="space-y-4">
              {registrations.map((reg) => (
                <div key={reg._id} className="p-4 bg-white rounded shadow">
                  <p><strong>Name:</strong> {reg.name}</p>
                  <p><strong>Phone:</strong> {reg.phone}</p>
                  <p><strong>Training:</strong> {reg.trainingTitle}</p>
                  <p className="text-sm text-gray-500">📅 {new Date(reg.createdAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )
        )}
      </section>
    </div>
  );
}
