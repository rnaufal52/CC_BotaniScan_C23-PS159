import Joi from "joi"

// rules validasi
const plantValidate = Joi.object({
    name: Joi.string()
        .min(4)
        .max(50)
        .required(),
    desc: Joi.string()
        .min(10)
        .required(),
}).options({ abortEarly: false })

export { plantValidate }