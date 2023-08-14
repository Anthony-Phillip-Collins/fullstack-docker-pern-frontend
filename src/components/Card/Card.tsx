import { useState } from 'react';
import Button from '../Button/Button';
import CardStyled from '../Card/Card.styled';
import IconButton from '../IconButton/IconButton';
import CardWarning, { WarningProps } from './Card.Warning';

interface Common extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export interface CardCallbacks {
  onSave?: () => void;
  onDelete?: () => void;
  onCancel?: () => void;
  onEdit?: (state: boolean) => void;
  onWarning?: (state: boolean) => void;
}

export type CardProps = CardCallbacks &
  Common & {
    header: React.ReactNode;
    warningProps?: WarningProps;
    enableEdit?: boolean;
    uid?: string;
    type?: 'primary';
  };

export interface CardInnerProps {
  warning?: boolean;
}

const Styled = CardStyled;

const Card = ({
  children,
  header,
  warningProps,
  enableEdit,
  uid,
  type,
  onSave,
  onDelete,
  onCancel,
  onEdit,
  onWarning,
}: CardProps) => {
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
    onCancel && onCancel();
  };

  const deleteForRealHandler = () => {
    warn(false);
    onDelete && onDelete();
  };

  return (
    <Styled.Card>
      {warning && <CardWarning onConfirm={deleteForRealHandler} onCancel={cancelHandler} {...warningProps} />}
      <Styled.Inner warning={warning}>
        <Styled.Header type={type}>
          {header}
          {isEnabled && (
            <IconButton
              iconProps={{ icon: editable ? 'editOff' : 'edit' }}
              onClick={() => edit(editable ? false : true)}
              label={editable ? `Cancel editing card` : `Edit card`}
              tooltipId={uid && `edit-card-${uid}`}
              {...tabIndex}
            />
          )}
        </Styled.Header>

        <Styled.Body>
          {children}
          {isEnabled && editable && (
            <Styled.Edit>
              {onDelete && (
                <Button variant="danger" aria-label="Delete" onClick={deleteHandler}>
                  Delete
                </Button>
              )}
              {onSave && (
                <Button variant="primary" aria-label="Save" onClick={saveHandler}>
                  Save
                </Button>
              )}
            </Styled.Edit>
          )}
        </Styled.Body>
      </Styled.Inner>
    </Styled.Card>
  );
};

export default Card;
