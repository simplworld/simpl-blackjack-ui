import { createApiAction, API_URL } from './api';

export const loginUser = createApiAction('LOGIN_USER', formData => ({
  endpoint: `${API_URL}/api/login/`,
  method: 'POST',
  body: JSON.stringify(formData),
}));

export const logoutUser = createApiAction('LOGOUT_USER', {
  endpoint: `${API_URL}/api/logout/`,
  method: 'POST',
});

export const getUser = createApiAction('GET_USER', () => ({
  endpoint: `${API_URL}/api/me/`,
  method: 'GET',
}));
