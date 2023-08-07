import { styled } from 'styled-components';

export const StyledPageTitleContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const StyledPageTitle = styled.h1`
  margin-right: ${({ theme }) => theme.spacing.xl};
`;
