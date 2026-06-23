import { Router } from 'express';
import clientRouter from './ClientRoutes.js';
import userRouter from './Auth.js';
import { readToken } from '../middlewares/validators/auth.js';

const router: Router = Router();

router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

router.use('/clients', readToken, clientRouter);
router.use('/auth', userRouter);

export default router;
