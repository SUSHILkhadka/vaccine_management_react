import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import { PATH_LOGIN, PATH_REGISTER, PATH_VACCINE_ADD, PATH_VACCINE_TABLE } from '../constants/routes';
import LoginPage from '../pages/login/LoginPage';
import RegisterPage from '../pages/register/RegisterPage';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<LoginPage />} /> */}
        <Route path={PATH_LOGIN} element={<LoginPage />} />
        <Route path={PATH_REGISTER} element={<RegisterPage />} />
        <Route path='/' element={<Navbar />}>
          <Route path={PATH_VACCINE_ADD} element={<LoginPage />} />
          <Route path={PATH_VACCINE_TABLE} element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
