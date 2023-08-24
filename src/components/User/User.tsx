import { Ref, forwardRef, useImperativeHandle, useRef, useState } from 'react';
import useInputErrors, { UseInputErrorFields } from '../../hooks/useInputErrors';
import { routerUtils } from '../../routes';
import { UserAttributes, UserUpdateAsAdminInput } from '../../types/user.type';
import dateToString from '../../util/dateToString';
import Card, { CardRef } from '../Card/Card';
import CardStyled from '../Card/Card.styled';
import Editable, { EditableRef } from '../Editable/Editable';
import IconButton from '../IconButton/IconButton';
import InternalLink from '../Link/InternalLink';

interface Common extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

interface CardImplementer {
  onSave?: (data: UserAttributes) => void;
  onDelete?: (data: UserAttributes) => void;
  onMore?: (data: UserAttributes) => void;
  onCancel?: () => void;
}

export type UserProps = CardImplementer &
  Common & {
    user: UserAttributes;
    authUser?: UserAttributes | null;
    canEdit?: boolean;
    oneOfMany?: boolean;
    errors?: Error[] | null;
  };

interface InputFields {
  name: string;
}

type InputErrorFields = InputFields & UseInputErrorFields;

export interface UserRef {
  saved: () => void;
}

const User = forwardRef(
  (
    { children, user, authUser, canEdit, oneOfMany, errors: errorArray, onSave, onDelete, onMore, onCancel }: UserProps,
    ref: Ref<UserRef>,
  ) => {
    const [editable, setEditable] = useState(false);
    const [warning, setWarning] = useState(false);
    const enableEdit = !!(canEdit && (onSave || onDelete));
    const tabIndex = { tabIndex: warning ? -1 : 0 };
    const name = useRef<EditableRef>(null);
    const cardRef = useRef<CardRef>(null);
    const [inputFields, setInputFields] = useState<InputErrorFields>({
      name: user.name,
    });
    const { errors, hasErrors } = useInputErrors<InputErrorFields>({
      errors: errorArray,
      inputFields,
    });

    const updateInputFields = (key: keyof InputFields, value: string) => {
      const updated = { ...inputFields, [key]: value };
      setInputFields(updated);
    };

    const closeCard = () => {
      cardRef?.current?.close();
    };

    const save = () => {
      const update: UserUpdateAsAdminInput = {};

      if (name && name.current && name.current.value) {
        update.name = name.current.value;
      }

      if (Object.keys(update).length > 0) {
        const data: UserAttributes = { ...user, ...update };
        onSave && onSave(data);
      }
    };

    const remove = () => {
      onDelete && onDelete(user);
    };

    const cancel = () => {
      onCancel && onCancel();
    };

    const moreHandler: React.MouseEventHandler = (e) => {
      e.preventDefault();
      onMore && onMore(user);
    };

    useImperativeHandle(
      ref,
      (): UserRef => ({
        saved: closeCard,
      }),
    );

    if (!user) return null;

    return (
      <Card
        enableEdit={enableEdit}
        onSave={save}
        onDelete={remove}
        onEdit={setEditable}
        onWarning={setWarning}
        onCancel={cancel}
        header={
          <Editable
            tagName="h2"
            ref={name}
            initialValue={user.name}
            disabled={!editable}
            error={errors?.name}
            onUpdate={(value) => updateInputFields('name', value)}
            onEnter={() => save()}
            onEscape={closeCard}
          />
        }
        uid={`${user.id}`}
        ref={cardRef}
        disabled={hasErrors()}
        owned={authUser?.id === user.id}
      >
        {<div style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>{user.username}</div>}
        {!oneOfMany && <div>{`Id: ${user.id}`}</div>}
        {user.disabled && <div>logged out</div>}
        <div>{`Privileges: ${user.admin ? 'Admin' : 'User'}`}</div>
        {!oneOfMany && <div>{`Created: ${dateToString(user?.createdAt)}`}</div>}
        {!oneOfMany && <div>{`Updated: ${dateToString(user?.updatedAt)}`}</div>}

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
  },
);

User.displayName = 'User';

const UserReadings = ({ readings }: Pick<UserAttributes, 'readings'>) => {
  const hasReadings = readings && readings.length > 0;
  const heading = readings && <div>{`Readings: ${!hasReadings && ' none'}`}</div>;

  return (
    <div>
      {heading}
      {heading && hasReadings && (
        <ul>
          {readings.map((reading) => (
            <>
              <li key={reading.id}>
                <InternalLink to={routerUtils.getBlogPath(reading.id)}>{reading.title}</InternalLink>{' '}
                {reading.reading.read ? '(read)' : '(unread)'}
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
  const heading = blogs && <div>{`Blogs: ${!hasBlogs && ' none'}`}</div>;

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
