import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client.js';

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

prisma
  .$connect()
  .then(() => console.log('DB conectada'))
  .catch((err: Error) => console.error('Error conectando DB:', err));

export { prisma };
