import Joi from "joi"

// rules validasi
const storeValidate = Joi.object({
    name: Joi.string()
        .min(5)
        .max(50)
        .required(),
    address: Joi.string()
        .min(10)
        .required(),
    contact: Joi.string()
        .min(10)
        .required(),
    onlineshop: Joi.string()
        .min(5)
        .required(),
}).options({ abortEarly: false })

export { storeValidate }