import { prisma } from '@/lib/prisma'
import { User } from '@prisma/client'

export interface GetUserByEmailRepository {
    execute(email: string): Promise<User | null>
}
export class PrismaGetUserByEmailRepository
    implements GetUserByEmailRepository
{
    async execute(email: string) {
        const userEmail = await prisma.user.findUnique({
            where: {
                email,
            },
        })
        return userEmail
    }
}
