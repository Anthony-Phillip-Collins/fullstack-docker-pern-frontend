import { styled } from 'styled-components';
import mixins from '../../styles/mixins';
import { FontWeight } from '../../styles/types';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 400px;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${({ theme }) => ({
    marginBottom: theme.spacing.lg,
  })};
`;

export const StyledInput = styled.input.withConfig({
  shouldForwardProp: (prop) => !['error'].includes(prop),
})<{ error: boolean }>`
  background-color: transparent;
  border-width: 0.1rem;
  border-style: solid;

  ${({ theme, error }) => ({
    padding: theme.spacing.lg,
    color: theme.colors.light,
    borderRadius: theme.global.borderRadius,
    borderColor: error ? theme.colors.dangerVariant : 'rgba(255, 255, 255, 0.5)',

    '&:hover': {
      borderColor: theme.colors.light,
    },

    ...mixins.transition('border-color'),
  })};
`;

export const InputLabel = styled.label`
  display: inline-flex;
  flex-direction: column;
  ${() => ({
    fontWeight: FontWeight.medium,
  })};
`;

export const LabelText = styled.span`
  ${({ theme }) => ({
    marginBottom: theme.spacing.md,
  })};
`;

export const InputError = styled.span`
  ${({ theme }) => ({
    color: theme.colors.dangerVariant,
    marginTop: theme.spacing.md,
    fontSize: theme.fonts.detail.fontSize,
  })};
`;

export const FormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => ({
    marginTop: theme.spacing.lg,
  })};
`;
