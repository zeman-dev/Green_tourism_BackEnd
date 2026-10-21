import { Joi, Segments } from 'celebrate';

export const getUserWithStoriesSchema = {
  [Segments.PARAMS]: Joi.object({
    userId: Joi.string().hex().length(24).required(),
  }),

  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).max(100).default(10),
  }),
};

export const savedArticleParamsSchema = {
  [Segments.PARAMS]: Joi.object({
    storyId: Joi.string().hex().length(24).required(),
  }),
};

export const getUsersSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).max(100).default(10),
  }),
};
export const updateUserSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().trim().min(2).max(32),
    email: Joi.string().email().trim().lowercase().max(64),
  }).min(1),
};

export const confirmEmailSchema = {
  [Segments.BODY]: Joi.object({
    token: Joi.string().required(),
  }),
};
