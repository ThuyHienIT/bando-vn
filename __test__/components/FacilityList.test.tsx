import '@testing-library/jest-dom';

import { generateFacility } from '__test__/helpers';

import { FacilityList } from '@components/FacilityList';
import { FacilityTypeEnum } from '@enums';
import { render, screen } from '@testing-library/react';

describe('Facility List', () => {
  it('less than max', () => {
    const fac = generateFacility(FacilityTypeEnum.Facility);
    fac.id = 'test-id';
    const { container } = render(
      <FacilityList heading="Facilities" max={2} data={[fac]} />
    );

    const heading = screen.getByRole('heading', { name: 'Facilities' });
    const link = screen.queryByTestId('view-all');

    expect(heading).toBeInTheDocument();
    expect(link).toBeNull();

    expect(container).toMatchSnapshot();
  });

  it('more than max', () => {
    const fac1 = generateFacility(FacilityTypeEnum.Facility);
    const fac2 = generateFacility(FacilityTypeEnum.Facility);
    const fac3 = generateFacility(FacilityTypeEnum.Facility);

    fac1.id = 'test-id-1';
    fac2.id = 'test-id-2';
    fac3.id = 'test-id-3';

    const { container } = render(
      <FacilityList
        heading="Facilities"
        max={2}
        data={[fac1, fac2, fac3]}
        viewAllLink="/facilities"
      />
    );

    const link = screen.getByTestId('view-all');

    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('/facilities');

    expect(container).toMatchSnapshot();
  });
});
