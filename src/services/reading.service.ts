import axios from 'axios';
import { getApiUrl } from './util';
import { asyncHandler, asyncHandlerAuth, authConfig } from './util/axiosUtil';
import { ReadingAttributes, ReadingCreation, ReadingUpdate } from '../types/reading.type';

const baseUrl = getApiUrl('/readings');

const getAll = async () => {
  const promise = axios.get<ReadingAttributes[]>(baseUrl);
  const { data } = await asyncHandler(promise);
  return data;
};

const getById = async (id: ReadingAttributes['id']) => {
  const promise = axios.get<ReadingAttributes>(`${baseUrl}/${id}`);
  const { data } = await asyncHandler(promise);
  return data;
};

const createOne = async (reading: ReadingCreation) => {
  const promise = () => axios.post<ReadingAttributes>(baseUrl, reading, authConfig());
  const { data } = await asyncHandlerAuth(promise);
  return data;
};

const updateOne = async (readingId: ReadingAttributes['id'], update: ReadingUpdate) => {
  const promise = () => axios.put<ReadingAttributes>(`${baseUrl}/${readingId}`, update, authConfig());
  const { data } = await asyncHandlerAuth(promise);
  return data;
};

const deleteOne = async (readingId: ReadingAttributes['id']) => {
  const promise = () => axios.delete<ReadingAttributes>(`${baseUrl}/${readingId}`, authConfig());
  const { data } = await asyncHandlerAuth(promise);
  return data;
};

const readingService = { getAll, getById, createOne, updateOne, deleteOne };

export default readingService;
