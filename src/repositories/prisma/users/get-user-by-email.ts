import { prisma } from '@/lib/prisma'
import { IGetUserByEmailRepository } from '@/repositories/Interfaces-repostories'

export class PrismaGetUserByEmailRepository
    implements IGetUserByEmailRepository
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
