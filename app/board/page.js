"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import Postcard from "@/components/postcard";
import { usePosts } from "@/hooks";

export default function Board() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("recent");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearchQuery, setActiveSearchQuery] = useState("");

  const postsPerPage = 10;

  const postsParams = useMemo(() => ({
    page: currentPage,
    sort: selectedSort,
    category: selectedCategory,
    searchQuery: activeSearchQuery
  }), [currentPage, selectedSort, selectedCategory, activeSearchQuery]);

  const { posts, loading, refetch } = usePosts(postsParams);

  const calculatedTotalPages = useMemo(() => {
    return Math.ceil(posts.length / postsPerPage);
  }, [posts.length, postsPerPage]);

  useEffect(() => {
    setTotalPages(calculatedTotalPages);
  }, [calculatedTotalPages]);

  const currentPosts = useMemo(() => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    return posts.slice(indexOfFirstPost, indexOfLastPost);
  }, [posts, currentPage, postsPerPage]);

  const pageNumbers = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [totalPages]);

  const handlePageChange = useCallback((page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  }, [totalPages]);

  const handleSearch = useCallback(() => {
    setActiveSearchQuery(searchQuery.trim());
    setCurrentPage(1);
  }, [searchQuery]);

  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
    setActiveSearchQuery("");
    setCurrentPage(1);
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter") handleSearch();
  }, [handleSearch]);

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
        <div className="relative w-[1000px]">
          <input className="w-full h-[50px] rounded-[10px] bg-white dark:bg-[#1E1E1E] border border-[#D7D7D7] dark:border-[#2A2A2A] focus:outline-none focus:border-[#05AA87] pl-4 pr-12" placeholder="제목이나 내용으로 검색..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={handleKeyDown} />
        </div>
        <div className="w-[150px] h-[50px] rounded-[10px] bg-[#05AA87] center cursor-pointer transition duration-300 hover:bg-[#048E71]" onClick={handleSearch}>
          <img src="/images/search.svg" alt="검색" className="w-[24px] h-[24px]" />
        </div>
      </div>

      <div className="w-[1250px] h-[50px] mt-9 flex-row flex items-center gap-5">
        <div className="relative inline-block w-[130px]">
          <select value={selectedSort} onChange={(e) => setSelectedSort(e.target.value)} className="appearance-none w-full h-[50px] border border-[#D7D7D7] dark:border-[#2A2A2A] rounded-[10px] pl-4 pr-10 bg-white dark:bg-[#1E1E1E] focus:outline-none focus:border-[#05AA87] cursor-pointer">
            <option value="recent">최신 순</option>
            <option value="likes">인기 순</option>
            <option value="views">조회 순</option>
            <option value="oldest">오래된 순</option>
          </select>
          <img src="/images/under.svg" alt="화살표" className="pointer-events-none w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2"/>
        </div>
        <div className="relative inline-block w-[115px]">
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="appearance-none w-full h-[50px] border border-[#D7D7D7] dark:border-[#2A2A2A] rounded-[10px] pl-4 pr-10 bg-white dark:bg-[#1E1E1E] focus:outline-none focus:border-[#05AA87] cursor-pointer">
            <option value="all">전체</option>
            <option value="free">자유</option>
            <option value="qna">질문</option>
            <option value="gomin">고민</option>
          </select>
          <img src="/images/under.svg" alt="화살표" className="pointer-events-none w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2"/>
        </div>
      </div>

      <div className="w-[1250px] h-auto flex flex-col items-center mt-9 gap-11">
        {currentPosts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400 text-lg">{activeSearchQuery ? `"${activeSearchQuery}"에 대한 검색 결과가 없습니다.` : "게시글이 없습니다."}</p>
            {activeSearchQuery && (<button onClick={handleClearSearch} className="mt-2 text-[#05AA87] hover:text-[#048E71] underline mb-[80px]">전체 게시글 보기</button>)}
          </div>
        ) : (
          currentPosts.map((post) => <Postcard key={post.id} post={post} />)
        )}
      </div>

      <div className="w-full flex justify-center mt-[100px] mb-[100px]">
        <div className="flex items-center space-x-2">
          <button className="w-8 h-8 flex items-center justify-center rounded-[6px] border border-[#D7D7D7]" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>&lt;</button>
          {pageNumbers.map((page) => (
            <button key={page} onClick={() => handlePageChange(page)} className={`w-8 h-8 flex items-center justify-center rounded-[6px] border border-[#D7D7D7] ${page === currentPage ? "bg-[#05AA87] text-white font-bold" : ""}`}>{page}</button>
          ))}
          <button className="w-8 h-8 flex items-center justify-center rounded-[6px] border border-[#D7D7D7]" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>&gt;</button>
        </div>
      </div>
    </div>
  );
}
