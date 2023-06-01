import {
    getByTokenUserModel, updateUserModel
} from "../models/userModel.js"
import * as dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
dotenv.config()

// get by token
const getByTokenUser = async (req, res) => {
    const user = req.headers['authorization']
    const token = user.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user_id = decoded.id;
    try {
        const [data] = await getByTokenUserModel(user_id)
        if (data.length === 0) {
            res.status(404).json({
                code: 404,
                status: 'NOT FOUND',
                message: 'Data not found',
                data: null,
            });
        } else {
            res.json({
                code: 200,
                status: 'OK',
                message: 'Success grab data user',
                data: data,
            });
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
    const user = req.headers['authorization']
    const token = user.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user_id = decoded.id;
    const { body } = req
    const dates= new Date();
    const hashedPassword = await hashPassword(body.password)
    try {
        const [data] = await updateUserModel(body, user_id, dates, hashedPassword)
        if (data.affectedRows === 0) {
            res.status(404).json({
                code: 404,
                status: 'NOT FOUND',
                message: 'Data not found',
                data: null,
            });
        } else {
            const responseData = { ...req.body };
            delete responseData.password;
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

const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

export {
    getByTokenUser,
    updateUser
}