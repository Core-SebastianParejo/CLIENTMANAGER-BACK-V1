import type { Request, Response, NextFunction } from 'express';
import { env } from '../../config/env.js';
import jwt from 'jsonwebtoken';

export function readToken(req: Request, res: Response, next: NextFunction) {
  try {
    const AuthHeader = req.headers.authorization;
    const token = AuthHeader?.split(' ')[1];
    if (!token) {
      res.status(401).json({ error: 'El Token no existe' });
      return;
    }

    jwt.verify(token, env.JWT_SECRET);
    next();
  } catch (_error) {
    res.status(401).json({ error: 'Error al autenticarse en el servidor' });
  }
}
