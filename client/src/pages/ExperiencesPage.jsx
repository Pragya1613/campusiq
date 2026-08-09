import { useState } from "react";

import PublicLayout from "../layouts/PublicLayout";

import SearchBar from "../components/interview/SearchBar";
import FilterDropdown from "../components/interview/FilterDropdown";
import CompanyGrid from "../components/interview/CompanyGrid";

function ExperiencesPage() {
  // ==========================
  // States
  // ==========================

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Most Recent");

  return (
    <PublicLayout>
      <div className="min-h-screen bg-[#f8fafc] px-5 sm:px-7 lg:px-10 xl:px-12 py-10">

        <div className="max-w-7xl mx-auto">

          {/* ==========================
              Page Header
          ========================== */}
          <div className="mb-8">

            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-orange-500">
              Student Insights
            </p>

            <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-[#172554]">
              Interview Experiences
            </h1>

            <p className="mt-3 max-w-3xl text-base sm:text-lg leading-7 text-slate-500">
              Learn from real interview experiences shared by students and
              prepare smarter for your dream company.
            </p>

          </div>

          {/* ==========================
              Search + Filter
          ========================== */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 mb-8">

            <div className="flex flex-col md:flex-row gap-3">

              {/* Search */}
              <div className="flex-1">
                <SearchBar
                  search={search}
                  setSearch={setSearch}
                />
              </div>

              {/* Sort / Filter */}
              <div className="w-full md:w-60">
                <FilterDropdown
                  sort={sort}
                  setSort={setSort}
                />
              </div>

            </div>

          </div>

          {/* ==========================
              Companies
          ========================== */}
          <div>
            <CompanyGrid
              search={search}
              sort={sort}
            />
          </div>

        </div>
      </div>
    </PublicLayout>
  );
}

export default ExperiencesPage;