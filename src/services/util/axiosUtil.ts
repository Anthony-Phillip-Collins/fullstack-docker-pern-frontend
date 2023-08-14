import { ErrorNames } from '../../types/errors.type';
import { parseFrontendError } from '../../util/frontendErrorParser';
import authService from '../auth.service';

export const authConfig = () => {
  const userWithToken = authService.getUser();
  const token = userWithToken?.accessToken;
  return !token ? {} : { headers: { Authorization: `bearer ${token}` } };
};

/*
 * try/catch wrapper for async/await, resturns a parsed error that extracts the error message from axios errors etc.
 * @param promise - a promise e.g. axios.get('/api/blogs')
 * @returns the response from the promise or a parsed error
 */

export const asyncHandler = async <T>(promise: Promise<T>) => {
  try {
    const response = await promise;
    return response;
  } catch (error: unknown) {
    throw parseFrontendError(error);
  }
};

/*
 * Similar to asyncHandler, a try/catch wrapper for async/await. The difference is it will retry once after rejection
 * and attempt to retrieve new tokens by calling the refresh endpoint. A retry will only happen if the first promise was rejected with a 401.
 * @param getPromise - a function that returns a promise e.g. () => axios.put('/api/blogs', update, authConfig())
 * @returns the response from the promise or a parsed error
 */

export const asyncHandlerAuth = async <T>(getPromise: () => Promise<T>) => {
  try {
    const response = await getPromise();
    return response;
  } catch (error: unknown) {
    const err = parseFrontendError(error);
    if (err?.name !== ErrorNames.TokenExpiredError) {
      if (err?.name === ErrorNames.UserDisabled) {
        authService.logOut();
      }
      console.log('asyncHandlerAuth', err);
      throw err;
    }
  }

  try {
    await authService.refresh();
    const response = await getPromise();
    return response;
  } catch (error) {
    throw parseFrontendError(error);
  }
};
