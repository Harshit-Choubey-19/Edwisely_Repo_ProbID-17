import { useState } from "react";
import API from "../services/api";

export default function Builder() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: Date.now().toString(),
        question: "",
        type: "text",
        options: [],
      },
    ]);
  };

  const updateQuestion = (index, field, value) => {
    const newQ = [...questions];
    newQ[index][field] = value;
    setQuestions(newQ);
  };

  const updateOption = (qIndex, optIndex, value) => {
    const newQ = [...questions];
    newQ[qIndex].options[optIndex] = value;
    setQuestions(newQ);
  };

  const addOption = (qIndex) => {
    const newQ = [...questions];
    newQ[qIndex].options.push("");
    setQuestions(newQ);
  };

  const deleteQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const moveQuestion = (index, direction) => {
    const newQ = [...questions];
    const target = index + direction;
    if (target < 0 || target >= questions.length) return;

    [newQ[index], newQ[target]] = [newQ[target], newQ[index]];
    setQuestions(newQ);
  };

  const saveForm = async () => {
    try {
      const res = await API.post("/forms", { title, questions });
      alert("Form created: " + res.data.form_id);
    } catch (err) {
      console.error(err);
      alert("Error creating form");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">🚀 Form Builder</h1>

        {/* Form Title */}
        <input
          className="w-full p-3 mb-6 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Form Title"
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Questions */}
        {questions.map((q, i) => (
          <div
            key={q.id}
            className="bg-gray-700 p-4 mb-5 rounded-xl border border-gray-600 shadow-md"
          >
            {/* Question Header */}
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-300">Question {i + 1}</span>

              <div className="flex gap-2">
                <button
                  onClick={() => moveQuestion(i, -1)}
                  className="px-2 py-1 bg-gray-600 hover:bg-gray-500 rounded"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveQuestion(i, 1)}
                  className="px-2 py-1 bg-gray-600 hover:bg-gray-500 rounded"
                >
                  ↓
                </button>
                <button
                  onClick={() => deleteQuestion(i)}
                  className="px-2 py-1 bg-red-500 hover:bg-red-600 rounded"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Question Text */}
            <input
              className="w-full p-3 mb-3 rounded-lg bg-gray-800 border border-gray-600"
              placeholder="Enter your question"
              value={q.question}
              onChange={(e) => updateQuestion(i, "question", e.target.value)}
            />

            {/* Type Selector */}
            <select
              className="w-full p-2 mb-3 rounded bg-gray-800 border border-gray-600"
              value={q.type}
              onChange={(e) => updateQuestion(i, "type", e.target.value)}
            >
              <option value="text">Short Answer</option>
              <option value="mcq">Multiple Choice</option>
              <option value="checkbox">Checkbox</option>
              <option value="dropdown">Dropdown</option>
            </select>

            {/* Options */}
            {(q.type === "mcq" ||
              q.type === "checkbox" ||
              q.type === "dropdown") && (
              <div className="space-y-2">
                {q.options.map((opt, j) => (
                  <input
                    key={j}
                    className="w-full p-2 rounded bg-gray-800 border border-gray-600"
                    placeholder={`Option ${j + 1}`}
                    value={opt}
                    onChange={(e) => updateOption(i, j, e.target.value)}
                  />
                ))}

                <button
                  onClick={() => addOption(i)}
                  className="text-blue-400 text-sm hover:underline"
                >
                  + Add Option
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={addQuestion}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg font-semibold"
          >
            + Add Question
          </button>

          <button
            onClick={saveForm}
            className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-lg font-semibold"
          >
            Save Form
          </button>
        </div>
      </div>
    </div>
  );
}
