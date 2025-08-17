export interface Post {
  id: number;
  category: string;
  nickname: string;
  time: string;
  title: string;
  content: string;
  views: number;
  likes: number;
  comments: number;
}

export interface MenuItem {
  name: string;
  path: string;
}

export interface User {
  isLogin: boolean;
  nickname?: string;
}

export interface SearchFilters {
  query: string;
  category: string;
  sortBy: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
