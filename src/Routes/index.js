import express from 'express'
import product from './product.js'
import user from './user.js'
import categorys from './categorys.js'

const routes = (app) => {
    app.use(
        express.json(),
        categorys,
        user,
        product,
    )
}

export default routes