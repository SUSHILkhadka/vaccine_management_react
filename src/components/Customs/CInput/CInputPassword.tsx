import { Input } from 'antd';
import { InputProps } from "antd/lib/input";

import './Input.scss';

export const CInputPassword = (props: InputProps) => {
  return <Input.Password className='input input--password' {...props} />;
};
