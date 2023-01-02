import express from 'express';
import morgan from 'morgan';
import apiRouter from './routes/apiRotues';

const app = express();

// check if ENV is development
app.use(morgan('dev'));

app.use(express.json());

app.use(apiRouter);

export default app;
