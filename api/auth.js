import { http, API_BASE_URL, createAuthHeaders } from './client';

export const login = async (studentId, password) => {
  const res = await http.post(`${API_BASE_URL}/auth/login`, { student_id: studentId, password }, { headers: { 'Content-Type': 'application/json' } });
  return res.data;
};

export const changePassword = async (currentPassword, newPassword, confirmPassword) => {
  const res = await http.put(`${API_BASE_URL}/auth/password`, {
    current_password: currentPassword,
    new_password: newPassword,
    confirm_password: confirmPassword,
  }, { headers: createAuthHeaders() });
  return res.data;
};


