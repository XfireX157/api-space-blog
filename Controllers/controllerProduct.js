import db from '../Server/db.js'

export const getProduct = (__, res) => {
    db.query("SELECT * FROM tbprodutos", (err, data) => {
        if (err) return res.status(400).json(err)
        return res.status(200).json({
            msg: "Sucesso ao encontrar todas as imagens",
            cards: data,
            url: "http://localhost:8080/files/upload/"
        })
    })
}

export const getProductID = (req, res) => {
    const { id } = req.params

    const sql = "SELECT * FROM tbprodutos WHERE `idProdutos` = ?"

    db.query(sql, [id], (err, data) => {
        if (err) return res.status(404).json(err)
        return res.status(200).json({
            card: data,
            msg: "Sucesso ao encontrar o produto especifico"
        })
    })
}

export const addProduct = async (req, res) => {
    if (req.file) {
        const sql = "INSERT INTO tbprodutos(`nome`, `price`, `category`, `image`) VALUES(?,?,?,?)"

        const { nome } = req.body
        const { price } = req.body
        const { category } = req.body
        const image = req.file.filename

        db.query(sql, [nome, price, category, image], (err, data) => {
            if (err) return res.status(400).json(err)
            return res.status(200).json({
                sucess: {
                    nome,
                    price,
                    category,
                    image
                },
                msg: "Cadastro do produto foi realizado com sucesso"
            })
        })
    }
}

export const updateProduct = (req, res) => {
    const sql = "UPDATE tbprodutos SET `nome` = ? , `price` = ?, `category` = ?, `image` = ? WHERE `idProdutos` = ?"

    const { nome } = req.body
    const { price } = req.body
    const { category } = req.body
    const image = req.file.filename

    db.query(sql, [nome, price, category, image, req.params.id], (err) => {
        if (err) return res.json(err)
        return res.status(200).json({
            sucess: {
                nome,
                price,
                category,
                image
            },
            msg: "Atualizado todos os dados "
        })
    })
}

export const updateProductPatch = (req, res) => {
    const sql = "UPDATE tbprodutos SET `nome` = ? , `price` = ?, `category` = ? WHERE `idProdutos` = ?"

    const { nome } = req.body
    const { price } = req.body
    const { category } = req.body

    db.query(sql, [nome, price, category, req.params.id], (err) => {
        if (err) return res.json(err)
        return res.status(200).json({
            sucess: {
                nome,
                price,
                category
            },
            msg: "Produto editado com sucesso"
        })
    })
}

export const searchByName = (req, res) => {
    const {nome} = req.query

    db.query("SELECT * FROM tbprodutos WHERE nome LIKE ?", ["%" + nome + "%"], 
    (err, result) => {
        if(err) throw err

        return res.status(200).json({result})
    })
}

export const deleteProduct = (req, res) => {
    const sql = "DELETE FROM tbprodutos WHERE `idProdutos` = ?"

    db.query(sql, [req.params.id], (err) => {
        if (err) return res.json(err)
        return res.status(200).json({
            msg: "Usuario deletado com sucesso"
        })
    })
} 