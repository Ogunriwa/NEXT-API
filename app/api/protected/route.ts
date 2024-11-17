import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../auth.config'
import { NextResponse } from 'next/server'


export const GET = async () => {
    const session: { user: { id: string, email: string } } | null = await getServerSession(authOptions)

    if(!session) {
        return NextResponse.json({message: "You mus be logged in"}, {status: 401})
    }

    return NextResponse.json({
        message: "This is a protected API route",
        user: {
            id: session.user.id,
            email: session.user.email
        }
    })
}