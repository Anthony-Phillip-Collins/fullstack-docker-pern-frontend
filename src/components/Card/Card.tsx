import { Ref, forwardRef, useImperativeHandle, useState } from 'react';
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
    disabled?: boolean;
    owned?: boolean;
  };

export interface CardInnerProps {
  warning?: boolean;
}

export interface CardRef {
  close: () => void;
}

const Styled = CardStyled;

const Card = forwardRef(
  (
    {
      children,
      header,
      warningProps,
      enableEdit,
      uid,
      disabled,
      owned,
      onSave,
      onDelete,
      onCancel,
      onEdit,
      onWarning,
    }: CardProps,
    ref: Ref<CardRef>,
  ) => {
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

    const toggle = () => {
      if (editable) {
        cancel();
      } else {
        edit(true);
      }
    };

    const save = () => {
      onSave && onSave();
    };

    const remove = () => {
      edit(false);
      warn(true);
    };

    const cancel = () => {
      edit(false);
      warn(false);
      onCancel && onCancel();
    };

    const deleteForReal = () => {
      warn(false);
      onDelete && onDelete();
    };

    useImperativeHandle(ref, (): CardRef => ({ close: cancel }));

    return (
      <Styled.Card>
        {warning && <CardWarning onConfirm={deleteForReal} onCancel={cancel} {...warningProps} />}
        <Styled.Inner warning={warning}>
          <Styled.Header owned={owned}>
            {header}
            {isEnabled && (
              <IconButton
                iconProps={{ icon: editable ? 'editOff' : 'edit' }}
                onClick={() => toggle()}
                label={editable ? `Cancel` : `Edit`}
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
                  <Button variant="danger" aria-label="Delete" onClick={() => remove()} disabled={disabled}>
                    Delete
                  </Button>
                )}
                {onSave && (
                  <Button variant="primary" aria-label="Save" onClick={() => save()} disabled={disabled}>
                    Save
                  </Button>
                )}
              </Styled.Edit>
            )}
          </Styled.Body>
        </Styled.Inner>
      </Styled.Card>
    );
  },
);

Card.displayName = 'Card';

export default Card;
