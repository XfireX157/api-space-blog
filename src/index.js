import express from 'express'
import cors from 'cors'
const app = express()
import path from 'path'
import { fileURLToPath } from 'url'
import router from './Routes/index.js'

const port = process.env.PORT || 8080

app.use(express.json())
app.use(cors())

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

//http://localhost:8081/files/upload/1669299904456_caminhaop.jpg
app.use('/files', express.static(path.join(__dirname, 'public')))

router(app)

app.listen(port, () => {
    console.log(`rondando na porta ${port}`)
})
