import Joi from "joi";

export const postValid = Joi.object({
    title: Joi.string().min(5).required(),
    content: Joi.string().required(),
    author: Joi.string(),
    tag: Joi.array().items(Joi.string()),
    categoryId: Joi.string().required()
})