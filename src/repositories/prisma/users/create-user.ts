import { prisma } from '@/lib/prisma'
import { ICreateUsersRepository } from '@/repositories/interfaces'
import { Prisma } from '@prisma/client'

export class PrismaCreateUsersRepository implements ICreateUsersRepository {
    async execute(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data,
        })

        return user
    }
}
