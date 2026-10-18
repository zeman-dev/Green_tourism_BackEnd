import { Joi, Segments } from 'celebrate';

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().max(32).required().trim().min(2),
    email: Joi.string().email().max(64).trim().lowercase().required(),
    password: Joi.string().min(8).max(72).required(),
    avatar: Joi.string()
      .uri({ scheme: ['http', 'https'] })
      .allow(''),
  }),
};

export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().max(64).trim().lowercase().required(),
    password: Joi.string().max(72).required(),
  }),
};
