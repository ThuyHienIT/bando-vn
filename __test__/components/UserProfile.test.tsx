import '@testing-library/jest-dom';

import { userInitialState } from '__test__/helpers';
import { RecoilRoot } from 'recoil';

import { UserProfile } from '@components/UserProfile';
import { render } from '@testing-library/react';

describe('UserProfile', () => {
  it('renders UserProfile unchanged', () => {
    const { container } = render(
      <RecoilRoot initializeState={userInitialState}>
        <UserProfile />
      </RecoilRoot>
    );
    expect(container).toMatchSnapshot();
  });
});
