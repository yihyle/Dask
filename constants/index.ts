export const APP_CONFIG = {
  name: "Dask",
  description: "자유롭고 안전한 소통 공간",
  version: "0.1.0"
} as const;

export const COLORS = {
  primary: "#05AA87",
  primaryHover: "#048E71",
  secondary: "#00CF9E",
  white: "#FFFFFF",
  black: "#000000",
  gray: {
    50: "#F5F5F5",
    100: "#D7D7D7",
    200: "#EBEBEB",
    300: "#CCCCCC",
    400: "#999999",
    500: "#666666",
    600: "#333333",
    700: "#1A1A1A"
  }
} as const;

export const BREAKPOINTS = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px"
} as const;

export const CATEGORIES = [
  { value: "all", label: "전체" },
  { value: "free", label: "자유" },
  { value: "question", label: "질문" }
] as const;

export const SORT_OPTIONS = [
  { value: "latest", label: "최신 순" },
  { value: "like", label: "인기 순" },
  { value: "view", label: "조회 순" }
] as const;

export const SAMPLE_POSTS = [
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
  {
    id: 3,
    category: "자유",
    nickname: "익명의 닉네임",
    time: "5시간 전",
    title: "샘플 게시글",
    content: "메인 페이지용 샘플 게시글입니다.",
    views: 89,
    likes: 23,
    comments: 5,
  },
] as const;
