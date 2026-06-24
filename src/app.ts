import express, { type Application } from 'express';
import router from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app: Application = express();

app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

export default app;
