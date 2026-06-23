import { Router } from 'express';
import { AuthController } from '../controllers/authController.js';
import { validateUserClient } from '../middlewares/validators/createUserValidator.js';

const userRouter: Router = Router();

userRouter.post('/register', validateUserClient, AuthController.register);
userRouter.post('/login', AuthController.login);

export default userRouter;
