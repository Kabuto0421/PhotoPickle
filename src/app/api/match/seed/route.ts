import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await prisma.$connect();
    const data = await prisma.match.findMany({
      select: {
        id: true,
        matchPins: {
          select: {
            id: true,
            latitude: true,
            longitude: true,
          },
        },
      },
    });
    res.status(200).json(data);
  } catch (e) {
    console.error('DBエラー', e);
    res.status(500).json({ message: 'DBエラー' });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { Seed, matchPins, userId }: { Seed: string; matchPins: { latitude: number; longitude: number }[]; userId: string } = req.body;
    await prisma.$connect();
    const match = await prisma.match.create({
      data: {
        Seed,
        userId,
        matchPins: {
          createMany: {
            data: matchPins.map((pin) => ({
              latitude: pin.latitude,
              longitude: pin.longitude,
            })),
          },
        },
      },
    });
    res.status(201).json({ message: 'success' });
  } catch (e) {
    console.error('DBエラー', e);
    res.status(500).json({ message: 'DBエラー' });
  } finally {
    await prisma.$disconnect();
  }
};