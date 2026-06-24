import { z } from 'zod';
import type { Request, Response, NextFunction } from 'express';

const schema = z.object({
  fullName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.email('Email Invalido'),
  phone: z.string().min(10, 'Ingrese un numero de telefono valido'),
  company: z.string(),
});

export function validateCreateClient(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: result.error.issues });
    return;
  }
  next();
}
