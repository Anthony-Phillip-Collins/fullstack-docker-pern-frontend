import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';
import { BlogAttributes } from '../../types/blog.type';
import { UserAttributes } from '../../types/user.type';
import { renderWithProviders } from '../../util/jest';
import Blog from './Blog';

let blog: BlogAttributes;
let user: UserAttributes;

beforeAll(() => {
  user = {
    id: 1,
    name: 'John Doe',
    username: 'johndoe@foobar.com',
    admin: false,
    hashedPassword: '123456',
    disabled: false,
  };

  blog = {
    title: 'Overreacted',
    author: 'Dan Abramov',
    url: 'https://overreacted.io/',
    id: 1,
    likes: 99,
    year: 2023,
    ownerId: 1,
  };
});

describe('<Blog />', () => {
  it('should render the blog component', () => {
    renderWithProviders(<Blog blog={blog} />);

    const title = screen.getByText('Overreacted');
    expect(title).toBeInTheDocument();

    const author = screen.getByText('Dan Abramov');
    expect(author).toBeInTheDocument();

    const url = screen.getByText('https://overreacted.io/');
    expect(url).toBeInTheDocument();

    const year = screen.queryByText('2023');
    expect(year).toBeNull();

    const likes = screen.getByText('99');
    expect(likes).toBeInTheDocument();
  });

  it('should not have a bookmark button if callback isn’t provided', () => {
    renderWithProviders(<Blog blog={blog} />);

    const bookmark = screen.queryByTestId('bookmark');
    expect(bookmark).not.toBeInTheDocument();

    const more = screen.queryByTestId('more');
    expect(more).not.toBeInTheDocument();
  });

  it('should have a bookmark button if callback is provided', () => {
    renderWithProviders(<Blog blog={blog} onBookmark={() => null} />);

    const bookmark = screen.queryByTestId('bookmark');
    expect(bookmark).toBeInTheDocument();
  });

  it('should not have a more button if blog is not one of many', () => {
    renderWithProviders(<Blog blog={blog} />);

    const more = screen.queryByTestId('more');
    expect(more).not.toBeInTheDocument();
  });

  it('should have a more button if blog is one of many', () => {
    renderWithProviders(<Blog blog={blog} oneOfMany />);

    const more = screen.queryByTestId('more');
    expect(more).toBeInTheDocument();
  });

  it('should call the onBookmark callback when the bookmark button is clicked', () => {
    const onBookmark = jest.fn();
    renderWithProviders(<Blog blog={blog} onBookmark={onBookmark} />);

    const bookmark = screen.getByTestId('bookmark');
    bookmark.click();

    expect(onBookmark).toHaveBeenCalledTimes(1);
  });

  it('should have an edit button if callbacks are provided and user canEdit=true', () => {
    const onSave = jest.fn();
    const onDelete = jest.fn();
    renderWithProviders(<Blog blog={blog} user={user} onSave={onSave} onDelete={onDelete} canEdit />);

    const edit = screen.queryByTestId('edit');
    expect(edit).toBeInTheDocument();
  });

  it('should not have an edit button if callbacks are provided and user canEdit=false', () => {
    const onSave = jest.fn();
    const onDelete = jest.fn();
    renderWithProviders(<Blog blog={blog} user={user} onSave={onSave} onDelete={onDelete} />);

    const edit = screen.queryByTestId('edit');
    expect(edit).not.toBeInTheDocument();
  });

  it('should show delete and save buttons when edit button is clicked', () => {
    const onSave = jest.fn();
    const onDelete = jest.fn();
    renderWithProviders(<Blog blog={blog} user={user} onSave={onSave} onDelete={onDelete} canEdit />);

    const edit = screen.getByTestId('edit');
    expect(edit).toBeInTheDocument();

    fireEvent.click(edit);

    const save = screen.queryByTestId('save');
    expect(save).toBeInTheDocument();

    const del = screen.queryByTestId('delete');
    expect(del).toBeInTheDocument();
  });

  it('should show the warning dialog when delete button is clicked', () => {
    const onSave = jest.fn();
    const onDelete = jest.fn();
    renderWithProviders(<Blog blog={blog} user={user} onSave={onSave} onDelete={onDelete} canEdit />);

    const edit = screen.getByTestId('edit');
    fireEvent.click(edit);

    const del = screen.getByTestId('delete');
    fireEvent.click(del);

    const warning = screen.queryByTestId('warning');
    expect(warning).toBeInTheDocument();
  });
});
