import * as Joi from 'joi';

export const joiValidationSchema = Joi.object({
    MONGO_CONNECTION: Joi.required(),
    PORT: Joi.number().default(3004)
})