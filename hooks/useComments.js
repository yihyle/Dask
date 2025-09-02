import { useState, useEffect, useCallback } from 'react';
import { fetchComments, createComment, createReply, normalizeCommentData } from '@/utils/api';
import { formatTimeAgo } from '@/utils/time';
import { handleAuthError } from '@/utils/auth';

export const useComments = (postId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadComments = useCallback(async () => {
    if (!postId) return;
    
    setLoading(true);
    setError('');
    try {
      const data = await fetchComments(postId);
      const normalized = data.map(comment => normalizeCommentData(comment, formatTimeAgo));
      setComments(normalized);
    } catch (err) {
      setError('댓글을 불러오는데 실패했습니다.');
      console.error('댓글 불러오기 실패:', err);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  const addComment = useCallback(async (content) => {
    if (!content.trim() || content.length > 1000 || submitting) return;

    try {
      setSubmitting(true);
      setError('');

      const newCommentData = await createComment(postId, content);
      const normalizedComment = {
        ...newCommentData,
        id: newCommentData.id || Date.now(),
        time: '방금 전',
        replies: []
      };

      setComments(prev => [...prev, normalizedComment]);
      return true;
    } catch (err) {
      const errorMessage = handleAuthError(err);
      setError(errorMessage);
      return false;
    } finally {
      setSubmitting(false);
    }
  }, [postId, submitting]);

  const addReply = useCallback(async (commentId, content) => {
    if (!content.trim() || content.length > 500 || submitting) return;

    try {
      setSubmitting(true);
      setError('');

      const newReplyData = await createReply(commentId, content);
      const normalizedReply = {
        ...newReplyData,
        id: newReplyData.id || Date.now(),
        time: '방금 전'
      };

      setComments(prev =>
        prev.map(comment =>
          comment.id === commentId
            ? { ...comment, replies: [...(comment.replies || []), normalizedReply] }
            : comment
        )
      );
      return true;
    } catch (err) {
      const errorMessage = handleAuthError(err);
      setError(errorMessage);
      return false;
    } finally {
      setSubmitting(false);
    }
  }, [submitting]);

  const deleteComment = useCallback((commentId, replyId = null) => {
    setComments(prev => {
      if (replyId) {
        return prev.map(comment =>
          comment.id === commentId
            ? { ...comment, replies: comment.replies.filter(reply => reply.id !== replyId) }
            : comment
        );
      } else {
        return prev.filter(comment => comment.id !== commentId);
      }
    });
  }, []);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  // 댓글 수 계산
  const totalComments = comments.reduce(
    (total, comment) => total + 1 + comment.replies.length,
    0
  );

  return {
    comments,
    loading,
    error,
    submitting,
    totalComments,
    addComment,
    addReply,
    deleteComment,
    refetch: loadComments
  };
};