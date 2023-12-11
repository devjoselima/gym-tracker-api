import { CheckIn, Prisma, User } from '@prisma/client'

export interface ICreateUsersRepository {
    execute(data: Prisma.UserCreateInput): Promise<User>
}

export interface IGetUserByEmailRepository {
    execute(email: string): Promise<User | null>
}

export interface IGetUserByIdRepository {
    execute(id: string): Promise<User | null>
}

export interface ICreateCheckInRepository {
    execute(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}
