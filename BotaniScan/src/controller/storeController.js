import {
    getStoreModel, getByIdStoreModel,
    postStoreModel, updateStoreModel,
    deleteStoreModel
} from "../models/storeModel.js"
import { nanoid } from "nanoid"

// get data
const getStore = async (req, res) => {
    try {
        const [data] = await getStoreModel()
        res.json({
            code: 200,
            status: 'OK',
            message: 'success grab data store',
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
const getByIdStore = async (req, res) => {
    const { store_id } = req.params
    try {
        const [data] = await getByIdStoreModel(store_id)
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
                message: 'Success grab data store',
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
const postStore = async (req, res) => {
    const { body } = req
    const store_id = nanoid(16)
    const dates = new Date()
    try {
        const [data] = await postStoreModel(body, store_id, dates)
        res.json({
            code: 200,
            status: "OK",
            message: 'add store is success',
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
const updateStore = async (req, res) => {
    const { store_id } = req.params
    const { body } = req
    const dates = new Date()
    try {
        const [data] = await updateStoreModel(body, store_id, dates)
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
                message: 'update store is success',
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
const deleteStore = async (req, res) => {
    const { store_id } = req.params
    try {
        const [data] = await deleteStoreModel(store_id)
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
                message: 'success deleted store',
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
    getStore,
    getByIdStore,
    postStore,
    updateStore,
    deleteStore
}