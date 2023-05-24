const logRequest = (req, res, next) => {
    console.log('log terjadi request ke:', req.path)
    next()
}

export default logRequest