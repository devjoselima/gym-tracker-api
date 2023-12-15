import { prisma } from '@/lib/prisma'
import { ICreateCheckInRepository } from '@/repositories/interfaces'
import { Prisma } from '@prisma/client'

export class PrismaCreateCheckInRepository implements ICreateCheckInRepository {
    async execute(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = await prisma.checkIn.create({
            data,
        })

        return checkIn
    }
}
