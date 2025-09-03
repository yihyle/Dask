import axios from 'axios';
import { getAccessToken } from '@/utils/auth';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const createAuthHeaders = () => {
  const token = getAccessToken();
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

export const http = axios; // http로 래핑