import db from '../Server/db.js';

export const categoryGet = (__, res) => {
    try {
        db.query("SELECT * FROM categorys", (err, data) => {
            if (err) return res.status(401).json({
                msg: "Erro ao puxar a tabela de categorias"
            });
            return res.status(200).json({
                msg: "Sucesso ao encontrar todas as categorias",
                categorys: data
            });
        });
    } catch (err) {
        return res.status(500).send(err);
    }
}

export const categoryGetID = async (req, res) => {
    try {
        const sql = "SELECT * FROM categorys WHERE `id` = ?";
        const { id } = req.params;

        db.query(sql, [id], (err, data) => {
            if (err) return res.status(401).send(err);
            return res.status(200).json({
                sucess: data,
                msg: `Foi buscado o id esperado ${id}`
            });
        });
    } catch (err) {
        return res.status(500).send(err);
    }
}

export const categoryPost = async (req, res) => {
    try {
        const sql = "INSERT INTO categorys (`categoryName`) VALUES(?)";

        db.query(sql, [req.body.categoryName], (err, data) => {
            if (err) return res.status(400).json(err);
            return res.status(200).json({
                sucess: data,
                msg: "Cadastro da categoria foi realizado com sucesso"
            });
        });
    } catch (err) {
        return res.status(500).send(err);
    }
}

export const categoryDelete = async (req, res) => {
    try {
        const sql = "DELETE FROM categorys WHERE `id` = ?";

        db.query(sql, [req.params.id], (err, data) => {
            if (err) return res.status(400).json(err);
            return res.status(200).json({
                sucess: data,
                msg: "A Categoria foi deletada com sucesso"
            });
        });
    } catch (err) {
        return res.status(500).send(err);
    }
}

export const categoryPatch = async (req, res) => {
    try {
        const sql = "UPDATE categorys SET `categoryName` = ? WHERE `id` = ?";
        db.query(sql, [req.body.categoryName, req.params.id], (err, data) => {
            if (err) return res.status(400).json(err);
            return res.status(200).json({
                msg: "Update feito com sucesso"
            });
        });
    } catch (err) {
        return res.status(500).send(err);
    }
}