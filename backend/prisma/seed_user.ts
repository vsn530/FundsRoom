import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const user = await prisma.user.upsert({
    where: { email: 'bhagirathkumar.bk8239@gmail.com' },
    update: {},
    create: {
      name: 'Bhagirath Kumar',
      email: 'bhagirathkumar.bk8239@gmail.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('User created:', user.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
