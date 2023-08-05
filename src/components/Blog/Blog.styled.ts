import { styled } from 'styled-components';

export const BlogBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const BlogAuthor = styled.div`
  display: flex;
  flex-direction: row;
`;

export const BlogLinkContainer = styled.div`
  display: flex;
  flex-direction: row;

  a {
    align-self: flex-start;
  }
`;

export const BlogLikes = styled.p`
  margin: 0;
  padding: 0;
`;

export const IconControls = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  ${({ theme }) => ({
    paddingTop: theme.spacing.lg,
    ['> *']: {
      marginRight: theme.spacing.xl,
    },
  })}
`;
