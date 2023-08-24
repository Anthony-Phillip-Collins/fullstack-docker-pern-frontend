import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../util/jest';
import LoginForm from './LoginForm';

describe('<LoginForm />', () => {
  it('should render the login form', () => {
    const onFormSubmit = jest.fn();
    renderWithProviders(<LoginForm onFormSubmit={onFormSubmit} />);

    const username = screen.getByText('Username');
    expect(username).toBeInTheDocument();

    const password = screen.getByText('Password');
    expect(password).toBeInTheDocument();

    const login = screen.getByText('Login');
    expect(login).toBeInTheDocument();
  });

  it('should call the onFormSubmit callback when the form is submitted', () => {
    const onFormSubmit = jest.fn();
    renderWithProviders(<LoginForm onFormSubmit={onFormSubmit} />);

    const username = screen.getByLabelText('Username');
    fireEvent.change(username, { target: { value: 'test' } });

    const password = screen.getByLabelText('Password');
    fireEvent.change(password, { target: { value: 'test' } });

    const login = screen.getByText('Login');
    fireEvent.click(login);

    expect(onFormSubmit).toHaveBeenCalledTimes(1);
    expect(onFormSubmit).toHaveBeenCalledWith({ username: 'test', password: 'test' });
  });
});
