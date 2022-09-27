import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { logout } from '../../axios/backendUser';
import {
  PATH_LOGIN,
  PATH_SETTING,
  PATH_VACCINE_ADD,
  PATH_VACCINE_TABLE,
} from '../../constants/routes';
import { saveLoginResponse } from '../../cookies/cookie';
import { resetAuth } from '../../redux_toolkit/slices/authSlice';
import successMessage, { errorMessage } from '../../utils/message';
import CNavlink from '../Customs/CNavlink/CNavlink';

import './Navbar.scss';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleLogout = async (msg?: string) => {
    setLoading(true);
    setIsModalVisible(false);
    dispatch(resetAuth());
    try {
      const res = await logout();
      successMessage(msg + 'logged out successfully');
      navigate(PATH_LOGIN, { replace: true });
    } catch (e) {
      errorMessage('couldnot logout properly');
    }
    saveLoginResponse('');
    setLoading(false);
  };

  return (
    <div className='layout--container'>
      <div className='navbar--container'>
        <CNavlink Icon={LockOutlined} to={PATH_VACCINE_ADD}>
          Create new Vaccine
        </CNavlink>
        <CNavlink Icon={MailOutlined} to={PATH_VACCINE_TABLE}>
          Vaccines
        </CNavlink>
        <CNavlink Icon={MailOutlined} to={PATH_SETTING}>
          Settings
        </CNavlink>

        <Modal
          title='Logout'
          open={isModalVisible}
          onOk={() => handleLogout('')}
          onCancel={() => setIsModalVisible(false)}
        >
          <p>Are you sure you want to logout?</p>
        </Modal>
        <Button onClick={() => setIsModalVisible(true)}>Logout</Button>
      </div>
      <Outlet />
    </div>
  );
};
export default Navbar;
