import { useEffect, useState } from "react";

import CommentForm from "./CommentForm";
import CommentCard from "./CommentCard";
import EmptyState from "./EmptyState";
import LoadingSkeleton from "./LoadingSkeleton";

import { getComments } from "../../services/commentService";

function CommentSection({ experienceId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchComments = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getComments(experienceId);

      setComments(data);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Failed to load comments."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (experienceId) fetchComments();
  }, [experienceId]);

  return (
    <div className="mt-10">

      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        Comments
      </h2>

      <CommentForm
        experienceId={experienceId}
        onCommentAdded={fetchComments}
      />

      <div className="mt-8 space-y-5">

        {loading && <LoadingSkeleton />}

        {!loading && error && (
          <div className="text-center text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && comments.length === 0 && (
          <EmptyState
            title="No Comments Yet"
            description="Be the first one to start the discussion."
            icon="fa-regular fa-comments"
          />
        )}

        {!loading &&
          !error &&
          comments.map((comment) => (
            <CommentCard
              key={comment._id}
              comment={comment}
              onRefresh={fetchComments}
            />
          ))}

      </div>

    </div>
  );
}

export default CommentSection;