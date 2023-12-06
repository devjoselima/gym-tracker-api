import { User, Prisma } from '@prisma/client'

export interface CreateUsersRepository {
    execute(data: Prisma.UserCreateInput): Promise<User>
}

export interface GetUserByEmailRepository {
    execute(email: string): Promise<User | null>
}
