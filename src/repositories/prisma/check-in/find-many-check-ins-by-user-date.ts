import { prisma } from '@/lib/prisma'
import { IGetCheckInByUserDateRepository } from '@/repositories/interfaces'
import dayjs from 'dayjs'

export class PrismaFindManyCheckInsByUserDateRepository
    implements IGetCheckInByUserDateRepository
{
    async execute(userId: string, date: Date) {
        const startOfTheDay = dayjs(date).startOf('date')
        const endOfTheDay = dayjs(date).endOf('date')

        const checkIn = await prisma.checkIn.findFirst({
            where: {
                user_id: userId,
                created_at: {
                    gte: startOfTheDay.toDate(),
                    lte: endOfTheDay.toDate(),
                },
            },
        })

        return checkIn
    }
}
