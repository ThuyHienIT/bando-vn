import '@testing-library/jest-dom';

import { generateBooking, generateFacility } from '__test__/helpers';
import { rest, server } from '__test__/lib/server';
// import request from 'app/(client)/lib/request';
import { PageContent } from 'app/user/bookings/PageContent';
import { act } from 'react-dom/test-utils';

import { FacilityTypeEnum } from '@enums';
import { fireEvent, render, screen } from '@testing-library/react';

beforeAll(() => server.listen());
// if you need to add a handler after calling setupServer for some specific test
// this will remove that handler for the rest of them
// (which is important for test isolation):
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// jest.mock('app/(client)/lib/request');

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

  it('trigger cancel', async () => {
    const fac = generateBooking(FacilityTypeEnum.Facility);
    fac.facility = generateFacility(FacilityTypeEnum.Facility);

    const room = generateBooking(FacilityTypeEnum.Room);
    room.facility = generateFacility(FacilityTypeEnum.Room);

    render(<PageContent bookedFacilities={[fac]} bookedRooms={[room]} />);

    const cancelBtn = screen.queryAllByTestId('booking-cancel-btn');

    fireEvent(
      cancelBtn[0],
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    const confirmmodal = await screen.findByText('Cancel your booking');
    expect(confirmmodal).toBeInTheDocument();

    server.use(
      rest.get('/api/booking/cancel/*', (req, res, ctx) => {
        console.log('api called');

        return res(ctx.json({}));
      })
    );
    const yesbtn = screen.getByTestId('btn-confirm-cancel-booking');
    act(() => {
      fireEvent.click(yesbtn);
    });

    // expect(request).toBeCalledWith(`/api/booking/cancel/${room.id}`);
  });
});
