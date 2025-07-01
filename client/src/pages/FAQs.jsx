import { useEffect, useState } from "react";
import axios from "axios";

export default function FAQs() {
  const [faqs, setFaqs] = useState([]);
  const [form, setForm] = useState({ name: "", phone: "", question: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("https://api-padpu-farms-backend.onrender.com/api/faqs").then((res) => setFaqs(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://api-padpu-farms-backend.onrender.com/api/faqs/ask", form);
      setMessage(res.data.message);
      setForm({ name: "", phone: "", question: "" });
    } catch (err) {
      setMessage(err.response?.data?.message || "Error submitting question");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-semibold mb-6 text-green-800">Frequently Asked Questions</h1>

      {/* Existing FAQs */}
      <div className="space-y-4 mb-10">
        {faqs.map((faq) => (
          <div key={faq._id}>
            <h2 className="font-bold text-lg">Q: {faq.question}</h2>
            <p className="text-gray-700">A: {faq.answer}</p>
          </div>
        ))}
      </div>

      {/* Ask Your Question */}
      <h2 className="text-xl font-semibold mb-2 text-green-700">Ask Your Question</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
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
        <textarea
          placeholder="Your Question"
          className="border p-2 w-full rounded"
          rows="3"
          value={form.question}
          onChange={(e) => setForm({ ...form, question: e.target.value })}
          required
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Submit
        </button>
        {message && <p className="text-sm text-blue-700 mt-2">{message}</p>}
      </form>
    </div>
  );
}
