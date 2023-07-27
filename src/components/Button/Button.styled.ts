import { styled } from 'styled-components';
import { ButtonProps } from './Button';
import { ColorVariants, FontWeight } from '../../styles/types';
import mixins from '../../styles/mixins';

export const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['variant'].includes(prop),
})<ButtonProps>`
  border: none;
  cursor: pointer;
  display: inline-block;
  text-decoration: none;

  ${(props) => {
    const { theme } = props;
    const variant: ColorVariants = props.variant || 'primary';
    const variantTitleCase = variant.substring(0, 1).toUpperCase() + variant.substring(1);
    const textOnVariant =
      `textOn${variantTitleCase}` as keyof typeof theme.colors; /* textOnPrimary or textOnSecondary */

    return {
      ...theme.fonts.body,
      fontWeight: FontWeight.medium,
      backgroundColor: theme.colors[variant],
      color: theme.colors[textOnVariant],
      borderRadius: theme.global.borderRadius,
      padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
      ...mixins.transition('background-color'),
      '&:hover': {
        backgroundColor: theme.colors[`${variant}Variant`],
      },
    };
  }};
`;
