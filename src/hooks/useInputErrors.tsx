import { useCallback, useEffect, useRef, useState } from 'react';

type Props<T> = {
  errors?: Error[] | null;
  inputFields: T;
};

export type UseInputErrorFields = Record<string, string>;

const useInputErrors = <T extends Record<string, string>>({ errors: errorArray, inputFields }: Props<T>) => {
  const [initialErrors, setInitialErrors] = useState<T>({} as T);
  const [errors, setErrors] = useState<T>(initialErrors);
  const hasErrors = () => Object.values(errors).some((error) => error !== '');
  const ref = useRef<T>({} as T);

  const getInitialErrors = useCallback(
    (state: T) => {
      const stateKeys = Object.keys(state);
      const keys = Object.keys(inputFields);
      if (stateKeys.join() === keys.join()) return state;
      const updated: Record<string, string> = {};
      keys.forEach((key) => {
        updated[key] = '';
      });
      return updated as T;
    },
    [inputFields],
  );

  useEffect(() => {
    setInitialErrors((state) => getInitialErrors(state));
  }, [getInitialErrors]);

  const updateErrorsOnInput = <T extends Record<string, string>>(
    input: T,
    state: T,
    current: keyof T,
  ): Record<Extract<keyof T, string>, string> => {
    const update = (key: keyof T) => {
      if (key === current) {
        return input[key] ? '' : state[key] || 'This field is mandatory.';
      } else {
        return state[key];
      }
    };
    const keys = Object.keys(state);
    const updated: Record<string, string> = {};
    keys.forEach((key) => {
      updated[key] = update(key);
    });
    const changed = keys.filter((key) => state[key] !== updated[key]).length > 0;
    return changed ? updated : state;
  };

  useEffect(() => {
    Object.keys(inputFields).forEach((key) => {
      if (inputFields[key] !== ref.current[key]) {
        setErrors((state) => updateErrorsOnInput(inputFields, state, key) as T);
      }
    });

    ref.current = inputFields;
  }, [inputFields]);

  const errorCallback = <T extends Record<string, string>>(): Record<Extract<keyof T, string>, string> => {
    if (!errorArray) return initialErrors;

    const updated: Record<string, string> = { ...initialErrors };
    const keys = Object.keys(updated);

    errorArray.forEach((error) => {
      keys.forEach((key) => {
        if (error.path === key) {
          updated[key] = error.message;
        }
      });
    });
    return updated;
  };

  const updateErrorsOnError = useCallback(errorCallback, [errorArray, initialErrors]);

  useEffect(() => {
    setErrors(updateErrorsOnError() as T);
  }, [updateErrorsOnError]);

  return { errors, hasErrors };
};

export default useInputErrors;
