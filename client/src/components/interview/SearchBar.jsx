import { useEffect, useState } from "react";

function SearchBar({ search, setSearch }) {
  const [inputValue, setInputValue] = useState(search);

  // Sync when parent search changes
  useEffect(() => {
    setInputValue(search);
  }, [search]);

  // Debounce API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(inputValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, setSearch]);

  return (
    <div className="relative w-full">
      {/* Search Icon */}
      <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>

      {/* Input */}
      <input
        type="text"
        placeholder="Search company..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-slate-700 shadow-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />
    </div>
  );
}

export default SearchBar;