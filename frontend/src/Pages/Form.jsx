import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

export default function Form() {
  const { id } = useParams();

  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState({});
  const [followUp, setFollowUp] = useState(false);

  useEffect(() => {
    API.get(`/forms/${id}`)
      .then((res) => {
        const formData = res.data.form;

        setForm({
          ...formData,
          questions: Array.isArray(formData.questions)
            ? formData.questions
            : [],
        });
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  }, [id]);

  // 🔥 FIXED Smart follow-up logic
  const handleChange = (q, value) => {
    setAnswers((prev) => ({
      ...prev,
      [q.id]: value,
    }));

    if (q.type === "mcq") {
      if (["1", "2"].includes(value)) {
        setFollowUp(true);
      } else {
        setFollowUp(false);

        // remove follow-up answer if exists
        setAnswers((prev) => {
          const updated = { ...prev };
          delete updated["follow_up"];
          return updated;
        });
      }
    }
  };

  // Submit
  const submit = async () => {
    const formattedAnswers = Object.entries(answers).map(([key, value]) => ({
      question_id: key,
      answer: value,
    }));

    try {
      await API.post("/responses", {
        form_id: id,
        answers: formattedAnswers,
      });

      alert("Submitted Successfully!");
    } catch (err) {
      alert("Submission failed", err);
    }
  };

  if (!form) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      {/* BACKDROP */}
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>

      {/* MODAL */}
      <div className="relative z-10 bg-gray-800 text-white w-full max-w-lg rounded-2xl shadow-xl p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">{form.title}</h1>

        <div className="space-y-5">
          {form.questions.map((q) => (
            <div key={q.id}>
              <p className="mb-2 font-medium">{q.question}</p>

              {/* TEXT */}
              {q.type === "text" && (
                <input
                  className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-500"
                  placeholder="Your answer"
                  onChange={(e) => handleChange(q, e.target.value)}
                />
              )}

              {/* MCQ */}
              {q.type === "mcq" && (
                <div className="flex gap-4">
                  {q.options.map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-1 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={q.id}
                        value={opt}
                        onChange={(e) => handleChange(q, e.target.value)}
                      />
                      <span className="hover:text-green-400">{opt}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* CHECKBOX */}
              {q.type === "checkbox" &&
                q.options.map((opt) => (
                  <label key={opt} className="block mb-1">
                    <input
                      type="checkbox"
                      className="mr-2"
                      onChange={(e) => {
                        const prev = answers[q.id] || [];
                        let updated;

                        if (e.target.checked) {
                          updated = [...prev, opt];
                        } else {
                          updated = prev.filter((v) => v !== opt);
                        }

                        handleChange(q, updated);
                      }}
                    />
                    {opt}
                  </label>
                ))}

              {/* DROPDOWN */}
              {q.type === "dropdown" && (
                <select
                  className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
                  onChange={(e) => handleChange(q, e.target.value)}
                >
                  <option value="">Select</option>
                  {q.options.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              )}
            </div>
          ))}

          {/* 🔥 FOLLOW-UP (Improved UI) */}
          {followUp && (
            <div className="p-4 bg-red-900/40 border border-red-500 rounded-lg transition-all">
              <p className="text-red-400 font-semibold mb-2">
                What went wrong?
              </p>
              <input
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
                placeholder="Tell us more..."
                onChange={(e) =>
                  setAnswers((prev) => ({
                    ...prev,
                    follow_up: e.target.value,
                  }))
                }
              />
            </div>
          )}

          {/* SUBMIT */}
          <button
            onClick={submit}
            className="w-full mt-4 bg-green-500 hover:bg-green-600 py-3 rounded-lg font-semibold transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
