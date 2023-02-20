import '@testing-library/jest-dom';

import { generateFacility } from '__test__/helpers';

import { FacilityList } from '@components/FacilityList';
import { FacilityTypeEnum } from '@enums';
import { render, screen } from '@testing-library/react';

describe('Facility List', () => {
  it('renders facility card as expected', () => {
    const room = generateFacility(FacilityTypeEnum.Room, 'Venus Meeting Room');
    const facility = generateFacility(FacilityTypeEnum.Facility, 'Earth Meeting Room');
    render(<FacilityList data={[facility, room]} heading="Rooms" />);

    const item1name = screen.getByRole('heading', { name: room.name });
    const item2name = screen.getByRole('heading', { name: facility.name });

    expect(item1name).toBeInTheDocument();
    expect(item2name).toBeInTheDocument();
  });

  it('renders facility card unchanged', () => {
    const room = generateFacility(FacilityTypeEnum.Room, 'Venus Meeting Room');
    const facility = generateFacility(FacilityTypeEnum.Facility, 'Earth Meeting Room');

    facility.id = 'facility-test-id';
    room.id = 'room-test-id';

    const { container } = render(<FacilityList data={[facility, room]} heading="Rooms" />);

    expect(container).toMatchSnapshot();
  });
});
