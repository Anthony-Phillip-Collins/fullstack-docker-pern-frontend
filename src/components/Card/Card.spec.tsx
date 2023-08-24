import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../util/jest';
import Card from './Card';

describe('<Card />', () => {
  it('should render the card', () => {
    const header = <h1>Header</h1>;
    renderWithProviders(<Card header={header}>Test</Card>);

    const children = screen.getByText('Test');
    expect(children).toBeInTheDocument();

    const headerElement = screen.getByText('Header');
    expect(headerElement).toBeInTheDocument();
  });

  it('should not display the edit button when not enabled', () => {
    const header = <h1>Header</h1>;
    renderWithProviders(<Card header={header}>Test</Card>);

    const edit = screen.queryByTestId('edit');
    expect(edit).not.toBeInTheDocument();
  });

  it('should display the edit button when enableEdit=true and callbacks onDelete and onSave are provided', () => {
    const header = <h1>Header</h1>;
    const onDelete = jest.fn();
    const onSave = jest.fn();
    renderWithProviders(
      <Card header={header} enableEdit={true} onDelete={onDelete} onSave={onSave}>
        Test
      </Card>,
    );

    const edit = screen.getByTestId('edit');
    expect(edit).toBeInTheDocument();
  });

  it('should show delete and save buttons when edit button is clicked', () => {
    const header = <h1>Header</h1>;
    const onDelete = jest.fn();
    const onSave = jest.fn();
    renderWithProviders(
      <Card header={header} enableEdit={true} onDelete={onDelete} onSave={onSave}>
        Test
      </Card>,
    );

    const edit = screen.getByTestId('edit');
    fireEvent.click(edit);

    const save = screen.queryByTestId('save');
    expect(save).toBeInTheDocument();

    const del = screen.queryByTestId('delete');
    expect(del).toBeInTheDocument();
  });

  it('should show the warning dialog when delete button is clicked', () => {
    const header = <h1>Header</h1>;
    const onDelete = jest.fn();
    const onSave = jest.fn();
    renderWithProviders(
      <Card header={header} enableEdit={true} onDelete={onDelete} onSave={onSave}>
        Test
      </Card>,
    );

    const edit = screen.getByTestId('edit');
    fireEvent.click(edit);

    const del = screen.getByTestId('delete');
    fireEvent.click(del);

    const warning = screen.queryByTestId('warning');
    expect(warning).toBeInTheDocument();
  });
});
