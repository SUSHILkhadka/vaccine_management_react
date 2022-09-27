import TextArea, { TextAreaProps } from 'antd/lib/input/TextArea';

import './Input.scss';

export const CTextArea = (props: TextAreaProps) => {
  return <TextArea  className='input input--textarea' {...props}/>;
};
