import { z } from 'zod';
import type { Request, Response, NextFunction } from 'express';

const schema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.email('Email Invalido'),
  password: z
    .string()
    .min(8, 'La contraseña debe ser de al menos 8 caracteres'),
});

export function validateUserClient(
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
