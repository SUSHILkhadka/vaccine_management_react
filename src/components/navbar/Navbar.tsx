import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { logout } from '../../axios/backendUser';
// import { IMAGE_LOGO1 } from '../../constants/common';
import IMAGE_LOGO1 from '../../assets/logo1.png';
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
    } catch (e) {
      errorMessage('couldnot logout properly');
    }
    saveLoginResponse('');
    navigate(PATH_LOGIN, { replace: true });
    setLoading(false);
  };

  const [optionsOn, setOptionsOn] = useState<boolean>(false);
  const changeOptions = () => {
    setOptionsOn(!optionsOn);
  };
  const onStyle = {
    display: 'flex',
  };
  const offStyle = {
    display: 'none',
  };

  return (
    <div className='layout--container' >
      <div className='button--navbar--wrapper'>
        <div onClick={changeOptions} className='options'>
          &#8801;
        </div>
        <div
        onClick={()=>setOptionsOn(false)}
          className={
            !optionsOn ? 'navbar--container' : 'navbar--container disable'
          }
        >
          <div className='navbar--image--containter'>
            <img className='img--logo' src={IMAGE_LOGO1}></img>
            <div className='navbar--logo--text'></div>
          </div>
          <div onClick={changeOptions} className='options options--navbar'>
            &#8801;{' '}
          </div>
          <CNavlink Icon={LockOutlined} to={PATH_VACCINE_ADD}>
            Create Vaccine
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
            footer={[
              <Button
                className='button button--save button--edit'
                key='back'
                onClick={() => setIsModalVisible(false)}
              >
                Cancel
              </Button>,
              <Button
                key='submit'
                type='primary'
                className='button button--save'
                loading={loading}
                onClick={() => handleLogout('')}
              >
                Logout
              </Button>,
            ]}
          >
            <p>Are you sure you want to logout?</p>
          </Modal>
          <CNavlink Icon={MailOutlined} onClick={() => setIsModalVisible(true)}>
            Logout
          </CNavlink>
        </div>
      </div>
      <div onClick={()=>setOptionsOn(false)} style={{width:"100%"}}>
      <Outlet />
      </div>
    </div>
  );
};
export default Navbar;
