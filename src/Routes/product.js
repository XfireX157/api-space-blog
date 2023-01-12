import express from "express";
const router = express.Router()
import tokenLogin from "../middlewares/Login.js";
import { upload } from "../middlewares/uploadImg.js";
import { getProduct, getProductID,addProduct, deleteProduct, updateProduct, updateProductPatch, searchByName } from '../Controllers/controllerProduct.js'

router
    .get('/getAll', getProduct)
    .get('/getId/:id' , getProductID)
    .get('/search', searchByName)
    .post('/', tokenLogin, upload.single('image'), addProduct)
    .delete('/:id', tokenLogin, deleteProduct)
    .put('/:id', tokenLogin, upload.single('image'), updateProduct)
    .patch('/:id', tokenLogin, updateProductPatch)

export default router