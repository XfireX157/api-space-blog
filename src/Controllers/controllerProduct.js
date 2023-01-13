import db from '../Server/db.js'

export const getProduct = async (__, res) => {
    try {
        db.query("SELECT * FROM tbprodutos", (err, data) => {
            if (err) return res.status(400).json(err)
            return res.status(200).json({
                msg: "Sucesso ao encontrar todas as imagens",
                cards: data,
                url: "https://api-space-blog-production.up.railway.app/images/"
            })
        })
    } catch (err) {
        return res.status(500).send(err, "sdasd")
    }
}

export const getProductID = (req, res) => {
    try {
        const { id } = req.params
        const sql = "SELECT * FROM tbprodutos WHERE `idProdutos` = ?"

        db.query(sql, [id], (err, data) => {
            if (err) return res.status(404).json(err)
            return res.status(200).json({
                card: data,
                msg: "Sucesso ao encontrar o produto especifico",
                url: "https://api-space-blog-production.up.railway.app/images/"
            })
        })
    } catch (err) {
        return res.status(500).send({ msg: 'ops' })
    }
}

export const addProduct = async (req, res) => {
    try {
        if (req.file) {
            const sql = "INSERT INTO tbprodutos(`nome`, `price`, `category`, `image`) VALUES(?,?,?,?)"
            const { nome, price, category } = req.body
            const image = req.file.filename

            db.query(sql, [nome, price, category, image], (err, data) => {
                if (err) return res.status(400).json(err)
                return res.status(200).json({
                    sucess: { nome, price, category, image },
                    msg: "Cadastro do produto foi realizado com sucesso"
                })
            })
        }
    } catch (err) {
        return res.status(500).send(err)
    }
}

export const updateProductPatch = (req, res) => {
    try {
        const sql = "UPDATE tbprodutos SET `nome` = ? , `price` = ?, `category` = ?, `image` = ? WHERE `idProdutos` = ?"
        const { nome, price, category } = req.body
        const image = req.file.filename

        db.query(sql, [nome, price, category, image, req.params.id], (err) => {
            if (err) return res.json(err)
            return res.status(200).json({
                sucess: { nome, price, category },
                msg: "Produto editado com sucesso"
            })
        })
    } catch (err) {
        return res.status(500).send(err)
    }
}

export const searchByName = (req, res) => {
    try {
        const { nome } = req.query

        db.query("SELECT * FROM tbprodutos WHERE nome LIKE ?", ["%" + nome + "%"], (err, result) => {
            if (err) throw err
            return res.status(200).json({ result})
        })
    } catch (err) {
        return res.status(500).send(err)
    }
}

export const deleteProduct = (req, res) => {
    try {
        const sql = "DELETE FROM tbprodutos WHERE `idProdutos` = ?"

        db.query(sql, [req.params.id], (err) => {
            if (err) return res.json(err)
            return res.status(200).json({
                msg: "Usuario deletado com sucesso"
            })
        })
    } catch (err) {
        return res.status(500).send(err)
    }
} 