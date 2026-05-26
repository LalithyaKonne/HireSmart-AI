import { Link } from "react-router-dom";
import {
  FaHome,
  FaFileAlt,
  FaMicrophone,
  FaSignOutAlt
} from "react-icons/fa";

function Sidebar() {
  return (
    <div className="w-64 bg-slate-900 min-h-screen p-6">

      <h1 className="text-2xl font-bold text-blue-500 mb-10">
        HireSmart AI
      </h1>

      <div className="space-y-4">

        <Link
          to="/dashboard"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
        >
          <FaHome />
          Dashboard
        </Link>

        <Link
          to="/resume"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
        >
          <FaFileAlt />
          Resume Analyzer
        </Link>

        <Link
          to="/interview"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
        >
          <FaMicrophone />
          Mock Interview
        </Link>
        <Link
          to="/interview"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
        >
        </Link>
        <Link
  to="/resume-history"
>
  Resume History
</Link>

      </div>
    </div>
  );
}

export default Sidebar;