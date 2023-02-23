import '@testing-library/jest-dom';

import { generateBooking } from '__test__/helpers';

import { BookingList } from '@components/BookingList';
import { FacilityTypeEnum } from '@enums';
import { render, screen } from '@testing-library/react';

describe('Booking List', () => {
  it('less than max', () => {
    const { container } = render(
      <BookingList
        heading="Rooms"
        max={2}
        data={[generateBooking(FacilityTypeEnum.Room)]}
        viewAllLink="/rooms"
      />
    );

    const heading = screen.getByRole('heading', { name: 'Rooms' });
    const link = screen.queryByTestId('view-all');

    expect(heading).toBeInTheDocument();
    expect(link).toBeNull();

    expect(container).toMatchSnapshot();
  });

  it('more than max', () => {
    const { container } = render(
      <BookingList
        heading="Rooms"
        max={2}
        data={[
          generateBooking(FacilityTypeEnum.Room),
          generateBooking(FacilityTypeEnum.Room),
          generateBooking(FacilityTypeEnum.Room),
        ]}
        viewAllLink="/rooms"
      />
    );

    const link = screen.getByTestId('view-all');

    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('/rooms');

    expect(container).toMatchSnapshot();
  });
});
