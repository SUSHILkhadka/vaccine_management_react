import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Outlet } from 'react-router-dom';
import { PATH_VACCINE_ADD, PATH_VACCINE_TABLE } from '../../constants/routes';
import CNavlink from '../Customs/CNavlink/CNavlink';
import './Navbar.scss';

const Navbar = () => {
  return (
    <div className='layout--container'>
      <div className='navbar--container'>
        <CNavlink Icon={LockOutlined} to={PATH_VACCINE_ADD}>
          Create new Vaccine
        </CNavlink>
        <CNavlink Icon={MailOutlined} to={PATH_VACCINE_TABLE}>
          Vaccines
        </CNavlink>
        <CNavlink Icon={UserOutlined} to={PATH_VACCINE_ADD}>
          ff
        </CNavlink>
      </div>
      <Outlet />
    </div>
  );
};
export default Navbar;
