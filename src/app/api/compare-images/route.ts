// app/api/compare-images/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const timeout = (ms: number): Promise<void> => {
        return new Promise((_, reject) => setTimeout(() => reject(new Error('Request Timeout')), ms));
    };

    const fetchWithTimeout = async (resource: string, options: RequestInit, ms = 60000) => {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), ms);
        options.signal = controller.signal;

        try {
            const response = await fetch(resource, options);
            clearTimeout(id);
            return response;
        } catch (error) {
            clearTimeout(id);
            throw error;
        }
    };

    try {
        const { image_url1, image_url2 } = await request.json();

        if (!image_url1 || !image_url2) {
            return NextResponse.json({ error: "Both image URLs are required." }, { status: 400 });
        }

        const response = await fetchWithTimeout('http://118.27.6.221:8080/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image_url1, image_url2 }),
        }, 60000); // タイムアウトを60秒に設定

        const responseText = await response.text();
        console.log('Response Text:', responseText);

        if (!response.ok) {
            try {
                const errorResponse = JSON.parse(responseText);
                return NextResponse.json({ error: errorResponse.error }, { status: response.status });
            } catch (e) {
                return NextResponse.json({ error: responseText }, { status: response.status });
            }
        }

        const data = JSON.parse(responseText);
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}