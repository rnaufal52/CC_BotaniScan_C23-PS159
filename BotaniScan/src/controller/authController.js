import { registrationAuthModel, checkEmailRegistered, loginAuthModel } from '../models/authModel.js'
import bcrypt from 'bcrypt';
import { nanoid } from "nanoid"
import * as dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

// registration
const registration = async (req, res) => {
    const { body } = req
    const user_id = nanoid(16);
    const dates = new Date();
    try {
        // Check if email is already registered
        const isEmailRegistered = await checkEmailRegistered(body.email);
        if (isEmailRegistered) {
            return res.status(400).json({
                code: 400,
                status: 'BAD REQUEST',
                message: 'Email is already registered',
                data: null,
            });
        }

        // encrypt password
        const hashedPassword = await hashPassword(body.password);
        const [data] = await registrationAuthModel(body, user_id, dates, hashedPassword)
        // Menghapus password dari data respons
        const responseData = { ...req.body };
        delete responseData.password;

        res.json({
            code: 200,
            status: "OK",
            message: 'Registration is successful',
            data: responseData,
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            status: 'INTERNAL SERVER ERROR',
            message: error,
            data: null,
        })
    }
}

// hash password
const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

// login
const login = async (req, res) => {
    const { body } = req
    try {
        const [user] = await loginAuthModel(body);
        // Check email apakah ada atau tidak
        if (user.length === 0) {
            return res.status(400).json({
                code: 400,
                status: 'BAD REQUEST',
                message: 'Email not correct',
                data: null,
            });
        }

        const isMatch = await bcrypt.compare(body.password, user[0].password);
        if (!isMatch) {
            // Password tidak cocok
            return res.status(400).json({
                code: 400,
                status: 'BAD REQUEST',
                message: 'Password not correct',
                data: null,
            });
        } else {
            // Generate token
            const loguser = { id: user[0].user_id, email: user[0].email };
            const accessToken = jwt.sign(loguser, process.env.SECRET_KEY, { expiresIn: '1h' });
            const refreshToken = jwt.sign(loguser, process.env.REFRESH_TOKEN_KEY);
            res.json({
                code: 200,
                status: "OK",
                message: 'Logged in successfully',
                accessToken, refreshToken
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


export {
    registration,
    login
}