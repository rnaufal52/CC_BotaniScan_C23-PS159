import {
    getPlantModel, getByIdPlantModel,
    postPlantModel, updatePlantModel,
    deletePlantModel
} from "../models/plantModel.js"
import { nanoid } from "nanoid"

// get data
const getPlant = async (req, res) => {
    try {
        const [data] = await getPlantModel()
        res.json({
            code: 200,
            status: 'OK',
            message: 'success grab data plant',
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
const getByIdPlant = async (req, res) => {
    const { plant_id } = req.params
    try {
        const [data] = await getByIdPlantModel(plant_id)
        if (data.length === 0) {
            res.status(404).json({
                code: 404,
                status: 'NOT FOUND',
                message: 'Data plant not found',
                data: null,
            })
        } else {
            res.json({
                code: 200,
                status: 'OK',
                message: 'Success grab data plant',
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
const postPlant = async (req, res) => {
    const { body } = req
    const plant_id = nanoid(16)
    try {
        const [data] = await postPlantModel(body, plant_id)
        res.json({
            code: 200,
            status: "OK",
            message: 'add plant is success',
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
const updatePlant = async (req, res) => {
    const { plant_id } = req.params
    const { body } = req
    try {
        const [data] = await updatePlantModel(body, plant_id)
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
                message: 'update plant is success',
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
const deletePlant = async (req, res) => {
    const { plant_id } = req.params
    try {
        const [data] = await deletePlantModel(plant_id)
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
                message: 'success deleted plant',
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
    getPlant,
    getByIdPlant,
    postPlant,
    updatePlant,
    deletePlant
}