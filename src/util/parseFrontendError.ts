import { isAxiosError } from 'axios';
import { parseError } from '../types/utils/parsers/error.parser';

const parseFrontendError = (error: unknown): Error | null => {
  if (isAxiosError(error)) {
    const responseError = error.response?.data.error;

    let message = responseError.message ? responseError.message : error.message;
    let name = responseError.name ? responseError.name : error.name;
    const status = error.response?.status ? error.response.status : error.status;
    const errors = responseError?.errors;

    if (errors && errors.length > 0) {
      message = errors[0]?.message || message;
      name = errors[0]?.name || name;
    }

    const errorObject = new Error();
    errorObject.message = message;
    errorObject.name = name;
    errorObject.status = status;
    return errorObject;
  }

  return parseError(error);
};

export default parseFrontendError;
