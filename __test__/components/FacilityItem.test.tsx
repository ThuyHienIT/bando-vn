import '@testing-library/jest-dom';

import { generateFacility } from '__test__/helpers';
import { FacilityItemCmp } from 'src/(client)/components/FacilityItem';

import { FacilityTypeEnum } from '@enums';
import { render, screen } from '@testing-library/react';

describe('Facility Item', () => {
  it('verify elements', () => {
    const facility = generateFacility(FacilityTypeEnum.Room);
    render(<FacilityItemCmp data={facility} />);

    const detailsBtn = screen.getByRole('button', { name: /details/i });
    const name = screen.getByRole('heading', { name: facility.name });
    const link = screen.getByRole('link');
    const img = screen.getByAltText(facility.name);

    expect(detailsBtn).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(img.getAttribute('src')).toContain(
      encodeURIComponent(facility.thumbnail || '')
    );
    expect(link.getAttribute('href')).toEqual(`/facility/${facility.id}`);
  });

  it('item without thumbnail', () => {
    const facility = generateFacility(FacilityTypeEnum.Facility);
    facility.thumbnail = '';
    render(<FacilityItemCmp data={facility} />);

    const img = screen.queryByAltText(facility.name);
    expect(img).toBeNull();
  });

  it('renders facility card unchanged', () => {
    const facility = generateFacility(FacilityTypeEnum.Room);
    facility.id = 'test-id';

    const { container } = render(<FacilityItemCmp data={facility} />);
    expect(container).toMatchSnapshot();
  });
});
