function LoadingSkeleton() {
  return (
    <div className="grid gap-6">

      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="bg-white border border-slate-200 rounded-2xl p-6 animate-pulse"
        >
          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-full bg-slate-200"></div>

            <div className="flex-1">

              <div className="h-4 bg-slate-200 rounded w-40 mb-2"></div>

              <div className="h-3 bg-slate-200 rounded w-28"></div>

            </div>

          </div>

          <div className="h-6 bg-slate-200 rounded w-60 mt-6"></div>

          <div className="h-4 bg-slate-200 rounded w-40 mt-4"></div>

          <div className="flex gap-6 mt-6">

            <div className="h-4 w-16 bg-slate-200 rounded"></div>

            <div className="h-4 w-16 bg-slate-200 rounded"></div>

          </div>

          <div className="h-10 w-36 bg-slate-200 rounded-xl mt-6"></div>

        </div>
      ))}

    </div>
  );
}

export default LoadingSkeleton;