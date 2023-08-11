import { useNavigate } from 'react-router-dom';
import userThunk from '../../app/features/user.slice';
import { useAppDispatch } from '../../app/hooks';
import useAsyncHandler from '../../hooks/useAsyncHandler';
import { routerUtils } from '../../routes';
import { UserAttributes } from '../../types/user.type';
import User, { UserProps } from './User';

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

  const onSave = (data: UserAttributes) => {
    tryCatch(dispatch(userThunk.updateOne(data)), `${data.username} saved.`);
  };

  const onDelete = (data: UserAttributes) => {
    tryCatch(dispatch(userThunk.deleteOne(data.username)), `${data.name} deleted.`);
  };

  const onMore = (data: UserAttributes) => {
    navigate(routerUtils.getUserPath(data.id));
  };

  const userProps = {
    user,
    canEdit,
    oneOfMany,
    type,
    onSave,
    onDelete,
    onMore,
  };

  return (
    <>
      <User {...userProps} {...props}>
        {children}
      </User>
    </>
  );
};

export default UserContainer;
