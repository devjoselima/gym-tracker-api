import { prisma } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'

interface CreateUsersRepository {
    execute(data: Prisma.UserCreateInput): Promise<User>
}
export class PrismaCreateUsersRepository implements CreateUsersRepository {
    async execute(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data,
        })

        return user
    }
}
