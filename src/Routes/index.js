import express from 'express'
import product from './product.js'
import user from './user.js'
import categorys from './categorys.js'

const routes = (app) => {
    app.use(
        express.json(),
        user,
        product,
        categorys
    )
}

export default routes