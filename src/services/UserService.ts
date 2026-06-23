import { User } from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export class UserService {
  static async register(name: string, email: string, password: string) {
    const existing = await User.findByEmail(email);
    if (existing) {
      throw new Error('Ya existe un usuario con ese email');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: user.id, email: user.email }, env.JWT_SECRET, {
      expiresIn: '24h',
    });

    return token;
  }
  static async login(email: string, password: string) {
    const user = await User.findByEmail(email);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error('Usuario o Contraseña incorrecta');
    }
    const token = jwt.sign({ id: user.id, email: user.email }, env.JWT_SECRET, {
      expiresIn: '24h',
    });

    return token;
  }
}
