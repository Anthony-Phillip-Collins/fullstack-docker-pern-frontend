import { useState } from 'react';
import Button from '../Button/Button';
import { Body, CardInner, Edit, Header, StyledCard } from '../Card/Card.styled';
import IconButton from '../IconButton/IconButton';
import CardWarning, { WarningProps } from './Card.Warning';

interface Common extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export interface CardCallbacks {
  onSave?: () => void;
  onDelete?: () => void;
  onEdit?: (state: boolean) => void;
  onWarning?: (state: boolean) => void;
}

type Props = CardCallbacks &
  Common & {
    header: React.ReactNode;
    warningProps?: WarningProps;
    enableEdit?: boolean;
  };

const Card = ({ children, header, warningProps, enableEdit, onSave, onDelete, onEdit, onWarning }: Props) => {
  const [editable, setEditable] = useState(false);
  const [warning, setWarning] = useState(false);

  const tabIndex = { tabIndex: warning ? -1 : 0 };
  const isEnabled = enableEdit && (onDelete || onSave);

  const edit = (state: boolean) => {
    setEditable(state);
    onEdit && onEdit(state);
  };

  const warn = (state: boolean) => {
    setWarning(state);
    onWarning && onWarning(state);
  };

  const saveHandler: React.MouseEventHandler = (e) => {
    e.preventDefault();
    edit(false);
    onSave && onSave();
  };

  const deleteHandler: React.MouseEventHandler = (e) => {
    e.preventDefault();
    edit(false);
    warn(true);
  };

  const cancelHandler = () => {
    edit(false);
    warn(false);
  };

  const deleteForRealHandler = () => {
    warn(false);
    onDelete && onDelete();
  };

  const headerIconButton = editable ? (
    <IconButton
      iconProps={{ icon: 'cancel', size: 'xl' }}
      onClick={() => edit(false)}
      aria-label="Cancel edit"
      {...tabIndex}
    />
  ) : (
    <IconButton
      iconProps={{ icon: 'edit', size: 'xl' }}
      onClick={() => edit(true)}
      aria-label="Edit user"
      {...tabIndex}
    />
  );

  return (
    <StyledCard>
      {warning && <CardWarning onConfirm={deleteForRealHandler} onCancel={cancelHandler} {...warningProps} />}
      <CardInner warning={warning}>
        <Header>
          {header}
          {isEnabled && headerIconButton}
        </Header>

        <Body>
          {children}
          {isEnabled && editable && (
            <Edit>
              {onSave && (
                <Button variant="primary" aria-label="Save user" onClick={saveHandler}>
                  Save
                </Button>
              )}
              {onDelete && (
                <Button variant="danger" aria-label="Delete user" onClick={deleteHandler}>
                  Delete
                </Button>
              )}
            </Edit>
          )}
        </Body>
      </CardInner>
    </StyledCard>
  );
};

export default Card;
