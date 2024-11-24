import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';   

import { authOptions } from './auth.config'; // Import your NextAuth options
import NextAuth from "next-auth/middleware";

export const config = {

    matcher : [
        '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
    ]
}