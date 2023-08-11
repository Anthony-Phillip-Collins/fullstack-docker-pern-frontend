import { removeAuthUser } from '../app/features/auth.slice';
import { useAppDispatch } from '../app/hooks';
import { ErrorNames } from '../types/errors.type';
import parseFrontendError from '../util/parseFrontendError';
import useNotification from './useNotification';

const useAsyncHandler = () => {
  const dispatch = useAppDispatch();
  const { notify } = useNotification();

  const tryCatch = async (promise: Promise<unknown>, message: string): Promise<typeof promise> => {
    try {
      let payload;
      if ('unwrap' in promise && promise.unwrap instanceof Function) {
        payload = await promise.unwrap();
      } else {
        payload = await promise;
      }
      notify(message);
      return payload;
    } catch (error) {
      console.log('ERROR!', error);

      const err = parseFrontendError(error);

      if (err?.name === ErrorNames.UserDisabled) {
        dispatch(removeAuthUser());
      }

      notify({ error });
    }
  };

  return {
    tryCatch,
  };
};

export default useAsyncHandler;
