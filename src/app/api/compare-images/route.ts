// app/api/compare-images/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const { image_url1, image_url2 } = await request.json();

    if (!image_url1 || !image_url2) {
        return NextResponse.json({ error: "Both image URLs are required." }, { status: 400 });
    }

    try {
        const response = await fetch('https://compare-images.onrender.com/compare-images', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image_url1, image_url2 }),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            return NextResponse.json({ error: errorResponse.error }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}