import { styled } from 'styled-components';

export const StyledBlogsHeadingContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const StyledBlogsHeading = styled.h1`
  margin-right: ${({ theme }) => theme.spacing.xl};
`;
