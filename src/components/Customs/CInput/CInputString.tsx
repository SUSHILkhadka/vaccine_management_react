import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';
import './Input.scss';

export const CInputString = (props: InputProps) => {
  return <Input className='input' {...props} />;
};
