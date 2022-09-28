import { IVaccine } from '../../interface/IVaccine';
import EditVaccinePage from '../../pages/vaccine/EditVaccinePage';
import '../../__mocks__/matchMedia';
import { allergyList, vaccine } from '../constants';
import { renderWithProvidersAndNavigation } from './customRender';


it('should render edit vaccine page properly', () => {
  const page = renderWithProvidersAndNavigation(<EditVaccinePage />, {
    preloadedState: {
      vaccine: vaccine,
      allergy: allergyList,
    },
  });

  expect(page.asFragment()).toMatchSnapshot();
});
