import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../util/jest';
import UserForm from './UserForm';

describe('<UserForm />', () => {
  it('should render the user form', () => {
    const onFormSubmit = jest.fn();
    renderWithProviders(<UserForm onFormSubmit={onFormSubmit} />);

    const name = screen.getByText('Name');
    expect(name).toBeInTheDocument();

    const username = screen.getByText('Username');
    expect(username).toBeInTheDocument();

    const password = screen.getByText('Password');
    expect(password).toBeInTheDocument();

    const create = screen.getByText('Create');
    expect(create).toBeInTheDocument();

    const cancel = screen.queryByText('Cancel');
    expect(cancel).not.toBeInTheDocument();
  });

  it('should call the onCancel callback when the cancel button is clicked', () => {
    const onFormSubmit = jest.fn();
    const onCancel = jest.fn();
    renderWithProviders(<UserForm onFormSubmit={onFormSubmit} onCancel={onCancel} />);

    const cancel = screen.getByText('Cancel');
    fireEvent.click(cancel);

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('should call the onFormSubmit callback when the form is submitted', () => {
    const onFormSubmit = jest.fn();
    renderWithProviders(<UserForm onFormSubmit={onFormSubmit} />);

    const name = screen.getByLabelText('Name');
    fireEvent.change(name, { target: { value: 'John Doe' } });

    const username = screen.getByLabelText('Username');
    fireEvent.change(username, { target: { value: 'johndoe@foobar.com' } });

    const password = screen.getByLabelText('Password');
    fireEvent.change(password, { target: { value: '123456' } });

    const create = screen.getByText('Create');
    fireEvent.click(create);

    expect(onFormSubmit).toHaveBeenCalledTimes(1);
    expect(onFormSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      username: 'johndoe@foobar.com',
      password: '123456',
    });
  });
});
