import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { Seed, matchPins, userId }: { Seed: string; matchPins: { latitude: number; longitude: number, targetImage: string }[]; userId: string } = body;

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
                            targetImage: pin.targetImage ?? "",
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