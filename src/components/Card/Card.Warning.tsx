import Button from '../Button/Button';
import { StyledWarning, WarningBody, WarningHeader, WarningInnner } from './Card.Warning.styled';

// interface Common extends React.HTMLAttributes<HTMLElement> {
//   children?: React.ReactNode;
// }

// interface WarningCallbacks {
//   onConfirm: () => void;
//   onCancel: () => void;
// }

export interface WarningProps {
  confirmButtonText?: string;
  cancelButtonText?: string;
  message?: React.ReactNode;
}

type Props = WarningProps & {
  onConfirm: () => void;
  onCancel: () => void;
};

const CardWarning = ({ message, confirmButtonText, cancelButtonText, onConfirm, onCancel }: Props) => {
  const deleteHandler: React.MouseEventHandler = (e) => {
    e.preventDefault();
    onConfirm && onConfirm();
  };

  const cancelHandler: React.MouseEventHandler = (e) => {
    e.preventDefault();
    onCancel && onCancel();
  };

  return (
    <StyledWarning>
      <WarningInnner>
        <WarningHeader>{message || 'Are you sure you want to proceed?'}</WarningHeader>
        <WarningBody>
          <Button
            variant="primary"
            aria-label="Delete for real"
            onClick={deleteHandler}
            className="c-card__warning__button-delete"
          >
            {confirmButtonText || 'Yep'}
          </Button>
          <Button
            variant="danger"
            aria-label="Cancel deletion"
            onClick={cancelHandler}
            className="c-card__warning__button-cancel"
          >
            {cancelButtonText || 'Nope'}
          </Button>
        </WarningBody>
      </WarningInnner>
    </StyledWarning>
  );
};

export default CardWarning;
