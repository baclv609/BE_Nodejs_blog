import Joi from "joi";

export const userValidation = Joi.object({
    firstName: Joi.string().min(3).required().max(30).messages({
        "string.empty": "firstName không được để trông",
        "ahy.required": "firstName là bắt buộc!",
        "string.min": "firstName phải có ít nhất {#litmit} ký tự",
        "string.max": "firstName phải có ít hơn {#litmit + 1} ký tự",
    }),
    lastName: Joi.string().min(3).required().max(30).messages({
        "string.empty": "lastName không được để trông",
        "ahy.required": "lastName là bắt buộc!",
        "string.min": "lastName phải có ít nhất {#litmit} ký tự",
        "string.max": "lastName phải có ít hơn {#litmit + 1} ký tự",
    }),
    phone: Joi.string().min(10).required().messages({
        "string.empty": "Phone không được để trông",
        "ahy.required": "Phone là bắt buộc!",
        "string.min": "Phone phải có ít nhất {#litmit} ký tự",
     }),
    email: Joi.string().email().required().messages({
        "string.empty": "email không được để trông",
        "ahy.required": "email là bắt buộc!",
        "string.email": "email không đúng định dạng"
    }),
    password: Joi.string().min(6).max(255).required().messages({
        "string.empty": "Password không được để trông",
        "ahy.required": "Password là bắt buộc!",
        "string.min": "Password phải có ít nhất {#litmit} ký tự",
        "string.max": "Password phải có ít hơn {#litmit + 1} ký tự",
    }),
    confirmPassword: Joi.string().min(6).required().valid(Joi.ref('password')).messages({
        "string.empty": "ConfirmPassword không được để trông",
        "ahy.required": "ConfirmPassword là bắt buộc!",
        "string.min": "ConfirmPassword phải có ít nhất {#litmit} ký tự",
        "any.only": "ConfirmPassword phải giống với password"
    }),
    role: Joi.string(),
})

export const loginValidation = Joi.object({
    email: Joi.string().email().required().messages({
        "string.empty": "email không được để trông",
        "ahy.required": "email là bắt buộc!",
        "string.email": "email không đúng định dạng"
    }),
    password: Joi.string().min(6).max(255).required().messages({
        "string.empty": "Password không được để trông",
        "ahy.required": "Password là bắt buộc!",
        "string.min": "Password phải có ít nhất {#litmit} ký tự",
        "string.max": "Password phải có ít hơn {#litmit + 1} ký tự",
    })
})