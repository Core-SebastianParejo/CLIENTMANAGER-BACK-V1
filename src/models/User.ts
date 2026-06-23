import { prisma } from '../config/database.js';

export interface UserData {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  static async create(data: Omit<UserData, 'id' | 'createdAt' | 'updatedAt'>) {
    return prisma.user.create({
      data: {
        ...data,
        email: data.email.toLowerCase(),
        name: data.name.trim(),
      },
    });
  }

  static async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email: email.toLowerCase() } });
  }
}
