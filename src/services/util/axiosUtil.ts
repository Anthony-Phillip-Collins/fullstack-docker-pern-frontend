import { isAxiosError } from 'axios';
import authService from '../auth.service';

export const authConfig = () => {
  const userWithToken = authService.getUser();
  const token = userWithToken?.accessToken;
  return !token ? {} : { headers: { Authorization: `bearer ${token}` } };
};

export const asyncHandler = async <T>(promise: Promise<T>) => {
  try {
    const data = await promise;
    return data;
  } catch (error: unknown) {
    const defaultError = new Error('Something went wrong');
    throw isAxiosError(error) ? error.response?.data.error || defaultError : error;
  }
};
