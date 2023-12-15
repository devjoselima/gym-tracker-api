import { prisma } from '@/lib/prisma'
import { IGetCheckinByIdRepository } from '@/repositories/interfaces'

export class PrismaGetCheckInByIdRepository
    implements IGetCheckinByIdRepository
{
    async execute(id: string) {
        const checkIn = await prisma.checkIn.findUnique({
            where: {
                id,
            },
        })
        return checkIn
    }
}
