import { useState } from "react";
import toast from "react-hot-toast";

import { deleteComment } from "../../services/commentService";

function ReplyCard({ reply, onRefresh }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Delete this reply?")) return;

    try {
      setLoading(true);

      const data = await deleteComment(reply._id);

      toast.success(data.message);

      if (onRefresh) onRefresh();
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Failed to delete reply."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ml-12 mt-4 bg-slate-50 border border-slate-200 rounded-xl p-4">

      <div className="flex items-start justify-between">

        <div className="flex gap-3">

          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
            <i className="fa-solid fa-user text-blue-600 text-sm"></i>
          </div>

          <div>

            <h4 className="font-medium text-slate-800">
              {reply.student?.name || "Anonymous"}
            </h4>

            <p className="text-xs text-slate-500">
              {new Date(reply.createdAt).toLocaleDateString()}
            </p>

          </div>

        </div>


        {reply.isOwner && (
          <button
            onClick={handleDelete}
            disabled={loading}
            className="text-red-500 hover:text-red-600 transition"
            title="Delete Reply"
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        )}


      </div>

      <p className="mt-3 text-slate-700 whitespace-pre-line leading-7">
        {reply.text}
      </p>

    </div>
  );
}

export default ReplyCard;