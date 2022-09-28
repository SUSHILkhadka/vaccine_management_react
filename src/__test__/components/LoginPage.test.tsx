import LoginPage from '../../pages/login/LoginPage';
import '../../__mocks__/matchMedia';
import { renderWithProvidersAndNavigation } from './customRender';

it('should render login page properly', () => {
  const page = renderWithProvidersAndNavigation(<LoginPage />);
  expect(page.asFragment()).toMatchSnapshot();
});

