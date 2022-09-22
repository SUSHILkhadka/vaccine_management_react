import { Input } from 'antd';
import '../../../styles/Input.scss';

export const CInputPassword = (props: any) => {
  return <Input.Password className='input input--password' {...props} />;
};
