import { styled } from 'styled-components';

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Author = styled.div`
  display: flex;
  flex-direction: row;
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: row;

  a {
    align-self: flex-start;
  }
`;

const Likes = styled.p`
  margin: 0;
  padding: 0;
`;

const IconControls = styled.div`
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

const BlogStyled = {
  Body,
  Author,
  LinkContainer,
  Likes,
  IconControls,
};

export default BlogStyled;
