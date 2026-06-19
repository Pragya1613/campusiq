import { useEffect, useState } from "react";

import { getAllJobs } from "../services/jobService";
import { applyForJob } from "../services/applicationService";

function JobsPage() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await getAllJobs();
      setJobs(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleApply = async (jobId) => {
    try {
      const data =
        await applyForJob(jobId);

      alert(data.message);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Application Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-blue-600 mb-8">
        Available Jobs
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition"
          >
            <h2 className="text-2xl font-bold mb-2">
              {job.title}
            </h2>

            <p className="text-gray-600">
              {job.companyName}
            </p>

            <p className="text-gray-500">
              📍 {job.location}
            </p>

            <button
              onClick={() =>
                handleApply(job._id)
              }
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Apply Now
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}

export default JobsPage;