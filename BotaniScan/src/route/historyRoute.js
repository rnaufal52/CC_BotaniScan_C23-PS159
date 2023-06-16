import express from 'express'
import auth from '../middleware/authentication.js'

// memanggil controller history
import {
    getHistory, getByIdHistory, deleteHistory
} from '../controller/historyController.js'

const router = express.Router()

// ENDPOINT API

// GET DATA
router.get('/history', auth, getHistory)

// GET DATA by id
router.get('/history/:prediction_id', auth, getByIdHistory)

// Delete DATA
router.delete('/history/:prediction_id', auth, deleteHistory)

export default router