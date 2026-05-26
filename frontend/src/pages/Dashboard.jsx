import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  
  const [dashboardData, setDashboardData] =
useState(null);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";
  };
  useEffect(() => {

  fetchDashboard();

}, []);

const fetchDashboard = async () => {

  try {

    const res =
      await API.get("/dashboard");

    setDashboardData(
      res.data
    );

  } catch (error) {

    console.log(error);

  }

};

  return (

    <div className="flex bg-slate-950 min-h-screen text-white">

      <Sidebar />

      <div className="flex-1 p-8">

        {/* Header */}

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-4xl font-bold">
              Welcome Back,
              {" "}
              {user?.name || "Student"} 👋
            </h1>

            <p className="text-gray-400 mt-2">
              HireSmart AI Resume & Interview Platform
            </p>

          </div>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl font-semibold"
          >
            Logout
          </button>

        </div>

        {/* Welcome Banner */}

        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 mb-8 shadow-xl">

          <h2 className="text-3xl font-bold">
            AI Career Assistant 🚀
          </h2>

          <p className="mt-3 text-lg">
            Analyze resumes, practice interviews,
            and improve your placement chances.
          </p>

        </div>

        {/* Dashboard Content */}

        <div className="grid lg:grid-cols-2 gap-6">

          {/* Profile */}

          <div className="bg-slate-900 p-6 rounded-2xl shadow-lg">

            <h2 className="text-2xl font-bold mb-4">
              👤 Profile
            </h2>

            <p className="mb-2">
              <strong>Name:</strong>
              {" "}
              {user?.name}
            </p>

            <p className="mb-2">
              <strong>Email:</strong>
              {" "}
              {user?.email}
            </p>

            <p>
              <strong>Status:</strong>
              {" "}
              Student
            </p>

          </div>

          {/* Latest Resume */}

          <div className="bg-slate-900 p-6 rounded-2xl shadow-lg">

            <h2 className="text-2xl font-bold mb-4">
              📄 Latest Resume
            </h2>

           <p>
ATS Score:
{" "}
<span className="text-green-400">

{
dashboardData?.latestResume?.atsScore || 0
}%

</span>
</p>

<p>
Role:
{" "}

{
dashboardData?.latestResume?.role ||
"No Resume Yet"
}

</p>

            <p>
              Status:
              {" "}
              Resume Analyzed
            </p>

          </div>

          {/* Latest Interview */}

          <div className="bg-slate-900 p-6 rounded-2xl shadow-lg">

            <h2 className="text-2xl font-bold mb-4">
              🎤 Latest Interview
            </h2>

            <p>
Role:
{" "}

{
dashboardData?.latestInterview?.role ||
"No Interview Yet"
}

</p>

<p>
Score:
{" "}

<span className="text-blue-400">

{
dashboardData?.latestInterview?.score || 0
}

</span>

</p>

            <p>
              Feedback:
              {" "}
              Good Performance
            </p>

          </div>

          {/* AI Career Tips */}

          <div className="bg-slate-900 p-6 rounded-2xl shadow-lg">

            <h2 className="text-2xl font-bold mb-4">
              🤖 AI Career Tips
            </h2>

            <ul className="space-y-3 text-gray-300">

              <li>
                ✅ Add Full Stack Projects
              </li>

              <li>
                ✅ Improve DSA Skills
              </li>

              <li>
                ✅ Practice Mock Interviews
              </li>

              <li>
                ✅ Add GitHub Portfolio
              </li>

              <li>
                ✅ Learn System Design Basics
              </li>

            </ul>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Dashboard;