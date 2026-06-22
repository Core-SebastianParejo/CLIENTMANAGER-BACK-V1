import { prisma } from '../config/database.js';

export interface ClientData {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Client {
  static async create(
    data: Omit<ClientData, 'id' | 'createdAt' | 'updatedAt' | 'status'>,
  ) {
    return prisma.client.create({
      data: {
        ...data,
        email: data.email.toLowerCase(),
        fullName: data.fullName.trim(),
      },
    });
  }

  static async findAll() {
    return prisma.client.findMany({ where: { status: true } });
  }

  static async findById(id: string) {
    return prisma.client.findUnique({ where: { id, status: true } });
  }

  static async findByEmail(email: string) {
    return prisma.client.findUnique({ where: { email: email.toLowerCase() } });
  }

  static async update(
    id: string,
    data: Partial<
      Omit<ClientData, 'id' | 'createdAt' | 'updatedAt' | 'status'>
    >,
  ) {
    return prisma.client.update({ where: { id }, data });
  }

  static async delete(id: string) {
    return prisma.client.update({ where: { id }, data: { status: false } });
  }
}
