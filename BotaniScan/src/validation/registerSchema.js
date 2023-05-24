import Joi from "joi"

// rules validasi
const registerValidate = Joi.object({
    name: Joi.string()
        .min(3)
        .max(100)
        .required(),
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .min(8)
        .regex(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/)
        .message('Password must contain letters and numbers only, and be at least 8 characters long')
}).options({ abortEarly: false })

export { registerValidate }