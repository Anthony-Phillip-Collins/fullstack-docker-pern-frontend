import { useRef, useState } from 'react';
import { UserAttributes, UserUpdateAsAdminInput } from '../../types/user.type';
import Card from '../Card/Card';
import Editable, { EditableRef } from '../Editable/Editable';
import IconButton from '../IconButton/IconButton';
import CardStyled from '../Card/Card.styled';
import InternalLink from '../Link/InternalLink';
import { routerUtils } from '../../routes';

interface Common extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export interface UserCallbacks {
  onSave?: (user: UserAttributes) => void;
  onDelete?: (user: UserAttributes) => void;
  onMore: (user: UserAttributes) => void;
}

export type UserProps = UserCallbacks &
  Common & {
    user: UserAttributes;
    canEdit?: boolean;
    oneOfMany?: boolean;
  };

const User = ({ children, user, canEdit, oneOfMany, onSave, onDelete, onMore }: UserProps) => {
  const [editable, setEditable] = useState(false);
  const [warning, setWarning] = useState(false);
  const enableEdit = !!(canEdit && (onSave || onDelete));
  const tabIndex = { tabIndex: warning ? -1 : 0 };
  const name = useRef<EditableRef>(null);

  const saveHandler = () => {
    const update: UserUpdateAsAdminInput = {};

    if (name && name.current && name.current.value) {
      update.name = name.current.value;
    }

    if (Object.keys(update).length > 0) {
      const data: UserAttributes = { ...user, ...update };
      onSave && onSave(data);
    }
  };

  const deleteHandler = () => {
    onDelete && onDelete(user);
  };

  const moreHandler: React.MouseEventHandler = (e) => {
    e.preventDefault();
    onMore(user);
  };

  if (!user) return null;

  return (
    <Card
      enableEdit={enableEdit}
      onSave={onSave && saveHandler}
      onDelete={onDelete && deleteHandler}
      onEdit={setEditable}
      onWarning={setWarning}
      header={<Editable tagName="h2" ref={name} initialValue={user.name} disabled={!editable} />}
      uid={`${user.id}`}
    >
      {user.username}
      {user.disabled && <div>disabled!</div>}
      <div>Privileges: {user.admin ? 'Admin' : 'User'}</div>

      <div>
        {user.blogs && user.blogs.length > 0 && (
          <>
            <h3>Blogs</h3>
            <ul>
              {user.blogs.map((blog) => (
                <li key={blog.id}>
                  <InternalLink to={routerUtils.getBlogPath(blog.id)}>{blog.title}</InternalLink>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div>
        {user.readings && user.readings.length > 0 && (
          <>
            <h3>Readings</h3>
            <ul>
              {user.readings.map((reading) => (
                <li key={reading.id}>
                  <InternalLink to={routerUtils.getBlogPath(reading.id)}>{reading.title}</InternalLink> -{' '}
                  {reading.reading.read ? 'read' : 'unread'}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <CardStyled.IconControls>
        {oneOfMany && (
          <IconButton
            iconProps={{ icon: 'more' }}
            onClick={moreHandler}
            label="Read more"
            tooltipId={`more${user.id}`}
            {...tabIndex}
          />
        )}
      </CardStyled.IconControls>

      {children}
    </Card>
  );
};

export default User;
