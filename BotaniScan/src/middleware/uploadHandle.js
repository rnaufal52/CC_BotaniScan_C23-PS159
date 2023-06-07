import multer from 'multer'

const handleMulterError = (error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'File size exceeds the limit. Maximum file size allowed is 2MB.' })
        } else {
            return res.status(400).json({ error: 'Invalid file type. Only JPEG and PNG images are allowed.' })
        }
    } else if (error) {
        console.error(error)
        return res.status(500).json({ error: 'Internal server error' })
    }

    next()
}

export default handleMulterError
