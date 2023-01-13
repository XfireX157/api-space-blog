import express from 'express'
import cors from 'cors'
const app = express()
import router from './Routes/index.js'

const port = process.env.PORT || 8080

app.use('/images', express.static('upload'))
app.use(express.json())
app.use(cors())

router(app)

app.listen(port, () => {
    console.log(`rondando na porta ${port}`)
})
