import express from 'express'
import { storeValidate } from '../validation/storeSchema.js'
import { validate } from '../middleware/validate.js'

// memanggil controller about
import {
    getStore, getByIdStore,
    postStore, updateStore, deleteStore
} from '../controller/storeController.js'

const router = express.Router()

// ENDPOINT API

// GET DATA
router.get('/store', getStore)

// GET DATA BY ID
router.get('/store/:store_id', getByIdStore)

// POST DATA
router.post('/store', validate(storeValidate), postStore)

// UPDATE DATA
router.put('/store/:store_id', validate(storeValidate), updateStore)

// DELETE DATA
router.delete('/store/:store_id', deleteStore)

export default router 