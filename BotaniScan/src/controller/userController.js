import {
    getByTokenUserModel, updateUserModel, checkEmailUser, getPasswordFromDatabase, changePasswordModel
} from "../models/userModel.js"
import bcrypt, { hash } from 'bcrypt'

// get by token
const getByTokenUser = async (req, res) => {
    const user_id = req.user_id
    try {
        const [data] = await getByTokenUserModel(user_id)
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
                message: 'Success grab data user',
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

// update data
const updateUser = async (req, res) => {
    const user_id = req.user_id
    const { body } = req
    const dates = new Date()
    try {
        // check apakah email sudah digunakan
        const [isRegister] = await checkEmailUser(body, user_id)
        if (isRegister.length !== 0) {
            return res.status(400).json({
                code: 400,
                status: 'BAD REQUEST',
                message: 'Email is already register',
                data: null,
            })
        }
        const [data] = await updateUserModel(body, user_id, dates)
        if (data.affectedRows === 0) {
            res.status(404).json({
                code: 404,
                status: 'NOT FOUND',
                message: 'Data not found',
                data: null,
            })
        } else {
            const responseData = { ...req.body }
            delete responseData.password
            res.json({
                code: 200,
                status: "OK",
                message: 'update user is success',
                data: responseData,
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

const changePassword = async (req, res) => {
    const user_id = req.user_id
    const { body } = req
    const dates = new Date()
    const hashedPassword = await hashPassword(body.newPassword)
    try {
        const [check] = await getPasswordFromDatabase(user_id)
        // check apakah password lama sama
        const isMatch = await bcrypt.compare(body.oldPassword, check[0].password)
        if (!isMatch) {
            // Password tidak cocok
            return res.status(400).json({
                code: 400,
                status: 'BAD REQUEST',
                message: 'Password not correct',
                data: null,
            })
        } else {
            const [data] = await changePasswordModel(user_id, hashedPassword, dates)
            res.json({
                code: 200,
                status: "OK",
                message: 'change passowrd is success',
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

const hashPassword = async (password) => {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    return hashedPassword
}

export {
    getByTokenUser,
    updateUser,
    changePassword
}