import express from 'express'
import { diseaseValidate } from '../validation/diseaseSchema.js'
import { validate } from '../middleware/validate.js'

// memanggil controller about
import {
    getDisease, getByIdDisease,
    postDisease, updateDisease, deleteDisease
} from '../controller/diseaseController.js'

const router = express.Router()

// ENDPOINT API

// GET DATA
router.get('/disease', getDisease)

// GET DATA BY ID
router.get('/disease/:disease_id', getByIdDisease)

// POST DATA
router.post('/disease', validate(diseaseValidate), postDisease)

// UPDATE DATA
router.put('/disease/:disease_id', validate(diseaseValidate), updateDisease)

// DELETE DATA
router.delete('/disease/:disease_id', deleteDisease)

export default router 