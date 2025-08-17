import { Post } from "@/types";

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

export const formatTime = (timeString: string): string => {
  return timeString;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

export const getCategoryColor = (category: string): string => {
  const colors = {
    자유: "bg-[#00CF9E]",
    질문: "bg-[#05AA87]",
    default: "bg-[#05AA87]"
  };
  return colors[category as keyof typeof colors] || colors.default;
};

export const sortPosts = (posts: Post[], sortBy: string): Post[] => {
  const sortedPosts = [...posts];
  
  switch (sortBy) {
    case "like":
      return sortedPosts.sort((a, b) => b.likes - a.likes);
    case "view":
      return sortedPosts.sort((a, b) => b.views - a.views);
    case "latest":
    default:
      return sortedPosts.sort((a, b) => a.id - b.id);
  }
};

export const filterPosts = (posts: Post[], category: string, query: string): Post[] => {
  let filtered = posts;
  
  if (category && category !== "all") {
    filtered = filtered.filter(post => post.category === category);
  }
  
  if (query) {
    const lowerQuery = query.toLowerCase();
    filtered = filtered.filter(post => 
      post.title.toLowerCase().includes(lowerQuery) ||
      post.content.toLowerCase().includes(lowerQuery)
    );
  }
  
  return filtered;
};
