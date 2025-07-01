import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminFAQs() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUnanswered();
  }, []);

  const fetchUnanswered = async () => {
    try {
      const res = await axios.get("https://api-padpu-farms-backend.onrender.com/api/faqs/unanswered");
      setQuestions(res.data);
    } catch (err) {
      setMessage("Failed to load questions");
    }
  };

  const handleAnswer = async (id) => {
    const answerText = answers[id];
    if (!answerText) return;

    try {
      await axios.put(`https://api-padpu-farms-backend.onrender.com/api/faqs/${id}`, { answer: answerText });
      setMessage("Answer submitted successfully!");
      setAnswers((prev) => ({ ...prev, [id]: "" }));
      fetchUnanswered(); // refresh list
    } catch (err) {
      setMessage("Failed to submit answer");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
         <button
            onClick={() => navigate(-1)}
            className="mb-4 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition duration-200"
            >
            ← Back
        </button>
      <h1 className="text-2xl font-bold text-green-800 mb-4">Unanswered FAQ Questions</h1>

      {message && <p className="mb-4 text-blue-600">{message}</p>}

      {questions.length === 0 ? (
        <p>No unanswered questions.</p>
      ) : (
        questions.map((q) => (
          <div key={q._id} className="border p-4 mb-4 rounded shadow">
            <p className="text-lg font-semibold">Q: {q.question}</p>
            <p className="text-sm text-gray-600">From: {q.name} ({q.phone})</p>

            <textarea
              className="border p-2 mt-2 w-full rounded"
              placeholder="Type your answer here..."
              value={answers[q._id] || ""}
              onChange={(e) => setAnswers({ ...answers, [q._id]: e.target.value })}
            />
            <button
              className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={() => handleAnswer(q._id)}
            >
              Submit Answer
            </button>
          </div>
        ))
      )}
    </div>
  );
}
