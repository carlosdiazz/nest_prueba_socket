import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const config = registerAs('config', () => {
  return {
    URL: {
      URI_MONGO: process.env.URI_MONGO,
    },
  };
});

export const validationENV = () => {
  return Joi.object({
    URI_MONGO: Joi.string().required(),
  });
};
