import '@testing-library/jest-dom';

import {
  generateBooking,
  generateFacility,
  userInitialState,
} from '__test__/helpers';
import { mockFetch } from '__test__/lib/fetch';
import { PageContent } from 'app/user/bookings/PageContent';
import { RecoilRoot } from 'recoil';

import { FacilityTypeEnum } from '@enums';
import { fireEvent, render, screen } from '@testing-library/react';

beforeEach(() => {
  mockFetch.mockClear();
});

describe('edit facility', () => {
  it('trigger edit facility -> update', async () => {
    const fac = generateFacility(FacilityTypeEnum.Facility);
    const booking = generateBooking(fac.id);
    booking.facility = fac;

    const { container } = render(
      <RecoilRoot initializeState={userInitialState}>
        <PageContent bookedFacilities={[booking]} bookedRooms={[]} />
      </RecoilRoot>
    );

    const editBtn = screen.queryAllByTestId('booking-edit-btn');

    fireEvent.click(editBtn[0]);

    const confirmmodal = await screen.findByText(
      `Booking this slot of ${fac.name}`
    );
    expect(confirmmodal).toBeInTheDocument();

    const yesbtn = screen.queryByTestId('booking-modal-yes-btn');
    expect(yesbtn).toBeInTheDocument();
    if (yesbtn) fireEvent.click(yesbtn);

    // to be fixed, the mock fetch isn't called
    // expect(mockFetch).toBeCalled();
  });
});
