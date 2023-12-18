import { prisma } from '@/lib/prisma'
import { IFindManyCheckInsByUserIdRepository } from '@/repositories/interfaces'

export class PrismaFindManyCheckInsByIdRepository
    implements IFindManyCheckInsByUserIdRepository
{
    async execute(userId: string, page: number) {
        const checkIns = await prisma.checkIn.findMany({
            where: {
                user_id: userId,
            },
            skip: (page - 1) * 20,
            take: 20,
        })

        return checkIns
    }
}
