import { IRegister } from '../interface/IRegister';

export const getRegisterBodyFromForm = (values: any):IRegister => {
  const body = {
    name: values.name.trim(),
    email: values.email,
    password: values.password,
    confirmPassword: values.confirmPassword,
  };
  return body;
};

export const getLoginBodyFromForm = (values: any) => {
  const body = {
    email: values.email,
    password: values.password,
  };
  return body;
};

export const getEditBodyFromForm = (values: any) => {
  const body = {
    name: values.name.trim(),
    password: values.newPassword1,
    confirmPassword: values.newPassword2,
    oldPassword: values.oldPassword,
  };
  return body;
};
