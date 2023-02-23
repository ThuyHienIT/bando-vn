import '@testing-library/jest-dom';

import { generateBooking, generateFacility } from '__test__/helpers';
import { WeekView } from 'app/facility/[id]/components/WeekView';
import dayjs from 'dayjs';

import { FacilityTypeEnum } from '@enums';
import { fireEvent, render, screen } from '@testing-library/react';

describe('WeekView List', () => {
  it('smapshot', () => {
    const fac = generateFacility(FacilityTypeEnum.Room);
    fac.id = 'test';
    const { container } = render(
      <WeekView
        data={fac}
        selectedDate={dayjs()}
        occupiedSlots2={[generateBooking(fac.id)]}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it('verify elements', async () => {
    const fac = generateFacility(FacilityTypeEnum.Room);
    fac.id = 'test';
    const today = dayjs();

    const { container } = render(<WeekView data={fac} selectedDate={today} />);

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
});
