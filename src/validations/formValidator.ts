import * as yup from 'yup';
import { checkForEmail } from '../axios/backendUser';
import signupSchema from './signupSchema';
import vaccineSchema from './vaccineSchema';
/**
 * field: is key of value
 * value: is value to be validated
 * schema: is yup object schema with constraints for validation defined
 * throws error
 */
const keyValueValidator = async (
  key: string,
  value: any,
  schema: yup.ObjectSchema<any>
) => {
  schema.validateSyncAt(key, { [key]: value });
};

export const ruleForSignIn = {
  validator: async ({ field }: any, value: any) =>
    await keyValueValidator(field, value, signupSchema),
};

export const checkIfEmailAlreadyExists = {
  validator: async ({ field }: any, value: any) => {
    await keyValueValidator(field, value, signupSchema);
    try {
      await checkForEmail(value);
    } catch (e) {
      return 0;
    }
    throw 'Email already exists';
  },
};

export const ruleForVaccine = {
  validator: async ({ field }: any, value: any) =>
    await keyValueValidator(field, value, vaccineSchema),
};

export const ruleForOldPassword = {
  validator: async ({ field }: any, value: any) =>
    await keyValueValidator('password', value, signupSchema),
};

export const confirmPasswordRule = (getFieldValue: any, value: string) => {
  if (!value || getFieldValue('password') === value) {
    return Promise.resolve();
  } else {
    return Promise.reject(new Error('Password do not match'));
  }
};

export const newPasswordRule = (getFieldValue: any, value: string) => {
  if (!value || getFieldValue('oldPassword') !== value) {
    return Promise.resolve();
  } else {
    return Promise.reject(
      new Error('New password cannot be same as old password')
    );
  }
};
