import { getHistoryModel, getHistoryModelById, deleteHistoryModel } from "../models/historyModel.js"

// get data
const getHistory = async (req, res) => {
    try {
        const user_id = req.user_id
        const [data] = await getHistoryModel(user_id)
        console.log(data)
        if (data === undefined) {
            res.status(404).json({
                code: 404,
                status: 'NOT FOUND',
                message: 'Data prediction not found',
                data: null,
            })
        } else {
            res.json({
                code: 200,
                status: 'OK',
                message: 'Success grab data prediction',
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

// get by id
const getByIdHistory = async (req, res) => {
    const { prediction_id } = req.params
    try {
        const [data] = await getHistoryModelById(prediction_id)
        if (data === undefined) {
            res.status(404).json({
                code: 404,
                status: 'NOT FOUND',
                message: 'Data prediction not found',
                data: null,
            })
        } else {
            res.json({
                code: 200,
                status: 'OK',
                message: 'Success grab data prediction',
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

// deleted
const deleteHistory = async (req, res) => {
    const { prediction_id } = req.params
    try {
        const [data] = await deleteHistoryModel(prediction_id)
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
                message: 'success deleted history',
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

export { getHistory, getByIdHistory, deleteHistory }