import NextAuth from 'next-auth';
import { PrismaClient, User } from '@prisma/client';
import {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {z} from "zod";
import {sql} from "@vercel/postgres";
import bcrypt from "bcrypt";

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
            async authorize(credentials): Promise<User | null> {
                const parsedCredentials = z.object({email: z.string().email(), password: z.string().min(6)}) 
                .safeParse(credentials);
                if (parsedCredentials.success) {
                    const {email, password} = parsedCredentials.data;
                    const user = await getUser(email)
                    
                    
                    if (!user || !user.password) return null;
                    const passwordsMatch = await bcrypt.compare(password, user.password)

                    if (passwordsMatch) return user
                }

                return null



            }
        })


    ],
}