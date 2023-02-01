import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getMe } from './services/user';

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  let cookie = req.cookies.get('accessToken')?.value;
  const { pathname } = req.nextUrl;
  if (pathname.includes('_next') || pathname.includes('favicon')) return NextResponse.next();
  let url = req.nextUrl.clone();
  url.pathname = '/login';
  const res = await (
    await fetch((process.env.API_URL ?? '') + '/user/me', {
      headers: { Authorization: `Bearer ${cookie}` },
    })
  ).json();

  if (!res.username && !pathname.includes('/login')) {
    return NextResponse.redirect(url);
  }

  url.pathname = '/';
  if (res.username && pathname.includes('/login')) return NextResponse.redirect(url);
}
