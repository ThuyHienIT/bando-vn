import { mockFetch } from '__test__/lib/fetch';
import { LoginForm } from 'app/login/LoginForm';

import { fireEvent, render, waitFor } from '@testing-library/react';

beforeAll(() => {
  mockFetch.mockClear();
});

describe('LoginForm', () => {
  it('renders LoginForm unchanged', () => {
    const { container } = render(<LoginForm />);

    expect(container).toMatchSnapshot();
  });

  it('submit with valid data', async () => {
    const { container } = render(<LoginForm />);

    const emailInput = container.querySelector('[id="email"]');
    const passwordInput = container.querySelector('[id="password"]');
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    if (emailInput)
      fireEvent.change(emailInput, {
        target: { value: 'kqthang1505@gmail.com' },
      });
    if (passwordInput)
      fireEvent.change(passwordInput, { target: { value: '1234' } });

    const submitBtn = container.querySelector('[type="submit"]');

    expect(submitBtn).toBeInTheDocument();
    if (submitBtn) fireEvent.click(submitBtn);

    await waitFor(() => {
      expect((global as any).mockRouterPush).toBeCalled();
    });
  });

  it('submit with missing data', async () => {
    const { container } = render(<LoginForm />);

    const emailInput = container.querySelector('[id="email"]');
    const passwordInput = container.querySelector('[id="password"]');
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    if (emailInput)
      fireEvent.change(emailInput, {
        target: { value: 'kqthang1505@gmail.com' },
      });

    const submitBtn = container.querySelector('[type="submit"]');

    expect(submitBtn).toBeInTheDocument();
    if (submitBtn) fireEvent.click(submitBtn);

    await waitFor(() => {
      expect((global as any).mockRouterPush).toBeCalled();
    });
  });
});
