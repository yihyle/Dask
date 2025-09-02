import { http, API_BASE_URL, createAuthHeaders } from './client';

export const login = async (studentId, password) => {
  const url = `${API_BASE_URL}/auth/login`;
  const payload = { student_id: studentId, password };
  const headers = { 'Content-Type': 'application/json' };

  const response = await http.post(url, payload, { headers });
  return response.data;
};

export const changePassword = async (currentPassword, newPassword, confirmPassword) => {
  const url = `${API_BASE_URL}/auth/password`;
  const payload = {
    current_password: currentPassword,
    new_password: newPassword,
    confirm_password: confirmPassword,
  };
  const headers = createAuthHeaders();

  const response = await http.put(url, payload, { headers });
  return response.data;
};
