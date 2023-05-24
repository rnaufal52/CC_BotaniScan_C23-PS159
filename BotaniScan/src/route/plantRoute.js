import express from 'express'
import { plantValidate } from '../validation/plantSchema.js'
import { validate } from '../middleware/validate.js'
import auth from '../middleware/authentication.js'

// memanggil controller plant
import {
    getPlant, getByIdPlant,
    postPlant, updatePlant, deletePlant
} from '../controller/plantController.js'

const router = express.Router()

// ENDPOINT API

// GET DATA
router.get('/plants', auth, getPlant)

// GET DATA BY ID
router.get('/plants/:plant_id', auth, getByIdPlant)

// POST DATA
router.post('/plants', auth, validate(plantValidate), postPlant)

// UPDATE DATA
router.put('/plants/:plant_id', auth, validate(plantValidate), updatePlant)

// DELETE DATA
router.delete('/plants/:plant_id', auth, deletePlant)

export default router 