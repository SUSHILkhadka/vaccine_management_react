import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import {
  PATH_LOGIN,
  PATH_REGISTER,
  PATH_SETTING,
  PATH_VACCINE_ADD,
  PATH_VACCINE_EDIT,
  PATH_VACCINE_TABLE,
} from '../constants/routes';
import LoginPage from '../pages/login/LoginPage';
import NotFoundScreen from '../pages/NotFoundScreen';
import RegisterPage from '../pages/register/RegisterPage';
import SettingPage from '../pages/setting/SettingPage';
import SplashScreen from '../pages/SplashScreen';
import AddVaccinePage from '../pages/vaccine/AddVaccinePage';
import EditVaccinePage from '../pages/vaccine/EditVaccinePage';
import ListVaccinePage from '../pages/vaccine/ListVaccinePage';
import { checkToken } from '../redux_toolkit/slices/authSlice';
import { AppDispatch, RootState } from '../redux_toolkit/stores/store';
import { ProtectedRoutes, UnProtectedRoutes } from './routerUtils';

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
        <Route element={<UnProtectedRoutes />}>
          <Route path={PATH_LOGIN} element={<LoginPage />} />
          <Route path={PATH_REGISTER} element={<RegisterPage />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route element={<Navbar />}>
            <Route path={PATH_VACCINE_TABLE} element={<ListVaccinePage />} />
            <Route path={PATH_VACCINE_ADD} element={<AddVaccinePage />} />
            <Route path={PATH_VACCINE_EDIT} element={<EditVaccinePage />} />
            <Route path={PATH_SETTING} element={<SettingPage />} />
          </Route>
        </Route>
        <Route path='*' element={<NotFoundScreen/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
