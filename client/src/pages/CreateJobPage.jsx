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

  const [
    packageOffered,
    setPackageOffered,
  ] = useState("");

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

      await createJob(jobData);

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

      alert(
        "Failed to create job"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-8">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">

        <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">
          Create New Job
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Job Title"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) =>
              setCompanyName(
                e.target.value
              )
            }
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) =>
              setLocation(
                e.target.value
              )
            }
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="Package (LPA)"
            value={packageOffered}
            onChange={(e) =>
              setPackageOffered(
                e.target.value
              )
            }
            className="w-full border rounded-lg p-3"
          />

          <textarea
            placeholder="Job Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            rows="5"
            className="w-full border rounded-lg p-3"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Create Job
          </button>

        </form>
      </div>

    </div>
  );
}

export default CreateJobPage;