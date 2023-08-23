import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { BlogAttributes } from '../../types/blog.type';
import { renderWithTheme } from '../../util/jest';
import Blog from './Blog';

describe('Blog', () => {
  it('should render the blog component', () => {
    const blog: BlogAttributes = {
      author: 'author',
      title: 'title',
      url: 'url',
      id: 1,
      likes: 1,
      year: 2023,
    };

    renderWithTheme(<Blog blog={blog} />);

    expect(screen.getByText('author')).toBeInTheDocument();
  });
});
