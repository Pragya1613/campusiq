import { useEffect, useState } from "react";

import { getCompanyExperiences } from "../../services/experienceService";

import ExperienceCard from "./ExperienceCard";
import LoadingSkeleton from "./LoadingSkeleton";
import EmptyState from "./EmptyState";

function ExperienceList({ companyName, sort }) {
  // ==========================
  // States
  // ==========================

  const [experiences, setExperiences] = useState([]);

  const [pagination, setPagination] = useState({});

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ==========================
  // Fetch Experiences
  // ==========================

  useEffect(() => {
    setPage(1);
  }, [companyName, sort]);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getCompanyExperiences(
          companyName,
          page,
          10,
          sort
        );

        setExperiences(data.experiences || []);

        setPagination(data.pagination || {});
      } catch (err) {
        console.error(err);

        setError(
          err.response?.data?.message ||
            "Failed to load interview experiences."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, [companyName, page, sort]);

  // ==========================
  // Loading
  // ==========================

  if (loading) {
    return <LoadingSkeleton />;
  }

  // ==========================
  // Error
  // ==========================

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">

        <i className="fa-solid fa-circle-exclamation text-4xl text-red-500 mb-4"></i>

        <h2 className="text-xl font-semibold text-red-700">
          Failed to Load
        </h2>

        <p className="mt-2 text-red-600">
          {error}
        </p>

      </div>
    );
  }

  // ==========================
  // Empty State
  // ==========================

  if (experiences.length === 0) {
    return (
      <EmptyState
        title="No Interview Experiences Yet"
        description="Be the first student to share your interview experience for this company."
      />
    );
  }

  // ==========================
  // UI
  // ==========================

  return (
    <>
      <div className="space-y-6">
        {experiences.map((experience) => (
          <ExperienceCard
            key={experience._id}
            experience={experience}
          />
        ))}
      </div>

      {/* Pagination */}

      <div className="flex justify-center items-center gap-4 mt-10">

        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={!pagination.hasPreviousPage}
          className={`px-5 py-2 rounded-lg font-medium transition
            ${
              pagination.hasPreviousPage
                ? "bg-slate-800 text-white hover:bg-slate-900"
                : "bg-slate-200 text-slate-500 cursor-not-allowed"
            }`}
        >
          Previous
        </button>

        <span className="font-medium text-slate-700">
          Page {pagination.currentPage || 1} of{" "}
          {pagination.totalPages || 1}
        </span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={!pagination.hasNextPage}
          className={`px-5 py-2 rounded-lg font-medium transition
            ${
              pagination.hasNextPage
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-slate-200 text-slate-500 cursor-not-allowed"
            }`}
        >
          Next
        </button>

      </div>
    </>
  );
}

export default ExperienceList;