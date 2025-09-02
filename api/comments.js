import { http, API_BASE_URL, createAuthHeaders } from './client';

export const normalizeCommentData = (comment, formatTimeAgo) => {
  return {
    ...comment,
    time: comment.created_ago && comment.created_ago !== 'string' ? comment.created_ago : formatTimeAgo(comment.created_at),
    replies: comment.replies || [],
  };
};

export const fetchComments = async (postId) => {
  const res = await http.get(`${API_BASE_URL}/comments/post/${postId}`);
  return res.data;
};

export const createComment = async (postId, content) => {
  const res = await http.post(`${API_BASE_URL}/comments/post/${postId}`, { content: content.trim() }, { headers: createAuthHeaders() });
  return res.data;
};

export const createReply = async (commentId, content) => {
  const res = await http.post(`${API_BASE_URL}/comments/${commentId}/reply`, { content: content.trim() }, { headers: createAuthHeaders() });
  return res.data;
};


