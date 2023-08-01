import axios from 'axios';
import { UserAttributes, UserCreateInput, UserUpdateAsAdminInput } from '../types/user.type';
import { getApiUrl } from './util';
import { asyncHandler, authConfig } from './util/axiosUtil';

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
  const promise = axios.post<UserAttributes>(baseUrl, user, authConfig());
  const { data } = await asyncHandler(promise);
  return data;
};

const updateOne = async (userId: UserAttributes['id'], update: UserUpdateAsAdminInput) => {
  const promise = axios.put<UserAttributes>(`${baseUrl}/${userId}`, update, authConfig());
  const { data } = await asyncHandler(promise);
  return data;
};

const deleteOne = async (userId: UserAttributes['id']) => {
  const promise = axios.delete<UserAttributes>(`${baseUrl}/${userId}`, authConfig());
  const { data } = await asyncHandler(promise);
  return data;
};

const userService = { getAll, getById, createOne, updateOne, deleteOne };

export default userService;
