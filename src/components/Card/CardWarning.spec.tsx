import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../util/jest';
import CardWarning from './CardWarning';

describe('<CardWarning />', () => {
  it('should render with callbacks onCancel and onConfirm', () => {
    const onCancel = jest.fn();
    const onConfirm = jest.fn();
    renderWithProviders(<CardWarning onCancel={onCancel} onConfirm={onConfirm} />);

    const warning = screen.getByTestId('warning');
    expect(warning).toBeInTheDocument();
  });

  it('should accept custom text for the buttons', () => {
    const onCancel = jest.fn();
    const onConfirm = jest.fn();
    renderWithProviders(
      <CardWarning
        onCancel={onCancel}
        onConfirm={onConfirm}
        cancelButtonText="Cancel it!"
        confirmButtonText="Confirm it!"
      />,
    );

    const cancel = screen.getByText('Cancel it!');
    expect(cancel).toBeInTheDocument();

    const confirm = screen.getByText('Confirm it!');
    expect(confirm).toBeInTheDocument();
  });

  it('should accept a custom message', () => {
    const onCancel = jest.fn();
    const onConfirm = jest.fn();
    renderWithProviders(
      <CardWarning onCancel={onCancel} onConfirm={onConfirm} message="Are you sure you want to delete this?" />,
    );

    const message = screen.getByText('Are you sure you want to delete this?');
    expect(message).toBeInTheDocument();
  });

  it('should call onCancel when cancel button is clicked', () => {
    const onCancel = jest.fn();
    const onConfirm = jest.fn();
    renderWithProviders(<CardWarning onCancel={onCancel} onConfirm={onConfirm} />);

    const cancel = screen.getByText('Cancel');
    cancel.click();

    expect(onCancel).toHaveBeenCalled();
  });

  it('should call onConfirm when confirm button is clicked', () => {
    const onCancel = jest.fn();
    const onConfirm = jest.fn();
    renderWithProviders(<CardWarning onCancel={onCancel} onConfirm={onConfirm} />);

    const confirm = screen.getByText('Confirm');
    confirm.click();

    expect(onConfirm).toHaveBeenCalled();
  });
});
