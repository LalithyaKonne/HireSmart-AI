import { useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaFilePdf,
  FaRobot,
} from "react-icons/fa";

function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [role, setRole] = useState("MERN");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a resume PDF");
      return;
    }

    const formData = new FormData();

    formData.append("resume", file);
    formData.append("role", role);

    try {
      setLoading(true);

      const res = await API.post(
        "/resume/upload",
        formData
      );

      setResult(res.data);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to analyze resume"
      );
    } finally {
      setLoading(false);
    }
  };

  const getGrade = (score) => {
    if (score >= 90) return "A+";
    if (score >= 80) return "A";
    if (score >= 70) return "B";
    if (score >= 60) return "C";
    return "Needs Improvement";
  };

  const getQuality = (score) => {
    if (score >= 85) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 50) return "Average";
    return "Poor";
  };

  return (
    <div className="flex bg-slate-950 min-h-screen text-white">
      <Sidebar />

      <div className="flex-1 p-8">

        <h1 className="text-4xl font-bold mb-8">
          Resume Analyzer
        </h1>

        {/* Upload Card */}

        <div className="bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-800">

          <div className="grid md:grid-cols-3 gap-4">

            <div>
              <label className="block mb-2 text-gray-300">
                Target Role
              </label>

              <select
                value={role}
                onChange={(e) =>
                  setRole(e.target.value)
                }
                className="w-full bg-slate-800 p-3 rounded-lg"
              >
                <option value="MERN">
                  MERN Developer
                </option>

                <option value="Java">
                  Java Developer
                </option>

                <option value="Frontend">
                  Frontend Developer
                </option>

                <option value="Fresher">
  Fresher / Placement Preparation
</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-gray-300">
                Upload Resume
              </label>

              <input
                type="file"
                accept=".pdf"
                onChange={(e) =>
                  setFile(
                    e.target.files[0]
                  )
                }
                className="w-full bg-slate-800 p-2 rounded-lg"
              />
            </div>

            <div className="flex items-end">

              <button
                onClick={handleUpload}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-3 rounded-lg font-semibold hover:scale-105 transition"
              >
                {loading
                  ? "Analyzing..."
                  : "Analyze Resume"}
              </button>

            </div>

          </div>

        </div>

        {/* Results */}

        {result && (
          <div className="mt-8">

            {/* Top Stats */}

            <div className="grid lg:grid-cols-5 gap-6">

              <div className="bg-slate-900 p-6 rounded-2xl shadow-lg">

                <div className="w-32 mx-auto">

                  <CircularProgressbar
                    value={result.atsScore}
                    text={`${result.atsScore}%`}
                    styles={buildStyles({
                      textColor: "#fff",
                      pathColor: "#3b82f6",
                      trailColor: "#1e293b",
                    })}
                  />

                </div>

                <h3 className="text-center mt-4 font-bold">
                  ATS Score
                </h3>

              </div>

              <div className="bg-slate-900 p-6 rounded-2xl">

                <h3 className="text-gray-400">
                  Grade
                </h3>

                <p className="text-5xl font-bold text-green-400 mt-3">
                  {getGrade(result.atsScore)}
                </p>

              </div>

              <div className="bg-slate-900 p-6 rounded-2xl">

                <h3 className="text-gray-400">
                  Resume Quality
                </h3>

                <p className="text-3xl font-bold text-blue-400 mt-3">
                  {getQuality(
                    result.atsScore
                  )}
                </p>

              </div>

              <div className="bg-slate-900 p-6 rounded-2xl">

                <h3 className="text-gray-400">
                  Skills Found
                </h3>

                <p className="text-5xl font-bold text-green-400 mt-3">
                  {
                    result.foundSkills
                      .length
                  }
                </p>

              </div>

            </div>

            {/* Skill Coverage */}

            <div className="bg-slate-900 p-6 rounded-2xl mt-6">

              <h3 className="text-xl font-bold mb-3">
                Skill Coverage
              </h3>

              <div className="w-full bg-slate-700 rounded-full h-5">

                <div
                  className="bg-green-500 h-5 rounded-full"
                  style={{
                    width:
                      `${result.atsScore}%`,
                  }}
                />

              </div>

              <p className="mt-3 text-gray-300">
                {result.atsScore}% Match
                with {role} Role
              </p>

            </div>

            {/* Skills */}

            <div className="grid lg:grid-cols-2 gap-6 mt-6">

              <div className="bg-slate-900 p-6 rounded-2xl">

                <h2 className="text-2xl font-bold mb-4 text-green-400">
                  Skills Found
                </h2>

                <div className="flex flex-wrap gap-3">

                  {result.foundSkills.map(
                    (skill) => (
                      <span
                        key={skill}
                        className="bg-green-600 px-4 py-2 rounded-full flex items-center gap-2"
                      >
                        <FaCheckCircle />
                        {skill}
                      </span>
                    )
                  )}

                </div>

              </div>

              <div className="bg-slate-900 p-6 rounded-2xl">

                <h2 className="text-2xl font-bold mb-4 text-red-400">
                  Missing Skills
                </h2>

                <div className="flex flex-wrap gap-3">

                  {result.missingSkills.map(
                    (skill) => (
                      <span
                        key={skill}
                        className="bg-red-600 px-4 py-2 rounded-full flex items-center gap-2"
                      >
                        <FaExclamationTriangle />
                        {skill}
                      </span>
                    )
                  )}

                </div>

              </div>

            </div>

            {/* Suggestions */}

            <div className="bg-slate-900 p-6 rounded-2xl mt-6">

              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <FaRobot />
                AI Suggestions
              </h2>

<div className="bg-slate-900 p-6 rounded-2xl mt-6">

  <h2 className="text-2xl font-bold mb-4">
    🎯 Placement Tips
  </h2>

  <ul className="space-y-3">

    <li>✓ Practice DSA daily</li>

    <li>✓ Build 2-3 projects</li>

    <li>✓ Keep GitHub updated</li>

    <li>✓ Improve communication skills</li>

    <li>✓ Prepare HR answers</li>

  </ul>

</div>
              <ul className="space-y-3">

                {result.suggestions.map(
                  (
                    suggestion,
                    index
                  ) => (
                    <li
                      key={index}
                      className="bg-slate-800 p-3 rounded-lg"
                    >
                      {suggestion}
                    </li>
                  )
                )}

              </ul>

            </div>

            {/* Resume Summary */}

            <div className="bg-slate-900 p-6 rounded-2xl mt-6">

              <h2 className="text-2xl font-bold mb-4">
                Resume Summary
              </h2>

              <div className="grid md:grid-cols-3 gap-4">

                <div className="bg-slate-800 p-4 rounded-xl">
                  <FaFilePdf className="text-red-500 text-2xl mb-2" />
                  <p className="text-gray-400">
                    File Name
                  </p>
                  <p>
                    {file?.name}
                  </p>
                </div>

                <div className="bg-slate-800 p-4 rounded-xl">
                  <p className="text-gray-400">
                    Target Role
                  </p>
                  <p>{role}</p>
                </div>

                <div className="bg-slate-800 p-4 rounded-xl">
                  <p className="text-gray-400">
                    ATS Grade
                  </p>
                  <p>
                    {getGrade(
                      result.atsScore
                    )}
                  </p>
                </div>

                <div className="bg-slate-900 p-6 rounded-2xl">

  <h3 className="text-gray-400">
    Placement Readiness
  </h3>

  <p className="text-4xl font-bold text-purple-400 mt-3">
    {result.placementReadiness}%
  </p>

</div>
<p className="text-center mt-2">

{
result.atsScore >= 80
? "🟢 Excellent ATS"
: result.atsScore >= 60
? "🟡 Good ATS"
: "🔴 Needs Improvement"
}

</p>

              </div>

            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeAnalyzer;