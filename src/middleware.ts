import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 認証が不要なパス（静的ファイル、APIルート）
    if (pathname.includes('/_next') || pathname.includes('/api')) {
        return NextResponse.next();
    }

    const sessionToken = request.cookies.get('__Secure-next-auth.session-token') || request.cookies.get('next-auth.session-token');
    /*
    
        if (pathname === '/login' && sessionToken) {
            const url = request.nextUrl.clone();
            url.pathname = '/';
            return NextResponse.redirect(url);
        }
    
        //認証済みかチェック
        if (!sessionToken && pathname !== '/login') {
            const url = request.nextUrl.clone();
            url.pathname = '/login';
            return NextResponse.redirect(url);
        }
    */
    return NextResponse.next();
}
