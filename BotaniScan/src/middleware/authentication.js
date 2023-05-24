import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config()

const auth = async (req, res, next) => {
    const authHeaders = req.headers['authorization'];
    if (!authHeaders) {
        return res.status(401).json({ message: 'Please Authentication' });
    }
    try {
        const token = authHeaders.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.email = decoded.email;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid token' });
    }
}

export default auth