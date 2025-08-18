'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Comment from '@/components/comment';

export default function BoardDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleCommentCountChange = useCallback((count) => {
    setPost(prev => ({ ...prev, comments: count }));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setPost({
        id,
        category: '자유',
        nickname: '익명의 닉네임',
        time: '11',
        title: '테스트용 mock데이터입니다.',
        content:
          '이 영역 내에서는 주력을 띈 존재에게는 팔, 주력이 없는 존재에게는 해가 복마어주자가 유지되는 동안 무한히 쏟아진다. 보통 일반적인 영역전개의 범위는 많아도 10M 내외지만, 스쿠나는 상술한 대로 결계로 공간을 분단하지 않는다, 즉 상대에게 도망칠 기회를 준다는 속박을 걸었기에 영역의 필중 효과가 미치는 범위는 무려 최대 반경 200m에 이른다. 이때 영역의 중심이 되는 것은 스쿠나가 아니라 구현화된 사찰이다. 이 효과범위 내부에서는 그야말로 무한한 수의 해와 팔이 쏟아지기에 사실상 200m 이상을 순식간에 주파할 수 있는 공간이동 능력이라도 없다면 빠져나가는 것은 불가능에 가깝다.',
        views: 69,
        likes: 69,
        comments: 6,
      });
      setLoading(false);
    }, 300);
  }, [id]);

  if (loading || !post) {
    return (
      <div className="w-full bg-[#F5F5F5] dark:bg-[#0B0B0B] min-h-screen center">
        <div className="w-[850px] h-[655px] rounded-[20px] bg-white dark:bg-[#151515] dark:text-white shadow-lg mt-11 p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 dark:bg-[#1E1E1E] rounded w-24"></div>
            <div className="h-8 bg-gray-200 dark:bg-[#1E1E1E] rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-[#1E1E1E] rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 dark:bg-[#1E1E1E] rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F5F5F5] dark:bg-[#0B0B0B] min-h-screen flex flex-col items-center">

      {/* 내용 부분 */}
      <div className='w-[850px] h-auto bg-white dark:bg-[#151515] dark:text-white rounded-[20px] shadow-lg mt-[120px] p-8 flex flex-col justify-center border border-transparent dark:border-white/10'>
        <Link href="/board" passHref>
          <div className='w-full h-[22px] cursor-pointer'>
            <p className='text-[#05AA87] text-[18px] font-medium'>← 돌아가기</p>
          </div>
        </Link>
        <div className='w-full h-[25px] flex flex-row items-center mt-8'>
          <div className="w-[40px] h-[25px] bg-[#00CF9E] rounded-[60px] center">
            <p className="text-[10px] font-semibold text-white">{post.category}</p>
          </div>
          <div className='w-auto h-[17px] center gap-2 ml-3'>
            <p className='text-[14px] text-black/50 dark:text-white/60'>by {post.nickname}</p>
            <Image src="/images/dot.svg" alt="views" width={5} height={5} className="opacity-50" />
            <p className='text-[14px] text-black/50 dark:text-white/60'>{post.time}시간 전</p>
            <Image src="/images/dot.svg" alt="views" width={5} height={5} className="opacity-50" />
            <p className='text-[14px] text-black/50 dark:text-white/60'>조회 {post.views}</p>
          </div>
        </div>
        <p className='text-[24px] font-bold text-black dark:text-white mt-3'>{post.title}</p>
        <div className='w-full h-[1px] bg-[#D9D9D9] dark:bg-[#2A2A2A] mt-3 mb-3' />
        <div className='w-full h-auto flex items-center p-2'>
          <p className='text-[18px] text-black/70 dark:text-white/80'>{post.content}</p>
        </div>
        <div className='w-full h-[1px] bg-[#D9D9D9] dark:bg-[#2A2A2A] mt-3 mb-3' />
        <div className='w-full h-[40px] mt-5 flex flex-row items-center gap-5'>
          <div className='w-[120px] h-[40px] border border-[#FECACA] bg-[#FEF2F2] dark:border-[#7A2E2E] dark:bg-[#2A1515] rounded-[10px] center cursor-pointer'>
            <p className='text-[14px] text-[#DC2625] font-medium'>❤️ 좋아요 {post.likes}</p>
          </div>
          <div className='w-[100px] h-[40px] border border-black/50 dark:border-white/30 bg-[#F5F5F5] dark:bg-[#1E1E1E] rounded-[10px] center cursor-pointer'>
            <p className='text-[14px] text-black dark:text-white font-medium'>🚨 신고하기</p>
          </div>
        </div>
      </div>

      {/* 댓글 부분 */}
      <div className='w-[850px] h-auto bg-white dark:bg-[#151515] dark:text-white rounded-[20px] shadow-lg mt-[60px] p-8 flex flex-col justify-center mb-[120px] border border-transparent dark:border-white/10'>
        <div className='w-full h-[30px] flex flex-row items-center gap-1 mb-6'>
          <p className='text-[24px] font-bold text-black dark:text-white'>댓글</p>
          <p className='text-[24px] font-bold text-[#05AA87]'>{post.comments}</p>
        </div>
        <Comment onCommentCountChange={handleCommentCountChange} />
      </div>
    </div>
  );
}
