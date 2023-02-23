import { render, screen } from '@testing-library/react';
// import Home from '../pages/index'
import '@testing-library/jest-dom';
import { Footer } from '@components/Layout/Footer';

describe('Footer', () => {
  it('renders footer unchanged', () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
});
