import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

function ResumeHistory() {

  const [resumes, setResumes] =
    useState([]);

  useEffect(() => {

    fetchHistory();

  }, []);

  const fetchHistory =
  async () => {

    try {

      const res =
        await API.get(
          "/resume/history"
        );

      setResumes(
        res.data
      );

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="flex bg-slate-950 text-white min-h-screen">

      <Sidebar />

      <div className="flex-1 p-8">

        <h1 className="text-4xl font-bold mb-8">
          Resume History
        </h1>

        <div className="grid gap-4">

          {
            resumes.map(
              (resume) => (

              <div
                key={resume._id}
                className="bg-slate-900 p-6 rounded-xl"
              >

                <h2 className="text-xl font-bold">
                  {resume.fileName}
                </h2>

                <p>
                  Role:
                  {" "}
                  {resume.role}
                </p>

                <p>
                  ATS Score:
                  {" "}
                  {resume.atsScore}%
                </p>

                <p>
                  Date:
                  {" "}
                  {
                    new Date(
                      resume.createdAt
                    ).toLocaleDateString()
                  }
                </p>

              </div>

            ))
          }

        </div>

      </div>

    </div>

  );
}

export default ResumeHistory;