import { useEffect, useState } from "react";
import axios from "axios";

export default function Training() {
  const [trainings, setTrainings] = useState([]);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "" });
  const [success, setSuccess] = useState("");

  useEffect(() => {
    axios.get("https://api-padpu-farms-backend.onrender.com/api/admin/trainings").then((res) => {
      setTrainings(res.data);
    });
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(form.phone)) {
        setSuccess("❌ Invalid phone number. Enter a valid 10-digit Indian number.");
        return;
    }


    if (!selectedTraining) return;

    const payload = {
      ...form,
      trainingId: selectedTraining._id,
    };

    try {
      await axios.post("https://api-padpu-farms-backend.onrender.com/api/training-registrations", payload);
      setSuccess("✅ Registered successfully!");
      setForm({ name: "", phone: "" });
      setSelectedTraining(null);
    } catch {
      setSuccess("❌ Registration failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-800 text-center mb-6">Honey Cultivation Training</h1>

      <div className="grid gap-6">
        {trainings.map((item) => (
          <div key={item._id} className="bg-white rounded shadow p-4">
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p>{item.description}</p>
            {item.date && <p>📅 {item.date} {item.time && `@ ${item.time}`}</p>}
            {item.duration && <p>⏱ {item.duration}</p>}
            {item.fees && <p>💰 ₹{item.fees}</p>}
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="mt-2 w-48 h-32 object-cover rounded"
              />
            )}
            <button
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={() => setSelectedTraining(item)}
            >
              Register
            </button>
          </div>
        ))}
      </div>

      {/* Registration Form Modal-like */}
      {selectedTraining && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Register for: {selectedTraining.title}</h3>
            <form onSubmit={handleRegister} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="border p-2 w-full rounded"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="border p-2 w-full rounded"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
              <div className="flex gap-2">
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full">
                  Submit
                </button>
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                  onClick={() => setSelectedTraining(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
            {success && <p className="text-green-600 mt-2">{success}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
