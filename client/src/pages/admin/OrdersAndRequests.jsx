import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminRequests() {
  const [orders, setOrders] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const navigate = useNavigate();
  

  const fetchData = async () => {
    const [orderRes, registerRes] = await Promise.all([
      axios.get("https://api-padpu-farms-backend.onrender.com/api/orders"),
      axios.get("https://api-padpu-farms-backend.onrender.com/api/training-registrations"),
    ]);
    setOrders(orderRes.data.reverse());
    setRegistrations(registerRes.data.reverse());
  };

  const handleStatusChange = async (id, newStatus) => {
    await axios.put(`https://api-padpu-farms-backend.onrender.com/api/orders/${id}`, { status: newStatus });
    fetchData();
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000); // 10s refresh
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

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">🛒 Product Orders</h2>
        {orders.length === 0 ? (
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
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">🎓 Training Registrations</h2>
        {registrations.length === 0 ? (
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
        )}
      </section>
    </div>
  );
}
