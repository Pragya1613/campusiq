import { useEffect, useState } from "react";
import { getCompanies } from "../../services/experienceService";
import CompanyCard from "./CompanyCard";
import LoadingSkeleton from "./LoadingSkeleton";
import EmptyState from "./EmptyState";

function CompanyGrid({ search, sort }) {
  // ==========================
  // States
  // ==========================

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================
  // Fetch Companies
  // ==========================

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getCompanies(search, sort);

        setCompanies(data || []);
      } catch (err) {
        console.error(err);

        setError(
          err.response?.data?.message ||
            "Something went wrong while fetching companies."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [search, sort]);

  // ==========================
  // Loading State
  // ==========================

  if (loading) {
    return <LoadingSkeleton />;
  }

  // ==========================
  // Error State
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

  if (companies.length === 0) {
    return (
      <EmptyState
        title="No Interview Experiences Found"
        description="Try searching another company or be the first one to share an interview experience."
      />
    );
  }

  // ==========================
  // Company Cards
  // ==========================

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {companies.map((company) => (
        <CompanyCard
          key={company.companyName}
          company={company}
        />
      ))}
    </div>
  );
}

export default CompanyGrid;