import * as Joi from 'joi';

export const ENV_VALIDATION_SCHEMA = Joi.object({
  DATA_SOURCE_USERNAME: Joi.string().required(),
  DATA_SOURCE_PASSWORD: Joi.string().required(),
  DATA_SOURCE_HOST: Joi.string().required(),
  DATA_SOURCE_PORT: Joi.number().required(),
  DATA_SOURCE_DATABASE: Joi.string().required(),
  DATA_SOURCE_URL: Joi.string().required(),
  JWT_SECRET_KEY: Joi.string().required(),
  NODE_ENV: Joi.string().required()
});
