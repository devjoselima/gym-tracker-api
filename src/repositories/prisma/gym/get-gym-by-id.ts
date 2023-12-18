import { prisma } from '@/lib/prisma'
import { IGetGymByIdRepository } from '@/repositories/interfaces'

export class PrismaGetGymByIdRepository implements IGetGymByIdRepository {
    async execute(id: string) {
        const gym = await prisma.gym.findUnique({
            where: {
                id,
            },
        })
        return gym
    }
}
