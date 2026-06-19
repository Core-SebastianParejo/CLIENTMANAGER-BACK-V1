// Leemos el puerto desde las variables de entorno, convirtiéndolo a número.
// Si no existe, usamos el 3000 como respaldo (fallback).
export const env = {
  PORT: Number(process.env.PORT) || 3000,
};
