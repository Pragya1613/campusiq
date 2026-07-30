import { Link } from "react-router-dom";

function CompanyCard({ company }) {
  const {
    companyName,
    experienceCount,
    totalUpvotes,
    totalComments,
    latestExperience,
  } = company;

  const formattedDate = latestExperience
    ? new Date(latestExperience).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "No experiences yet";

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between">

      {/* Company Name */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
            <i className="fa-solid fa-building text-blue-600 text-xl"></i>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {companyName}
            </h2>

            <p className="text-sm text-slate-500">
              {experienceCount} Experience
              {experienceCount !== 1 && "s"}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-5">

          <div className="rounded-xl bg-slate-50 p-3">
            <div className="flex items-center gap-2 text-blue-600">
              <i className="fa-solid fa-thumbs-up"></i>

              <span className="font-semibold">
                {totalUpvotes}
              </span>
            </div>

            <p className="text-xs text-slate-500 mt-1">
              Total Upvotes
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-3">
            <div className="flex items-center gap-2 text-green-600">
              <i className="fa-solid fa-comments"></i>

              <span className="font-semibold">
                {totalComments}
              </span>
            </div>

            <p className="text-xs text-slate-500 mt-1">
              Comments
            </p>
          </div>

        </div>

        {/* Latest */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <i className="fa-regular fa-clock"></i>

          <span>
            Latest: {formattedDate}
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">

        <Link
          to={`/experiences/${encodeURIComponent(companyName)}`}
          className="flex-1 text-center rounded-lg bg-blue-600 text-white py-2.5 font-medium hover:bg-blue-700 transition"
        >
          View Experiences
        </Link>

        <Link
          to="/share-experience"
          className="flex items-center justify-center h-11 w-11 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 transition"
          title="Share Experience"
        >
          <i className="fa-solid fa-plus"></i>
        </Link>

      </div>

    </div>
  );
}

export default CompanyCard;