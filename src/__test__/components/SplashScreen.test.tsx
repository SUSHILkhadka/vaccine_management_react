import { render } from '@testing-library/react';
import SplashScreen from '../../pages/SplashScreen';

it('should render splash screen properly', () => {
  const page = render(<SplashScreen />);
  console.log(page.asFragment());
  expect(page.asFragment()).toMatchSnapshot();
});
