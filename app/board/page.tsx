"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import PostCard from "@/components/PostCard";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Pagination from "@/components/ui/Pagination";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Post, SearchFilters } from "@/types";
import { CATEGORIES, SORT_OPTIONS, SAMPLE_POSTS } from "@/constants";
import { filterPosts, sortPosts } from "@/utils";

const Board: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    category: "all",
    sortBy: "latest"
  });

  useEffect(() => {
    // 실제 API 호출 대신 로딩 시뮬레이션
    const timer = setTimeout(() => {
      setPosts(SAMPLE_POSTS);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const filteredAndSortedPosts = useMemo(() => {
    let result = filterPosts(posts, filters.category, filters.query);
    result = sortPosts(result, filters.sortBy);
    return result;
  }, [posts, filters]);

  const totalPages = Math.ceil(filteredAndSortedPosts.length / 10);
  const currentPosts = filteredAndSortedPosts.slice((currentPage - 1) * 10, currentPage * 10);

  const handleSearch = () => {
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <LoadingSpinner size="lg" text="게시글을 불러오는 중입니다..." />
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F5F5F5] h-full flex flex-col items-center">
      {/* Header */}
      <div className="w-[1250px] h-[70px] flex items-center flex-row mt-[120px] justify-between">
        <div className="flex flex-col justify-center">
          <h1 className="text-[32px] font-bold">게시판</h1>
          <p className="text-[20px] text-black/70">익명으로 자유롭게 소통하세요</p>
        </div>
        <Link href="/board/new">
          <Button variant="primary" size="md">
            + 글쓰기
          </Button>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="w-[1250px] h-[100px] center bg-white rounded-[20px] shadow-md mt-10 flex-row gap-[30px]">
        <Input
          value={filters.query}
          onChange={(value) => setFilters(prev => ({ ...prev, query: value }))}
          placeholder="제목이나 내용으로 검색..."
          className="w-[860px]"
        />
        <Select
          options={CATEGORIES}
          value={filters.category}
          onChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
          placeholder="카테고리 선택"
          className="w-[190px]"
        />
        <Button
          variant="primary"
          size="md"
          onClick={handleSearch}
          className="w-[70px] h-[50px]"
        >
          <Image src="/images/search.svg" alt="검색" width={24} height={24} />
        </Button>
      </div>

      {/* Filters */}
      <div className="w-[1250px] h-[50px] mt-[30px] flex flex-row items-center gap-5">
        <Select
          options={SORT_OPTIONS}
          value={filters.sortBy}
          onChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}
          className="w-[130px]"
        />
        <Select
          options={CATEGORIES}
          value={filters.category}
          onChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
          className="w-[115px]"
        />
      </div>

      {/* Posts List */}
      <div className="w-[1250px] h-auto flex flex-col items-center mt-[60px] gap-11">
        {currentPosts.length > 0 ? (
          currentPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <div className="w-full h-[200px] flex flex-col items-center justify-center bg-white rounded-[20px] shadow-lg">
            <p className="text-lg text-gray-500">검색 결과가 없습니다.</p>
            <p className="text-sm text-gray-400 mt-2">다른 검색어를 시도해보세요.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Board;
