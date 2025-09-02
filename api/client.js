import axios from 'axios';
import { API_BASE_URL } from '@/constants/api';
import { getAccessToken } from '@/utils/auth';

export { API_BASE_URL };

export const createAuthHeaders = () => {
  const token = getAccessToken();
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

export const http = axios;


