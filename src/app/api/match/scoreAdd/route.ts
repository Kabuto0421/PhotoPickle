import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { Seed, matchPins, accountId }: { Seed: string; matchPins: { latitude: number; longitude: number }[]; accountId: string } = body;

        console.log('Received POST Request:', { Seed, matchPins, accountId });

        await prisma.$connect();

        const match = await prisma.match.create({
            data: {
                Seed,
                userId: accountId, // userIdフィールドにaccountIdを使用（仮にモデルがこれを受け入れる場合）
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

        // アカウントのスコアを更新
        const updatedAccount = await prisma.account.update({
            where: {
                id: accountId, // アカウントIDによる特定
            },
            data: {
                score: {
                    increment: 100
                }
            }
        });

        console.log('Updated Account Score:', updatedAccount);

        return NextResponse.json({ message: 'success', match, updatedAccount }, { status: 201 });
    } catch (e: any) {
        console.error('DBエラー', e.message, e.stack);
        return NextResponse.json({ message: 'Database Error', error: e.message }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}