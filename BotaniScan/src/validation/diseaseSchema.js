import Joi from "joi"

// rules validasi
const diseaseValidate = Joi.object({
    name: Joi.string()
        .min(5)
        .max(50)
        .required(),
    desc: Joi.string()
        .min(10)
        .required(),
    solution: Joi.string()
        .min(10)
        .required(),
}).options({ abortEarly: false })

export { diseaseValidate }