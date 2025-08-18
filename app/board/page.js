"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Postcard from "@/components/postcard";

export default function Board() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const postsPerPage = 5; // 페이지당 게시글 개수

  useEffect(() => {
    setTimeout(() => {
      setPosts([
        {
          id: 1,
          category: "자유",
          nickname: "익명의 닉네임",
          time: "11시간 전",
          title: "테스트 제목",
          content: "테스트 내용입니다. 나중에 더 기능을 추가하세요.",
          views: 69,
          likes: 1212,
          comments: 102039,
        },
        {
          id: 2,
          category: "질문",
          nickname: "니엄마동석",
          time: "2시간 전",
          title: "범죄도시 보신분",
          content: "마동석 죽음",
          views: 150,
          likes: 40,
          comments: 12,
        },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#05AA87] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-[#05AA87] font-medium">게시글을 불러오는 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F5F5F5] dark:bg-[#0B0B0B] h-full flex flex-col items-center">
      <div className="w-[1250px] h-[70px] flex items-center flex-row mt-[120px] justify-between">
        <div className="flex flex-col justify-center">
          <p className="text-[32px] font-bold">게시판</p>
          <p className="text-[20px] text-black/70 dark:text-white/70">익명으로 자유롭게 소통하세요</p>
        </div>
        <Link href="/board/new">
          <div className="w-[120px] h-[50px] rounded-[10px] bg-[#05AA87] center transition duration-300 hover:bg-[#048E71]">
            <p className="text-[20px] text-white font-bold whitespace-pre cursor-pointer">+ 글쓰기</p>
          </div>
        </Link>
      </div>

      <div className="w-[1250px] h-[100px] center bg-white dark:bg-[#151515] dark:text-white rounded-[20px] shadow-md mt-10 flex-row gap-[30px] border border-transparent dark:border-white/10">
        <input
          className="w-[860px] h-[50px] rounded-[10px] bg-white dark:bg-[#1E1E1E] border border-[#D7D7D7] dark:border-[#2A2A2A] focus:outline-none focus:border-[#05AA87] pl-4 pr-4"
          placeholder="제목이나 내용으로 검색..."
        />
        <div className="relative inline-block w-[190px]">
          <select defaultValue="" className="appearance-none w-full h-[50px] border border-[#D7D7D7] dark:border-[#2A2A2A] rounded-[10px] pl-4 pr-10 bg-white dark:bg-[#1E1E1E] focus:outline-none focus:border-[#05AA87] cursor-pointer">
            <option value="" disabled>카테고리 선택</option>
            <option value="all">전체</option>
            <option value="free">자유</option>
            <option value="question">질문</option>
          </select>
          <img
            src="/images/under.svg"
            alt="화살표"
            className="pointer-events-none w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2"
          />
        </div>
        <div className="w-[70px] h-[50px] rounded-[10px] bg-[#05AA87] center cursor-pointer transition duration-300 hover:bg-[#048E71]">
          <img src="/images/search.svg" alt="검색" className="w-[24px] h-[24px]" />
        </div>
      </div>

      <div className="w-[1250px] h-auto flex flex-col items-center mt-[60px] gap-11">
        {currentPosts.map((post) => (
          <Postcard key={post.id} post={post} />
        ))}
      </div>
      <div className="w-full flex justify-center mt-[100px] mb-[100px]">
        <div className="flex items-center space-x-2">
          <button
            className="w-8 h-8 flex items-center justify-center rounded-[6px] border border-[#D7D7D7]"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-8 h-8 flex items-center justify-center rounded-[6px] border border-[#D7D7D7] ${page === currentPage ? "bg-[#05AA87] text-white font-bold" : ""
                }`}
            >
              {page}
            </button>
          ))}
          <button
            className="w-8 h-8 flex items-center justify-center rounded-[6px] border border-[#D7D7D7]"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}