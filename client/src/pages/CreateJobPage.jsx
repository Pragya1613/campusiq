import { useState } from "react";

import { createJob } from "../services/jobService";

function CreateJobPage() {
  const [title, setTitle] =
    useState("");

  const [
    companyName,
    setCompanyName,
  ] = useState("");

  const [location, setLocation] =
    useState("");

  const [packageOffered, setPackageOffered] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const jobData = {
        title,
        companyName,
        location,
        packageOffered,
        description,
      };

      const data =
        await createJob(jobData);

      console.log(data);

      alert(
        "Job Created Successfully"
      );

      setTitle("");
      setCompanyName("");
      setLocation("");
      setPackageOffered("");
      setDescription("");

    } catch (error) {
      console.log(error);

      alert("Failed to create job");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <h1>Create Job</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Job Title"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
          />
        </div>

        <br />

        <div>
          <input
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) =>
              setCompanyName(
                e.target.value
              )
            }
          />
        </div>

        <br />

        <div>
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) =>
              setLocation(
                e.target.value
              )
            }
          />
        </div>

        <br />

        <div>
          <input
            type="text"
            placeholder="Package"
            value={packageOffered}
            onChange={(e) =>
              setPackageOffered(
                e.target.value
              )
            }
          />
        </div>

        <br />

        <div>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
          />
        </div>

        <br />

        <button type="submit">
          Create Job
        </button>
      </form>
    </div>
  );
}

export default CreateJobPage;