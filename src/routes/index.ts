import { Router } from 'express';
import clientRouter from './ClientRoutes.js';

const router: Router = Router();

router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

router.use('/clients', clientRouter);

export default router;
