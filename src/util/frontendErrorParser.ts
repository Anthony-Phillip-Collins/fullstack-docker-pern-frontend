import { isAxiosError } from 'axios';
import { parseError, serializeError } from '../types/utils/parsers/error.parser';

/*
 * returns an instance of Error or null
 */
export const parseFrontendError = (error: unknown): Error | null => {
  if (isAxiosError(error)) {
    const responseError = error.response?.data.error;

    const message = responseError.message ? responseError.message : error.message;
    const name = responseError.name ? responseError.name : error.name;
    const status = error.response?.status ? error.response.status : error.status;
    const errors = responseError?.errors;

    const err = new Error();
    err.message = message;
    err.name = name;
    err.status = status;
    err.errors = errors;

    return err;
  }

  return parseError(error);
};

/*
 * returns and object with the same properties as Error or null
 */
export const serializeFrontendError = (error: unknown): Error | null => {
  const parsedError = parseFrontendError(error);
  return serializeError(parsedError);
};
