import axios from 'axios';
import { BlogAttributes, BlogCreation, BlogUpdate } from '../types/blog.type';
import { getApiUrl } from './util';
import { asyncHandler, asyncHandlerAuth, authConfig } from './util/axiosUtil';

const baseUrl = getApiUrl('/blogs');

const getAll = async () => {
  const promise = axios.get<BlogAttributes[]>(baseUrl);
  const { data } = await asyncHandler(promise);
  return data;
};

const getById = async (id: BlogAttributes['id']) => {
  const promise = axios.get<BlogAttributes>(`${baseUrl}/${id}`);
  const { data } = await asyncHandler(promise);
  return data;
};

const createOne = async (blog: BlogCreation) => {
  const promise = () => axios.post<BlogAttributes>(baseUrl, blog, authConfig());
  const { data } = await asyncHandlerAuth(promise);
  return data;
};

const updateOne = async (blogId: BlogAttributes['id'], update: BlogUpdate) => {
  const promise = () => axios.put<BlogAttributes>(`${baseUrl}/${blogId}`, update, authConfig());
  const { data } = await asyncHandlerAuth(promise);
  return data;
};

const deleteOne = async (blogId: BlogAttributes['id']) => {
  const promise = () => axios.delete<BlogAttributes>(`${baseUrl}/${blogId}`, authConfig());
  const { data } = await asyncHandlerAuth(promise);
  return data;
};

const blogService = { getAll, getById, createOne, updateOne, deleteOne };

export default blogService;
