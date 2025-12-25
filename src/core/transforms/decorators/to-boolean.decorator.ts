import { Transform } from 'class-transformer';
import { toBoolean } from '../utils/to-boolean';

export const ToBoolean = () => Transform(({ value }) => toBoolean(value));
