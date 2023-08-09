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

const Readers = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  > :first-child {
    margin-right: 0.5rem;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    flex-direction: row;
  }

  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 0.5rem;
    position: relative;

    &::after {
      content: ', ';
      margin-left: 0.2rem;
    }

    &:last-child::after {
      content: '';
    }
  }
`;

const BlogStyled = {
  Body,
  Author,
  LinkContainer,
  Likes,
  Readers,
};

export default BlogStyled;
