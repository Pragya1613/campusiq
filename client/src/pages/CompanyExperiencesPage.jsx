import { useState } from "react";
import { useParams, Link } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import FilterDropdown from "../components/interview/FilterDropdown";
import ExperienceList from "../components/interview/ExperienceList";

function CompanyExperiencesPage() {
  // ==========================
  // Hooks
  // ==========================

  const { companyName } = useParams();

  const [sort, setSort] = useState("Most Recent");

  return (
    <PublicLayout>
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 py-10">

          {/* Breadcrumb */}

          <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">

            <Link
              to="/experiences"
              className="hover:text-blue-600 transition"
            >
              Interview Experiences
            </Link>

            <i className="fa-solid fa-chevron-right text-xs"></i>

            <span className="font-medium text-slate-700">
              {decodeURIComponent(companyName)}
            </span>

          </div>

          {/* Heading */}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

            <div>

              <h1 className="text-4xl font-bold text-slate-800 flex items-center gap-3">

                <i className="fa-solid fa-building text-blue-600"></i>

                {decodeURIComponent(companyName)}

              </h1>

              <p className="mt-2 text-slate-600 text-lg">
                Browse interview experiences shared by students.
              </p>

            </div>

            <div className="flex gap-3">

              <FilterDropdown
                sort={sort}
                setSort={setSort}
              />

              <Link
                to="/share-experience"
                className="px-5 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition flex items-center gap-2"
              >
                <i className="fa-solid fa-plus"></i>

                Share Experience
              </Link>

            </div>

          </div>

          {/* Experience List */}

          <ExperienceList
            companyName={decodeURIComponent(companyName)}
            sort={sort}
          />

        </div>
      </div>
    </PublicLayout>
  );
}

export default CompanyExperiencesPage;