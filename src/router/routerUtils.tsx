import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { PATH_LOGIN, PATH_ROOT } from '../constants/routes';
import { getRefreshToken } from '../cookies/cookie';
import { resetAuth } from '../redux_toolkit/slices/authSlice';
import { RootState } from '../redux_toolkit/stores/store';
import { errorMessage } from '../utils/message';

export const ProtectedRoutes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!Boolean(getRefreshToken())) {
      errorMessage('refresh token expired');
      dispatch(resetAuth());
    }
  }, [navigate]);
  return Boolean(getRefreshToken()) ? <Outlet /> : <Navigate to={PATH_LOGIN} />;
};

export const UnProtectedRoutes = () => {
  const authInfo = useSelector((state: RootState) => state.auth);

  return authInfo.status === 'fulfilled' ? (
    <Navigate to={PATH_ROOT} />
  ) : (
    <Outlet />
  );
};
