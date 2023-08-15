import { Ref, forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { routerUtils } from '../../routes';
import { UserAttributes, UserUpdateAsAdminInput } from '../../types/user.type';
import dateToString from '../../util/dateToString';
import Card, { CardProps, CardRef } from '../Card/Card';
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
  onCancel?: () => void;
}

export type UserProps = UserCallbacks &
  Common &
  Pick<CardProps, 'type'> & {
    user: UserAttributes;
    canEdit?: boolean;
    oneOfMany?: boolean;
    errors?: Error[] | null;
  };

interface InputFields {
  name: string;
}

export interface UserRef {
  saved: () => void;
}

const User = forwardRef(
  (
    { children, user, canEdit, oneOfMany, type, errors: errorArray, onSave, onDelete, onMore, onCancel }: UserProps,
    ref: Ref<UserRef>,
  ) => {
    const [editable, setEditable] = useState(false);
    const [warning, setWarning] = useState(false);
    const enableEdit = !!(canEdit && (onSave || onDelete));
    const tabIndex = { tabIndex: warning ? -1 : 0 };
    const name = useRef<EditableRef>(null);
    const cardRef = useRef<CardRef>(null);

    const initialErrors: InputFields = useMemo(
      () => ({
        name: '',
      }),
      [],
    );
    const [errors, setErrors] = useState<InputFields>(initialErrors);
    const hasErrors = () => {
      return Object.values(errors).some((error) => error !== '');
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
      onMore(user);
    };

    const changeHandler = (key: keyof InputFields) => {
      setErrors((state) => {
        const input: InputFields = {
          name: name?.current?.value || '',
        };
        return updateErrorsOnInput(input, state, key);
      });
    };

    const updateErrorsOnInput = (input: InputFields, state: InputFields, current: keyof InputFields) => {
      const update = (key: keyof InputFields) => {
        if (key === current) {
          return input[key] ? '' : state[key] || 'This field is mandatory.';
        } else {
          return state[key];
        }
      };
      const keys = Object.keys(state) as Array<keyof InputFields>;
      const updated = keys.reduce((obj, key) => {
        obj[key] = update(key);
        return obj;
      }, {} as InputFields);
      const changed = keys.filter((key) => state[key] !== updated[key]).length > 0;
      return changed ? updated : state;
    };

    useEffect(() => {
      if (errorArray) {
        const updated = { ...initialErrors };
        const keys = Object.keys(updated) as Array<keyof InputFields>;
        errorArray.forEach((error) => {
          keys.forEach((key) => {
            if (error.path === key) {
              updated[key] = error.message;
            }
          });
        });
        setErrors(updated);
      } else {
        setErrors(initialErrors);
      }
    }, [errorArray, initialErrors]);

    useImperativeHandle(
      ref,
      (): UserRef => ({
        saved: () => {
          cardRef?.current?.close();
        },
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
            onChange={() => changeHandler('name')}
          />
        }
        uid={`${user.id}`}
        type={type}
        ref={cardRef}
        disabled={hasErrors()}
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
  },
);

User.displayName = 'User';

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
