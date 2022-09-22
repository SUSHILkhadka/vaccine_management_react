import * as yup from 'yup';
import signupSchema from './signupSchema';
/**
 * field: is key of value
 * value: is value to be validated
 * schema: is yup object schema with constraints for validation defined
 * throws error
 */
const formValidator = async (
  key: string,
  value: any,
  schema: yup.ObjectSchema<any>
) => {
  schema.validateSyncAt(key, { [key]: value });
};

export const ruleForSignIn = {
  validator: async ({ field }: any, value: any) =>
    await formValidator(field, value, signupSchema),
};
