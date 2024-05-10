import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const seed = req.nextUrl.searchParams.get('seed');

  try {
    await prisma.$connect();

    if (seed) {
      // 特定の Seed に基づいて Match を取得
      const match = await prisma.match.findFirst({
        where: { Seed: seed },
        select: {
          id: true,
          Seed: true,
          matchPins: {
            select: {
              id: true,
              latitude: true,
              longitude: true,
            },
          },
        },
      });

      if (!match) {
        return NextResponse.json({ message: `Seed '${seed}' に対応するマッチが見つかりません` }, { status: 404 });
      }

      return NextResponse.json(match, { status: 200 });
    } else {
      // 全ての Match を取得
      const data = await prisma.match.findMany({
        select: {
          id: true,
          Seed: true,
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
    }
  } catch (e: any) {
    console.error('DBエラー', e.message, e.stack);
    return NextResponse.json({ message: 'DBエラー', error: e.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: NextRequest) {
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
              latitude: pin.latitude ?? 0,
              longitude: pin.longitude ?? 0,
            })),
          },
        },
      },
    });

    console.log('Created Match:', match);

    return NextResponse.json({ message: 'success' }, { status: 201 });
  } catch (e: any) {
    console.error('DBエラー', e.message, e.stack);
    return NextResponse.json({ message: 'DBエラー', error: e.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}