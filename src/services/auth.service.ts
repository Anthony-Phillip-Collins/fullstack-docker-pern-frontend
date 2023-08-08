import axios from 'axios';
import { UserCreateInput, UserLogin, UserWithToken } from '../types/user.type';
import userService from './user.service';
import { getApiUrl } from './util';
import { asyncHandler, asyncHandlerAuth, authConfig } from './util/axiosUtil';

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

  try {
    const user = await userService.getById(cache.id);
    return user;
  } catch (error) {
    await refresh();
    const cache = getUser();
    if (!cache) {
      return null;
    }
    const user = await userService.getById(cache.id);
    return user;
  }
};

const refresh = async () => {
  const refreshToken = getUser()?.refreshToken;

  if (!refreshToken) {
    return null;
  }

  try {
    const { data } = await asyncHandler(axios.post<UserWithToken>(`${baseUrl}/refresh`, { refreshToken }));
    setUser(data);
    return data;
  } catch (error) {
    removeUser();
    throw error;
  }
};

const logIn = async (credentials: UserLogin) => {
  const { data } = await asyncHandler(axios.post<UserWithToken>(`${baseUrl}/login`, credentials));
  setUser(data);
  return data;
};

const logOut = async () => {
  const promise = () => axios.post(`${baseUrl}/logout`, null, authConfig());
  await asyncHandlerAuth(promise);
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
