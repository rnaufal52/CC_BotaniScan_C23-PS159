import Joi from "joi"

// rules validasi
const userValidate = Joi.object({
    name: Joi.string()
        .min(5)
        .max(50)
        .required(),
    email: Joi.string()
        .min(10)
        .required(),
}).options({ abortEarly: false })

export { userValidate }