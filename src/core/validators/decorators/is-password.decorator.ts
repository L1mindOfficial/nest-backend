import {
  buildMessage,
  matches,
  ValidateBy,
  ValidationOptions
} from 'class-validator';
import { PASSWORD_REGEX } from '../rules/password.rules';

const IS_PASSWORD_KEY = 'isPassword';

const isPassword = (value: string): boolean => matches(value, PASSWORD_REGEX);

export const IsPassword = (
  validationOptions?: ValidationOptions
): PropertyDecorator => {
  return ValidateBy({
    name: IS_PASSWORD_KEY,
    validator: {
      validate: (value): boolean => isPassword(value),
      defaultMessage: buildMessage(
        (eachPrefix) => eachPrefix + '$property must be valid',
        validationOptions
      )
    }
  });
};
