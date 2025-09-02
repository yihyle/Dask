import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { isLoggedIn, getNickname, handleLogout as logoutUtil } from '@/utils/auth';

export const useAuth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const updateAuthState = useCallback(() => {
    try {
      const loginStatus = isLoggedIn();
      const userNickname = getNickname();
      setIsLogin(loginStatus);
      setNickname(userNickname);
    } catch (e) {
      console.error('인증 상태 확인 실패:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    updateAuthState();

    const handleStorageChange = (e) => {
      if (e.key === 'isLogin' || e.key === 'nickname') {
        updateAuthState();
      }
    };

    const handleAuthChange = () => {
      updateAuthState();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('authStateChanged', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authStateChanged', handleAuthChange);
    };
  }, [updateAuthState]);

  const handleLogout = useCallback(() => {
    logoutUtil();
    setIsLogin(false);
    setNickname('');
    window.dispatchEvent(new CustomEvent('authStateChanged'));
    router.push('/');
  }, [router]);

  return {
    isLogin,
    nickname,
    loading,
    handleLogout,
    updateAuthState
  };
};

