import { PrismaClient } from '@prisma/client';
import { User } from '../types';

const prisma = new PrismaClient();
// types.ts
interface SimpleUser {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
}
export async function getUserById(userId: string): Promise<SimpleUser | null> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, image: true },
  });

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name ?? null,
    email: user.email ?? null,
    image: user.image ?? null,
  };
}