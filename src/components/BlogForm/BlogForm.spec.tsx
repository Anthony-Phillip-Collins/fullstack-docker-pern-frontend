import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../util/jest';
import BlogCreateForm from './BlogForm';
import { BlogCreation } from '../../types/blog.type';

describe('<BlogForm />', () => {
  it('should render the blog form', () => {
    const onFormSubmit = jest.fn();
    renderWithProviders(<BlogCreateForm onFormSubmit={onFormSubmit} />);

    const title = screen.getByText('Title');
    expect(title).toBeInTheDocument();

    const author = screen.getByText('Author');
    expect(author).toBeInTheDocument();

    const url = screen.getByText('URL');
    expect(url).toBeInTheDocument();

    const create = screen.getByText('Create');
    expect(create).toBeInTheDocument();

    const cancel = screen.queryByText('Cancel');
    expect(cancel).not.toBeInTheDocument();
  });

  it('should call the onCancel callback when the cancel button is clicked', () => {
    const onFormSubmit = jest.fn();
    const onCancel = jest.fn();
    renderWithProviders(<BlogCreateForm onFormSubmit={onFormSubmit} onCancel={onCancel} />);

    const cancel = screen.getByText('Cancel');
    fireEvent.click(cancel);

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('should call the onFormSubmit callback when the form is submitted', () => {
    const onFormSubmit = jest.fn();
    renderWithProviders(<BlogCreateForm onFormSubmit={onFormSubmit} />);

    const title = screen.getByLabelText('Title');
    fireEvent.change(title, { target: { value: 'Overreacted' } });

    const author = screen.getByLabelText('Author');
    fireEvent.change(author, { target: { value: 'Dan Abramov' } });

    const url = screen.getByLabelText('URL');
    fireEvent.change(url, { target: { value: 'https://overreacted.io/' } });

    const create = screen.getByText('Create');
    fireEvent.click(create);

    const data: BlogCreation = {
      title: 'Overreacted',
      author: 'Dan Abramov',
      url: 'https://overreacted.io/',
      likes: 0,
      year: new Date().getFullYear(),
    };

    expect(onFormSubmit).toHaveBeenCalledTimes(1);
    expect(onFormSubmit).toHaveBeenCalledWith(data);
  });
});
