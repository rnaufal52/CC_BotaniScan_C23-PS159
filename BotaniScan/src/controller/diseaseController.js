import {
    getDiseaseModel, getByIdDiseaseModel,
    postDiseaseModel, updateDiseaseModel,
    deleteDiseaseModel
} from "../models/diseaseModel.js"
import { nanoid } from "nanoid"

// get data
const getDisease = async (req, res) => {
    try {
        const [data] = await getDiseaseModel()
        res.json({
            code: 200,
            status: 'OK',
            message: 'success grab data disease',
            data: data,
        })
    } catch (error) {
        res.status(500).json({
            code: 500,
            status: 'INTERNAL SERVER ERROR',
            message: error,
            data: null,
        })
    }
}

// get by id
const getByIdDisease = async (req, res) => {
    const { disease_id } = req.params
    try {
        const [data] = await getByIdDiseaseModel(disease_id)
        if (data.length === 0) {
            res.status(404).json({
                code: 404,
                status: 'NOT FOUND',
                message: 'Data not found',
                data: null,
            })
        } else {
            res.json({
                code: 200,
                status: 'OK',
                message: 'Success grab data disease',
                data: data,
            })
        }
    } catch (error) {
        res.status(500).json({
            code: 500,
            status: 'INTERNAL SERVER ERROR',
            message: error,
            data: null,
        })
    }
}

// post
const postDisease = async (req, res) => {
    const { body } = req
    const disease_id = nanoid(16)
    try {
        const [data] = await postDiseaseModel(body, disease_id)
        res.json({
            code: 200,
            status: "OK",
            message: 'add disease is success',
            data: req.body,
        })
    } catch (error) {
        res.status(500).json({
            code: 500,
            status: 'INTERNAL SERVER ERROR',
            message: error,
            data: req.body,
        })
    }
}

// update data
const updateDisease = async (req, res) => {
    const { disease_id } = req.params
    const { body } = req
    try {
        const [data] = await updateDiseaseModel(body, disease_id)
        if (data.affectedRows === 0) {
            res.status(404).json({
                code: 404,
                status: 'NOT FOUND',
                message: 'Data not found',
                data: null,
            })
        } else {
            res.json({
                code: 200,
                status: "OK",
                message: 'update disease is success',
                data: req.body,
            })
        }
    } catch (error) {
        res.status(500).json({
            code: 500,
            status: 'INTERNAL SERVER ERROR',
            message: error,
            data: null,
        })
    }
}

// deleted
const deleteDisease = async (req, res) => {
    const { disease_id } = req.params
    try {
        const [data] = await deleteDiseaseModel(disease_id)
        if (data.affectedRows === 0) {
            res.status(404).json({
                code: 404,
                status: 'NOT FOUND',
                message: 'Data not found',
                data: null,
            })
        } else {
            res.json({
                code: 200,
                status: 'OK',
                message: 'success deleted disease',
                data: null,
            })
        }
    } catch (error) {
        res.status(500).json({
            code: 500,
            status: 'INTERNAL SERVER ERROR',
            message: error,
            data: null,
        })
    }
}


export {
    getDisease,
    getByIdDisease,
    postDisease,
    updateDisease,
    deleteDisease
}