import type { Request, Response } from 'express';
import { UserService } from '../services/UserService.js';

export class AuthController {
  static register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, password } = req.body;
      const user = await UserService.register(name, email, password);
      res.status(201).json({ token: user });
    } catch (error) {
      if ((error as Error).message.includes('Ya existe')) {
        res.status(409).json({ error: (error as Error).message });
        return;
      }
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  static login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const user = await UserService.login(email, password);
      res.status(200).json({ token: user });
    } catch (error) {
      if ((error as Error).message.includes('Usuario no encontrado')) {
        res.status(404).json({ error: (error as Error).message });
        return;
      }
      if ((error as Error).message.includes('Usuario o Contraseña')) {
        res.status(401).json({ error: (error as Error).message });
        return;
      }
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
}
