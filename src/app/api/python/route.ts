import { NextResponse } from 'next/server'
export async function POST(req: Request) {
    const { image1_data, image2_data } = await req.json();
}