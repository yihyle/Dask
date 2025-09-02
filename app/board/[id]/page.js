'use client';

import { useParams, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Comment from '@/components/comment';
import { usePost } from '@/hooks';

export default function BoardDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const { post, loading, error, liked, likeCount, likeLoading, handleLike, handleReport } = usePost(id);

  const handleCommentCountChange = useCallback((count) => {}, []);

  if (loading || !post) {
    return (
      <div className="w-full bg-[#F5F5F5] dark:bg-[#0B0B0B] min-h-screen center">
        <div className="w-[850px] h-[655px] rounded-[20px] bg-white dark:bg-[#151515] dark:text-white shadow-lg mt-11 p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-6 w-24 rounded bg-gray-200 dark:bg-[#1E1E1E]" />
            <div className="h-8 w-3/4 rounded bg-gray-200 dark:bg-[#1E1E1E]" />
            <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-[#1E1E1E]" />
            <div className="h-4 w-4/6 rounded bg-gray-200 dark:bg-[#1E1E1E]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-[#F5F5F5] dark:bg-[#0B0B0B]">
      <div className="mt-[120px] flex h-auto w-[850px] flex-col justify-center rounded-[20px] border border-transparent bg-white p-8 shadow-lg dark:border-white/10 dark:bg-[#151515] dark:text-white">
        <Link href="/board" passHref>
          <div className="h-[22px] w-full cursor-pointer">
            <p className="text-[18px] font-medium text-[#05AA87]">← 돌아가기</p>
          </div>
        </Link>
        <div className="mt-8 flex h-[25px] w-full flex-row items-center">
          <div className="center h-[25px] w-[40px] rounded-[60px] bg-[#00CF9E]">
            <p className="text-[10px] font-semibold text-white">{post.category}</p>
          </div>
          <div className="ml-3 flex h-[17px] w-auto items-center gap-2">
            <p className="text-[14px] text-black/50 dark:text-white/60">익명</p>
            <Image src="/images/dot.svg" alt="views" width={5} height={5} className="opacity-50" />
            <p className="text-[14px] text-black/50 dark:text-white/60">{post.time}</p>
            <Image src="/images/dot.svg" alt="views" width={5} height={5} className="opacity-50" />
            <p className="text-[14px] text-black/50 dark:text-white/60">조회 {post.views}</p>
          </div>
        </div>
        <p className="mt-3 text-[24px] font-bold text-black dark:text-white">{post.title}</p>
        <div className="mt-3 mb-3 h-[1px] w-full bg-[#D9D9D9] dark:bg-[#2A2A2A]" />
        <div className="flex h-auto w-full items-center p-2">
          <p className="whitespace-pre-line text-[18px] text-black/70 dark:text-white/80">{post.content}</p>
        </div>
        <div className="mt-3 mb-3 h-[1px] w-full bg-[#D9D9D9] dark:bg-[#2A2A2A]" />
        <div className="mt-5 flex h-[40px] w-full flex-row items-center gap-5">
          <div
            className={`center h-[40px] w-[120px] cursor-pointer rounded-[10px] border transition-colors ${
              likeLoading
                ? 'cursor-not-allowed opacity-50'
                : liked
                ? 'border-[#DC2625] bg-[#FEF2F2] dark:border-[#7A2E2E] dark:bg-[#2A1515]'
                : 'border-[#FECACA] bg-[#FEF2F2] dark:border-[#7A2E2E] dark:bg-[#2A1515]'
            }`}
            onClick={handleLike}
          >
            <p className={`text-[14px] font-medium ${liked ? 'text-[#DC2625]' : 'text-[#DC2625]'}`}>
              {likeLoading ? '⏳' : liked ? '❤️' : '🤍'}
              {likeLoading ? '처리 중...' : `좋아요 ${likeCount}`}
            </p>
          </div>
          <div
            className="center h-[40px] w-[100px] cursor-pointer rounded-[10px] border border-black/50 bg-[#F5F5F5] transition-colors hover:bg-[#E5E5E5] dark:border-white/30 dark:bg-[#1E1E1E] dark:hover:bg-[#2A2A2A]"
            onClick={handleReport}
          >
            <p className="text-[14px] font-medium text-black dark:text-white">🚨 신고하기</p>
          </div>
        </div>
        {error && (
          <div className="mt-3 w-full rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-900/20">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}
      </div>
      <div className="mb-[120px] mt-[60px] flex h-auto w-[850px] flex-col justify-center rounded-[20px] border border-transparent bg-white p-8 shadow-lg dark:border-white/10 dark:bg-[#151515] dark:text-white">
        <div className="mb-6 flex h-[30px] w-full flex-row items-center gap-1">
          <p className="text-[24px] font-bold text-black dark:text-white">댓글</p>
          <p className="text-[24px] font-bold text-[#05AA87]">{post.comments}</p>
        </div>
        <Comment onCommentCountChange={handleCommentCountChange} postId={id} />
      </div>
    </div>
  );
}