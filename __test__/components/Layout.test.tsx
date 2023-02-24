import '@testing-library/jest-dom';

import { userInitialState } from '__test__/helpers';
import { RecoilRoot } from 'recoil';

import { BasicLayout } from '@components/Layout/Layout';
import { render } from '@testing-library/react';

describe('Layout', () => {
  it('renders header unchanged', () => {
    const { container } = render(
      <RecoilRoot initializeState={userInitialState}>
        <BasicLayout>Hello World!</BasicLayout>
      </RecoilRoot>
    );
    expect(container).toMatchSnapshot();
  });
});
