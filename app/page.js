"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Postcard from "@/components/postcard";
import { usePosts } from "@/hooks";

export default function Home() {
  const [popularPosts, setPopularPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);

  const { posts: recentPostsData, loading: recentLoading } = usePosts({ page: 1, sort: "recent" });

  useEffect(() => {
    if (recentPostsData.length > 0) {
      const topLiked = [...recentPostsData].sort((a, b) => b.likes - a.likes).slice(0, 3);
      const topRecent = [...recentPostsData].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 3);
      setPopularPosts(topLiked);
      setRecentPosts(topRecent);
    }
  }, [recentPostsData]);

  return (
    <div className="flex w-full flex-col items-center gap-[170px] bg-[#F5F5F5] dark:bg-[#0B0B0B]">
      <div className="relative mt-[80px] flex h-[calc(100vh-80px)] w-full flex-col justify-center overflow-hidden bg-gradient-to-br from-[#00CF9E] to-[#05AA87] pl-[80px] shadow-xl">
        <div className="absolute -top-20 -right-20 z-0 h-[400px] w-[400px] rounded-full bg-white/10 blur-3xl" />
        <p className="z-0 animate-fade-in-up text-[64px] font-extrabold leading-tight text-white">Dask</p>
        <p className="z-0 mb-10 animate-fade-in-up delay-100 text-[26px] text-white">자유롭고 안전한 소통 공간</p>
        <Link href="/board" passHref>
          <div className="center z-10 h-[50px] w-[200px] cursor-pointer rounded-[12px] bg-white text-[18px] font-bold text-[#05AA87] shadow-md transition duration-300 hover:bg-[#ebebeb]">게시판 둘러보기</div>
        </Link>
      </div>
      <div className="flex w-[1330px] flex-col items-center gap-11 rounded-[20px] border border-transparent bg-white p-11 shadow-lg dark:border-white/10 dark:bg-[#151515] dark:text-white">
        <div className="center h-[30px] w-full gap-[1050px]">
          <p className="text-[23px] font-semibold">🔥 인기 게시글</p>
          <Link href={"/board"} className="text-[20px] font-semibold text-[#05AA87]">더보기</Link>
        </div>
        {popularPosts.map(post => <Postcard key={post.id} post={post} />)}
      </div>
      <div className="mb-[100px] flex w-[1330px] flex-col items-center gap-11 rounded-[20px] border border-transparent bg-white p-11 shadow-lg dark:border-white/10 dark:bg-[#151515] dark:text-white">
        <div className="center h-[30px] w-full gap-[1050px]">
          <p className="text-[23px] font-semibold">🕒 최근 게시글</p>
          <Link href={"/board"} className="text-[20px] font-semibold text-[#05AA87]">더보기</Link>
        </div>
        {recentPosts.map(post => <Postcard key={post.id} post={post} />)}
      </div>
    </div>
  );
}