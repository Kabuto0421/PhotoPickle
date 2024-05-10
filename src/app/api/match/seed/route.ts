import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
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
    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    console.error('DBエラー', e);
    return NextResponse.json({ message: 'DBエラー' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { Seed, matchPins, userId }: { Seed: string; matchPins: { latitude: number; longitude: number }[]; userId: string } = body;

    console.log('Received POST Request:', { Seed, matchPins, userId });

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

    console.log('Created Match:', match);

    return NextResponse.json({ message: 'success' }, { status: 201 });
  } catch (e) {
    console.error('DBエラー', e);
    return NextResponse.json({ message: 'DBエラー' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};