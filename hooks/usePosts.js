import { useState, useEffect, useCallback } from 'react';
import { fetchPosts, fetchPost, createPost, likePost, incrementViewCount, reportPost, normalizePostData } from '@/utils/api';
import { formatTimeAgo } from '@/utils/time';
import { getLikedPosts, updateLikedPosts, handleAuthError } from '@/utils/auth';

export const usePosts = (params = {}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const paramsString = JSON.stringify(params);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchPosts(params);
      const normalized = data.map(post => normalizePostData(post, formatTimeAgo));
      setPosts(normalized);
    } catch (err) {
      setError('게시글을 불러오는데 실패했습니다.');
      console.error('게시글 불러오기 실패:', err);
    } finally {
      setLoading(false);
    }
  }, [paramsString]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return {
    posts,
    loading,
    error,
    refetch: loadPosts
  };
};

export const usePost = (postId) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [likeLoading, setLikeLoading] = useState(false);
  const [viewCountSent, setViewCountSent] = useState(false);

  const loadPost = useCallback(async () => {
    if (!postId) return;
    
    setLoading(true);
    setError('');
    try {
      const postData = await fetchPost(postId);
      const normalizedPost = {
        ...postData,
        time: postData.created_ago && postData.created_ago !== "string"
          ? postData.created_ago
          : formatTimeAgo(postData.created_at),
        comments: postData.comment_count || 0
      };
      
      setPost(normalizedPost);
      setLikeCount(postData.likes || 0);

      const likedPosts = getLikedPosts();
      setLiked(likedPosts.includes(parseInt(postId)));

      if (!viewCountSent) {
        try {
          await incrementViewCount(postId);
          setViewCountSent(true);
        } catch (viewError) {
          console.error('조회수 증가 실패:', viewError);
          if (viewError.response?.status === 401) {
            handleAuthError(viewError);
          }
        }
      }
    } catch (err) {
      setError('게시글을 불러오는데 실패했습니다.');
      console.error('게시글 불러오기 실패:', err);
    } finally {
      setLoading(false);
    }
  }, [postId, viewCountSent]);

  const handleLike = useCallback(async () => {
    if (likeLoading) return;

    try {
      setLikeLoading(true);
      setError('');

      await likePost(postId);
      
      const newLiked = !liked;
      setLiked(newLiked);
      setLikeCount(prev => newLiked ? prev + 1 : prev - 1);
      updateLikedPosts(postId, newLiked);

    } catch (err) {
      const errorMessage = handleAuthError(err);
      setError(errorMessage);
      
      setTimeout(() => {
        setError('');
      }, 5000);
    } finally {
      setLikeLoading(false);
    }
  }, [postId, liked, likeLoading]);

  const handleReport = useCallback(async () => {
    try {
      await reportPost(postId);
      alert('신고가 접수되었습니다.');
    } catch (err) {
      console.error('신고 실패:', err);
      alert('신고 처리 중 오류가 발생했습니다.');
    }
  }, [postId]);

  useEffect(() => {
    loadPost();
  }, [loadPost]);

  return {
    post,
    loading,
    error,
    liked,
    likeCount,
    likeLoading,
    handleLike,
    handleReport,
    refetch: loadPost
  };
};

export const useCreatePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const createNewPost = useCallback(async (postData) => {
    setLoading(true);
    setError('');
    try {
      const result = await createPost(postData);
      return result;
    } catch (err) {
      setError('게시글 작성에 실패했습니다.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    createPost: createNewPost,
    loading,
    error
  };
};