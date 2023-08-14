import axios from 'axios';
import { UserAttributes, UserCreateInput, UserUpdateAsAdminInput, UserWithToken } from '../types/user.type';
import { getApiUrl } from './util';
import { asyncHandler, asyncHandlerAuth, authConfig } from './util/axiosUtil';

const baseUrl = getApiUrl('/users');

const getAll = async () => {
  const promise = axios.get<UserAttributes[]>(baseUrl);
  const { data } = await asyncHandler(promise);
  return data;
};

const getById = async (id: UserAttributes['id']) => {
  const promise = axios.get<UserAttributes>(`${baseUrl}/${id}`);
  const { data } = await asyncHandler(promise);
  return data;
};

const createOne = async (user: UserCreateInput) => {
  const promise = () => axios.post<UserWithToken | null>(baseUrl, user, authConfig());
  const { data } = await asyncHandlerAuth(promise);
  return data;
};

const updateOne = async (username: UserAttributes['username'], update: UserUpdateAsAdminInput) => {
  const promise = () => axios.put<UserAttributes>(`${baseUrl}/${username}`, update, authConfig());
  const { data } = await asyncHandlerAuth(promise);
  return data;
};

const deleteOne = async (username: UserAttributes['username']) => {
  const promise = () => axios.delete<UserAttributes>(`${baseUrl}/${username}`, authConfig());
  await asyncHandlerAuth(promise);
  return username;
};

const userService = { getAll, getById, createOne, updateOne, deleteOne };

export default userService;
