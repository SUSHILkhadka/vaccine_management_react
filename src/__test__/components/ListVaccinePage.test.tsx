import { act } from 'react-dom/test-utils';
import ListVaccinePage from '../../pages/vaccine/ListVaccinePage';
import '../../__mocks__/matchMedia';
import { allergyList, vaccine } from '../constants';
import { renderWithProvidersAndNavigation } from './customRender';

jest.mock('../../axios/api');
it('should render list vaccine page properly', async () => {
  const page = renderWithProvidersAndNavigation(<ListVaccinePage />, {
    preloadedState: {
      vaccine: vaccine,
      allergy: allergyList,
    },
  });

  await act(async () => {
    page.rerender(<ListVaccinePage />);
  });
  expect(page.asFragment()).toMatchSnapshot();

});
