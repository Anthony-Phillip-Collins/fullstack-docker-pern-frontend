import '@testing-library/jest-dom';
import { renderWithProviders } from '../../util/jest';
import { IconProps } from '../IconShape/IconShape';
import IconButton from './IconButton';

describe('<IconButton />', () => {
  it('should render icon', () => {
    const iconProps: IconProps = {
      icon: 'bookmark',
    };
    const { container } = renderWithProviders(<IconButton iconProps={iconProps} />);

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
