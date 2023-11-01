const jwt = require("jsonwebtoken")

const validarToken = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ msg: 'Token não fornecido!' })
    }

    const [,token] = authHeader.split(' ')

    try {
        jwt.verify(token, process.env.JWT_SECRET)
        
        next();
    } catch (error) {
        return res.status(401).json({ msg: 'Token inválido!' })
    }
}

module.exports = validarToken