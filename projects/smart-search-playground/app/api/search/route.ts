import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const q = url.searchParams.get('q');
        if (!q) {
        return NextResponse.json({ error: 'q is required' }, { status: 400 });
        }
        const target = `https://imdb.iamidiotareyoutoo.com/search?q=${encodeURIComponent(q)}`;
        const externalRes = await fetch(target, { method: 'GET' });
        const contentType = externalRes.headers.get('content-type') ?? '';
        const bodyText = await externalRes.text();
        if (contentType.includes('application/json')) {
        try {
            const json = JSON.parse(bodyText);
            return NextResponse.json(json, { status: externalRes.status });
        } catch {
            return NextResponse.json({ data: bodyText }, { status: externalRes.status });
        }
        }
        return new NextResponse(bodyText, {
        status: externalRes.status,
        headers: {
            'Content-Type': contentType || 'text/plain; charset=utf-8',
        },
        });
    } catch (err) {
        return NextResponse.json({ error: 'Server error', details: String(err) }, { status: 500 });
    }
}
