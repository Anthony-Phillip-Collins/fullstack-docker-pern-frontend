import Button from '../Button/Button';
import CardWarningStyled from './Card.Warning.styled';

export interface WarningProps {
  confirmButtonText?: string;
  cancelButtonText?: string;
  message?: React.ReactNode;
}

type Props = WarningProps & {
  onConfirm: () => void;
  onCancel: () => void;
};

const Styled = CardWarningStyled;

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
    <Styled.Warning>
      <Styled.Inner>
        <Styled.Header>{message || 'Are you sure you want to proceed?'}</Styled.Header>
        <Styled.Body>
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
        </Styled.Body>
      </Styled.Inner>
    </Styled.Warning>
  );
};

export default CardWarning;
