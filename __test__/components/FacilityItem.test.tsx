import '@testing-library/jest-dom';

import { generateFacility } from '__test__/helpers';

import { FacilityItemCmp } from '@components/FacilityItem';
import { FacilityTypeEnum } from '@enums';
import { render, screen } from '@testing-library/react';

describe('Facility Item', () => {
  it('renders facility card as expected', () => {
    const facility = generateFacility(FacilityTypeEnum.Room);
    render(<FacilityItemCmp data={facility} />);

    const bookBtn = screen.getByRole('button', { name: /book/i });
    const detailsBtn = screen.getByRole('button', { name: /details/i });
    const name = screen.getByRole('heading', { name: facility.name });

    expect(bookBtn).toBeInTheDocument();
    expect(detailsBtn).toBeInTheDocument();
    expect(name).toBeInTheDocument();
  });

  it('renders facility card unchanged', () => {
    const facility = generateFacility(FacilityTypeEnum.Room);
    facility.id = 'test-id';

    const { container } = render(<FacilityItemCmp data={facility} />);
    expect(container).toMatchSnapshot();
  });
});
