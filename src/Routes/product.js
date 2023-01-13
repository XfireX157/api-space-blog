import express from "express";
const router = express.Router()
import { upload } from "../middlewares/uploadImg.js";
import { getProduct, getProductID, addProduct, deleteProduct, updateProductPatch, searchByName } from '../Controllers/controllerProduct.js'
import tokenLogin from "../middlewares/Login.js";

router
    .get('/getAll', getProduct)
    .get('/getId/:id', getProductID)
    .get('/search', searchByName)
    .post('/Post', tokenLogin, upload.single('image'), addProduct)
    .delete('/:id', tokenLogin, deleteProduct)
    .patch('/:id', tokenLogin, upload.single('image'), updateProductPatch)

export default router