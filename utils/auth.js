export const handleLogout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
  localStorage.removeItem('likedPosts');
  localStorage.setItem('isLogin', 'false');
  localStorage.removeItem('nickname');
  
  sessionStorage.removeItem('accessToken');
  sessionStorage.removeItem('refreshToken');
  sessionStorage.removeItem('user');
};

export const getAccessToken = () => {
  return localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
};

export const isLoggedIn = () => {
  return localStorage.getItem('isLogin') === 'true';
};

export const getNickname = () => {
  return localStorage.getItem('nickname') || '';
};

export const handleAuthError = (error, router = null) => {
  if (error.response?.status === 401) {
    handleLogout();
    if (router) {
      router.push('/login');
    } else {
      window.location.href = '/login';
    }
    return '로그인이 만료되었습니다. 다시 로그인해주세요.';
  } else if (error.response?.status === 403) {
    return '권한이 없습니다.';
  } else {
    return '요청 처리 중 오류가 발생했습니다.';
  }
};

export const getLikedPosts = () => {
  return JSON.parse(localStorage.getItem('likedPosts') || '[]');
};

export const updateLikedPosts = (postId, isLiked) => {
  const likedPosts = getLikedPosts();
  if (isLiked) {
    if (!likedPosts.includes(parseInt(postId))) {
      likedPosts.push(parseInt(postId));
    }
  } else {
    const index = likedPosts.indexOf(parseInt(postId));
    if (index > -1) {
      likedPosts.splice(index, 1);
    }
  }
  localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
};

