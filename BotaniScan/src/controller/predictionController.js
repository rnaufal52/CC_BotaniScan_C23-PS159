import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'
import { nanoid } from "nanoid"
import { postPredictModel, getDiseaseId, getPlantId } from '../models/predictModel.js'


const predictionPlant = async (req, res, plant) => {
    try {
        // mengambil user id
        const user_id = req.user_id
        // buat variabel untuk prediction id
        const prediction_id = nanoid(16)
        const dates = new Date() //variable tanggal

        // check jika tidak ada file yang diupload
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' })
        }

        const { buffer, mimetype } = req.file

        // untuk mengirim gambar dan jenis gambarnya
        const formData = new FormData()
        formData.append('file', buffer, {
            filename: 'file',
            contentType: mimetype,
        })

        // untuk edit header ada content-type
        const config = {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            },
        }

        // komunikasi dengan api untuk prediksi
        const response = await axios.post(
            `http://127.0.0.1:5000/predict/${plant}`,
            formData,
            config
        )
        const predict = response.data

        // mengambil plant id
        const [plant_id] = await getPlantId(plant)
        // mengambil disease id
        const [disease_id] = await getDiseaseId(predict)

        // kondisi jika response status sama dengan 200
        if (response.status === 200) {
            const extension = mimetype.split('/')[1]
            const imageName = `${nanoid()}.${extension}` // Nama file yang digunakan untuk menyimpan gambar
            const imagePath = `public/img/${imageName}` // Jalur lengkap untuk menyimpan gambar
            fs.writeFileSync(imagePath, buffer)
            // upload data
            const [data] = await postPredictModel(prediction_id, dates, predict, plant_id, disease_id, user_id, imagePath)
        }

        res.json({
            code: 200,
            status: "OK",
            message: 'add predict success',
            data: predict,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            code: 500,
            status: 'INTERNAL SERVER ERROR',
            message: error,
            data: req.body,
        })
    }
}


export { predictionPlant }