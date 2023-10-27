import express from 'express';
import 'dotenv/config';
import { json } from './services/services.js';
import cors from 'cors'

import { noteRouter } from './routes/noteRouter.js';
import { userRouter } from './routes/userRouter.js';

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(json());
app.use('/users', userRouter);
app.use('/notes', noteRouter)
app.get('/', (req, res) => {
    res.send('Server works')
})

app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});
