import express from 'express';
import morgan from 'morgan';
import pinoLogger from './middleware/pinoLogger';

import apiRouter from './routes/apiRotues';

const app = express();

app.use(pinoLogger);

app.use(morgan('dev'));
app.use(express.json());

app.use(apiRouter);

export default app;
