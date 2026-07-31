import { Link } from "react-router-dom";

function ExperienceCard({ experience }) {
  const {
    _id,
    title,
    roleApplied,
    package: salaryPackage,
    anonymous,
    createdAt,
    upvoteCount,
    commentCount,
    student,
  } = experience;

  const studentName = anonymous
    ? "Anonymous"
    : student?.name || "Unknown Student";

  const profilePicture = anonymous
    ? null
    : student?.profilePicture;

  const formattedDate = new Date(createdAt).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition p-6">

      {/* Header */}

      <div className="flex justify-between items-start">

        <div className="flex items-center gap-3">

          {profilePicture ? (
            <img
              src={profilePicture}
              alt={studentName}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <i className="fa-solid fa-user text-blue-600"></i>
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold text-slate-800">
              {studentName}
            </h3>

            <p className="text-sm text-slate-500">
              {formattedDate}
            </p>
          </div>

        </div>

        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          {roleApplied}
        </span>

      </div>

      {/* Title */}

      <h2 className="text-2xl font-bold text-slate-800 mt-6">
        {title}
      </h2>

      {/* Package */}

      {salaryPackage && (
        <div className="mt-3 flex items-center gap-2 text-green-700">

          <i className="fa-solid fa-indian-rupee-sign"></i>

          <span className="font-medium">
            {salaryPackage}
          </span>

        </div>
      )}

      {/* Stats */}

      <div className="flex gap-6 mt-6 text-slate-600">

        <div className="flex items-center gap-2">

          <i className="fa-solid fa-thumbs-up text-blue-600"></i>

          <span>{upvoteCount}</span>

        </div>

        <div className="flex items-center gap-2">

          <i className="fa-solid fa-comments text-green-600"></i>

          <span>{commentCount}</span>

        </div>

      </div>

      {/* Button */}

      <div className="mt-6">

        <Link
          to={`/experience/${_id}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#172554] text-white font-medium hover:bg-[#0f1d46] transition"
        >
          Read More

          <i className="fa-solid fa-arrow-right"></i>

        </Link>

      </div>

    </div>
  );
}

export default ExperienceCard;