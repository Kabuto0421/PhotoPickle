import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse, NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function main() {
  try {
    await prisma.$connect();
  } catch (e) {
    console.error('DB接続エラー', e);
    return Error('DB接続エラー');
  }
  return;
}

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await main();
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
    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    console.error('DBエラー', e);
    res.status(500).json({ message: 'DBエラー' });
    return NextResponse.json({ message: 'DBエラー' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { Seed, matchPins, userId }: { Seed: string; matchPins: { latitude: number; longitude: number }[]; userId: string } = req.body;
    await main();
    const match = await prisma.match.create({
      data: {
        Seed,
        userId, // userId をデータに追加
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
    return NextResponse.json({ message: 'success' }, { status: 201 });
  } catch (e) {
    console.error('DBエラー', e);
    res.status(500).json({ message: 'DBエラー' });
    return NextResponse.json({ message: 'DBエラー' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};