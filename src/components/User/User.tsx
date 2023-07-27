import { useRef, useState } from 'react';
import { UserAttributes, UserUpdateAsAdminInput } from '../../types/user.type';
import Card from '../Card/Card';
import Editable, { EditableRef } from '../Editable/Editable';

export interface UserCallbacks {
  onUpdate: (user: UserAttributes) => void;
  onDelete: (user: UserAttributes) => void;
}

interface Props extends UserCallbacks {
  user: UserAttributes;
}

const User = ({ user, onUpdate, onDelete }: Props) => {
  const [editable, setEditable] = useState(false);

  const name = useRef<EditableRef>(null);

  const saveHandler = () => {
    const update: UserUpdateAsAdminInput = {};

    if (name && name.current && name.current.value) {
      update.name = name.current.value;
    }

    if (Object.keys(update).length > 0) {
      const data: UserAttributes = { ...user, ...update };
      onUpdate(data);
    }
  };

  const deleteHandler = () => {
    onDelete(user);
  };

  return (
    <Card
      onSave={saveHandler}
      onDelete={deleteHandler}
      onEdit={setEditable}
      header={<Editable tagName="h2" ref={name} initialValue={user.name} disabled={!editable} />}
    >
      {user.username}
    </Card>
  );
};

export default User;
