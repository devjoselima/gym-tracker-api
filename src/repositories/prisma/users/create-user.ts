import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

import { CreateUsersRepository } from '../../users-repository'

export class PrismaCreateUsersRepository implements CreateUsersRepository {
    async execute(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data,
        })

        return user
    }
}
