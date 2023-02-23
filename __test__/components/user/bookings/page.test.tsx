import '@testing-library/jest-dom';

import { generateBooking, generateFacility } from '__test__/helpers';
import { server } from '__test__/lib/server';
import { PageContent } from 'app/user/bookings/PageContent';

import { FacilityTypeEnum } from '@enums';
import { fireEvent, render, screen } from '@testing-library/react';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

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

    fireEvent.click(cancelBtn[0]);

    const confirmmodal = await screen.findByText('Cancel your booking');
    expect(confirmmodal).toBeInTheDocument();

    const modal = screen.getByRole('dialog');

    // server.use(
    //   rest.get('/api/booking/cancel/*', (req, res, ctx) => {
    //     console.log('api called');

    //     return res(ctx.json({}));
    //   })
    // );
    const yesbtn = modal.querySelector('.confirm-modal-no-btn');
    expect(yesbtn).toBeInTheDocument();
    if (yesbtn) fireEvent.click(yesbtn);

    const noBtn = modal.querySelector('.confirm-modal-no-btn');
    expect(noBtn).toBeInTheDocument();
    if (noBtn) fireEvent.click(noBtn);
  });

  // it('trigger edit', async () => {
  //   const container = document.createElement('div');

  //   const fac = generateBooking(FacilityTypeEnum.Facility);
  //   fac.facility = generateFacility(FacilityTypeEnum.Facility);

  //   const room = generateBooking(FacilityTypeEnum.Room);
  //   room.facility = generateFacility(FacilityTypeEnum.Room);

  //   act(() => {
  //     render(<PageContent bookedFacilities={[fac]} bookedRooms={[room]} />);
  //   });

  //   const editBtn = screen.getAllByTestId('booking-edit-btn');
  //   fireEvent.click(editBtn[0]);

  //   const modal = await screen.findByRole('dialog');
  //   expect(modal).toBeInTheDocument();

  //   expect(await screen.findByTestId('booking-form')).toBeInTheDocument();

  //   server.use(
  //     rest.get('/api/booking/update', (req, res, ctx) => {
  //       console.log('api called');

  //       return res(ctx.json({}));
  //     })
  //   );
  //   const yesbtn = screen.queryAllByTestId('booking-modal-yes-btn');
  //   expect(yesbtn[0]).toBeInTheDocument();
  //   act(() => {
  //     fireEvent.click(yesbtn[0]);
  //   });
  // });
});
