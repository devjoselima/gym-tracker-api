import { PrismaCreateGymsRepository } from '@/repositories/prisma/gym/create-gym'
import { CreateGymUseCase } from '../create-gym'

export function makeCreateGymUseCase() {
    const createGymRepository = new PrismaCreateGymsRepository()
    const useCase = new CreateGymUseCase(createGymRepository)

    return useCase
}
