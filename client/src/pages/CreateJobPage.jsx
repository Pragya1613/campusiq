import { useState } from "react";
import { createJob } from "../services/jobService";
import PublicLayout from "../layouts/PublicLayout";

function CreateJobPage() {

  const [title, setTitle] =
    useState("");

  const [
    companyName,
    setCompanyName,
  ] = useState("");

  const [location, setLocation] =
    useState("");

  const [jobPackage, setJobPackage] =
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
        package: jobPackage,
        description,
      };

      await createJob(jobData);

      alert(
        "Job Created Successfully"
      );

      setTitle("");
      setCompanyName("");
      setLocation("");
      setJobPackage("");
      setDescription("");

    } catch (error) {

      console.log(error);

      alert(
        "Failed to create job"
      );

    }

  };

  return (
    <PublicLayout>

      <div className="min-h-screen bg-gray-100 py-12 px-6">

        <div className="max-w-3xl mx-auto">

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <div className="text-center mb-8">

              <i className="fa-solid fa-briefcase text-orange-500 text-5xl mb-4"></i>

              <h1 className="text-4xl font-bold text-[#172554]">
                Create New Job
              </h1>

              <p className="text-gray-500 mt-2">
                Add a placement opportunity for students
              </p>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <div className="relative">

                <i className="fa-solid fa-laptop-code absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

                <input
                  type="text"
                  placeholder="Job Title"
                  value={title}
                  onChange={(e) =>
                    setTitle(
                      e.target.value
                    )
                  }
                  className="w-full border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  required
                />

              </div>

              <div className="relative">

                <i className="fa-solid fa-building absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

                <input
                  type="text"
                  placeholder="Company Name"
                  value={companyName}
                  onChange={(e) =>
                    setCompanyName(
                      e.target.value
                    )
                  }
                  className="w-full border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  required
                />

              </div>

              <div className="relative">

                <i className="fa-solid fa-location-dot absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) =>
                    setLocation(
                      e.target.value
                    )
                  }
                  className="w-full border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  required
                />

              </div>

              <div className="relative">

                <i className="fa-solid fa-indian-rupee-sign absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

                <input
                  type="number"
                  placeholder="Package Offered (LPA)"
                  value={jobPackage}
                  onChange={(e) =>
                    setJobPackage(
                      e.target.value
                    )
                  }
                  className="w-full border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  required
                />

              </div>

              <div className="relative">

                <i className="fa-solid fa-file-lines absolute left-4 top-5 text-gray-400"></i>

                <textarea
                  placeholder="Job Description"
                  value={description}
                  onChange={(e) =>
                    setDescription(
                      e.target.value
                    )
                  }
                  rows="6"
                  className="w-full border rounded-xl pt-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  required
                />

              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
              >
                Create Job
              </button>

            </form>

          </div>

        </div>

      </div>

    </PublicLayout>
  );
}

export default CreateJobPage;