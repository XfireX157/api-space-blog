import express from 'express'
const categorys = express.Router()
import { categoryGet, categoryPost, categoryDelete, categoryPatch, categoryGetID } from '../Controllers/categorysControllers.js'
import tokenLogin from '../middlewares/Login.js'

categorys
    .get('/categorysGet', categoryGet)
    .get('/categoryGetID/:id', categoryGetID)
    .post('/categorysPost', tokenLogin, categoryPost)
    .delete('/categorysDelete/:id', tokenLogin, categoryDelete)
    .patch('/categoryPatch/:id', tokenLogin, categoryPatch)

export default categorys
