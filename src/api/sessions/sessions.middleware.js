import { celebrate, Joi, Segments } from 'celebrate'

const validateCreateSessionSchema = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
})

export { validateCreateSessionSchema }
