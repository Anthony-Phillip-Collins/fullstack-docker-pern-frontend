import { isAxiosError } from 'axios';
import { parseError } from '../types/utils/parsers/error.parser';

const parseFrontendError = (error: unknown): Error | null => {
  if (isAxiosError(error)) {
    const responseError = error.response?.data.error;
    const message = responseError.message ? responseError.message : error.message;
    const name = responseError.name ? responseError.name : error.name;
    const status = error.response?.status ? error.response.status : error.status;

    const errorObject = new Error();
    errorObject.message = message;
    errorObject.name = name;
    errorObject.status = status;
    return errorObject;
  }

  return parseError(error);
};

export default parseFrontendError;
