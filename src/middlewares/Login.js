import jwt from "jsonwebtoken";

const tokenLogin = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            res.status(401).json({message: 'Token não fornecido'})
        }else {
            jwt.verify(token, 'segredo', (err, decode) => {
                if(err) {
                    res.status(401).json({message: 'Token inválido'})
                }else {
                    req.usuario = decode
                    next()
                }
            })
        }
        
       
    } catch (err) {
        return res.status(401).send({msg: err.message})
    }
}

export default tokenLogin