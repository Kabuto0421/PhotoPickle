// seed値からマーカーの緯度,マーカーの経度を取得するAPI

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function main() {
  try {
    await prisma.$connect();
  } catch (e) {
    return Error("DB接続エラー");
  }
  return 
}

export const GET = async (req: NextRequest, res: NextResponse) => {
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
        }
      },
    }, 
  })
    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: "DBエラー" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const { Seed, latitude, longitude } = await req.json();
    await main();
    const match = await prisma.match.create({ data: { Seed, latitude, longitude } });
    return NextResponse.json({ message: "success" }, { status: 201 });
  } catch (e) {
    return Error("DBエラー");
  } finally {
    await prisma.$disconnect();
  }
}