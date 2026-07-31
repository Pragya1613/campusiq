import { useState } from "react";
import toast from "react-hot-toast";

import {
  deleteComment,
  getReplies,
  toggleCommentLike,
} from "../../services/commentService";

import ReplyCard from "./ReplyCard";
import ReplyForm from "./ReplyForm";

function CommentCard({ comment, onRefresh }) {
  const [likeCount, setLikeCount] = useState(comment.likeCount || 0);
  const [liked, setLiked] = useState(comment.liked || false);
  const [loading, setLoading] = useState(false);

  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [replyLoading, setReplyLoading] = useState(false);
  const [replies, setReplies] = useState([]);

  const handleLike = async () => {
    try {
      const data = await toggleCommentLike(comment._id);

      setLikeCount(data.likeCount);
      setLiked(data.liked);
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Failed to like comment."
      );
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this comment?")) return;

    try {
      setLoading(true);

      const data = await deleteComment(comment._id);

      toast.success(data.message);

      if (onRefresh) onRefresh();
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Failed to delete comment."
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchReplies = async () => {
    try {
      setReplyLoading(true);

      const data = await getReplies(comment._id);

      setReplies(data);
      setShowReplies(true);
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Failed to load replies."
      );
    } finally {
      setReplyLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">

      <div className="flex items-start justify-between">

        <div className="flex gap-3">

          <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center">
            <i className="fa-solid fa-user text-blue-600"></i>
          </div>

          <div>

            <h4 className="font-semibold text-slate-800">
              {comment.student?.name || "Anonymous"}
            </h4>

            <p className="text-xs text-slate-500">
              {new Date(comment.createdAt).toLocaleDateString()}
            </p>

          </div>

        </div>

       {comment.isOwner && (
        <button
          onClick={handleDelete}
          disabled={loading}
          className="text-red-500 hover:text-red-600 transition"
          title="Delete Comment"
        >
          <i className="fa-solid fa-trash"></i>
        </button>
       )}
      </div>

      <p className="mt-4 text-slate-700 leading-7 whitespace-pre-line">
        {comment.text}
      </p>

      <div className="flex flex-wrap items-center gap-6 mt-5">

        <button
          onClick={handleLike}
          className={`flex items-center gap-2 transition ${
            liked
              ? "text-blue-600"
              : "text-slate-600 hover:text-blue-600"
          }`}
        >
          <i
            className={`fa-${
              liked ? "solid" : "regular"
            } fa-thumbs-up`}
          ></i>

          <span>{likeCount}</span>
        </button>

        <button
          onClick={() =>
            setShowReplyForm((prev) => !prev)
          }
          className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition"
        >
          <i className="fa-regular fa-comment"></i>

          Reply
        </button>


        {comment.replyCount > 0 && (
          <button
            onClick={() => {
              if (showReplies) {
                setShowReplies(false);
              } else {
                fetchReplies();
              }
            }}
            className="text-[#050a1a] hover:underline"
          >
            {showReplies
              ? "Hide Replies"
              : `View Replies (${comment.replyCount})`}
          </button>
        )}


      </div>

      {showReplyForm && (
        <ReplyForm
          commentId={comment._id}
          onReplyAdded={() => {
            fetchReplies();
            if (onRefresh) onRefresh();
          }}
          onCancel={() => setShowReplyForm(false)}
        />
      )}

      {replyLoading && (
        <p className="mt-4 text-sm text-slate-500">
          Loading replies...
        </p>
      )}

      {showReplies && replies.length > 0 && (
        <div className="mt-5 space-y-4">
          {replies.map((reply) => (
            <ReplyCard
              key={reply._id}
              reply={reply}
              onRefresh={fetchReplies}
            />
          ))}
        </div>
      )}

      {showReplies &&
        !replyLoading &&
        replies.length === 0 && (
          <p className="mt-4 ml-12 text-sm text-slate-500">
            No replies yet.
          </p>
        )}

    </div>
  );
}

export default CommentCard;