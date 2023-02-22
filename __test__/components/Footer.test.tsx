// import Home from '../pages/index'
import '@testing-library/jest-dom';

import { Footer } from 'src/(client)/components/Layout/Footer';

import { render } from '@testing-library/react';

describe('Footer', () => {
  it('renders footer unchanged', () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
});
