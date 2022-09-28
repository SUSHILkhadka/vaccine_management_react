import AllergyTable from '../../components/allergy/AllergyTable';
import { IAllergy } from '../../interface/IAllergy';
import '../../__mocks__/matchMedia';
import { allergyList } from '../constants';
import { renderWithProvidersAndNavigation } from './customRender';


it('should render allergy table page properly', () => {
  const page = renderWithProvidersAndNavigation(<AllergyTable />, {
    preloadedState: {
      allergy: allergyList,
    },
  });

  expect(page.asFragment()).toMatchSnapshot();
});
