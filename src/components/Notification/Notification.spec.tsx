import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../util/jest';
import Notification from './Notification';

describe('<Notification />', () => {
  it('should render the notification with as a message', () => {
    renderWithProviders(<Notification message="Hello World!" />);

    const notification = screen.getByText('Hello World!');
    expect(notification).toBeInTheDocument();
  });

  it('should render the notification with as an error', () => {
    renderWithProviders(<Notification error="An error occurred!" />);

    const notification = screen.getByText('An error occurred!');
    expect(notification).toBeInTheDocument();
  });
});
