import React from 'react';
import Link from "next/link";
import PostCard from "@/components/PostCard";
import { APP_CONFIG, SAMPLE_POSTS } from "@/constants";

const Home: React.FC = () => {
  return (
    <main className="w-full h-[2945px] flex items-center bg-[#F5F5F5] flex-col gap-[170px]">
      {/* Hero Section */}
      <section className="w-[1330px] h-[600px] flex flex-col justify-center pl-[80px] bg-gradient-to-br from-[#00CF9E] to-[#05AA87] rounded-[20px] mt-[170px] relative overflow-hidden shadow-xl">
        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl z-0" />
        <h1 className="text-[64px] text-white font-extrabold leading-tight z-10 animate-fade-in-up">
          {APP_CONFIG.name}
        </h1>
        <p className="text-[26px] text-white mb-10 z-10 animate-fade-in-up delay-100">
          {APP_CONFIG.description}
        </p>
        <Link href="/board" passHref>
          <div className="w-[200px] h-[50px] bg-white rounded-[12px] center text-[#05AA87] text-[18px] font-bold shadow-md hover:bg-[#ebebeb] transition duration-300 cursor-pointer z-10">
            게시판 둘러보기
          </div>
        </Link>
      </section>

      {/* Popular Posts Section */}
      <section className="w-[1330px] h-[830px] flex flex-col items-center bg-white rounded-[20px] shadow-lg p-11 gap-11">
        <div className="w-full h-[30px] center gap-[1050px]">
          <h2 className="text-[24px] font-semibold">🔥 인기 게시글</h2>
          <Link 
            href="/board" 
            className="text-[20px] text-[#05AA87] font-semibold hover:underline transition-all duration-200"
          >
            더보기
          </Link>
        </div>
        {SAMPLE_POSTS.slice(0, 3).map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>

      {/* Recent Posts Section */}
      <section className="w-[1330px] h-[830px] flex flex-col items-center bg-white rounded-[20px] shadow-lg p-11 gap-11">
        <div className="w-full h-[30px] center gap-[1050px]">
          <h2 className="text-[24px] font-semibold">🕒 최근 게시글</h2>
          <Link 
            href="/board" 
            className="text-[20px] text-[#05AA87] font-semibold hover:underline transition-all duration-200"
          >
            더보기
          </Link>
        </div>
        {SAMPLE_POSTS.slice(0, 3).map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </main>
  );
};

export default Home;
