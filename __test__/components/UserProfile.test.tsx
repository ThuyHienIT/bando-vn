import '@testing-library/jest-dom';

import { UserProfile } from '@components/UserProfile';
import { render } from '@testing-library/react';

describe('UserProfile', () => {
  // it('Showing Your Bookings when click on the button', async () => {
  //   const { container } = render(<UserProfile />);
  //   const spy = jest.fn();

  //   // Click button
  //   // act(async () => {
  //   //   fireEvent.click(screen.getByRole('button'));

  //   //   // const items = await screen.findAllByText(/Your Bookings/);
  //   //   expect(spy).toBeCalled();
  //   // });
  //   // Wait for page to update with query text
  // });

  it('renders UserProfile unchanged', () => {
    const { container } = render(<UserProfile />);
    expect(container).toMatchSnapshot();
  });
});
