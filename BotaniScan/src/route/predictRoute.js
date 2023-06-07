import express from 'express'
import { predictionPlant } from '../controller/predictionController.js'
import upload from '../validation/uploadSchema.js'
import handleMulterError from '../middleware/uploadHandle.js'
import auth from '../middleware/authentication.js'

const router = express.Router()
// corn
router.post('/prediction/corn', auth, upload.single('file'), handleMulterError, (req, res) => {
    predictionPlant(req, res, "corn")
})
// potato
router.post('/prediction/potato', auth, upload.single('file'), handleMulterError, (req, res) => {
    predictionPlant(req, res, "potato")
})
// pepper
router.post('/prediction/pepper', auth, upload.single('file'), handleMulterError, (req, res) => {
    predictionPlant(req, res, "pepper")
})

export default router 