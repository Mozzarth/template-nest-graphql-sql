import * as Joi from 'joi';

export const appConfigSchema = Joi.object({
  NODE_ENV: Joi.required(),

  // DATABASE
  DATABASE_HOST: Joi.required(),
  DATABASE_PORT: Joi.required(),
  DATABASE_USER: Joi.required(),
  DATABASE_PASSWORD: Joi.required(),
  DATABASE_NAME: Joi.required(),
});
