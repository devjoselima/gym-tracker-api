import { prisma } from '@/lib/prisma'
import { GetUserByEmailRepository } from '@/repositories/users-repository'

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
