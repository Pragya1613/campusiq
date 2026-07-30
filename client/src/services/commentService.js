import api from "./api";

/*
==========================================
Add Comment
POST /api/interview-comments
==========================================
*/

export const addComment = async (commentData) => {
  const response = await api.post("/interview-comments", commentData);
  return response.data;
};

/*
==========================================
Get Comments
GET /api/interview-comments/:experienceId
==========================================
*/

export const getComments = async (experienceId) => {
  const response = await api.get(`/interview-comments/${experienceId}`);
  return response.data.comments;
};

/*
==========================================
Reply To Comment
POST /api/interview-comments/:commentId/reply
==========================================
*/

export const replyToComment = async (commentId, text) => {
  const response = await api.post(
    `/interview-comments/${commentId}/reply`,
    { text }
  );

  return response.data;
};

/*
==========================================
Get Replies
GET /api/interview-comments/replies/:commentId
==========================================
*/

export const getReplies = async (commentId) => {
  const response = await api.get(
    `/interview-comments/replies/${commentId}`
  );

  return response.data.replies;
};

/*
==========================================
Toggle Like
POST /api/interview-comments/:commentId/like
==========================================
*/

export const toggleCommentLike = async (commentId) => {
  const response = await api.post(
    `/interview-comments/${commentId}/like`
  );

  return response.data;
};

/*
==========================================
Delete Comment
DELETE /api/interview-comments/:commentId
==========================================
*/

export const deleteComment = async (commentId) => {
  const response = await api.delete(
    `/interview-comments/${commentId}`
  );

  return response.data;
};