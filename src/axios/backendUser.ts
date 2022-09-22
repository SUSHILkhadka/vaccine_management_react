import { getRefreshToken } from '../cookies/cookie';
import api from './api';

/**
 *
 * @param body request's body for user login
 * @returns response from server
 */
export async function login(body: any): Promise<any> {
  const response = await api.post('/login', body);
  return response.data;
}

/**
 *
 * @param body request's body for user register
 * @returns response from server
 */
export async function register(body: any): Promise<any> {
  const response = await api.post('/register', body);
  return response.data;
}

/**
 *
 * @returns response after logout request
 */
export async function logout(): Promise<any> {
  const response = await api.post('/logout', {
    refreshToken: getRefreshToken(),
  });
  return response.data;
}

/**
 *
 * @param body request's body for editing user
 * @returns response from server
 */
export async function editUser(body: any): Promise<any> {
  const response = await api.put('/user', body);
  return response.data;
}
