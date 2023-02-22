import '@testing-library/jest-dom';

import { generateBooking } from '__test__/helpers';
import { PageContent } from 'app/user/bookings/PageContent';

import { FacilityTypeEnum } from '@enums';
import { render } from '@testing-library/react';

describe('Container', () => {
  it('renders container unchanged', () => {
    const { container } = render(
      <PageContent
        bookedFacilities={[generateBooking(FacilityTypeEnum.Facility)]}
        bookedRooms={[generateBooking(FacilityTypeEnum.Room)]}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
