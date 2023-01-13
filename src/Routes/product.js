import express from "express";
const router = express.Router()
import { upload } from "../middlewares/uploadImg.js";
import { getProduct, getProductID, addProduct, deleteProduct, updateProductPatch, searchByName } from '../Controllers/controllerProduct.js'
import tokenLogin from "../middlewares/Login.js";

router
    .get('/getAll', getProduct)
    .get('/getId/:id', getProductID)
    .post('/', upload.single('image'), addProduct)
    .get('/search', searchByName)
    .delete('/:id', deleteProduct)
    .patch('/:id', upload.single('image'), updateProductPatch)

export default router