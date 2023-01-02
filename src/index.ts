import express from 'express';

import apiRouter from './routes/apiRotues';
const app = express();

app.use(express.json());

app.use(apiRouter);

export default app;
