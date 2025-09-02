import { http, API_BASE_URL, createAuthHeaders } from './client';

export const normalizePostData = (post, formatTimeAgo) => {
  return {
    ...post,
    comments: typeof post.comment_count === 'number' ? post.comment_count : post.comments ?? 0,
    time: post.created_ago && post.created_ago !== 'string' ? post.created_ago : formatTimeAgo(post.created_at),
    views: typeof post.views === 'number' ? post.views : 0,
    likes: typeof post.likes === 'number' ? post.likes : 0,
    category: post.category || '기타',
  };
};

export const fetchPosts = async (params = {}) => {
  const { page = 1, sort = 'recent', category, searchQuery } = params;
  const requestParams = { page, sort };
  if (category && category !== 'all') requestParams.category = category;

  let url = `${API_BASE_URL}/posts`;
  if (searchQuery && searchQuery.trim() !== '') {
    url = `${API_BASE_URL}/posts/search`;
    requestParams.q = searchQuery.trim();
  }

  const res = await http.get(url, { params: requestParams });
  return res.data || [];
};

export const fetchPost = async (postId) => {
  const res = await http.get(`${API_BASE_URL}/posts/${postId}`);
  return res.data;
};

export const createPost = async (postData) => {
  const res = await http.post(`${API_BASE_URL}/posts`, postData, { headers: { 'Content-Type': 'application/json' } });
  return res.data;
};

export const likePost = async (postId) => {
  const res = await http.post(`${API_BASE_URL}/posts/${postId}/like`, {}, { headers: createAuthHeaders() });
  return res.data;
};

export const incrementViewCount = async (postId) => {
  const res = await http.post(`${API_BASE_URL}/posts/${postId}/view`, {}, { headers: createAuthHeaders() });
  return res.data;
};

export const reportPost = async (postId) => {
  const res = await http.post(`${API_BASE_URL}/posts/${postId}/report`);
  return res.data;
};


