import { prisma } from '@/lib/prisma'
import { ISearchGymsByTitleRepository } from '@/repositories/interfaces'

export class PrismaSearchGymsByTitleRepository
    implements ISearchGymsByTitleRepository
{
    async execute(query: string, page: number) {
        const gyms = await prisma.gym.findMany({
            where: {
                title: {
                    contains: query,
                },
            },

            take: 20,
            skip: (page - 1) * 20,
        })

        return gyms
    }
}
