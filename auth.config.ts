import { NextAuthOptions, User as NextAuthUser } from 'next-auth';
import { PrismaClient, User } from '@prisma/client';
import CredentialsProvider from "next-auth/providers/credentials";
import {z} from "zod";
import {hash, compare} from "bcryptjs";

const prisma = new PrismaClient()


async function getUser(email:string): Promise <User | null> {

    try {
        
        const users = await prisma.user.findUnique({where: {email}})
        return users
    }

    catch(error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');

    }
}

export const authOptions: NextAuthOptions = {

   
    providers: [

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email@example.com" },
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials): Promise<NextAuthUser | null> {
                const parsedCredentials = z.object({email: z.string().email(), password: z.string().min(6)}) 
                .safeParse(credentials);
                if (parsedCredentials.success) {
                    const {email, password} = parsedCredentials.data;
                    const user = await getUser(email)
                    
                    
                    if (!user || !user.password) return null;
                    const passwordsMatch = await compare(password, user.password)

                    if (passwordsMatch) {
                        const {password: _, ...userWithoutPassword} = user
                        return userWithoutPassword as NextAuthUser
                    }

                    return null
                }

                return null



            }
        })


    ],

    callbacks : {

        async jwt({token, user}) {
            if(user) {
                token.id = user.id;
                token.email = user.email ?? '';
            }
            return token
        } ,

        async session({ session, token }) {

            if(session.user) {

                session.user.id = token.id as string
                session.user.email = token.email as string
            }

            return session;
        }




    }
}