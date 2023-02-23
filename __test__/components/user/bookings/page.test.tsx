import '@testing-library/jest-dom';

import { generateBooking, generateFacility } from '__test__/helpers';
import { mockFetch } from '__test__/lib/fetch';
import { PageContent } from 'app/user/bookings/PageContent';

import { FacilityTypeEnum } from '@enums';
import { fireEvent, render, screen } from '@testing-library/react';

beforeEach(() => {
  mockFetch.mockClear();
  mockFetch.mockReturnValueOnce(
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve({ hello: 'dd' }),
    })
  );
});

describe("User's bookings", () => {
  it('renders container unchanged', () => {
    const { container } = render(
      <PageContent
        bookedFacilities={[generateBooking(FacilityTypeEnum.Facility)]}
        bookedRooms={[generateBooking(FacilityTypeEnum.Room)]}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('trigger edit', () => {
    render(
      <PageContent
        bookedFacilities={[generateBooking(FacilityTypeEnum.Facility)]}
        bookedRooms={[generateBooking(FacilityTypeEnum.Room)]}
      />
    );

    const editBtn = screen.queryAllByTestId('booking-edit-btn');

    fireEvent(
      editBtn[0],
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
    const bookingFormEl = screen.getByTestId('booking-form');
    expect(bookingFormEl).toBeInTheDocument();
  });

  it('trigger cancel room', async () => {
    const fac = generateFacility(FacilityTypeEnum.Room);
    const booking = generateBooking(fac.id);
    booking.facility = fac;

    const { unmount } = render(
      <PageContent bookedFacilities={[]} bookedRooms={[booking]} />
    );

    const cancelBtn = screen.queryAllByTestId('booking-cancel-btn');

    fireEvent.click(cancelBtn[0]);

    const confirmmodal = await screen.findByText('Cancel your booking');
    expect(confirmmodal).toBeInTheDocument();

    const modal = screen.getByRole('dialog');

    const yesbtn = modal.querySelector('.confirm-modal-yes-btn');
    expect(yesbtn).toBeInTheDocument();
    if (yesbtn) fireEvent.click(yesbtn);

    expect(mockFetch).toBeCalled();

    const noBtn = modal.querySelector('.confirm-modal-no-btn');
    expect(noBtn).toBeInTheDocument();
    if (noBtn) fireEvent.click(noBtn);

    unmount();
  });
});
