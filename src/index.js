import express from 'express';
import cors from 'cors';
import Routes from './Routes/index.js';
const app = express();

const port = process.env.PORT;

app.use('/images', express.static('upload'));
app.use(express.json());
app.use(cors());

Routes(app);

app.listen(port, () => console.log(`rondando na porta ${port}`));