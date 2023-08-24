import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../util/jest';
import Button from './Button';

describe('<Button />', () => {
  it('should render the button', () => {
    const onClick = jest.fn();
    renderWithProviders(<Button onClick={onClick}>Test</Button>);

    const button = screen.getByText('Test');
    expect(button).toBeInTheDocument();
  });

  it('should call the onClick callback when the button is clicked', () => {
    const onClick = jest.fn();
    renderWithProviders(<Button onClick={onClick}>Test</Button>);

    const button = screen.getByText('Test');
    button.click();

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when the disabled prop is true', () => {
    const onClick = jest.fn();
    renderWithProviders(
      <Button onClick={onClick} disabled>
        Test
      </Button>,
    );

    const button = screen.getByText('Test');
    expect(button).toBeDisabled();
  });
});
