import ContentEditable from 'react-contenteditable';
import { styled } from 'styled-components';

interface StyledContentEditableProps {
  disabled?: boolean;
  error?: boolean;
}

const Editable = styled(ContentEditable).withConfig({
  shouldForwardProp: (prop) => !['disabled', 'error'].includes(prop),
})<StyledContentEditableProps>`
  ${({ theme, disabled, error }) => {
    const styles = disabled
      ? {}
      : {
          borderWidth: '1px 0 1px 0',
          borderStyle: 'dashed',
          borderColor: error ? theme.colors.danger : 'rgba(255, 255, 255, 0.5)',
          backgroundColor: error ? 'rgba(255, 0, 0, 0.1) !important' : 'rgba(255, 255, 255, 0.1) !important',
          padding: `${theme.spacing.md} !important`,
          flexGrow: '1',
          '&:focus': {
            border: '2px dashed white',
          },
        };
    return {
      ...styles,
    };
  }}
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ErrorField = styled.span`
  ${({ theme }) => ({
    color: theme.colors.danger,
    fontSize: theme.fonts.detail.fontSize,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: `0 ${theme.spacing.md} !important`,
  })};
`;

const StyledContentEditable = {
  Wrapper,
  Editable,
  ErrorField,
};

export default StyledContentEditable;
