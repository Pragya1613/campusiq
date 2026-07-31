import { useState } from "react";
import toast from "react-hot-toast";

import { addComment } from "../../services/commentService";

function CommentForm({ experienceId, onCommentAdded }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      return toast.error("Comment cannot be empty.");
    }

    try {
      setLoading(true);

      const response = await addComment({
        experienceId,
        text,
      });

      toast.success(response.message);

      setText("");

      if (onCommentAdded) {
        onCommentAdded();
      }
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Failed to add comment."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">
        Add a Comment
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your thoughts..."
          className="w-full border border-slate-300 rounded-lg px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#323c62] hover:bg-[#0f1d46] disabled:bg-[#152b6e] text-white px-6 py-2.5 rounded-lg transition"
          >
            {loading ? "Posting..." : "Post Comment"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CommentForm;