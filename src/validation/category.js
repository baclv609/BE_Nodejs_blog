import Joi from "joi";

export const categoryValid = Joi.object({
    name: Joi.string().required().min(5),
    slug: Joi.string().required().min(5),
})