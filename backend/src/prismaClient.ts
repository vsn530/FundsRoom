import { PrismaClient } from '@prisma/client';
import path from 'path';

const prisma = new PrismaClient({
  datasourceUrl: `file:${path.join(__dirname, '../prisma/dev.db')}`,
});

export default prisma;
