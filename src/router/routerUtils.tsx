import { message } from 'antd';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Outlet, Route, useNavigate } from 'react-router-dom';
import { PATH_LOGIN } from '../constants/routes';
import { getRefreshToken } from '../cookies/cookie';
import { resetAuth } from '../redux_toolkit/slices/authSlice';

export const ProtectedRoutes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!Boolean(getRefreshToken())) {
      message.error('refresh token expired');
      dispatch(resetAuth());
    }
  }, [navigate]);
  return Boolean(getRefreshToken()) ? <Outlet /> : <Navigate to={PATH_LOGIN} />;
};

export const redirectMultiplePaths = (paths: string[], element: JSX.Element) =>
  paths.map((path: string) => (
    <Route key={path} path={path} element={element} />
  ));
