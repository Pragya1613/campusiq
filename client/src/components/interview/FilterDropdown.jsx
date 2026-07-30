function FilterDropdown({ sort, setSort }) {
  const sortOptions = [
    "Most Recent",
    "Most Upvoted",
    "Most Discussed",
  ];

  return (
    <div className="w-full md:w-64">
      <div className="relative">
        {/* Filter Icon */}
        <i className="fa-solid fa-filter absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full appearance-none rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-10 text-slate-700 shadow-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 cursor-pointer"
        >
          {sortOptions.map((option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>

        {/* Dropdown Arrow */}
        <i className="fa-solid fa-chevron-down pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
      </div>
    </div>
  );
}

export default FilterDropdown;