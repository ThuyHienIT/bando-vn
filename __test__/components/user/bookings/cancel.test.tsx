import '@testing-library/jest-dom';

import { generateBooking, generateFacility } from '__test__/helpers';
import { mockFetch } from '__test__/lib/fetch';
import { PageContent } from 'app/user/bookings/PageContent';

import { FacilityTypeEnum } from '@enums';
import { fireEvent, render, screen } from '@testing-library/react';

beforeEach(() => {
  mockFetch.mockClear();
});

describe('cancel facility', () => {
  it('trigger cancel facility', async () => {
    const fac = generateFacility(FacilityTypeEnum.Facility);
    const booking = generateBooking(fac.id);
    booking.facility = fac;

    const { unmount } = render(
      <PageContent bookedFacilities={[booking]} bookedRooms={[]} />
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
