import db from "../Server/db.js";
import bcrypt from 'bcrypt'
const saltRounds = 10
import jwt from "jsonwebtoken";

export const getUsers = (req, res) => {
    try {
        db.query("SELECT * FROM tb_users", (err, data) => {
            if (err) return res.status(400).json(err)
            return res.status(200).json({
                msg: "Sucesso em pegar todos os dados do banco",
                result: data
            })
        })
    } catch (err) {
        return res.status(500).send(err)
    }
}

export const getUserID = (req, res) => {
    try {
        const { id } = req.params
        db.query("SELECT * FROM tb_users WHERE `id` = ?", [id], (err, data) => {
            if (err) return res.status(400).json(err)
            return res.status(200).json({
                msg: `Sucesso em pegar o id ${id}`,
                result: data
            })
        })
    } catch (err) {
        return res.status(500).send(err)
    }
}

export const registerUsers = (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password

        db.query("SELECT * FROM tb_users WHERE email = ? ", [email],
            (error, result) => {
                if (error) {
                    return res.send(error)
                }
                if (result.length == 0) {
                    bcrypt.hash(password, saltRounds, (err, hash) => {
                        db.query("INSERT INTO tb_users(email, password) VALUES(?, ?)",
                            [email, hash], (err) => {
                                if (err) {
                                    return res.send(err)
                                }
                                return res.json({
                                    msg: "Cadastro realizado com sucesso",
                                    email: email,
                                    password: password
                                })
                            })
                    })
                } else {
                    return res.send({ msg: "Usuario já cadastrado" })
                }
            })
    } catch (err) {
        return res.status(500).send(err)
    }
}

export const loginUser = (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password

        db.query("SELECT * FROM tb_users WHERE email = ?", [email], (err, result) => {
            if (err) return res.status(500).send({ error: err })

            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, result) => {
                    if (result) {
                        const token = jwt.sign({
                            id: result.id,
                            email: result.email
                        }, process.env.JWT, { expiresIn: 86400 })
                        res.status(200).json({
                            token: token,
                            msg: "Usario logado com sucesso"
                        })
                    } else {
                        res.status(401).json({ msg: "A senha ou email estão incorretos", err: err })
                    }
                })
            }
            else {
                res.status(404).json({ msg: "Usario não encontrado" })
            }
        })
    }catch(err) {
        return res.status(500).send(err)
    }
}