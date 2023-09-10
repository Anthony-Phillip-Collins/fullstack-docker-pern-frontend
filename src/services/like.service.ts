import axios from 'axios';
import { LikeAttributes, LikeCreation } from '../types/like.type';
import { getApiUrl } from './util';
import { asyncHandler, asyncHandlerAuth, authConfig } from './util/axiosUtil';

const baseUrl = getApiUrl('/likes');

const getAll = async () => {
  const promise = axios.get<LikeAttributes[]>(baseUrl);
  const { data } = await asyncHandler(promise);
  return data;
};

const getById = async (id: LikeAttributes['id']) => {
  const promise = axios.get<LikeAttributes>(`${baseUrl}/${id}`);
  const { data } = await asyncHandler(promise);
  return data;
};

const createOne = async (like: LikeCreation) => {
  const promise = () => axios.post<LikeAttributes>(baseUrl, like, authConfig());
  const { data } = await asyncHandlerAuth(promise);
  return data;
};

const deleteOne = async (likeId: LikeAttributes['id']) => {
  const promise = () => axios.delete<LikeAttributes>(`${baseUrl}/${likeId}`, authConfig());
  const { data } = await asyncHandlerAuth(promise);
  return data;
};

const likeService = { getAll, getById, createOne, deleteOne };

export default likeService;
