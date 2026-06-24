import type { Request, Response, NextFunction } from 'express';
export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
): void {
  console.error(error);
  res.status(500).json({ error: 'Error interno del servidor' });
}
