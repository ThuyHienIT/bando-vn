// import Home from '../pages/index'
import '@testing-library/jest-dom';

import { userInitialState } from '__test__/helpers';
import { RecoilRoot } from 'recoil';
import { Header } from 'src/(client)/components/Layout/Header';

import { render, screen } from '@testing-library/react';

describe('Header', () => {
  it('renders a heading', () => {
    render(
      <RecoilRoot initializeState={userInitialState}>
        <Header />
      </RecoilRoot>
    );

    const heading = screen.getByRole('heading', {
      name: /facility booking/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it('renders header unchanged', () => {
    const { container } = render(
      <RecoilRoot initializeState={userInitialState}>
        <Header />
      </RecoilRoot>
    );
    expect(container).toMatchSnapshot();
  });
});
