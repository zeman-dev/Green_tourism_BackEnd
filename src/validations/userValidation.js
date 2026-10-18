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
