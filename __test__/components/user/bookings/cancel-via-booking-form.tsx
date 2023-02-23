import '@testing-library/jest-dom';

import { generateBooking, generateFacility } from '__test__/helpers';
import { mockFetch } from '__test__/lib/fetch';
import { PageContent } from 'app/user/bookings/PageContent';

import { FacilityTypeEnum } from '@enums';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

beforeEach(() => {
  mockFetch.mockClear();
});

describe('cancel booking throught booking form', () => {
  it('trigger edit facility -> cancel booking', async () => {
    const fac = generateBooking(FacilityTypeEnum.Facility);
    fac.facility = generateFacility(FacilityTypeEnum.Facility);

    const { container } = render(
      <PageContent bookedFacilities={[fac]} bookedRooms={[]} />
    );

    const editBtn = screen.queryAllByTestId('booking-edit-btn');

    fireEvent.click(editBtn[0]);

    const confirmmodal = await screen.findByText(
      `Booking this slot of ${fac.facility.name}`
    );
    expect(confirmmodal).toBeInTheDocument();

    const noBtn = screen.queryByTestId('booking-modal-cancel-btn');
    expect(noBtn).toBeInTheDocument();
    if (noBtn) fireEvent.click(noBtn);

    await waitFor(async () => {
      await screen.findByText('Cancel your booking');

      const dialogs = screen.queryAllByRole('dialog');
      dialogs.forEach((el) => {
        if (el.classList.contains('booking-confirm-modal')) {
          const confirmancelYesBtn = el.querySelector(
            '.booking-confirm-modal-yes-btn'
          );
          console.log(el.innerHTML);
          expect(confirmancelYesBtn).toBeInTheDocument();

          if (confirmancelYesBtn) fireEvent.click(confirmancelYesBtn);

          expect(mockFetch).toBeCalled();
        }
      });
    });
  });
});
