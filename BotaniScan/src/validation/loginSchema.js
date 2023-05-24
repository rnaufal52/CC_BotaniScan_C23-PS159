import Joi from "joi"

// rules validasi
const loginValidate = Joi.object({
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .required()
}).options({ abortEarly: false })

export { loginValidate }