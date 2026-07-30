import { useState } from "react";
import toast from "react-hot-toast";

import { replyToComment } from "../../services/commentService";

function ReplyForm({ commentId, onReplyAdded, onCancel }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      return toast.error("Reply cannot be empty.");
    }

    try {
      setLoading(true);

      const response = await replyToComment(commentId, text);

      toast.success(response.message);

      setText("");

      if (onReplyAdded) onReplyAdded();

      if (onCancel) onCancel();
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Failed to post reply."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3">

      <textarea
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your reply..."
        className="w-full border border-slate-300 rounded-lg px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex justify-end gap-3">

        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2 rounded-lg border border-slate-300 hover:bg-slate-100 transition"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400 transition"
        >
          {loading ? "Posting..." : "Post Reply"}
        </button>

      </div>

    </form>
  );
}

export default ReplyForm;