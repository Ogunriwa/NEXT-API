import { User as PrismaUser } from '@prisma/client';
import { Session as NextAuthSession } from 'next-auth';

declare module 'next-auth' {
    interface User extends Omit<PrismaUser, 'id'> {}

    interface Session extends NextAuthSession {
        user: User;
    }

    
}

declare module 'next-auth/jwt' {

    interface JWT {
        id: string;
        email: string;
    }
}