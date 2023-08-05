import { useState } from 'react';
import Button from '../Button/Button';
import { Body, CardInner, Edit, Header, StyledCard } from '../Card/Card.styled';
import IconButton from '../IconButton/IconButton';
import CardWarning, { WarningProps } from './Card.Warning';
import { Tooltip } from 'react-tooltip';

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
    uid?: string;
  };

const Card = ({ children, header, warningProps, enableEdit, uid, onSave, onDelete, onEdit, onWarning }: Props) => {
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

  const editConfig = {
    id: `edit-card-${uid || ''}`,
    label: editable ? `Cancel edit` : `Edit`,
  };

  return (
    <StyledCard>
      {warning && <CardWarning onConfirm={deleteForRealHandler} onCancel={cancelHandler} {...warningProps} />}
      <CardInner warning={warning}>
        <Header>
          {header}
          {isEnabled && (
            <>
              <IconButton
                iconProps={{ icon: editable ? 'editOff' : 'edit' }}
                onClick={() => edit(!editable)}
                aria-label={editConfig.label}
                data-tooltip-id={editConfig.id}
                {...tabIndex}
              />
              {uid && <Tooltip id={editConfig.id} place="bottom" variant="dark" content={editConfig.label} />}
            </>
          )}
        </Header>

        <Body>
          {children}
          {isEnabled && editable && (
            <Edit>
              {onSave && (
                <Button variant="primary" aria-label="Save" onClick={saveHandler}>
                  Save
                </Button>
              )}
              {onDelete && (
                <Button variant="danger" aria-label="Delete" onClick={deleteHandler}>
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
