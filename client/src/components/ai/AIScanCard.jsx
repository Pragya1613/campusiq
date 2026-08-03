function AIScanCard({
  scan,
  serial,
  onView,
  onDelete,
}) {
  return (
    <div className="w-full bg-white border border-slate-200 rounded-3xl px-8 py-5 shadow-sm hover:shadow-md transition">

      <div className="grid lg:grid-cols-[1.35fr_1.05fr] grid-cols-1 gap-8 items-center">

        {/* Left Section */}

        <div>

          <div className="flex flex-wrap items-center gap-3">

            <h2 className="text-2xl font-semibold text-[#172554] leading-tight">

              Resume Analysis #{serial}

            </h2>

            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold whitespace-nowrap">

              AI Report

            </span>

          </div>

          <div className="mt-4 space-y-2.5">

            <p className="flex items-center gap-3 text-slate-700">

              <i className="fa-solid fa-user text-slate-500 w-4"></i>

              {scan.extractedProfile?.fullName || "Student"}

            </p>

            <p className="flex items-center gap-3 text-slate-700">

              <i className="fa-solid fa-file-pdf text-red-500 w-4"></i>

              {scan.resumeName || "Resume.pdf"}

            </p>

            <p className="flex items-center gap-3 text-sm text-slate-500">

              <i className="fa-regular fa-calendar w-4"></i>

              {new Date(scan.createdAt).toLocaleString()}

            </p>

          </div>

        </div>

        {/* Right Section */}

        <div className="flex flex-col w-full lg:max-w-[520px] lg:ml-auto">

          {/* Score Cards */}

          <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 w-full">

            <div className="border border-slate-200 rounded-2xl bg-slate-50 px-6 py-4 text-center">

              <p className="text-sm text-slate-500">

                Resume Score

              </p>

              <h3 className="text-4xl font-bold text-indigo-700 mt-1">

                {scan.resumeScore?.score ?? 0}

              </h3>

              <p className="text-sm text-slate-600 mt-1">

                {scan.resumeScore?.level}

              </p>

            </div>

            <div className="border border-slate-200 rounded-2xl bg-slate-50 px-6 py-4 text-center">

              <p className="text-sm text-slate-500">

                Placement Readiness

              </p>

              <h3 className="text-4xl font-bold text-green-600 mt-1">

                {scan.placementReadiness?.score ?? 0}

              </h3>

              <p className="text-sm text-slate-600 mt-1">

                {scan.placementReadiness?.level}

              </p>

            </div>

          </div>

          {/* Buttons */}

          <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 w-full mt-4">

            <button
              onClick={() => onView(scan._id)}
              className="h-11 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 transition text-sm font-medium"
            >

              <i className="fa-solid fa-eye mr-2"></i>

              Open Report

            </button>

            <button
              onClick={() => onDelete(scan._id)}
              className="h-11 rounded-xl bg-red-400 text-white hover:bg-red-500 transition text-sm font-medium"
            >

              <i className="fa-solid fa-trash mr-2"></i>

              Delete

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AIScanCard;