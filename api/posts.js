import { http, API_BASE_URL, createAuthHeaders } from './client';

export const normalizePostData = (post, formatTimeAgo) => {
  return {
    ...post,
    comments: typeof post.comment_count === 'number' ? post.comment_count : post.comments ?? 0,
    time:
      post.created_ago && post.created_ago !== 'string'
        ? post.created_ago
        : formatTimeAgo(post.created_at),
    views: typeof post.views === 'number' ? post.views : 0,
    likes: typeof post.likes === 'number' ? post.likes : 0,
    category: post.category || '기타',
  };
};

export const fetchPosts = async (params = {}) => {
  const { page = 1, sort = 'recent', category, searchQuery } = params;
  const requestParams = { page, sort };

  if (category && category !== 'all') {
    requestParams.category = category;
  }

  let url = `${API_BASE_URL}/posts`;
  if (searchQuery && searchQuery.trim() !== '') {
    url = `${API_BASE_URL}/posts/search`;
    requestParams.q = searchQuery.trim();
  }

  const response = await http.get(url, { params: requestParams });
  return response.data || [];
};

export const fetchPost = async (postId) => {
  const url = `${API_BASE_URL}/posts/${postId}`;
  const response = await http.get(url);
  return response.data;
};

export const createPost = async (postData) => {
  const url = `${API_BASE_URL}/posts`;
  const headers = { 'Content-Type': 'application/json' };
  const response = await http.post(url, postData, { headers });
  return response.data;
};

export const likePost = async (postId) => {
  const url = `${API_BASE_URL}/posts/${postId}/like`;
  const headers = createAuthHeaders();
  const response = await http.post(url, {}, { headers });
  return response.data;
};

export const incrementViewCount = async (postId) => {
  const url = `${API_BASE_URL}/posts/${postId}/view`;
  const headers = createAuthHeaders();
  const response = await http.post(url, {}, { headers });
  return response.data;
};

export const reportPost = async (postId) => {
  const url = `${API_BASE_URL}/posts/${postId}/report`;
  const response = await http.post(url);
  return response.data;
};