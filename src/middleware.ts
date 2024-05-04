import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 認証が不要なパス
  if (pathname === '/login') {
    return NextResponse.next();
  }

  // セッションやクッキーをチェック
  const sessionToken = request.cookies.get('next-auth.session-token');

  if (pathname === '/login' && sessionToken) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
}

  // 認証済みかチェック
  if (!sessionToken) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

