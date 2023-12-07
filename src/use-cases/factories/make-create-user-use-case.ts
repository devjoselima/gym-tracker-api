import {
    PrismaCreateUsersRepository,
    PrismaGetUserByEmailRepository,
} from '@/repositories/prisma/users'
import { CreateUserUseCase } from '../create-user'

export const makeCreateUserUseCase = () => {
    const prismaUsersRepository = new PrismaCreateUsersRepository()
    const prismaGetUserByEmail = new PrismaGetUserByEmailRepository()

    const createUserUseCase = new CreateUserUseCase(
        prismaUsersRepository,
        prismaGetUserByEmail
    )

    return createUserUseCase
}
