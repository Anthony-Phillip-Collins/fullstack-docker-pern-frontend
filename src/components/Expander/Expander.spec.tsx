import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../util/jest';
import Expander from './Expander';

describe('<Expander />', () => {
  it('should render children when open=true', () => {
    renderWithProviders(<Expander open={true}>Test</Expander>);
    const el = screen.getByText('Test');
    expect(el).toBeInTheDocument();
  });

  it('should not render children when open=false', () => {
    renderWithProviders(<Expander open={false}>Test</Expander>);
    const el = screen.queryByText('Test');
    expect(el).not.toBeInTheDocument();
  });
});
