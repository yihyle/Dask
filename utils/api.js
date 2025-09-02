import axios from 'axios';
import { API_BASE_URL } from '@/constants/api';
import { getAccessToken, handleAuthError } from './auth';

export const createAuthHeaders = () => {
  const token = getAccessToken();
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

export const normalizePostData = (post, formatTimeAgo) => {
  return {
    ...post,
    comments: typeof post.comment_count === "number" 
      ? post.comment_count 
      : post.comments ?? 0,
    time: post.created_ago && post.created_ago !== "string"
      ? post.created_ago
      : formatTimeAgo(post.created_at),
    views: typeof post.views === "number" ? post.views : 0,
    likes: typeof post.likes === "number" ? post.likes : 0,
    category: post.category || "기타",
  };
};

export const normalizeCommentData = (comment, formatTimeAgo) => {
  return {
    ...comment,
    time: comment.created_ago && comment.created_ago !== "string"
      ? comment.created_ago
      : formatTimeAgo(comment.created_at),
    replies: comment.replies || []
  };
};

export const fetchPosts = async (params = {}) => {
  try {
    const { page = 1, sort = "recent", category, searchQuery } = params;
    
    const requestParams = { page, sort };
    if (category && category !== "all") {
      requestParams.category = category;
    }

    let url = `${API_BASE_URL}/posts`;
    if (searchQuery && searchQuery.trim() !== "") {
      url = `${API_BASE_URL}/posts/search`;
      requestParams.q = searchQuery.trim();
    }

    const res = await axios.get(url, { params: requestParams });
    return res.data || [];
  } catch (error) {
    console.error("게시글 불러오기 실패:", error);
    throw error;
  }
};

export const fetchPost = async (postId) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/posts/${postId}`);
    return res.data;
  } catch (error) {
    console.error("게시글 불러오기 실패:", error);
    throw error;
  }
};

export const createPost = async (postData) => {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/posts`,
      postData,
      { headers: { "Content-Type": "application/json" } }
    );
    return res.data;
  } catch (error) {
    console.error("게시글 작성 실패:", error);
    throw error;
  }
};

export const likePost = async (postId) => {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/posts/${postId}/like`,
      {},
      { headers: createAuthHeaders() }
    );
    return res.data;
  } catch (error) {
    console.error("좋아요 실패:", error);
    throw error;
  }
};

export const incrementViewCount = async (postId) => {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/posts/${postId}/view`,
      {},
      { headers: createAuthHeaders() }
    );
    return res.data;
  } catch (error) {
    console.error("조회수 증가 실패:", error);
    throw error;
  }
};

export const reportPost = async (postId) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/posts/${postId}/report`);
    return res.data;
  } catch (error) {
    console.error("신고 실패:", error);
    throw error;
  }
};

export const fetchComments = async (postId) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/comments/post/${postId}`);
    return res.data;
  } catch (error) {
    console.error("댓글 불러오기 실패:", error);
    throw error;
  }
};

export const createComment = async (postId, content) => {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/comments/post/${postId}`,
      { content: content.trim() },
      { headers: createAuthHeaders() }
    );
    return res.data;
  } catch (error) {
    console.error("댓글 작성 실패:", error);
    throw error;
  }
};

export const createReply = async (commentId, content) => {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/comments/${commentId}/reply`,
      { content: content.trim() },
      { headers: createAuthHeaders() }
    );
    return res.data;
  } catch (error) {
    console.error("답글 작성 실패:", error);
    throw error;
  }
};

export const login = async (studentId, password) => {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/auth/login`,
      { student_id: studentId, password },
      { headers: { "Content-Type": "application/json" } }
    );
    return res.data;
  } catch (error) {
    console.error("로그인 실패:", error);
    throw error;
  }
};

export const changePassword = async (currentPassword, newPassword, confirmPassword) => {
  try {
    const res = await axios.put(
      `${API_BASE_URL}/auth/password`,
      {
        current_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      },
      { headers: createAuthHeaders() }
    );
    return res.data;
  } catch (error) {
    console.error("비밀번호 변경 실패:", error);
    throw error;
  }
};

