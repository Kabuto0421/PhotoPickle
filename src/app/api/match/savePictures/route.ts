import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { matchId, latitude, longitude, targetImage }: { matchId: string; latitude: number; longitude: number; targetImage: string } = body;

        console.log('Received POST Request:', { matchId, latitude, longitude, targetImage });

        await prisma.$connect();
        const matchPin = await prisma.matchPin.create({
            data: {
                matchId,
                latitude,
                longitude,
                targetImage,
            },
        });

        console.log('Created MatchPin:', matchPin);

        return NextResponse.json({ message: 'MatchPin successfully created', matchPin }, { status: 201 });
    } catch (e: any) {
        console.error('DB Error', e.message, e.stack);
        return NextResponse.json({ message: 'Database Error', error: e.message }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}