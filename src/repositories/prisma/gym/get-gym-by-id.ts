import { prisma } from '@/lib/prisma'
import { IGetGymByIdRepository } from '@/repositories/interfaces'

export class PrismaGetUserByIdRepository implements IGetGymByIdRepository {
    async execute(id: string) {
        const gym = await prisma.gym.findUnique({
            where: {
                id,
            },
        })
        return gym
    }
}
