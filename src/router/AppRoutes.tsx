import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import {
  PATH_LOGIN,
  PATH_REGISTER,
  PATH_VACCINE_TABLE,
} from '../constants/routes';
import LoginPage from '../pages/login/LoginPage';
import RegisterPage from '../pages/register/RegisterPage';
import SplashScreen from '../pages/SplashScreen';
import ListVaccinePage from '../pages/vaccine/ListVaccinePage';
import { checkToken } from '../redux_toolkit/slices/authSlice';
import { AppDispatch, RootState } from '../redux_toolkit/stores/store';
import { ProtectedRoutes } from './routerUtils';

function AppRoutes() {
  const authInfo = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(checkToken());
  }, []);
  if (authInfo.status == 'loading') {
    return <SplashScreen />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH_LOGIN} element={<LoginPage />} />
        <Route path={PATH_REGISTER} element={<RegisterPage />} />
        <Route path='/' element={<ProtectedRoutes />}>
          <Route path='/' element={<Navbar />}>
            <Route path={PATH_VACCINE_TABLE} element={<ListVaccinePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
