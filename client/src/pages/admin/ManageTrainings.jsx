import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ManageTraining() {
  const [trainings, setTrainings] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    duration: "",
    fees: ""
  });
  const [image, setImage] = useState(null);
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  const API = "https://api-padpu-farms-backend.onrender.com/api/admin/trainings";

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    const res = await axios.get(API);
    setTrainings(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in form) {
      if (form[key]) formData.append(key, form[key]);
    }
    if (image) formData.append("image", image);

    if (editId) {
      await axios.put(`${API}/${editId}`, formData);
    } else {
      await axios.post(API, formData);
    }

    setForm({ title: "", description: "", date: "", time: "", duration: "", fees: "" });
    setImage(null);
    setEditId(null);
    fetchTrainings();
  };

  const handleEdit = (training) => {
    setForm(training);
    setEditId(training._id);
    setImage(null);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTrainings();
  };

 return (
  <div className="p-4 md:p-6 max-w-4xl mx-auto">
    {/* Back Button */}
    <button
      onClick={() => navigate(-1)}
      className="mb-4 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
    >
      ← Back
    </button>

    <h1 className="text-2xl font-bold mb-6 text-center sm:text-left">Manage Training Programs</h1>

    {/* Form */}
    <form
      onSubmit={handleSubmit}
      className="space-y-4 mb-10 bg-white p-4 sm:p-6 rounded shadow-md"
      encType="multipart/form-data"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Training Title"
          className="border p-2 rounded w-full"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          type="date"
          className="border p-2 rounded w-full"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <input
          type="time"
          className="border p-2 rounded w-full"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
        />
        <input
          type="text"
          placeholder="Duration (e.g., 2 weeks)"
          className="border p-2 rounded w-full"
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
        />
        <input
          type="number"
          placeholder="Fees (₹)"
          className="border p-2 rounded w-full"
          value={form.fees}
          onChange={(e) => setForm({ ...form, fees: e.target.value })}
        />
        <input
          type="file"
          accept="image/*"
          className="border p-2 rounded w-full"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>
      <textarea
        placeholder="Description"
        className="border p-2 rounded w-full"
        rows="3"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow transition">
        {editId ? "Update Training" : "Add Training"}
      </button>
    </form>

    {/* Training List */}
    <div className="space-y-4">
      {trainings.map((item) => (
        <div
          key={item._id}
          className="p-4 bg-white rounded shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div className="flex-1">
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="text-gray-700">{item.description}</p>
            <div className="text-sm text-gray-600 space-y-1 mt-1">
              {item.date && <p>📅 {item.date} {item.time && `@ ${item.time}`}</p>}
              {item.duration && <p>⏱ Duration: {item.duration}</p>}
              {item.fees && <p>💰 Fees: ₹{item.fees}</p>}
            </div>
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="mt-3 w-full sm:w-32 h-32 object-cover rounded"
              />
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <button
              onClick={() => handleEdit(item)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded w-full sm:w-auto"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(item._id)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-full sm:w-auto"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

}
