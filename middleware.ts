import NextAuth from 'next-auth'
import { authOptions } from  './auth.config'

export default NextAuth(authOptions).auth;

export const config = {

    matcher : [
        '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
    ]
}