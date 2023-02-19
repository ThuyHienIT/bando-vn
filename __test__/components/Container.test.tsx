import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Container } from '@components/Layout/Container';

describe('Container', () => {
  it('renders container unchanged', () => {
    const { container } = render(<Container>Hello World!</Container>);
    expect(container).toMatchSnapshot();
  });
});
