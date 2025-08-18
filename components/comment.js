'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Comment({ onCommentCountChange }) {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: '익명1',
      content: '정말 유용한 정보네요! 감사합니다.',
      time: '2시간 전',
      likes: 3,
      replies: [
        {
          id: 11,
          author: '익명2',
          content: '저도 도움이 많이 되었어요',
          time: '1시간 전',
          likes: 1
        }
      ]
    },
    {
      id: 2,
      author: '익명3',
      content: '이런 내용을 찾고 있었는데 정말 좋네요.',
      time: '30분 전',
      likes: 0,
      replies: []
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [replyAuthor, setReplyAuthor] = useState('');

  // 댓글 수 계산 및 부모 컴포넌트에 전달
  useEffect(() => {
    if (onCommentCountChange) {
      const totalComments = comments.reduce((total, comment) =>
        total + 1 + comment.replies.length, 0
      );
      onCommentCountChange(totalComments);
    }
  }, [comments, onCommentCountChange]);

  const handleAddComment = () => {
    if (!newComment.trim() || !newAuthor.trim()) return;

    const comment = {
      id: Date.now(),
      author: newAuthor,
      content: newComment,
      time: '방금 전',
      likes: 0,
      replies: []
    };

    setComments([...comments, comment]);
    setNewComment('');
    setNewAuthor('');
  };

  const handleAddReply = (commentId) => {
    if (!replyContent.trim() || !replyAuthor.trim()) return;

    const reply = {
      id: Date.now(),
      author: replyAuthor,
      content: replyContent,
      time: '방금 전',
      likes: 0
    };

    setComments(comments.map(comment =>
      comment.id === commentId
        ? { ...comment, replies: [...comment.replies, reply] }
        : comment
    ));

    setReplyContent('');
    setReplyAuthor('');
    setReplyTo(null);
  };

  const handleLike = (commentId, replyId = null) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        if (replyId) {
          // 대댓글 좋아요
          return {
            ...comment,
            replies: comment.replies.map(reply =>
              reply.id === replyId ? { ...reply, likes: reply.likes + 1 } : reply
            )
          };
        } else {
          // 댓글 좋아요
          return { ...comment, likes: comment.likes + 1 };
        }
      }
      return comment;
    }));
  };

  const handleDelete = (commentId, replyId = null) => {
    if (replyId) {
      // 대댓글 삭제
      setComments(comments.map(comment =>
        comment.id === commentId
          ? { ...comment, replies: comment.replies.filter(reply => reply.id !== replyId) }
          : comment
      ));
    } else {
      // 댓글 삭제
      setComments(comments.filter(comment => comment.id !== commentId));
    }
  };

  return (
    <div className="w-full space-y-4 text-black dark:text-white">
      {/* 댓글 작성 폼 */}
      <div className="w-full p-4 border border-gray-200 dark:border-[#2A2A2A] rounded-lg bg-white dark:bg-[#151515]">
        <textarea placeholder="댓글을 입력하세요... (Enter로 작성)" value={newComment} onChange={(e) => setNewComment(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey && newComment.trim() && newAuthor.trim()) { e.preventDefault(); handleAddComment(); } }} className="w-full h-20 px-3 py-2 border border-gray-300 dark:border-[#2A2A2A] rounded-lg bg-white dark:bg-[#1E1E1E] text-black dark:text-white placeholder-black/50 dark:placeholder-white/50 focus:outline-none focus:border-[#05AA87] resize-none" />
        <div className="flex justify-between mt-3">
          <input type="text" placeholder="닉네임" maxLength={6} value={newAuthor} onChange={(e) => setNewAuthor(e.target.value)} className="w-32 px-3 py-2 border border-gray-300 dark:border-[#2A2A2A] rounded-lg bg-white dark:bg-[#1E1E1E] text-black dark:text-white placeholder-black/50 dark:placeholder-white/50 focus:outline-none focus:border-[#05AA87]" />
          <button
            onClick={handleAddComment}
            disabled={!newComment.trim() || !newAuthor.trim()}
            className={`px-4 py-2 rounded-lg transition-colors ${newComment.trim() && newAuthor.trim()
                ? 'bg-[#05AA87] text-white hover:bg-[#028B6E] font-bold'
                : 'bg-gray-300 text-gray-500'
              }`}
          >
            댓글 작성
          </button>
        </div>
      </div>

      {/* 댓글 목록 */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="border border-gray-200 dark:border-[#2A2A2A] rounded-lg p-4 bg-white dark:bg-[#151515]">
            {/* 댓글 */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-[#2A2A2A] flex items-center justify-center">
                <Image src="/images/user.svg" alt="user" width={20} height={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium text-gray-900 dark:text-white">{comment.author}</span>
                  <span className="text-sm text-gray-500 dark:text-white/60">{comment.time}</span>
                </div>
                <p className="text-gray-800 dark:text-white/80 mb-3">{comment.content}</p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleLike(comment.id)}
                    className="flex items-center gap-1 text-gray-600 dark:text-white/70 hover:text-red-500 transition-colors"
                  >
                    <Image src="/images/like.svg" alt="like" width={16} height={16} />
                    <span>{comment.likes}</span>
                  </button>
                  <button
                    onClick={() => setReplyTo(comment.id)}
                    className="text-gray-600 dark:text-white/70 hover:text-[#05AA87] transition-colors"
                  >
                    답글
                  </button>
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="text-gray-600 dark:text-white/70 hover:text-red-500 transition-colors"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>

            {/* 대댓글 작성 폼 */}
            {replyTo === comment.id && (
              <div className="ml-12 mt-4 p-3 border border-gray-200 dark:border-[#2A2A2A] rounded-lg bg-gray-50 dark:bg-[#1E1E1E]">
                <div className="flex gap-2 mb-2">
                  <input type="text" placeholder="익명" maxLength={6} value={replyAuthor} onChange={(e) => setReplyAuthor(e.target.value)} className="w-24 px-2 py-1 text-sm border border-gray-300 dark:border-[#2A2A2A] rounded bg-white dark:bg-[#151515] text-black dark:text-white focus:outline-none focus:border-[#05AA87]" />
                </div>
                <textarea placeholder="답글을 입력하세요... (Enter로 작성)" value={replyContent} onChange={(e) => setReplyContent(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey && replyContent.trim() && replyAuthor.trim()) { e.preventDefault(); handleAddReply(comment.id); } }} className="w-full h-16 px-2 py-1 text-sm border border-gray-300 dark:border-[#2A2A2A] rounded bg-white dark:bg-[#151515] text-black dark:text-white focus:outline-none focus:border-[#05AA87] resize-none" />
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={() => setReplyTo(null)}
                    className="px-3 py-1 text-sm text-gray-600 dark:text-white/70 hover:text-gray-800 dark:hover:text-white transition-colors"
                  >
                    취소
                  </button>
                  <button
                    onClick={() => handleAddReply(comment.id)}
                    disabled={!replyContent.trim() || !replyAuthor.trim()}
                    className={`px-3 py-1 text-sm rounded transition-colors ${replyContent.trim() && replyAuthor.trim()
                        ? 'bg-[#05AA87] text-white hover:bg-[#028B6E]'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                  >
                    답글 작성
                  </button>
                </div>
              </div>
            )}

            {/* 대댓글 목록 */}
            {comment.replies.length > 0 && (
              <div className="ml-12 mt-4 space-y-3">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="border-l-2 border-gray-200 pl-4 py-2">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-[#2A2A2A] flex items-center justify-center">
                        <Image src="/images/user.svg" alt="user" width={16} height={16} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900 dark:text-white text-sm">{reply.author}</span>
                          <span className="text-xs text-gray-500 dark:text-white/60">{reply.time}</span>
                        </div>
                        <p className="text-gray-800 dark:text-white/80 text-sm mb-2">{reply.content}</p>
                        <div className="flex items-center gap-3">
                          <button onClick={() => handleLike(comment.id, reply.id)} className="flex items-center gap-1 text-gray-600 dark:text-white/70 hover:text-red-500 transition-colors text-sm">
                            <Image src="/images/like.svg" alt="like" width={14} height={14} />
                            <span>{reply.likes}</span>
                          </button>
                          <button onClick={() => handleDelete(comment.id, reply.id)} className="text-gray-600 dark:text-white/70 hover:text-red-500 transition-colors text-sm">
                            삭제
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}