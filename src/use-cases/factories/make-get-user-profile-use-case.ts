import { PrismaGetUserByIdRepository } from '@/repositories/prisma/users'
import { GetUserProfileUseCase } from '../get-user-profile'

export const makeGetUserProfileUseCase = () => {
    const getUserByIdRepository = new PrismaGetUserByIdRepository()

    const useCase = new GetUserProfileUseCase(getUserByIdRepository)

    return useCase
}
