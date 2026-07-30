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
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 py-10">
          {/* Heading */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-slate-800">
              Interview Experiences
            </h1>

            <p className="mt-3 text-lg text-slate-600">
              Learn from real interview experiences shared by students and
              prepare smarter for your dream company.
            </p>
          </div>

          {/* Search + Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <SearchBar
                search={search}
                setSearch={setSearch}
              />
            </div>

            <FilterDropdown
              sort={sort}
              setSort={setSort}
            />
          </div>

          {/* Companies */}
          <CompanyGrid
            search={search}
            sort={sort}
          />
        </div>
      </div>
    </PublicLayout>
  );
}

export default ExperiencesPage;