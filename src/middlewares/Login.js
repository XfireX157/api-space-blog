import jwt from "jsonwebtoken";

const tokenLogin = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'segredo')
        req.usuario = decode
        next()
    } catch (err) {
        return res.status(401).send({msg: err.message})
    }
}

export default tokenLogin