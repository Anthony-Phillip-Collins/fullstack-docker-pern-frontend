import axios from 'axios';
import { Blog } from '../types/blog.type';
import constants from '../constants';

const baseUrl = `${constants.API_BASE_URL}/blogs`;

const getAll = async () => {
  const { data } = await axios.get<Blog[]>(baseUrl);
  return data;
};

const getById = async (id: string) => {
  const { data } = await axios.get<Blog>(`${baseUrl}/${id}`);
  return data;
};

// const create = async (object: BlogFormValues) => {
//   const { data } = await axios.post<Blog>(`${baseUrl}`, object);
//   return data;
// };

const blogService = { getAll, getById };

export default blogService;
