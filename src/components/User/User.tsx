import { useRef, useState } from 'react';
import { routerUtils } from '../../routes';
import { UserAttributes, UserUpdateAsAdminInput } from '../../types/user.type';
import dateToString from '../../util/dateToString';
import Card, { CardProps } from '../Card/Card';
import CardStyled from '../Card/Card.styled';
import Editable, { EditableRef } from '../Editable/Editable';
import IconButton from '../IconButton/IconButton';
import InternalLink from '../Link/InternalLink';

interface Common extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export interface UserCallbacks {
  onSave?: (user: UserAttributes) => void;
  onDelete?: (user: UserAttributes) => void;
  onMore: (user: UserAttributes) => void;
}

export type UserProps = UserCallbacks &
  Common &
  Pick<CardProps, 'type'> & {
    user: UserAttributes;
    canEdit?: boolean;
    oneOfMany?: boolean;
  };

const User = ({ children, user, canEdit, oneOfMany, type, onSave, onDelete, onMore }: UserProps) => {
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
      type={type}
    >
      {<div style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>{user.username}</div>}
      {!oneOfMany && <div>Id: {user.id}</div>}
      {user.disabled && <div>logged out</div>}
      <div>Privileges: {user.admin ? 'Admin' : 'User'}</div>
      {!oneOfMany && <div>Created: {dateToString(user?.createdAt)}</div>}
      {!oneOfMany && <div>Updated: {dateToString(user?.updatedAt)}</div>}

      {!oneOfMany && <UserBlogs blogs={user?.blogs} />}

      {!oneOfMany && <UserReadings readings={user?.readings} />}

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

const UserReadings = ({ readings }: Pick<UserAttributes, 'readings'>) => {
  const hasReadings = readings && readings.length > 0;
  const heading = readings && <div>Readings: {!hasReadings && ' none'}</div>;

  return (
    <div>
      {heading}
      {heading && hasReadings && (
        <ul>
          {readings.map((reading) => (
            <>
              <li key={reading.id}>
                <InternalLink to={routerUtils.getBlogPath(reading.id)}>{reading.title}</InternalLink> -{' '}
                {reading.reading.read ? 'read' : 'unread'}
              </li>
            </>
          ))}
        </ul>
      )}
    </div>
  );
};

const UserBlogs = ({ blogs }: Pick<UserAttributes, 'blogs'>) => {
  const hasBlogs = blogs && blogs.length > 0;
  const heading = blogs && <div>Blogs: {!hasBlogs && ' none'}</div>;

  return (
    <div>
      {heading}
      {heading && hasBlogs && (
        <>
          {blogs && blogs.length > 0 && (
            <>
              <ul>
                {blogs.map((blog) => (
                  <li key={blog.id}>
                    <InternalLink to={routerUtils.getBlogPath(blog.id)}>{blog.title}</InternalLink>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default User;
