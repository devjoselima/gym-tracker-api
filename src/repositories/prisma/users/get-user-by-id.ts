import { prisma } from '@/lib/prisma'
import { IGetUserByIdRepository } from '@/repositories/interfaces'

export class PrismaGetUserByIdRepository implements IGetUserByIdRepository {
    async execute(id: string) {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
        })
        return user
    }
}
