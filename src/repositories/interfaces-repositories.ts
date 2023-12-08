import { Prisma, User } from '@prisma/client'

export interface ICreateUsersRepository {
    execute(data: Prisma.UserCreateInput): Promise<User>
}

export interface IGetUserByEmailRepository {
    execute(email: string): Promise<User | null>
}
