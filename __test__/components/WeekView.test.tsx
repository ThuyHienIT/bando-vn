import '@testing-library/jest-dom';

import {
  generateBooking,
  generateFacility,
  userInitialState,
} from '__test__/helpers';
import { WeekView } from 'app/facility/[id]/components/WeekView';
import dayjs from 'dayjs';
import { RecoilRoot } from 'recoil';

import { FacilityTypeEnum } from '@enums';
import { fireEvent, render, screen } from '@testing-library/react';

describe('WeekView List', () => {
  it('smapshot', () => {
    const fac = generateFacility(FacilityTypeEnum.Room);
    fac.id = 'test';
    const { container } = render(
      <RecoilRoot initializeState={userInitialState}>
        <WeekView
          data={fac}
          selectedDate={dayjs()}
          occupiedSlots={[generateBooking(fac.id)]}
        />
      </RecoilRoot>
    );

    expect(container).toMatchSnapshot();
  });

  it('verify elements', async () => {
    const fac = generateFacility(FacilityTypeEnum.Room);
    fac.id = 'test';
    const today = dayjs();

    const { container } = render(
      <RecoilRoot initializeState={userInitialState}>
        <WeekView data={fac} selectedDate={today} />
      </RecoilRoot>
    );

    const scrollEl = screen.getByTestId('scroller');

    const clickToBookEl = screen.getAllByTestId('click-to-book');

    fireEvent(
      clickToBookEl[today.day() + 1],
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    const bookingFormEl = screen.getByTestId('booking-form');
    expect(bookingFormEl).toBeInTheDocument();

    expect(scrollEl).toBeInTheDocument();
    expect(scrollEl.getAttribute('id')).toBe('js-weekview-container');
  });

  it('has booked slots', async () => {
    const fac = generateFacility(FacilityTypeEnum.Room);
    fac.id = 'test';
    const booking = generateBooking(FacilityTypeEnum.Room);
    booking.from = dayjs().format();
    booking.to = dayjs().add(30, 'minute').format();

    render(
      <RecoilRoot initializeState={userInitialState}>
        <WeekView
          data={fac}
          selectedDate={undefined}
          occupiedSlots={[booking]}
        />
      </RecoilRoot>
    );

    const bookedEl = await screen.findByText('Booked');
    expect(bookedEl).toBeInTheDocument();

    fireEvent.click(bookedEl);

    const bookingFormEl = await screen.findByTestId('booking-form');
    expect(bookingFormEl).toBeInTheDocument();
  });
});
