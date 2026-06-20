import { prisma } from '../config/database.js';

export interface ClientData {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: Date;
  updatedAt: Date;
}

export class Client {
  static async create(
    data: Omit<ClientData, 'id' | 'createdAt' | 'updatedAt' | 'status'>,
  ) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new Error(`Email inválido: ${data.email}`);
    }
    if (!data.fullName || data.fullName.trim().length < 2) {
      throw new Error('El nombre debe tener al menos 2 caracteres');
    }

    return prisma.client.create({
      data: {
        ...data,
        email: data.email.toLowerCase(),
        fullname: data.fullName.trim(),
      },
    });
  }

  static async findAll() {
    return prisma.client.findMany();
  }

  static async findById(id: string) {
    return prisma.client.findUnique({ where: { id } });
  }

  static async findByEmail(email: string) {
    return prisma.client.findUnique({ where: { email: email.toLowerCase() } });
  }

  static async update(
    id: string,
    data: Partial<Omit<ClientData, 'id' | 'createdAt' | 'updatedAt'>>,
  ) {
    return prisma.client.update({ where: { id }, data });
  }

  static async delete(id: string) {
    return prisma.client.delete({ where: { id } });
  }
}
