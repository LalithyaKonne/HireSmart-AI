import { useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

function MockInterview() {

  const [role, setRole] = useState("Java");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const loadQuestions = async () => {

    try {

      const res = await API.get(
        `/interview/questions/${role}`
      );

      setQuestions(res.data);
      setAnswers(
        new Array(res.data.length).fill("")
      );

      setResult(null);

    } catch (error) {

      console.log(error);

      alert("Failed to load questions");
    }
  };

  const handleAnswerChange =
    (index, value) => {

      const updatedAnswers = [...answers];

      updatedAnswers[index] = value;

      setAnswers(updatedAnswers);
    };

  const submitInterview = async () => {

    try {

      const res = await API.post(
        "/interview/submit",
        {
          role,
          answers
        }
      );

      setResult(res.data);

    } catch (error) {

      console.log(error);

      alert("Submission Failed");
    }
  };

  return (
    <div className="flex bg-slate-950 min-h-screen text-white">

      <Sidebar />

      <div className="flex-1 p-8">

        <h1 className="text-4xl font-bold mb-8">
          Mock Interview
        </h1>

        <div className="bg-slate-900 p-6 rounded-xl">

          <label className="block mb-2">
            Select Role
          </label>

          <select
  value={role}
  onChange={(e) =>
    setRole(e.target.value)
  }
  className="bg-slate-800 p-3 rounded w-full"
>

  <option value="Java">
    Java Developer
  </option>

  <option value="MERN">
    MERN Developer
  </option>

  <option value="Frontend">
    Frontend Developer
  </option>

  <option value="DSA">
    DSA Round
  </option>

  <option value="HR">
    HR Round
  </option>

</select>
          <button
            onClick={loadQuestions}
            className="mt-4 bg-blue-600 px-6 py-3 rounded-lg"
          >
            Generate Questions
          </button>

        </div>

        {questions.length > 0 && (

          <div className="mt-8">

            {questions.map(
              (question, index) => (

                <div
                  key={index}
                  className="bg-slate-900 p-6 rounded-xl mb-4"
                >

                  <h3 className="font-semibold mb-3">
                    {index + 1}. {question}
                  </h3>

                  <textarea
                    rows="4"
                    value={answers[index]}
                    onChange={(e) =>
                      handleAnswerChange(
                        index,
                        e.target.value
                      )
                    }
                    className="w-full bg-slate-800 p-3 rounded"
                    placeholder="Type your answer..."
                  />

                </div>

              ))
            }

            <button
              onClick={submitInterview}
              className="bg-green-600 px-8 py-3 rounded-lg"
            >
              Submit Interview
            </button>

          </div>

        )}

        {result && (

          <div className="mt-8 bg-slate-900 p-6 rounded-xl">

            <h2 className="text-3xl font-bold text-green-400">
              Score: {result.score}
            </h2>

            <h3 className="mt-4 text-xl">
              Feedback:
            </h3>

            <p className="text-gray-300">
              {result.feedback}
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default MockInterview;