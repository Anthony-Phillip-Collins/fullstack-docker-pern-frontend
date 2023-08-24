import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../util/jest';
import Editable from './Editable';

describe('<Editable />', () => {
  it('should render the editable', () => {
    renderWithProviders(<Editable tagName="h2" initialValue="Hello World!" error={null} />);

    const text = screen.getByText('Hello World!');
    expect(text).toBeInTheDocument();

    const editable = screen.getByTestId('editable');
    expect(editable.tagName).toBe('H2');
  });

  it('should render the editable with error', () => {
    renderWithProviders(<Editable tagName="h2" initialValue="Hello World!" error="Error" />);

    const error = screen.getByText('Error');
    expect(error).toBeInTheDocument();
  });

  it('should remove html tags from the editable', () => {
    renderWithProviders(<Editable tagName="h2" initialValue="<strong>Hello World!</strong>" error={null} />);

    const editable = screen.getByTestId('editable');
    expect(editable).toHaveTextContent('Hello World!');
  });
});
