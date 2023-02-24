import '@testing-library/jest-dom';

import {
  generateBooking,
  generateFacility,
  userInitialState,
} from '__test__/helpers';
import { mockFetch } from '__test__/lib/fetch';
import { BookingModal } from 'app/facility/[id]/components/BookingModal';
import dayjs from 'dayjs';
import { RecoilRoot } from 'recoil';

import { FacilityTypeEnum } from '@enums';
import { dbModel } from '@models/db';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

const FAC_DB_NAME = 'facilities.json';
const BOOKING_DB_NAME = 'bookings.json';
let BOOKING: BookingItem;

beforeAll(async () => {
  await dbModel.clearDb(FAC_DB_NAME);
  await dbModel.clearDb(BOOKING_DB_NAME);

  const fac1: FacilityItem = generateFacility(FacilityTypeEnum.Room);

  await dbModel.prepareDb(FAC_DB_NAME);
  const insertedFac1 = await dbModel.insertOne<FacilityItem>(FAC_DB_NAME, fac1);

  const booking1 = generateBooking(insertedFac1.id);

  await dbModel.prepareDb(BOOKING_DB_NAME);
  await dbModel.insertOne<BookingItem>(BOOKING_DB_NAME, booking1);
  BOOKING = booking1;
});

beforeEach(() => {
  mockFetch.mockClear();
});

afterAll(async () => {
  await dbModel.clearDb(FAC_DB_NAME);
  await dbModel.clearDb(BOOKING_DB_NAME);
});

describe('Booking Modal List', () => {
  it('smapshot', () => {
    const fac = generateFacility(FacilityTypeEnum.Room);
    fac.id = 'test';
    const { container } = render(
      <RecoilRoot initializeState={userInitialState}>
        <BookingModal
          from={dayjs('2022-02-02')}
          to={dayjs('2022-02-02').add(30, 'minute')}
          opened
          bookingId={BOOKING.id}
          onClose={jest.fn()}
          onDone={jest.fn()}
          onCancelled={jest.fn()}
        />
      </RecoilRoot>
    );

    expect(container).toMatchSnapshot();
  });

  it('verify submit booking', async () => {
    const fac = generateFacility(FacilityTypeEnum.Room);
    fac.id = 'test';
    const from = dayjs();
    const to = from.clone().add(30, 'minute');
    const onClose = jest.fn();

    act(() => {
      render(
        <RecoilRoot initializeState={userInitialState}>
          <BookingModal
            from={from}
            to={to}
            opened
            bookingId={BOOKING.id}
            onClose={onClose}
            onDone={jest.fn()}
            onCancelled={jest.fn()}
          />
        </RecoilRoot>
      );
    });

    const bookingFormEl = await screen.findByTestId('booking-form');
    expect(bookingFormEl).toBeInTheDocument();

    const toInput = bookingFormEl.querySelector('#to') as HTMLInputElement;
    expect(toInput.value).toBe(to.format('HH:mm'));

    const fromInput = bookingFormEl.querySelector('#from') as HTMLInputElement;
    expect(fromInput.value).toBe(from.format('HH:mm'));

    const yesBtn = screen.queryByTestId('booking-modal-yes-btn');
    expect(yesBtn).toBeInTheDocument();
    if (yesBtn) fireEvent.click(yesBtn);

    const noBtn = screen.queryByTestId('booking-modal-cancel-btn');
    expect(noBtn).toBeInTheDocument();
    if (noBtn) fireEvent.click(noBtn);

    await waitFor(() => {
      expect(onClose).toBeCalled();
    });
  });

  it('verify update booking', async () => {
    const fac = generateFacility(FacilityTypeEnum.Room);
    fac.id = 'test';
    const from = dayjs();
    const to = from.clone().add(30, 'minute');
    const container = document.createElement('div');
    const onClose = jest.fn();
    const onDone = jest.fn();
    const onCancelled = jest.fn();
    act(() => {
      render(
        <RecoilRoot initializeState={userInitialState}>
          <BookingModal
            from={from}
            to={to}
            opened
            bookingId={BOOKING.id}
            onClose={onClose}
            onDone={onDone}
            onCancelled={onCancelled}
            isUpdate
            data={fac}
          />
        </RecoilRoot>,
        { container }
      );
    });

    const bookingFormEl = await screen.findByTestId('booking-form');
    expect(bookingFormEl).toBeInTheDocument();

    const toInput = bookingFormEl.querySelector('#to') as HTMLInputElement;
    expect(toInput.value).toBe(to.format('HH:mm'));

    const fromInput = bookingFormEl.querySelector('#from') as HTMLInputElement;
    expect(fromInput.value).toBe(from.format('HH:mm'));

    const yesBtn = screen.queryByTestId('booking-modal-yes-btn');
    expect(yesBtn).toBeInTheDocument();
    if (yesBtn) fireEvent.click(yesBtn);

    await waitFor(() => {
      expect(onDone).toBeCalled();
    });

    const noBtn = screen.queryByTestId('booking-modal-cancel-btn');
    expect(noBtn).toBeInTheDocument();
    if (noBtn) fireEvent.click(noBtn);

    await waitFor(async () => {
      expect(
        await screen.findByText('Cancel your booking')
      ).toBeInTheDocument();
    });
  });
});
