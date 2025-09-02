import { http, API_BASE_URL, createAuthHeaders } from './client';

export const normalizeCommentData = (comment, formatTimeAgo) => {
  return {
    ...comment,
    time:
      comment.created_ago && comment.created_ago !== 'string'
        ? comment.created_ago
        : formatTimeAgo(comment.created_at),
    replies: comment.replies || [],
  };
};

export const fetchComments = async (postId) => {
  const url = `${API_BASE_URL}/comments/post/${postId}`;
  const response = await http.get(url);
  return response.data;
};

export const createComment = async (postId, content) => {
  const url = `${API_BASE_URL}/comments/post/${postId}`;
  const payload = { content: content.trim() };
  const headers = createAuthHeaders();

  const response = await http.post(url, payload, { headers });
  return response.data;
};

export const createReply = async (commentId, content) => {
  const url = `${API_BASE_URL}/comments/${commentId}/reply`;
  const payload = { content: content.trim() };
  const headers = createAuthHeaders();

  const response = await http.post(url, payload, { headers });
  return response.data;
};
