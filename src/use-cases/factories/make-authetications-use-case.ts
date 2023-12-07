import { PrismaGetUserByEmailRepository } from '@/repositories/prisma/users'
import { AuthenticateUseCase } from '../authenticate'

export const makeAuthenticateUseCase = () => {
    const prismaGetUserByEmail = new PrismaGetUserByEmailRepository()

    const authenticateUseCase = new AuthenticateUseCase(prismaGetUserByEmail)

    return authenticateUseCase
}
