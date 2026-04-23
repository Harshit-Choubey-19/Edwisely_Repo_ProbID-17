import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

export default function Dashboard() {
  const { id } = useParams();

  const [responses, setResponses] = useState([]);
  const [form, setForm] = useState(null);

  useEffect(() => {
    // Fetch responses
    API.get(`/responses/${id}`)
      .then((res) => {
        setResponses(res.data.responses || []);
      })
      .catch((err) => console.error(err));

    // Fetch form (for question text)
    API.get(`/forms/${id}`)
      .then((res) => {
        const formData = res.data.form || res.data;
        setForm(formData);
      })
      .catch((err) => console.error(err));
  }, [id]);

  // 🛑 Loading
  if (!form) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  // 🧠 Map question_id → question text
  const getQuestionText = (qid) => {
    const q = form.questions.find((q) => q.id === qid);

    if (q) return q.question;

    // handle follow-up
    if (qid.includes("follow")) {
      return "Follow-up: What went wrong?";
    }

    return qid;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Responses Dashboard
        </h1>

        {responses.length > 0 ? (
          responses.map((r, i) => (
            <div key={i} className="bg-white p-4 mb-4 rounded-xl shadow">
              <h2 className="font-semibold mb-3">Response #{i + 1}</h2>

              {r.answers.map((ans, index) => (
                <div key={index} className="mb-2">
                  <span className="font-medium">
                    {getQuestionText(ans.question_id)}:
                  </span>{" "}
                  <span className="text-gray-700">
                    {Array.isArray(ans.answer)
                      ? ans.answer.join(", ")
                      : ans.answer}
                  </span>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No responses yet</p>
        )}
      </div>
    </div>
  );
}
