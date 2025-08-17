import React from 'react';
import { PaginationProps } from '@/types';

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="w-full flex justify-center mt-[100px] mb-[100px]">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center rounded-[6px] border border-[#D7D7D7] hover:border-[#05AA87] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          aria-label="이전 페이지"
        >
          &lt;
        </button>
        
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 flex items-center justify-center rounded-[6px] border transition-colors duration-200 ${
              page === currentPage
                ? "bg-[#05AA87] text-white font-bold border-[#05AA87]"
                : "border-[#D7D7D7] hover:border-[#05AA87]"
            }`}
            aria-label={`${page}페이지`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        ))}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-8 h-8 flex items-center justify-center rounded-[6px] border border-[#D7D7D7] hover:border-[#05AA87] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          aria-label="다음 페이지"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
