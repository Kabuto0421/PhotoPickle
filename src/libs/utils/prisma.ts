import { PrismaClient } from '@prisma/client';
import { User } from '../types/user';

const prisma = new PrismaClient();

export async function getUserById(userId: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email:true, image: true },
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
