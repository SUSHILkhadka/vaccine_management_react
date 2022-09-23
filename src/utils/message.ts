import { message } from 'antd';
const successMessage = (msg: string, duration: number = 2) => {
  message.success(msg, duration);
};
export const errorMessage = (msg: string, duration: number = 2) => {
  message.error(msg, duration);
};
export default successMessage;
