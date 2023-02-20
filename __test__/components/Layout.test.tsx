import '@testing-library/jest-dom';

import { BasicLayout } from '@components/Layout/Layout';
import { render } from '@testing-library/react';

describe('Layout', () => {
  it('renders header unchanged', () => {
    const { container } = render(<BasicLayout>Hello World!</BasicLayout>);
    expect(container).toMatchSnapshot();
  });
});
