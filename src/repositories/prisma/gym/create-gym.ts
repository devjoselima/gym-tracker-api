import { prisma } from '@/lib/prisma'
import { ICreateGymRepository } from '@/repositories/interfaces'
import { Prisma } from '@prisma/client'

export class PrismaCreateGymsRepository implements ICreateGymRepository {
    async execute(data: Prisma.GymCreateInput) {
        const gym = await prisma.gym.create({
            data,
        })

        return gym
    }
}
