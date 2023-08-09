import { useNavigate } from 'react-router-dom';
import userThunk from '../../app/features/user.slice';
import { useAppDispatch } from '../../app/hooks';
import useNotification from '../../hooks/useNotification';
import { UserAttributes } from '../../types/user.type';
import User, { UserProps } from './User';
import { routerUtils } from '../../routes';

export interface UserContainerProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  user: UserProps['user'];
  authUser: UserAttributes | null | undefined;
  oneOfMany?: UserProps['oneOfMany'];
}

const UserContainer = ({ children, user, authUser, oneOfMany, ...props }: UserContainerProps) => {
  const { notifyAsync } = useNotification();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const canEdit = !!(user?.id === authUser?.id);

  const onSave = (data: UserAttributes) => {
    notifyAsync(dispatch(userThunk.updateOne(data)), `${data.username} saved.`);
  };

  const onDelete = (data: UserAttributes) => {
    notifyAsync(dispatch(userThunk.deleteOne(data.username)), `${data.name} deleted.`);
  };

  const onMore = (data: UserAttributes) => {
    navigate(routerUtils.getUserPath(data.id));
  };

  const userProps = {
    user,
    canEdit,
    oneOfMany,
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
