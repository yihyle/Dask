'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useComments } from '@/hooks';

export default function Comment({ onCommentCountChange, postId }) {
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');

  const { comments, loading, error, submitting, totalComments, addComment, addReply, deleteComment } = useComments(postId);

  if (onCommentCountChange && totalComments !== undefined) {
    onCommentCountChange(totalComments);
  }

  const handleAddComment = async () => {
    const success = await addComment(newComment);
    if (success) {
      setNewComment('');
    }
  };

  const handleAddReply = async (commentId) => {
    const success = await addReply(commentId, replyContent);
    if (success) {
      setReplyContent('');
      setReplyTo(null);
    }
  };

  if (loading) {
    return (
      <div className="w-full space-y-4 text-black dark:text-white">
        <div className="animate-pulse space-y-4">
          <div className="h-20 bg-gray-200 dark:bg-[#1E1E1E] rounded-lg"></div>
          <div className="h-32 bg-gray-200 dark:bg-[#1E1E1E] rounded-lg"></div>
          <div className="h-32 bg-gray-200 dark:bg-[#1E1E1E] rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4 text-black dark:text-white">
      {error && (
        <div className="w-full p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
        </div>
      )}

      <div className="w-full p-4 border border-gray-200 dark:border-[#2A2A2A] rounded-lg bg-white dark:bg-[#151515]">
        <textarea
          placeholder="댓글을 입력하세요..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && newComment.trim()) {
              e.preventDefault();
              handleAddComment();
            }
          }}
          className="w-full h-20 px-3 py-2 border border-gray-300 dark:border-[#2A2A2A] rounded-lg bg-white dark:bg-[#1E1E1E] text-black dark:text-white placeholder-black/50 dark:placeholder-white/50 focus:outline-none focus:border-[#05AA87] resize-none"
        />
        <div className="flex justify-between mt-3">
          <button
            onClick={handleAddComment}
            disabled={!newComment.trim() || submitting}
            className={`px-4 py-2 rounded-lg transition-colors ml-auto ${newComment.trim() ? 'bg-[#05AA87] text-white hover:bg-[#028B6E] font-bold' : 'bg-gray-300 text-gray-500'}`}
          >
            댓글 작성
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-white/60">
            아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="border border-gray-200 dark:border-[#2A2A2A] rounded-lg p-4 bg-white dark:bg-[#151515]">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-[#2A2A2A] flex items-center justify-center">
                  <Image src="/images/user.svg" alt="user" width={20} height={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-gray-900 dark:text-white">익명</span>
                    <span className="text-sm text-gray-500 dark:text-white/60">{comment.time}</span>
                  </div>
                  <p className="text-gray-800 dark:text-white/80 mb-3">{comment.content}</p>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setReplyTo(comment.id)} className="text-gray-600 dark:text-white/70 hover:text-[#05AA87] transition-colors">답글</button>
                    <button onClick={() => deleteComment(comment.id)} className="text-gray-600 dark:text-white/70 hover:text-red-500 transition-colors">삭제</button>
                  </div>
                </div>
              </div>

              {replyTo === comment.id && (
                <div className="ml-12 mt-4 p-3 border border-gray-200 dark:border-[#2A2A2A] rounded-lg bg-gray-50 dark:bg-[#1E1E1E]">
                  <textarea
                    placeholder="답글을 입력하세요..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey && replyContent.trim()) {
                        e.preventDefault();
                        handleAddReply(comment.id);
                      }
                    }}
                    className="w-full h-16 px-2 py-1 text-sm border border-gray-300 dark:border-[#2A2A2A] rounded bg-white dark:bg-[#151515] text-black dark:text-white focus:outline-none focus:border-[#05AA87] resize-none"
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <button onClick={() => setReplyTo(null)} className="px-3 py-1 text-sm text-gray-600 dark:text-white/70 hover:text-gray-800 dark:hover:text-white transition-colors">취소</button>
                    <button onClick={() => handleAddReply(comment.id)} disabled={!replyContent.trim() || submitting} className={`px-3 py-1 text-sm rounded transition-colors ${replyContent.trim() ? 'bg-[#05AA87] text-white hover:bg-[#028B6E]' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>답글 작성</button>
                  </div>
                </div>
              )}

              {comment.replies && comment.replies.length > 0 && (
                <div className="ml-12 mt-4 space-y-3">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="border-l-2 border-gray-200 pl-4 py-2">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-[#2A2A2A] flex items-center justify-center">
                          <Image src="/images/user.svg" alt="user" width={16} height={16} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-gray-900 dark:text-white text-sm">익명</span>
                            <span className="text-xs text-gray-500 dark:text-white/60">{reply.time}</span>
                          </div>
                          <p className="text-gray-800 dark:text-white/80 text-sm mb-2">{reply.content}</p>
                          <div className="flex items-center gap-3">
                            <button onClick={() => deleteComment(comment.id, reply.id)} className="text-gray-600 dark:text-white/70 hover:text-red-500 transition-colors text-sm">삭제</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}