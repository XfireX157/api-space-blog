import express from 'express'
import cors from 'cors'
const app = express()
import router from './Routes/index.js'

const port = process.env.PORT || 8080

app.use(express.json())
app.use(cors())

//http://localhost:8080/images/1669299904456_caminhaop.jpg
app.use('/images', express.static('upload'))

router(app)

app.listen(port, () => {
    console.log(`rondando na porta ${port}`)
})
