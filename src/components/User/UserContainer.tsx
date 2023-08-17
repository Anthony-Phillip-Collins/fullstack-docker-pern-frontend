import { useNavigate } from 'react-router-dom';
import userThunk from '../../app/features/user.slice';
import { useAppDispatch } from '../../app/hooks';
import useAsyncHandler from '../../hooks/useAsyncHandler';
import { routerUtils } from '../../routes';
import { UserAttributes } from '../../types/user.type';
import User, { UserProps, UserRef } from './User';
import { isErrorResponse } from '../../types/utils/parsers/error.parser';
import { useRef, useState } from 'react';

export interface UserContainerProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  user: UserProps['user'];
  authUser?: UserAttributes | null | undefined;
  oneOfMany?: UserProps['oneOfMany'];
}

const UserContainer = ({ children, user, authUser, oneOfMany, ...props }: UserContainerProps) => {
  const { tryCatch } = useAsyncHandler();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const canEdit = !!(user?.id === authUser?.id || authUser?.admin);
  const type: UserProps['type'] = authUser && authUser.id === user?.id ? 'primary' : undefined;
  const [error, setError] = useState<Error | null>();
  const userRef = useRef<UserRef>(null);

  const onSave = async (data: UserAttributes) => {
    const response = await tryCatch(dispatch(userThunk.updateOne(data)), `${data.username} saved.`);
    if (isErrorResponse(response)) {
      setError(response.error);
    } else {
      reset();
      userRef?.current?.saved();
    }
  };

  const reset = () => {
    setError(null);
  };

  const onDelete = (data: UserAttributes) => {
    tryCatch(dispatch(userThunk.deleteOne(data.username)), `${data.name} deleted.`);
  };

  const onMore = (data: UserAttributes) => {
    navigate(routerUtils.getUserPath(data.id));
  };

  const onCancel = () => {
    reset();
  };

  const userProps = {
    user,
    canEdit,
    oneOfMany,
    type,
    onSave,
    onDelete,
    onMore,
    onCancel,
  };

  return (
    <>
      <User {...userProps} {...props} errors={error?.errors} ref={userRef}>
        {children}
      </User>
    </>
  );
};

export default UserContainer;
