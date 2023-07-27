import { styled } from 'styled-components';
import { BlogInnerProps } from './Blog';

export const StyledBlog = styled.article`
  position: relative;
  display: flex;
  flex-basis: 100%;
  overflow: hidden;
  margin: 0.5rem;
  ${({ theme }) => ({
    borderRadius: theme.global.borderRadius,
  })};
`;

export const Warning = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
`;

export const WarningInnner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  ${({ theme }) => ({
    padding: theme.spacing.lg,
  })};
`;

export const WarningHeader = styled.p`
  margin-top: 0;
`;

export const WarningBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  .c-blog__warning__button-delete,
  .c-blog__warning__button-cancel {
    margin-left: ${({ theme }) => theme.spacing.xl};
    margin-right: ${({ theme }) => theme.spacing.xl};
  }
`;

export const BlogInner = styled.div.withConfig({
  shouldForwardProp: (prop) => !['warning'].includes(prop),
})<BlogInnerProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0;
  ${({ warning }) => ({
    filter: warning ? 'blur(0.25rem)' : 'none',
  })};
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  ${({ theme }) => ({
    backgroundColor: theme.colors.grey,
    padding: theme.spacing.lg,
  })};

  .c-blog__title {
    margin: 0;
    padding: 0;
    text-overflow: ellipsis;
    overflow: hidden;
    background-color: transparent;
    color: inherit;

    ${({ theme }) => ({
      ...theme.fonts.h2,
      fontFamily: theme.global.fontFamily,
      marginRight: theme.spacing.lg,
    })};
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  ${({ theme }) => ({
    backgroundColor: theme.colors.greyVariant,
    padding: theme.spacing.lg,
  })};

  .c-blog__url-link {
    align-self: flex-start;
  }
`;

export const BodyHeading = styled.h3`
  display: flex;
  margin: 0;
  padding: 0;

  .c-blog__author {
    margin-left: 0.5rem;
  }
`;

export const Likes = styled.p`
  margin: 0;
  padding: 0;
`;

export const Edit = styled.div`
  display: flex;
  justify-content: space-between;
  ${({ theme }) => ({
    marginTop: theme.spacing.lg,
  })};
`;
