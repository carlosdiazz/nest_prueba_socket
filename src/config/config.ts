import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const config = registerAs('config', () => {
  return {
    URL: {
      URI_MONGO: process.env.URI_MONGO,
    },
    JWT: {
      JWT_SECRET: process.env.JWT_SECRET,
      JWT_EXPIRE: process.env.JWT_EXPIRE,
    },
  };
});

export const validationENV = () => {
  return Joi.object({
    URI_MONGO: Joi.string().required(),

    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRE: Joi.string().required(),
  });
};
