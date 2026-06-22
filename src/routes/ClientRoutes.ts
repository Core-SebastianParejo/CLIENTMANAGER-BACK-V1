import { Router } from 'express';
import { ClientController } from '../controllers/ClientController.js';
import { validateCreateClient } from '../middlewares/validators/createClientValidator.js';

const clientRouter: Router = Router();

clientRouter.post('/', validateCreateClient, ClientController.create);

clientRouter.get('/', ClientController.findAll);
clientRouter.get('/:id', ClientController.findById);

clientRouter.put('/:id', ClientController.update);

clientRouter.delete('/:id', ClientController.delete);

export default clientRouter;
