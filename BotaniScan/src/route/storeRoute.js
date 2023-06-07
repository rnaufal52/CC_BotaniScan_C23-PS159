import express from 'express'
import { storeValidate } from '../validation/storeSchema.js'
import { validate } from '../middleware/validate.js'
import auth from '../middleware/authentication.js'

// memanggil controller about
import {
    getStore, getByIdStore,
    postStore, updateStore, deleteStore
} from '../controller/storeController.js'

const router = express.Router()

// ENDPOINT API

// GET DATA
router.get('/store', auth, getStore)

// GET DATA BY ID
router.get('/store/:store_id', auth, getByIdStore)

// POST DATA
router.post('/store', auth, validate(storeValidate), postStore)

// UPDATE DATA
router.put('/store/:store_id', auth, validate(storeValidate), updateStore)

// DELETE DATA
router.delete('/store/:store_id', auth, deleteStore)

export default router 