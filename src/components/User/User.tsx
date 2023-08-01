import { useRef, useState } from 'react';
import { UserAttributes, UserUpdateAsAdminInput } from '../../types/user.type';
import Card from '../Card/Card';
import Editable, { EditableRef } from '../Editable/Editable';

interface Common extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export interface UserCallbacks {
  onSave?: (user: UserAttributes) => void;
  onDelete?: (user: UserAttributes) => void;
}

type Props = UserCallbacks &
  Common & {
    user: UserAttributes;
  };

const User = ({ children, user, onSave, onDelete }: Props) => {
  const [editable, setEditable] = useState(false);

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

  if (!user) return null;
  console.log(user);
  return (
    <Card
      onSave={onSave && saveHandler}
      onDelete={onDelete && deleteHandler}
      onEdit={setEditable}
      header={<Editable tagName="h2" ref={name} initialValue={user.name} disabled={!editable} />}
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
                <li key={blog.id}>{blog.title}</li>
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
                <li key={reading.id}>{reading.title}</li>
              ))}
            </ul>
          </>
        )}
      </div>
      {children}
    </Card>
  );
};

export default User;
