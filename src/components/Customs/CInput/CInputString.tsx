import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';
import '../../../styles/Input.scss';

export const CInputString = (props: InputProps) => {
  return <Input className='input' {...props} />;
};
