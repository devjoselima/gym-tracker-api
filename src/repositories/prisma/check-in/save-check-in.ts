import { prisma } from '@/lib/prisma'
import { ISaveCheckinRepository } from '@/repositories/interfaces'
import { CheckIn } from '@prisma/client'

export class SaveCheckInRepository implements ISaveCheckinRepository {
    async execute(data: CheckIn) {
        const checkIn = await prisma.checkIn.update({
            where: {
                id: data.id,
            },
            data,
        })

        return checkIn
    }
}
