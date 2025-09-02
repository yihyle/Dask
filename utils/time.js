export const formatTimeAgo = (isoString) => {
  if (!isoString) return "";
  
  try {
    const now = new Date();
    const created = new Date(isoString);
    const diffMs = now - created;

    if (diffMs < 0) return "방금 전";

    const sec = Math.floor(diffMs / 1000);
    if (sec < 60) return `${sec}초 전`;
    
    const min = Math.floor(sec / 60);
    if (min < 60) return `${min}분 전`;
    
    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr}시간 전`;
    
    const day = Math.floor(hr / 24);
    if (day < 7) return `${day}일 전`;
    
    const week = Math.floor(day / 7);
    if (week < 5) return `${week}주 전`;
    
    const month = Math.floor(day / 30);
    if (month < 12) return `${month}개월 전`;
    
    const year = Math.floor(day / 365);
    return `${year}년 전`;
  } catch (error) {
    return "방금 전";
  }
};

