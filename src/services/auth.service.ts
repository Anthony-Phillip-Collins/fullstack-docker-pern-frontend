import axios from 'axios';
import { UserCreateInput, UserLogin, UserWithToken } from '../types/user.type';
import userService from './user.service';
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

const getAuthUser = async () => {
  const cache = getUser();
  if (!cache) {
    return null;
  }
  console.log('authservice getAuthUser');
  const user = await userService.getById(cache.id);
  return user;
};

const refresh = async () => {
  console.log('authservice refresh');
  const refreshToken = getUser()?.refreshToken;
  if (!refreshToken) {
    return null;
  }

  try {
    const { data } = await asyncHandler(axios.post<UserWithToken>(`${baseUrl}/refresh`, { refreshToken }));
    setUser(data);
    return data;
  } catch (error) {
    console.log('E_R_R_R_O_R:', error);
    removeUser();
  }
};

const logIn = async (credentials: UserLogin) => {
  const { data } = await asyncHandler(axios.post<UserWithToken>(`${baseUrl}/login`, credentials));
  setUser(data);
  return data;
};

const logOut = async () => {
  try {
    await asyncHandler(axios.post(`${baseUrl}/logout`));
  } catch (error) {
    console.log('E_R_R_R_O_R:', error);
  }
  removeUser();
  return null;
};

const signUp = async (user: UserCreateInput) => {
  const { data } = await asyncHandler(axios.post<UserWithToken>(`${baseUrl}/signup`, user));
  setUser(data);
  return data;
};

const authService = { logIn, logOut, signUp, getUser, refresh, getAuthUser };

export default authService;
