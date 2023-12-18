import { PrismaCreateGymsRepository } from '@/repositories/prisma/gym/create-gym'
import { CreateGymUseCase } from '../create-gym'

export function makeCreateGym() {
    const createGymRepository = new PrismaCreateGymsRepository()
    const useCase = new CreateGymUseCase(createGymRepository)

    return useCase
}
