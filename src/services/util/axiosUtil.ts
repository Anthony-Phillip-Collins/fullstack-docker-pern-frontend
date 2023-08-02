import { parseError } from '../../types/utils/parsers/error.parser';
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
    throw parseError(error);
  }
};
