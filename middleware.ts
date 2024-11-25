import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';   
import { getToken } from "next-auth/jwt"

import { authOptions } from './auth.config'; // Import your NextAuth options
import NextAuth from "next-auth/middleware";




export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  
    if (!token && !request.nextUrl.pathname.startsWith('/users')) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  
    return NextResponse.next()
  }
  

export const config = {

    matcher : [
        '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
    ]
}

