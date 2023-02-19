import { render, screen } from '@testing-library/react';
// import Home from '../pages/index'
import '@testing-library/jest-dom';
import { Header } from '@components/Layout/Header';

describe('Header', () => {
  it('renders a heading', () => {
    render(<Header />);

    const heading = screen.getByRole('heading', {
      name: /facility booking/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it('renders header unchanged', () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });
});
