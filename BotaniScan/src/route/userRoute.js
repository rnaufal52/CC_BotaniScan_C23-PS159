import express from 'express'
import { userValidate } from '../validation/userSchema.js'
import { validate } from '../middleware/validate.js'
import auth from '../middleware/authentication.js'

// memanggil controller about
import {
    getByTokenUser, updateUser
} from '../controller/userController.js'

const router = express.Router()

// ENDPOINT API

// GET DATA BY ID
router.get('/users', auth, getByTokenUser)

// UPDATE DATA
router.put('/users', auth, validate(userValidate), updateUser)

export default router 