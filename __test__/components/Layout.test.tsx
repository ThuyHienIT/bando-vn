import { render, screen } from '@testing-library/react';
// import Home from '../pages/index'
import '@testing-library/jest-dom';
import { BasicLayout } from '@components/Layout/Layout';
import 'jest-styled-components';

describe('Layout', () => {
  it('renders header unchanged', () => {
    const { container } = render(<BasicLayout>Hello World!</BasicLayout>);
    expect(container).toMatchSnapshot();
  });
});
