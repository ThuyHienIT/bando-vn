import '@testing-library/jest-dom';

import { Container } from '@components/Layout/Container';
import { render } from '@testing-library/react';

describe('Container', () => {
  it('renders container unchanged', () => {
    const { container } = render(<Container>Hello World!</Container>);
    expect(container).toMatchSnapshot();
  });
});
