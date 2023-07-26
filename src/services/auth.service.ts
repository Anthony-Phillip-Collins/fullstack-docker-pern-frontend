import axios from 'axios';
import { UserLogin, UserWithToken } from '../types/user.type';
import { getApiUrl } from './util';
import { asyncHandler } from './util/axiosUtil';
const baseUrl = getApiUrl('/auth');

const StorageKey = 'blogsAppUser';

const removeUser = () => {
  window.localStorage.removeItem(StorageKey);
};

const setUser = (user: UserWithToken) => {
  if (user) {
    window.localStorage.setItem(StorageKey, JSON.stringify(user));
  }
};

const getUser = (): UserWithToken | null => {
  const userString = window.localStorage.getItem(StorageKey);
  return userString && JSON.parse(userString);
};

const login = async (credentials: UserLogin) => {
  const { data } = await asyncHandler(axios.post<UserWithToken>(`${baseUrl}/login`, credentials));
  setUser(data);
  return data;
};

const logout = async () => {
  const { data } = await asyncHandler(axios.post(`${baseUrl}/logout`));
  removeUser();
  return data;
};

const authService = { login, logout, getUser };

export default authService;
