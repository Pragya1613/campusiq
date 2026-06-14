import { useEffect, useState } from "react";

import { getAllJobs } from "../services/jobService";

import {
  applyForJob,
} from "../services/applicationService";

function JobsPage() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data =
        await getAllJobs();

      console.log(data);

      setJobs(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleApply =
    async (jobId) => {
      try {
        const data =
          await applyForJob(
            jobId
          );

        alert(data.message);

      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            "Application Failed"
        );
      }
    };

  return (
    <div>
      <h1>Available Jobs</h1>

      {jobs.map((job) => (
        <div key={job._id}>
          <h3>{job.title}</h3>

          <p>{job.companyName}</p>

          <p>{job.location}</p>

          <button
            onClick={() =>
              handleApply(
                job._id
              )
            }
          >
            Apply
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default JobsPage;