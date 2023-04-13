import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const config = registerAs('config', () => {
  return {
    URL: {
      URL_SERVER: process.env.URL_SERVER,
    },
  };
});

export const validationENV = () => {
  return Joi.object({
    URL_SERVER: Joi.string().required(),
  });
};
